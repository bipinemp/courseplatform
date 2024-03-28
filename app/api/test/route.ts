import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

interface Enrollment {
  course: {
    title: string;
  };
}

interface TransformedData {
  name: string;
  count: number;
}

export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({ session });
}
