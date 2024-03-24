"use client";

import { getAllCourses } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CourseCard from "./CourseCard";
import { useGetUserDetails } from "@/apis/queries";

interface CourseListProps {
  isDashboard?: boolean;
}
const CoursesList = ({ isDashboard }: CourseListProps) => {
  const { data, isPending } = useQuery<Course[]>({
    queryKey: ["usercourses"],
    queryFn: getAllCourses,
    enabled: !isDashboard,
  });

  const { data: UserDetail, isPending: DashBoardListPending } =
    useGetUserDetails();

  return (
    <div className="flex flex-wrap gap-4">
      {isDashboard ? (
        <>
          {UserDetail?.enrollment?.map((course) => (
            <CourseCard key={course.course.id} data={course.course} />
          ))}
        </>
      ) : (
        <>
          {data?.map((course) => <CourseCard key={course.id} data={course} />)}
        </>
      )}
    </div>
  );
};

export default CoursesList;
