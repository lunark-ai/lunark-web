import { verifySessionToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId, sessionToken } = await req.json();
    
    if (!userId || !sessionToken) {
      return NextResponse.json(
        { valid: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { 
        id: userId,
        deletedAt: null
      }
    });

    if (!user) {
      return NextResponse.json(
        { valid: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const verifiedUser = await verifySessionToken(user, sessionToken);
    
    if (!verifiedUser) {
      return NextResponse.json(
        { valid: false, error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { valid: false, error: 'Authentication error' },
      { status: 401 }
    );
  }
}