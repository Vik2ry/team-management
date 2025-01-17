import prisma from "../lib/prisma";
import { Position } from "@prisma/client";
import Chance from 'chance';

const chance = new Chance();

// Helper function to generate random stat between min and max
const generateStat = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper function to generate goalkeeper stats
const generateGoalkeeperStats = () => ({
  diving: generateStat(60, 90),
  handling: generateStat(60, 90),
  kicking: generateStat(60, 90),
  reflexes: generateStat(60, 90),
  speed: generateStat(40, 70),
  positioning: generateStat(60, 90),
  rating: generateStat(65, 85)
});

// Helper function to generate outfield player stats
const generateOutfieldStats = (position: Position) => {
  const baseStats = {
    pace: generateStat(60, 90),
    shooting: generateStat(60, 90),
    passing: generateStat(60, 90),
    dribbling: generateStat(60, 90),
    defending: generateStat(60, 90),
    physical: generateStat(60, 90),
  };

  // Adjust stats based on position
  switch (position) {
    case Position.Defender:
      baseStats.defending = generateStat(70, 90);
      baseStats.physical = generateStat(70, 90);
      break;
    case Position.Midfielder:
      baseStats.passing = generateStat(70, 90);
      baseStats.dribbling = generateStat(70, 90);
      break;
    case Position.Attacker:
      baseStats.shooting = generateStat(70, 90);
      baseStats.pace = generateStat(70, 90);
      break;
  }

  return {
    ...baseStats,
    rating: generateStat(65, 85)
  };
};

// Default players with stats
const defaultPlayers = [
  {
    name: "Manuel Neuer",
    position: Position.Goalkeeper,
    forSale: false,
    askingPrice: 2000000,
    value: 2000000,
    ...generateGoalkeeperStats(),
    rating: 88
  },
  {
    name: "Virgil van Dijk",
    position: Position.Defender,
    forSale: false,
    askingPrice: 3000000,
    value: 3000000,
    ...generateOutfieldStats(Position.Defender),
    rating: 89
  },
  {
    name: "Kevin De Bruyne",
    position: Position.Midfielder,
    forSale: false,
    askingPrice: 3500000,
    value: 3500000,
    ...generateOutfieldStats(Position.Midfielder),
    rating: 91
  },
  {
    name: "Erling Haaland",
    position: Position.Attacker,
    forSale: false,
    askingPrice: 4000000,
    value: 4000000,
    ...generateOutfieldStats(Position.Attacker),
    rating: 90
  }
];

export const createTeamInDatabase = async (userId: string) => {
  // Get team name from existing user if available
  const existingTeam = await prisma.team.findUnique({
    where: { userId }
  });
  
  const teamName = existingTeam?.teamName || chance.company();

  // Generate players
  const players = [...defaultPlayers];

  // Generate remaining players to reach required count
  const remainingGoalkeepers = 2;
  const remainingDefenders = 5;
  const remainingMidfielders = 5;
  const remainingAttackers = 4;

  // Add remaining Goalkeepers
  for (let i = 0; i < remainingGoalkeepers; i++) {
    players.push({
      name: chance.name(),
      position: Position.Goalkeeper,
      forSale: true,
      askingPrice: Math.floor(Math.random() * 1000000) + 500000,
      value: Math.floor(Math.random() * 1000000) + 500000,
      ...generateGoalkeeperStats()
    });
  }

  // Add remaining Defenders
  for (let i = 0; i < remainingDefenders; i++) {
    players.push({
      name: chance.name(),
      position: Position.Defender,
      forSale: true,
      askingPrice: Math.floor(Math.random() * 1000000) + 500000,
      value: Math.floor(Math.random() * 1000000) + 500000,
      ...generateOutfieldStats(Position.Defender)
    });
  }

  // Add remaining Midfielders
  for (let i = 0; i < remainingMidfielders; i++) {
    players.push({
      name: chance.name(),
      position: Position.Midfielder,
      forSale: true,
      askingPrice: Math.floor(Math.random() * 1000000) + 500000,
      value: Math.floor(Math.random() * 1000000) + 500000,
      ...generateOutfieldStats(Position.Midfielder)
    });
  }

  // Add remaining Attackers
  for (let i = 0; i < remainingAttackers; i++) {
    players.push({
      name: chance.name(),
      position: Position.Attacker,
      forSale: true,
      askingPrice: Math.floor(Math.random() * 1000000) + 500000,
      value: Math.floor(Math.random() * 1000000) + 500000,
      ...generateOutfieldStats(Position.Attacker)
    });
  }

  // Create the team and players in the database
  const team = await prisma.team.create({
    data: {
      teamName,
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

