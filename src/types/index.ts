export type User = {
  id: string;
  email: string;
  password?: string;
  team: Team;
};

export interface Player {
  id: string
  teamId: string
  name: string
  position: Position
  askingPrice: number
  forSale: boolean
  value: number | null
  rating: number
  // Outfield player stats
  pace?: number | null
  shooting?: number | null
  passing?: number | null
  dribbling?: number | null
  defending?: number | null
  physical?: number | null
  // Goalkeeper stats
  diving?: number | null
  handling?: number | null
  kicking?: number | null
  reflexes?: number | null
  speed?: number | null
  positioning?: number | null
}

export interface Team {
  id: string
  userId: string
  teamName: string
  budget: number
  players: Player[]
}

export type Position = "GK" | "DEF" | "MID" | "FWD" | "Goalkeeper" | "Defender" | "Midfielder" | "Attacker";

// Helper function to map Prisma Position enum to frontend position type
export const mapPosition = (position: string): Position => {
  switch (position) {
    case "Goalkeeper":
      return "GK";
    case "Defender":
      return "DEF";
    case "Midfielder":
      return "MID";
    case "Attacker":
      return "FWD";
    default:
      return "GK";
  }
};
