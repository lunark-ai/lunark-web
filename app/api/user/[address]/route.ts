import prisma from '@/lib/prisma'
import { ethers } from 'ethers';
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { address: string } }) {
    try {
        const address = ethers.getAddress(params.address) as string;
        
        const user = await prisma.user.findFirst({
            where: { 
                address: address,
                deletedAt: null
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
    }
}