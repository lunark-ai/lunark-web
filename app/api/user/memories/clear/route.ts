import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request
) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await prisma.memory.updateMany({
      where: {
        userId: userId,
        type: 'LONG_TERM',
        deletedAt: null
      },
      data: {
        deletedAt: new Date()
      }
    });

    return NextResponse.json({ message: 'All long term memories cleared successfully' });
  } catch (error) {
    console.error('Error clearing memories:', error);
    return NextResponse.json({ error: 'Failed to clear memories' }, { status: 500 });
  }
} 