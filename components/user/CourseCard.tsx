"use client";

import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  data: Course;
}

const CourseCard = ({
  data: { id, price, description, questionsCount, title },
}: Props) => {
  const router = useRouter();

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
      className="flex w-[320px] cursor-pointer flex-col gap-3 rounded-md border border-input px-5 py-4 shadow-md transition hover:border-primary hover:bg-zinc-100"
    >
      <h2 className="font-semibold text-gray-700 underline underline-offset-4">
        {title}
      </h2>
      <div className="flex items-center gap-2 text-gray-700">
        <BookOpen className="h-5 w-5" />
        <p>
          {questionsCount} {questionsCount > 1 ? "Questions" : "Question"}
        </p>
      </div>

      <p className="font-semibold text-gray-600">{formattedPrice}</p>

      <p className="text-gray-600">{formattedDescription}</p>
    </div>
  );
};

export default CourseCard;
