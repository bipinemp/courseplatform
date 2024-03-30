"use client";

import { useGetUserDetails } from "@/apis/queries";
import { CircleCheckBig, Clock } from "lucide-react";
import CoursesList from "./CoursesList";
import Confetti from "react-confetti";

interface BrowseProps {
  isDashboard?: boolean;
}

const Browse = ({ isDashboard }: BrowseProps) => {
  const { data, isPending } = useGetUserDetails(true);

  const progressCourses = data?.CourseProgress?.filter(
    (course) => course.progress < 100,
  );

  const completedCourses = data?.CourseProgress?.filter(
    (course) => course.progress === 100,
  );

  return (
    <div className="mb-20 mt-32 flex flex-col items-center gap-7 md:ml-40 md:items-start lg:ml-52 2xl:-ml-14 2xl:w-full">
      {isDashboard && (
        <div className="flex w-full flex-wrap items-center justify-center gap-5 md:justify-start">
          {progressCourses && (
            <div className="flex min-h-[85px] w-full items-center gap-3 rounded-md border border-input py-3 pl-4 shadow md:w-[220px] lg:w-[270px]">
              <span className="rounded-full bg-blue-500/20 p-2">
                <Clock className="h-9 w-9 text-blue-500" strokeWidth={3} />
              </span>
              <div className="flex flex-col justify-between">
                <h2 className="text-[1rem] font-semibold lg:text-[1.5rem]">
                  In Progress
                </h2>
                <p className="text-[0.9rem] opacity-70 md:text-[1rem]">
                  {progressCourses?.length}
                  {progressCourses?.length > 1 ? " Courses" : " Course"}
                </p>
              </div>
            </div>
          )}

          {completedCourses && (
            <div className="flex min-h-[85px] w-full items-center gap-3 rounded-md border border-input py-3 pl-4 shadow md:w-[220px] lg:w-[270px]">
              <span className="rounded-full bg-primary/20 p-2">
                <CircleCheckBig
                  className="h-9 w-9 text-primary"
                  strokeWidth={3}
                />
              </span>
              <div className="flex flex-col justify-between">
                <h2 className="text-[1rem] font-semibold lg:text-[1.5rem]">
                  Completed
                </h2>
                <p className="text-[0.9rem] opacity-70 md:text-[1rem]">
                  {completedCourses?.length}
                  {completedCourses?.length > 1 ? " Courses" : " Course"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <CoursesList isDashboard={isDashboard} />
    </div>
  );
};

export default Browse;
