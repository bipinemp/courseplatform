import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userDetails = await db.user.findUnique({ where: { id: session?.id } });
  return NextResponse.json({ userDetails });
}
