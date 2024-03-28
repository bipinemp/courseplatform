import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
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
          progress: progress * 100,
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

// import { getServerSession } from "next-auth/next";
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/prismadb";
// import { authOptions } from "../../auth/[...nextauth]/route";

// export async function POST(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const { questionId, courseId } = await req.json();

//   if (!Boolean(session?.user)) {
//     return NextResponse.json({ message: "Access Denied" }, { status: 401 });
//   }

//   try {
//     const progressExists = await db.progress.findFirst({
//       where: {
//         userId: session?.id || "",
//         questionId,
//         courseId,
//       },
//     });

//     console.log("ProgressExists: ", progressExists);

//     if (progressExists) {
//       return NextResponse.json(
//         { message: "Already Added To Progress" },
//         { status: 400 },
//       );
//     }

//     const progress = await db.progress.create({
//       data: {
//         userId: session?.id || "",
//         questionId,
//         courseId,
//       },
//     });

//     console.log("progress: ", progress);

//     if (!progress) {
//       return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
//     }

//     const courseQuestionsId = await db.course.findMany({
//       where: {
//         id: courseId,
//       },
//       select: {
//         question: {
//           select: {
//             id: true,
//           },
//         },
//       },
//     });

//     console.log("courseQuestionsId: ", courseQuestionsId);

//     // Extract question IDs from the response
//     const questionIds = courseQuestionsId
//       .map((course) => course.question.map((q) => q.id))
//       .flat();

//     // Check if there is progress for all questions
//     const progressRecords = await db.progress.findMany({
//       where: {
//         userId: session?.id || "",
//         questionId: {
//           in: questionIds,
//         },
//       },
//     });

//     console.log("progressRecords: ", progressRecords);

//     const completedQuestions = questionIds.filter((questionId) =>
//       progressRecords.some((progress) => progress.questionId === questionId),
//     ).length;

//     console.log("completedQuestions: ", completedQuestions);

//     const percentageCompleted = (completedQuestions / questionIds.length) * 100;

//     console.log("percentageCompleted: ", percentageCompleted);

//     const doesCourseExitsInUser =
//       session?.completedCourses.length === 0
//         ? false
//         : session?.completedCourses.some(
//             (course) => course.courseId === courseId,
//           );

//     console.log("session: ", session);

//     const completedCourseDetails = session?.completedCourses.find(
//       (course) => course.courseId === courseId,
//     );

//     console.log("completedCourseDetails: ", completedCourseDetails);

//     if (doesCourseExitsInUser) {
//       await db.user.update({
//         where: {
//           id: session?.id || "",
//         },
//         data: {
//           completedCourses: {
//             update: {
//               where: {
//                 id: completedCourseDetails?.id,
//                 courseId: courseId,
//                 userId: session?.id || "",
//               },
//               data: {
//                 percentage: percentageCompleted.toString(),
//               },
//             },
//           },
//         },
//       });
//     } else {
//       await db.user.update({
//         where: {
//           id: session?.id,
//         },
//         data: {
//           completedCourses: {
//             create: {
//               percentage: percentageCompleted.toString(),
//               courseId: courseId,
//             },
//           },
//         },
//       });
//     }

//     return NextResponse.json(
//       { message: "Course Fetched Successfully" },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: `Something bad happened, Try again : ${error}` },
//       { status: 400 },
//     );
//   }
// }
