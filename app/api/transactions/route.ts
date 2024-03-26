import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!Boolean(session?.user) && session?.role !== "ADMIN") {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    const transactions = await db.transaction.findMany({
      select: {
        amount: true,
        status: true,
        user: {
          select: {
            email: true,
          },
        },
      },
      where: {
        // status: "PAID",
      },
    });

    return NextResponse.json(
      {
        message: "Transactions Fetched Successfully",
        transactions,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
