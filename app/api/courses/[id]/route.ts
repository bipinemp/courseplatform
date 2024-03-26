import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismadb";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const course = await db.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        progress: true,
        questionsCount: true,
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
