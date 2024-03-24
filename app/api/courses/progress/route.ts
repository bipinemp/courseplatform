import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { questionId, courseId } = await req.json();

  if (typeof questionId !== "string" || typeof courseId !== "string") {
    return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
  }

  if (!Boolean(session?.user)) {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    const progressExists = await db.progress.findFirst({
      where: {
        userId: session?.id || "",
        questionId,
        courseId,
      },
    });

    if (progressExists) {
      return NextResponse.json(
        { message: "Already Added To Progress" },
        { status: 400 },
      );
    }

    const progress = await db.progress.create({
      data: {
        userId: session?.id || "",
        questionId,
        courseId,
      },
    });

    if (!progress) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }

    const courseQuestionsId = await db.course.findMany({
      where: {
        id: courseId,
      },
      select: {
        question: {
          select: {
            id: true,
          },
        },
      },
    });

    // Extract question IDs from the response
    const questionIds = courseQuestionsId
      .map((course) => course.question.map((q) => q.id))
      .flat();

    // Check if there is progress for all questions
    const progressRecords = await db.progress.findMany({
      where: {
        questionId: {
          in: questionIds,
        },
      },
    });

    const completedQuestions = questionIds.filter((questionId) =>
      progressRecords.some((progress) => progress.questionId === questionId),
    ).length;

    const percentageCompleted = (completedQuestions / questionIds.length) * 100;

    const doesCourseExitsInUser = session?.completedCourses.some(
      (course) => course.courseId === courseId,
    );

    const completedCourseDetails = session?.completedCourses.find(
      (course) => course.courseId === courseId,
    );

    if (doesCourseExitsInUser) {
      await db.user.update({
        where: {
          id: session?.id,
        },
        data: {
          completedCourses: {
            update: {
              where: {
                id: completedCourseDetails?.id,
                courseId: courseId,
              },
              data: {
                percentage: percentageCompleted.toString(),
              },
            },
          },
        },
      });
    } else {
      await db.user.update({
        where: {
          id: session?.id,
        },
        data: {
          completedCourses: {
            create: {
              percentage: percentageCompleted.toString(),
              courseId: courseId,
            },
          },
        },
      });
    }

    return NextResponse.json(
      { message: "Course Fetched Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something bad happened, Try again : ${error}` },
      { status: 400 },
    );
  }
}
