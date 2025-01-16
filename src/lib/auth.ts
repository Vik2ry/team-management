import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const signToken = (userId: string) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string };
  } catch {
    return null;
  }
};
