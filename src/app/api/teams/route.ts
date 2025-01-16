import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { verifyToken } from "../../../lib/auth";
import { positions } from "@/lib/constants";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const team = await prisma.team.findUnique({
    where: { userId: user.id },
    include: { players: true },
  });

  res.status(200).json(team);
}

export async function fetchRandomPlayers() {
    const players = [];
    for (const [position, count] of Object.entries(positions)) {
      for (let i = 0; i < count; i++) {
        const randomId = Math.floor(Math.random() * 2061) + 1;
        const { data: player } = await axios.get(
          `http://api.football-data.org/v4/teams/${randomId}`
        );
        players.push({ name: player.name, position, price: player.marketValue });
      }
    }
    return players;
  }