import { generateAndSaveSessionToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const sessionToken = await generateAndSaveSessionToken(data.user);
    return NextResponse.json({ sessionToken });
  } catch (error) {
    console.error('Session token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate session token' },
      { status: 500 }
    );
  }
}