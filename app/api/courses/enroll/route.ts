import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const { courseId } = await req.json();

  const session = await getServerSession(authOptions);

  if (!Boolean(session?.user)) {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    const enrollmentExits = await db.enrollment.findFirst({
      where: {
        userId: session?.id,
        courseId,
      },
    });

    if (enrollmentExits) {
      return NextResponse.json(
        { message: "Course Already Enrolled" },
        { status: 400 },
      );
    }

    const enrollment = await db.enrollment.create({
      data: {
        userId: session?.id || "",
        courseId,
      },
    });

    if (!enrollment) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Course Enrolled Successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something bad happened, Try again : ${error}` },
      { status: 400 },
    );
  }
}
