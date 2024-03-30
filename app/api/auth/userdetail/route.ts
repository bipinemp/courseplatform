import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    const userDetails = await db.user.findUnique({
      where: { id: session?.id },

      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json(
        { message: "No User Exists with that ID" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "User Data Fetched Successfully", userDetails },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong, Try again later Error: ${error}` },
      { status: 500 },
    );
  }
}
