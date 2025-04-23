import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Get user's current balance
    const user = await prisma.user.findUnique({
      where: { 
        id: userId,
        deletedAt: null
      },
      select: { balance: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all payments ordered by date
    const payments = await prisma.payment.findMany({
      where: { 
        userId,
        deletedAt: null
      },
      orderBy: { createdAt: 'asc' },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    // If there's only one payment, create a starting point at 0
    if (payments.length === 1) {
      const paymentDate = new Date(payments[0].createdAt);
      const startDate = new Date(paymentDate);
      startDate.setDate(startDate.getDate() - 1); // One day before the payment

      return NextResponse.json([
        {
          date: startDate.toISOString().split('T')[0],
          amount: 0
        },
        {
          date: paymentDate.toISOString().split('T')[0],
          amount: payments[0].amount
        }
      ]);
    }

    // Calculate daily balances for multiple payments
    const dailyBalances = new Map<string, number>();
    let runningBalance = 0;

    payments.forEach(payment => {
      const date = payment.createdAt.toISOString().split('T')[0];
      runningBalance += payment.amount;
      dailyBalances.set(date, runningBalance);
    });

    // Fill in missing dates
    if (dailyBalances.size > 0) {
      const dates = Array.from(dailyBalances.keys()).sort();
      const startDate = new Date(dates[0]);
      const endDate = new Date();
      const history = [];

      let currentDate = startDate;
      let lastBalance = 0;

      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const balance = dailyBalances.get(dateStr) ?? lastBalance;
        history.push({
          date: dateStr,
          amount: balance
        });
        lastBalance = balance;
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Make sure the last balance matches the user's current balance
      if (history.length > 0) {
        history[history.length - 1].amount = user.balance;
      }

      return NextResponse.json(history);
    }

    // If no payment history, return just the current balance
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return NextResponse.json([
      {
        date: yesterday.toISOString().split('T')[0],
        amount: 0
      },
      {
        date: today.toISOString().split('T')[0],
        amount: user.balance
      }
    ]);
  } catch (error) {
    console.error('Failed to fetch payment history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment history' },
      { status: 500 }
    );
  }
} 