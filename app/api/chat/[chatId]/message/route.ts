import { NextResponse } from 'next/server';
import axios from 'axios';
import { encrypt } from '@/utils/encrypt';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/authMiddleware'
import { fetchStatus } from '@/lib/status';

export async function POST(request: Request, { params }: { params: { chatId: string } }) {
    const clonedReq = request.clone();
    const body = await clonedReq.json();
    const { content, chainId, userId } = body;
    
    const status = await fetchStatus();
    if (status === null) {
        return NextResponse.json({ error: 'Lunark is sleeping...' }, { status: 500 });
    }

    const auth = await verifyToken(request, userId);
    if ('error' in auth) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        const chat = await prisma.chat.findUnique({
            where: { id: params.chatId }
        });

        if (!chat || chat.userId !== auth.decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
        }

        const response = await axios.post(
            `${process.env.API_URL}/message/create`,
            {
                chatId: params.chatId,
                content: content,
                chainId
            },
            { 
                headers: 
                { 
                    'X-API-Key': `${process.env.API_KEY}`,
                    'Authorization': `Bearer ${auth.sessionToken}`
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data?.message || 'Failed to send message' },
            { status: error.response?.status || 500 }
        );
    }
}