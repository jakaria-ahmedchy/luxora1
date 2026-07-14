import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    return NextResponse.json({
      success: true,
      user: decoded,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid Token" },
      { status: 401 }
    );
  }
}