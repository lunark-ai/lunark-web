import { encrypt } from '@/utils/encrypt';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/authMiddleware'
import { fetchStatus } from '@/lib/status';

export async function POST(req: Request) {
    const clonedReq = req.clone();
    const body = await clonedReq.json();
    const { message, userId, chainId } = body;

    const status = await fetchStatus();
    if (status === null) {
        return NextResponse.json({ error: 'Lunark is sleeping...' }, { status: 500 });
    }

    const auth = await verifyToken(req, userId);
    if ('error' in auth) {
        return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    try {
        if (userId !== auth.decoded.userId) {
            return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
        }

        const { data } = await axios.post(
            `${process.env.API_URL}/chat/create`, 
            { userId, chainId, message: encrypt(message) },
            { 
                headers: 
                { 
                    'X-API-Key': `${process.env.API_KEY}`,
                    'Authorization': `Bearer ${auth.sessionToken}`
                }
            }
        );
     
        return NextResponse.json({ chatId: data.id }); 
    } catch (error: any) {
        console.error('Error creating chat:', error.response?.data?.message);
        return NextResponse.json(
            { error: error.response?.data?.message || 'Failed to create chat' },
            { status: error.response?.status || 500 }
        );
    }
}