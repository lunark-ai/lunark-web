import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { ethers } from 'ethers';

export async function POST(req: Request) {
    try {
        const { address, signature } = await req.json()

        const userAddress = ethers.getAddress(address) as string;

        const existingUser = await prisma.user.findFirst({
            where: { 
                address: userAddress,
                deletedAt: null
            }
        });

        if (!existingUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user = await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                termsSignature: signature,
                termsSignedAt: new Date()
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update terms signature' }, { status: 500 })
    }
}