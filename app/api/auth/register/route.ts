import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  const userExists = await db.user.findUnique({ where: { email } });

  if (userExists) {
    return NextResponse.json(
      { message: "User Already Exists" },
      { status: 400 },
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User Registered Successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, Try agian later" },
      { status: 500 },
    );
  }
}
