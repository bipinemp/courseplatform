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
