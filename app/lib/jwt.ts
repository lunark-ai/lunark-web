import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { User } from './prisma-client';

const JWT_SECRET = process.env.JWT_SECRET!;

interface JWTPayload {
  userId: string;
  address: string;
}

export function generateToken(user: any) {
  return jwt.sign({ 
    userId: user.id, 
    address: user.address 
  }, JWT_SECRET, { expiresIn: '24h' });
}

export async function generateAndSaveSessionToken(user: any) {
  const sessionToken = generateToken(user); 

  await prisma.user.update({
    where: { id: user.id },
    data: {
      sessionToken: sessionToken,
      sessionTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  });

  return sessionToken;
}

export async function verifySessionToken(user: User | null, sessionToken: string) {
  try {
    if (!sessionToken || !user) {
      return null;
    }

    const decoded = jwt.verify(sessionToken, JWT_SECRET) as JWTPayload;
    if (!decoded || decoded.userId !== user.id || !decoded.address || decoded.address !== user.address) {
      return null;
    }

    const dbUser = await prisma.user.findFirst({
      where: { 
        id: decoded.userId,
        sessionToken: sessionToken,
        sessionTokenExpiresAt: { gt: new Date() }
      }
    });

    if (!dbUser || !dbUser.sessionToken || !dbUser.sessionTokenExpiresAt || dbUser.sessionTokenExpiresAt < new Date()) {
      return null;
    }

    return dbUser;
  } catch (error) {
    console.error('Session token verification error:', error);
    return null;
  }
}

export async function removeSessionToken(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      sessionToken: null,
      sessionTokenExpiresAt: null
    }
  });
}