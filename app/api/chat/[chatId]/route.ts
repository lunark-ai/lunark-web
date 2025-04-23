import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { decrypt } from '@/utils/encrypt';
import { verifyToken } from '@/lib/authMiddleware';
import type { Message, Transaction, Memory } from '@/lib/prisma-client';

type MessageWithRelations = Message & {
    transaction: Transaction | null;
    memories: Memory[];
};

export async function GET(req: Request, { params }: { params: { chatId: string } }) {
    const clonedReq = req.clone();
    const { searchParams } = new URL(clonedReq.url);
    const userId = searchParams.get('userId');

    const auth = await verifyToken(req, String(userId));
    if ('error' in auth) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        const chat = await prisma.chat.findUnique({
            where: { 
                id: params.chatId,
                deletedAt: null 
            },
            include: {
                messages: {
                    where: {
                        deletedAt: null
                    },
                    include: {
                        transaction: {
                            where: {
                                deletedAt: null
                            }
                        },
                        memories: {
                            where: {
                                deletedAt: null
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'asc'  
                    }
                }
            }
        });
        
        if (!chat) {
            return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
        }

        if (chat.userId !== auth.decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
        }

        const decryptedMessages = chat.messages.map((msg: MessageWithRelations) => ({
            ...msg,
            content: decrypt(msg.content),
            toolData: msg.toolData 
                ? (() => {
                    try {
                        return JSON.parse(decrypt(msg.toolData))
                    } catch (error) {
                        console.warn(`Invalid toolData for message ${msg.id}:`, error)
                        return null
                    }
                })()
                : null,
            transaction: msg.transaction
                ? {
                    ...msg.transaction,
                    data: (() => {
                        try {
                            return JSON.parse(decrypt(msg.transaction.data))
                        } catch (error) {
                            console.warn(`Invalid transaction data for message ${msg.id}:`, error)
                            return null
                        }
                    })()
                }
                : null
        }))

        const decryptedTitle = chat.title ? decrypt(chat.title) : chat.title;
        
        return NextResponse.json({ 
            userId: chat.userId, 
            title: decryptedTitle,
            messages: decryptedMessages 
        });
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { chatId: string } }
) {
    const clonedReq = req.clone();
    const { searchParams } = new URL(clonedReq.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const auth = await verifyToken(req, userId);
    if ('error' in auth) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        const chat = await prisma.chat.findUnique({
            where: { 
                id: params.chatId,
                deletedAt: null
            }
        });

        if (!chat) {
            return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
        }

        if (chat.userId !== auth.decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
        }

        const now = new Date();

        await prisma.$transaction([
            prisma.usage.updateMany({
                where: {
                    chatId: params.chatId,
                    deletedAt: null
                },
                data: { deletedAt: now }
            }),
            prisma.transaction.updateMany({
                where: {
                    message: {
                        chatId: params.chatId
                    },
                    deletedAt: null
                },
                data: { deletedAt: now }
            }),
            prisma.message.updateMany({
                where: {
                    chatId: params.chatId,
                    deletedAt: null
                },
                data: { deletedAt: now }
            }),
            prisma.chat.update({
                where: {
                    id: params.chatId,
                    deletedAt: null
                },
                data: { deletedAt: now }
            })
        ]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete chat:', error);
        return NextResponse.json({ error: 'Failed to delete chat' }, { status: 500 });
    }
}