import { verifyToken } from '@/lib/auth';
import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const players = await prisma.player.findMany({
        where: { forSale: true },
      });
      res.status(200).json(players);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching market data' });
    }
  } else if (req.method === 'POST') {
    const { playerId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = verifyToken(req);

    if (!decoded) return res.status(401).json({ message: 'Unauthorized' });

    try {
      const player = await prisma.player.findUnique({ where: { id: playerId } });
      if (!player || !player.forSale)
        return res.status(400).json({ message: 'Player not available' });

      const team = await prisma.team.findUnique({
        where: { userId: decoded.id },
      });

      if(!team) return res.status(400).json({ message: 'Team not found' });

      if (team.budget < player.askingPrice * 0.95)
        return res.status(400).json({ message: 'Insufficient budget' });

      await prisma.$transaction([
        prisma.team.update({
          where: { id: team.id },
          data: { budget: { decrement: player.askingPrice * 0.95 } },
        }),
        prisma.player.update({
          where: { id: player.id },
          data: { teamId: team.id, forSale: false, askingPrice: 0 },
        }),
      ]);

      res.status(200).json({ message: 'Player purchased successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error processing transaction' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
