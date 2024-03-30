import { db } from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pidx = searchParams.get("pidx");
  const txnId = searchParams.get("txnId");
  const amount = searchParams.get("amount");
  const purchase_order_id = searchParams.get("purchase_order_id");
  const transaction_id = searchParams.get("transaction_id");
  const status = searchParams.get("status");

  try {
    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      { headers },
    );

    if (response.data.status !== "Completed") {
      return NextResponse.json({ message: "Payment Failed" }, { status: 400 });
    }

    const transaction = await db.transaction.findUnique({
      where: { id: purchase_order_id?.toString() },
      select: {
        id: true,
        courseId: true,
        userId: true,
        status: true,
        transactionCode: true,
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "No Such Transaction Exists" },
        { status: 400 },
      );
    }

    await db.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: "PAID",
        transactionCode: pidx?.toString(),
      },
    });

    const enrollmentExits = await db.enrollment.findFirst({
      where: {
        userId: transaction.userId,
        courseId: transaction.courseId,
      },
    });

    if (!enrollmentExits) {
      await db.enrollment.create({
        data: {
          userId: transaction.userId,
          courseId: transaction.courseId,
        },
      });
    }

    return NextResponse.redirect(
      `http://localhost:3000/courses/${transaction?.courseId}`,
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong, Try again Later" },
      { status: 500 },
    );
  }
}
