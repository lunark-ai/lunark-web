import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 5;
    const skip = (page - 1) * limit;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const [usages, total] = await Promise.all([
      prisma.usage.findMany({
        where: { 
          userId,
          deletedAt: null,
          chat: {
            deletedAt: null
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          promptTokens: true,
          completionTokens: true,
          totalTokens: true,
          totalCost: true,
          createdAt: true,
          chat: {
            select: {
              title: true
            }
          }
        }
      }),
      prisma.usage.count({
        where: { 
          userId,
          deletedAt: null,
          chat: {
            deletedAt: null
          }
        }
      })
    ]);

    return NextResponse.json({
      usages,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('Failed to fetch usage history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch usage history' },
      { status: 500 }
    );
  }
} 