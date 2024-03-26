"use client";

import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import { useGetUserDetails } from "@/apis/queries";

interface Props {
  data: Course;
}

const CourseCard = ({ data }: Props) => {
  const router = useRouter();
  const { id, price, description, questionsCount, title } = data;

  const { data: UserDetail } = useGetUserDetails(true);

  const [courseDetails, setCourseDetails] = useState<CompletedCourse>();
  const [isCoursePurchased, setIsCoursePurchased] = useState<boolean>(
    UserDetail?.enrollment?.some(
      (enrollment) => enrollment.course.id === data?.id,
    ) || false,
  );

  useEffect(() => {
    const updatedCourseDetails = UserDetail?.completedCourses?.find(
      (course) => course.courseId === id,
    );
    setCourseDetails(updatedCourseDetails);

    const isPurchased = UserDetail?.enrollment?.some(
      (enrollment) => enrollment.course.id === data?.id,
    );
    setIsCoursePurchased(isPurchased || false);
  }, [data, UserDetail]);

  const formattedPrice = new Intl.NumberFormat("np", {
    style: "currency",
    currency: "NPR",
  }).format(price);

  const formattedDescription =
    description.length > 35
      ? description.substring(0, 35) + "..."
      : description;

  return (
    <div
      onClick={() => router.push(`/courses/${id}`)}
      className="flex min-h-[190px] w-[320px] cursor-pointer flex-col gap-5 rounded-md border border-input px-5 py-4 shadow-md transition hover:border-primary hover:bg-zinc-100 dark:hover:bg-neutral-800"
    >
      <h2 className="font-semibold underline underline-offset-4">{title}</h2>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-primary/20 p-2">
          <BookOpen className="h-5 w-5" />
        </span>
        <p>
          {questionsCount} {questionsCount > 1 ? "Questions" : "Question"}
        </p>
      </div>

      <p className="font-semibold">{formattedPrice}</p>

      <p className="opacity-80">{formattedDescription}</p>
      {isCoursePurchased && !courseDetails?.percentage && (
        <div className="flex flex-col gap-2 font-semibold text-blue-500">
          <Progress
            value={0}
            className="h-[10px]"
            indicatorColor="bg-blue-500"
          />
          <p className="pl-1">0% Completed</p>
        </div>
      )}
      {courseDetails?.percentage && (
        <div
          className={cn("flex flex-col gap-2 font-semibold", {
            "text-blue-500": courseDetails?.percentage !== "100",
            "text-green-500": courseDetails?.percentage === "100",
          })}
        >
          <Progress
            value={parseInt(courseDetails?.percentage)}
            className="h-[10px]"
            indicatorColor={cn("", {
              "bg-blue-500": courseDetails?.percentage !== "100",
              "bg-green-500": courseDetails?.percentage === "100",
            })}
          />
          <p className="pl-1">
            {courseDetails?.percentage === "100%"
              ? "100% completed"
              : `${courseDetails?.percentage}% completed`}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
