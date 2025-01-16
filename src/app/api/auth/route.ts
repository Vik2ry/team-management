import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import { signToken } from "../../../lib/auth";
import { fetchRandomPlayers } from "../teams/route";
import teamQueue from "@/app/queues/teamQueues";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  console.log("email", email);
  

  if (req.method === "POST") {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      const validPassword = await bcrypt.compare(password, existingUser.password);
      if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

      return res.status(200).json({ token: signToken(existingUser.id) });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const playersSet = fetchRandomPlayers();
    const user = await prisma.user.create({
      data: { email, password: hashedPassword
        // , team: { create: { budget: 5000000 } } 
    },
    });

    await teamQueue.add({ userId: user.id });

    return res.status(201).json({ token: signToken(user.id) });
  }

  res.status(405).json({ error: "Method not allowed" });
}
