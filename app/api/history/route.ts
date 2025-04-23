import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { decrypt } from '@/utils/encrypt';
import { verifyToken } from '@/lib/authMiddleware'

export async function GET(request: Request) {
    const clonedReq = request.clone();
    const { searchParams } = new URL(clonedReq.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const auth = await verifyToken(request, String(userId));
    if ('error' in auth) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    if (userId !== auth.decoded.userId) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    try {
        const [history, total] = await Promise.all([
            prisma.chat.findMany({
                where: { 
                    userId: userId,
                    deletedAt: null
                },
                orderBy: { createdAt: 'desc' },
                ...(limit !== -1 ? { take: limit, skip } : {})
            }),
            prisma.chat.count({
                where: { 
                    userId: userId,
                    deletedAt: null
                }
            })
        ]);

        const decryptedHistory = history.map(chat => ({
            ...chat,
            title: chat.title ? decrypt(chat.title) : ""
        }));
        
        return NextResponse.json({ 
            history: decryptedHistory,
            total,
            hasMore: limit !== -1 ? skip + history.length < total : false
        });
    } catch (error) {
        console.error('Error fetching history:', error);
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const clonedReq = req.clone();
    const body = await clonedReq.json();
    const { ids, userId } = body;

    const auth = await verifyToken(req, userId);
    if ('error' in auth) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        if (userId !== auth.decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
        }

        const chats = await prisma.chat.findMany({
            where: {
                id: { in: ids },
                deletedAt: null
            },
            select: {
                id: true,
                userId: true
            }
        });

        const allBelongToUser = chats.every(chat => chat.userId === userId);
        if (!allBelongToUser) {
            return NextResponse.json({ error: 'Cannot delete chats belonging to other users' }, { status: 403 });
        }

        const messages = await prisma.message.findMany({
            where: {
                chatId: { in: ids },
                deletedAt: null
            },
            select: {
                id: true
            }
        });

        const messageIds = messages.map(msg => msg.id);
        const now = new Date();

        await prisma.$transaction([
            prisma.usage.updateMany({
                where: {
                    chatId: { in: ids },
                    deletedAt: null
                },
                data: { deletedAt: now }
            }),
            prisma.transaction.updateMany({
                where: {
                    messageId: { in: messageIds },
                    deletedAt: null
                },
                data: { deletedAt: now }
            }),
            prisma.message.updateMany({
                where: {
                    chatId: { in: ids },
                    deletedAt: null
                },
                data: { deletedAt: now }
            }),
            prisma.chat.updateMany({
                where: {
                    id: { in: ids },
                    userId: userId,
                    deletedAt: null
                },
                data: { deletedAt: now }
            })
        ]);

        return NextResponse.json({ message: 'Successfully deleted' });
    } catch (error) {
        console.error('Error deleting chats:', error);
        return NextResponse.json({ error: 'Error deleting chats' }, { status: 500 });
    }
}