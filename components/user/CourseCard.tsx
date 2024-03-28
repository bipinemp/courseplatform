"use client";

import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useGetUserDetails } from "@/apis/queries";

interface Props {
  data: Course;
}

const CourseCard = ({ data }: Props) => {
  const router = useRouter();
  const { id, price, description, questionsCount, title } = data;

  const { data: UserDetail } = useGetUserDetails(true);

  const [percentage, setPercentage] = useState<string>("");
  const [isCoursePurchased, setIsCoursePurchased] = useState<boolean>(
    !UserDetail
      ? false
      : UserDetail?.enrollment?.some(
          (enrollment) => enrollment.course.id === data?.id,
        ) || false,
  );

  useEffect(() => {
    const courseCompletePercentage = UserDetail?.CourseProgress?.find(
      (progress) => progress.courseId === data?.id,
    )?.progress.toString();

    if (courseCompletePercentage) {
      setPercentage(courseCompletePercentage.split(".")[0]);
    }

    const isPurchased = UserDetail?.enrollment?.some(
      (enrollment) => enrollment.course.id === data?.id,
    );
    setIsCoursePurchased(isPurchased || false);
  }, [data, UserDetail]);

  const formattedPrice = new Intl.NumberFormat(undefined).format(price);

  const formattedDescription =
    description.length > 35
      ? description.substring(0, 35) + "..."
      : description;

  return (
    <div
      onClick={() => router.push(`/courses/${id}`)}
      className="flex h-[250px] w-[320px] cursor-pointer flex-col justify-between rounded-md border border-input px-5 py-4 shadow-md transition hover:border-primary hover:bg-zinc-100 dark:hover:bg-neutral-900"
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

      <p className="opacity-80">{formattedDescription}</p>

      {!isCoursePurchased && percentage === "0" && (
        <p className="font-semibold">Rs. {formattedPrice}</p>
      )}

      {isCoursePurchased && percentage === "0" && (
        <div className="flex flex-col gap-2 font-semibold text-blue-500">
          <Progress
            value={0}
            className="h-[10px]"
            indicatorColor="bg-blue-500"
          />
          <p className="pl-1">0% Completed</p>
        </div>
      )}
      {parseInt(percentage) > 0 && (
        <div
          className={cn("flex flex-col gap-2 font-semibold", {
            "text-blue-500": percentage !== "0",
            "text-green-500": percentage === "100",
          })}
        >
          <Progress
            value={parseInt(percentage)}
            className="h-[10px]"
            indicatorColor={cn("", {
              "bg-blue-500": percentage !== "100",
              "bg-green-500": percentage === "100",
            })}
          />
          <p className="pl-1">
            {percentage === "100"
              ? "100% completed"
              : `${percentage}% completed`}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
