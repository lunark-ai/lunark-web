import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/authMiddleware';

export async function POST(
   req: Request,
   { params }: { params: { id: string } }
) {
    const clonedReq = req.clone();
    const body = await clonedReq.json();
    const { hash, userId } = body;

    const auth = await verifyToken(req, userId);
    if ('error' in auth) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

   try {
       const { id } = params;

       // First check if transaction exists and belongs to user
       const existingTransaction = await prisma.transaction.findUnique({
           where: { id },
           include: {
               message: {
                   select: {
                       chat: {
                           select: {
                               userId: true
                           }
                       }
                   }
               }
           }
       });

       if (!existingTransaction) {
           return NextResponse.json(
               { error: 'Transaction not found' },
               { status: 404 }
           );
       }

       if (existingTransaction.message?.chat?.userId !== auth.decoded.userId) {
           return NextResponse.json(
               { error: 'Unauthorized access' },
               { status: 403 }
           );
       }

       const transaction = await prisma.transaction.update({
           where: { id },
           data: { hash }
       });

       return NextResponse.json(transaction);
   } catch (error) {
       console.error('Error updating transaction:', error);
       return NextResponse.json(
           { error: 'Failed to update transaction' },
           { status: 500 }
       );
   }
}