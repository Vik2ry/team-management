import prisma from "../lib/prisma";
import { Position } from "@prisma/client";
import Chance from 'chance';

const chance = new Chance();

export const createTeamInDatabase = async (userId: string) => {
  // Generate players
  const players = [];

  // 3 Goalkeepers
  for (let i = 0; i < 3; i++)
    players.push({
      name: chance.name(),
      position: Position.Goalkeeper,
      forSale: true,
      askingPrice: Math.floor(Math.random() * 1000000) + 1,
    });

  // 6 Defenders
  for (let i = 0; i < 6; i++)
    players.push({
      name: chance.name(),
      position: Position.Defender,
      forSale: true,
      askingPrice: Math.floor(Math.random() * 1000000) + 1,
    });

  // 6 Midfielders
  for (let i = 0; i < 6; i++)
    players.push({
      name: chance.name(),
      position: Position.Midfielder,
      forSale: true,
      askingPrice: Math.floor(Math.random() * 1000000) + 1,
    });

  // 5 Attackers
  for (let i = 0; i < 5; i++)
    players.push({
      name: chance.name(),
      position: Position.Attacker,
      forSale: true,
      askingPrice: Math.floor(Math.random() * 1000000) + 1,
    });

  // Create the team and players in the database
  const team = await prisma.team.create({
    data: {
      teamName: chance.company(),
      userId,
      budget: 5000000,
      players: {
        create: players,
      },
    },
    include: { players: true },
  });

  return team;
};
