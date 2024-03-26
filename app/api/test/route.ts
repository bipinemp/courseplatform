import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.transaction.findMany({
    select: {
      amount: true,
      status: true,
      user: {
        select: {
          email: true,
        },
      },
    },
  });
  return NextResponse.json(data);
}
