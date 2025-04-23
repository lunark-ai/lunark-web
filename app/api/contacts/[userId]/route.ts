import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
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

    const contacts = await prisma.contact.findMany({
      where: {
        userId: params.userId,
        deletedAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Failed to fetch contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

export async function POST(
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

    const body = await request.json();
    const { name, address, networks, notes } = body;

    // Validate required fields
    if (!name || !address) {
      return NextResponse.json(
        { error: 'Name and address are required' },
        { status: 400 }
      );
    }

    // Check for existing contact with same name
    const existingContact = await prisma.contact.findFirst({
      where: {
        userId: params.userId,
        name,
        deletedAt: null
      }
    });

    if (existingContact) {
      return NextResponse.json(
        { error: 'A contact with this name already exists' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        userId: params.userId,
        name,
        address,
        networks: networks || [],
        notes
      }
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Failed to create contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const body = await request.json();
    const { id, name, address, networks, notes } = body;

    if (!id || !name || !address) {
      return NextResponse.json(
        { error: 'ID, name, and address are required' },
        { status: 400 }
      );
    }

    // Check if contact exists and belongs to user
    const existingContact = await prisma.contact.findFirst({
      where: {
        id,
        userId: params.userId,
        deletedAt: null
      }
    });

    if (!existingContact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    // Check for name conflict
    const nameConflict = await prisma.contact.findFirst({
      where: {
        userId: params.userId,
        name,
        id: { not: id },
        deletedAt: null
      }
    });

    if (nameConflict) {
      return NextResponse.json(
        { error: 'A contact with this name already exists' },
        { status: 400 }
      );
    }

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: {
        name,
        address,
        networks: networks || [],
        notes
      }
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Failed to update contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact' },
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
    const contactId = searchParams.get('contactId');

    if (!contactId) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.findFirst({
      where: {
        id: contactId,
        userId: params.userId,
        deletedAt: null
      }
    });

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    await prisma.contact.update({
      where: { id: contactId },
      data: { deletedAt: new Date() }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
} 