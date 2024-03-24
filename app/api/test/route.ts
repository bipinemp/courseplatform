import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  const courseQuestionsId = await db.course.findMany({
    where: {
      id: "2477a71e-a6da-4448-85ca-5ca7b7cff28f",
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

  // If the number of progress records matches the number of questions, all questions are completed

  const percentageCompleted =
    (progressRecords.length / questionIds.length) * 100;

  const completedQuestions = questionIds.filter((questionId) =>
    progressRecords.some((progress) => progress.questionId === questionId),
  ).length;
  return NextResponse.json({
    percentageCompleted,
    progressRecords,
    questionIds,
    completedQuestions,
  });
}
