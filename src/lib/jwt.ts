
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.AUTH_SECRET!;

if (!JWT_SECRET) {
  throw new Error("AUTH_SECRET is missing");
}

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}