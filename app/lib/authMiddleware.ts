import { verifySessionToken } from './jwt';
import prisma from '@/lib/prisma';

export async function verifyToken(req: Request, userId: string) {
  if (!userId) {
    return { error: 'Authentication required', status: 401 };
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return { error: 'Authentication required', status: 401 };
  }

  const sessionToken = authHeader.replace('Bearer ', '');

  const dbUser = await prisma.user.findUnique({
    where: { id: userId }
  })
  
  const user = await verifySessionToken(dbUser, sessionToken);
  
  if (!user) {
    return { error: 'Session error, please sign out and sign in.', status: 403 };
  }

  return { 
    decoded: { userId: user.id, address: user.address },
    sessionToken 
  };
}