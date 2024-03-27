import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/prismadb";
import { TCourse } from "@/schemas/courseType";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const data: EditCourseDetails = await req.json();

  if (!Boolean(session?.user) && session?.role !== "ADMIN") {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    const isCourseExists = await db.course.findUnique({ where: { id } });

    if (!isCourseExists) {
      return NextResponse.json(
        { message: "Course Doesn't Exists with that ID" },
        { status: 400 },
      );
    }

    await db.course.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        price: parseInt(data.price),
        questionsCount: data.questions.length,
      },
    });

    // Update or create questions and answers
    await Promise.all(
      data.questions.map(async (questionData) => {
        if (!questionData.id) {
          // Create new question and its answers
          await db.question.create({
            data: {
              title: questionData.title,
              correctAnswer: questionData.correctAnswer.toString(),
              courseId: id,
              answers: {
                createMany: {
                  data: questionData.answers.map((answer) => ({
                    title: answer.title,
                  })),
                },
              },
            },
          });
        } else {
          // Update existing question and its answers
          await db.question.update({
            where: { id: questionData.id },
            data: {
              title: questionData.title,
              correctAnswer: questionData.correctAnswer.toString(),
              answers: {
                // Delete old answers and create new ones
                deleteMany: {},
                createMany: {
                  data: questionData.answers.map((answer) => ({
                    title: answer.title,
                  })),
                },
              },
            },
          });
        }
      }),
    );

    return NextResponse.json(
      { message: "Course Updated Successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 },
    );
  }
}
