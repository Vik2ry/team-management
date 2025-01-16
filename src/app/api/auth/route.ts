import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import { signToken } from "../../../lib/auth";
import teamQueue from "@/app/queues/teamQueues";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON body
    const { email, password } = body;

    console.log("Request Body:", body);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      const validPassword = await bcrypt.compare(password, existingUser.password);
      if (!validPassword) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }
      return NextResponse.json({ token: signToken(existingUser.id) }, { status: 200 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    await teamQueue.add({ userId: user.id });

    return NextResponse.json({ token: signToken(user.id) }, { status: 201 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "This is a GET method, but not implemented" }, { status: 405 });
}
