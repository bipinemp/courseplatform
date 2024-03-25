import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { name, price, id } = await req.json();
  const session = await getServerSession(authOptions);

  try {
    const transaction = await db.transaction.create({
      data: {
        amount: price.toString(),
        courseId: id,
        userId: session?.id || "",
        transactionCode: "",
      },
    });

    const formData = {
      return_url: process.env.KHALTI_CALLBACK,
      website_url: process.env.BASE_URL,
      amount: price * 100,
      purchase_order_id: transaction.id,
      purchase_order_name: name,
    };

    const headers = {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      formData,
      {
        headers,
      },
    );

    return NextResponse.json({
      message: "Khalti Payment Initiate",
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong Error: ${error}` },
      { status: 500 },
    );
  }
}
