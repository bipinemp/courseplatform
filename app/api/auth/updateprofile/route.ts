import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismadb";

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const session = await getServerSession(authOptions);

  if (!Boolean(session?.user)) {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    const userExists = await db.user.findUnique({ where: { id: session?.id } });

    if (!userExists) {
      return NextResponse.json(
        { message: "User doesn't Exists" },
        { status: 400 },
      );
    }

    await db.user.update({
      where: {
        id: userExists.id,
      },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    return NextResponse.json(
      { message: "Profile Updated Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
