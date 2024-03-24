"use client";

import { useGetUserDetails } from "@/apis/queries";
import { CircleCheckBig, Clock } from "lucide-react";
import CoursesList from "./CoursesList";

interface BrowseProps {
  isDashboard?: boolean;
}

const Browse = ({ isDashboard }: BrowseProps) => {
  const { data, isPending } = useGetUserDetails();

  const progressCourses = data?.completedCourses.filter(
    (course) => parseInt(course.percentage) < 100,
  );

  const completedCourses = data?.completedCourses.filter(
    (course) => parseInt(course.percentage) === 100,
  );

  return (
    <div className="mb-20 flex flex-col gap-7 pl-52 pt-32">
      {isDashboard && (
        <div className="flex items-center gap-10">
          {progressCourses && (
            <div className="flex w-[250px] items-center gap-3 rounded-md border border-input py-3 pl-2 shadow">
              <span className="rounded-full bg-blue-500/20 p-2">
                <Clock className="h-9 w-9 text-blue-500" strokeWidth={3} />
              </span>
              <div className="flex flex-col justify-between">
                <h3 className="font-semibold text-gray-700">In Progress</h3>
                <p className="text-gray-600">
                  {progressCourses?.length}
                  {progressCourses?.length > 1 ? " Courses" : " Course"}
                </p>
              </div>
            </div>
          )}

          {completedCourses && (
            <div className="flex w-[250px] items-center gap-3 rounded-md border border-input py-3 pl-2 shadow">
              <span className="rounded-full bg-primary/20 p-2">
                <CircleCheckBig
                  className="h-9 w-9 text-primary"
                  strokeWidth={3}
                />
              </span>
              <div className="flex flex-col justify-between">
                <h3 className="font-semibold text-gray-700">Completed</h3>
                <p className="text-gray-600">
                  {completedCourses?.length}
                  {completedCourses?.length > 1 ? " Courses" : " Course"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <CoursesList />
    </div>
  );
};

export default Browse;
