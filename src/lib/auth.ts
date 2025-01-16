import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const signToken = (userId: string) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1d" });

export function verifyToken(input: string | NextApiRequest | undefined) {
  if (!input) {
    return null; // No input provided
  }

  let token: string | undefined;

  // If input is a NextApiRequest, extract the Authorization header
  if (typeof input !== "string") {
    token = input.headers.authorization?.split(" ")[1];
  } else {
    token = input; // Input is already a token string
  }

  if (!token) {
    return null; // No token found
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // Token verification failed
  }
}
