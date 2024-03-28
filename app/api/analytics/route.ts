import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { db } from "@/lib/prismadb";

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

    const enrollments = await db.enrollment.findMany({
      select: {
        course: {
          select: {
            title: true,
          },
        },
      },
    });

    const piechartData: TransformedData[] = enrollments.reduce(
      (result: TransformedData[], enrollment: Enrollment) => {
        const existingIndex = result.findIndex(
          (item) => item.name === enrollment.course.title,
        );

        if (existingIndex !== -1) {
          result[existingIndex].count++;
        } else {
          result.push({
            name: enrollment.course.title,
            count: 1,
          });
        }

        return result;
      },
      [],
    );

    return NextResponse.json(
      {
        message: "Fetched Analytics Successfully",
        sales: chartTransactions.length,
        totalRevenue,
        barData,
        piechartData,
      },
      { status: 200 },
    );
  } catch (error) {}
}
