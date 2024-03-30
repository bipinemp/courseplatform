import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  try {
    const course = await db.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        questionsCount: true,
        question: {
          select: {
            id: true,
            title: true,
            correctAnswer: true,
            answers: true,
          },
        },
        CourseProgress: {
          where: {
            userId: session?.id,
          },
        },
        enrollment: true,
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
