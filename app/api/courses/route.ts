import { CourseSchema } from "@/schemas/courseType";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prismadb";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const session = await getServerSession(authOptions);

  if (!Boolean(session?.user) && session?.role !== "ADMIN") {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }

  try {
    const userDetails = await db.user.findUnique({
      where: { id: session?.id },
    });

    if (!userDetails) {
      return NextResponse.json(
        { message: "User doesn't Exist" },
        { status: 400 },
      );
    }

    const parsedData = CourseSchema.parse(data);
    const { title, description, price, questions } = parsedData;

    const course = await db.course.create({
      data: {
        title,
        description,
        price: parseInt(price),
        questionsCount: questions.length,
        question: {
          create: questions.map((question) => ({
            title: question.title,
            correctAnswer: question.correctAnswer || "",
            answers: {
              create: question.answers.map((answer) => ({
                title: answer.title,
              })),
            },
          })),
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Course Created Successfully" },
      { status: 201 },
    );
  } catch (error) {
    // Handling Validation error using zod
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: `Something bad happened, Try again : ${error}` },
      { status: 400 },
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  // if (!Boolean(session?.user)) {
  //   return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  // }
  try {
    let courses;
    if (query === "" || query === null || !query) {
      courses = await db.course.findMany();
    } else {
      courses = await db.course.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    }

    return NextResponse.json(
      { message: "Courses List Fetched Successfully", courses },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something bad happened, Try again : ${error}` },
      { status: 400 },
    );
  }
}
