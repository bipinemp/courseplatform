import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.completedCourses.groupBy({
    by: ["userId"],
    _count: {
      userId: true,
    },
  });
  return NextResponse.json(data);
}
