import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { decrypt } from '@/utils/encrypt';
import { verifyToken } from '@/lib/authMiddleware';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const auth = await verifyToken(request, params.userId);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    if (params.userId !== auth.decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    const memories = await prisma.memory.findMany({
      where: {
        userId: params.userId,
        type: 'LONG_TERM',
        deletedAt: null
      },
      orderBy: {
        timestamp: 'desc'
      }
    });

    const decryptedMemories = memories.map(memory => ({
      ...memory,
      content: decrypt(memory.content)
    }));

    return NextResponse.json(decryptedMemories);
  } catch (error) {
    console.error('Failed to fetch memories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch memories' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const auth = await verifyToken(request, params.userId);
    if ('error' in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    if (params.userId !== auth.decoded.userId) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const memoryId = searchParams.get('memoryId');

    if (!memoryId) {
      return NextResponse.json(
        { error: 'Memory ID is required' },
        { status: 400 }
      );
    }

    const memory = await prisma.memory.findUnique({
      where: { 
        id: memoryId,
        deletedAt: null
      }
    });

    if (!memory) {
      return NextResponse.json(
        { error: 'Memory not found' },
        { status: 404 }
      );
    }

    if (memory.userId !== params.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await prisma.memory.update({
      where: { id: memoryId },
      data: { deletedAt: new Date() }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete memory:', error);
    return NextResponse.json(
      { error: 'Failed to delete memory' },
      { status: 500 }
    );
  }
} 