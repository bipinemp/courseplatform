import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!Boolean(session?.user)) {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    const course = await db.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        price: true,
        progress: true,
        question: {
          select: {
            id: true,
            title: true,
            correctAnswer: true,
            answers: true,
            progress: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: "No such Course Exists with that id" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Course Fetched Successfully", course },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something bad happened, Try again : ${error}` },
      { status: 400 },
    );
  }
}
