import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { progress, courseId, completedQuestions, totalQuestions } =
    await req.json();

  if (!Boolean(session?.user)) {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    let courseProgress = await db.courseProgress.findUnique({
      where: {
        courseId_userId: {
          courseId,
          userId: session?.id || "",
        },
      },
    });

    if (!courseProgress) {
      courseProgress = await db.courseProgress.create({
        data: {
          userId: session?.id || "",
          courseId,
          progress: progress,
          totalQuestions,
          completedQuestions,
        },
      });
    } else {
      await db.courseProgress.update({
        where: {
          id: courseProgress.id,
        },
        data: {
          progress,
          completedQuestions,
        },
      });
    }

    return NextResponse.json({ message: "Progress Updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Something bad happened, Try again : ${error}` },
      { status: 400 },
    );
  }
}
