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
    const chartTransactions = await db.transaction.findMany({
      where: {
        status: "PAID",
      },
      select: {
        amount: true,
        course: {
          select: {
            title: true,
          },
        },
      },
    });

    const totalRevenue = chartTransactions.reduce(
      (acc, curr) => acc + parseInt(curr.amount),
      0,
    );

    const barData = chartTransactions.map((data) => ({
      amount: data.amount,
      course: data.course.title,
    }));

    return NextResponse.json(
      {
        message: "Fetched Analytics Successfully",
        sales: chartTransactions.length,
        totalRevenue,
        barData,
      },
      { status: 200 },
    );
  } catch (error) {}
}
