import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

// GET request handler
export async function GET() {
  try {
    const players = await prisma.player.findMany({
      where: { forSale: true },
    });

    return NextResponse.json(players, { status: 200 });
  } catch (err) {
    console.error("Error fetching market data:", err);
    return NextResponse.json({ message: "Error fetching market data" }, { status: 500 });
  }
}

// POST request handler
export async function POST(req: Request) {
  try {
    const { playerId } = await req.json(); // Parse the request body
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    const user = verifyToken(token); // Verify the token

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if the player exists and is for sale
    const player = await prisma.player.findUnique({ where: { id: playerId } });
    if (!player || !player.forSale) {
      return NextResponse.json({ message: "Player not available" }, { status: 400 });
    }

    // Check if the user has a team and sufficient budget
    const team = await prisma.team.findUnique({
      where: { userId: (user as any).id },
    });
    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: 400 });
    }
    if (team.budget < player.askingPrice * 0.95) {
      return NextResponse.json({ message: "Insufficient budget" }, { status: 400 });
    }

    // Process the transaction
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

    return NextResponse.json({ message: "Player purchased successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error processing transaction:", err);
    return NextResponse.json({ message: "Error processing transaction" }, { status: 500 });
  }
}
