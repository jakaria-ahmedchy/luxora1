import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.AUTH_SECRET!;

export interface JwtPayload {
  id: string;
  role: string;
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}