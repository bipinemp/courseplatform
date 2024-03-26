"use client";

import { getAllCourses } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CourseCard from "./CourseCard";
import { useGetUserDetails } from "@/apis/queries";
import UserBrowseLoading from "../UserBrowseLoading";
import UserDashboardLoading from "../UserDashboardLoading";
import { useSearchParams } from "next/navigation";

interface CourseListProps {
  isDashboard?: boolean;
}
const CoursesList = ({ isDashboard }: CourseListProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const { data, isPending } = useQuery<Course[]>({
    queryKey: ["usercourses", query],
    queryFn: () => getAllCourses(query || ""),
    enabled: !isDashboard,
  });

  const { data: UserDetail, isPending: DashBoardListPending } =
    useGetUserDetails(isDashboard || false);

  if (isDashboard ? DashBoardListPending : isPending) {
    return isDashboard ? <UserDashboardLoading /> : <UserBrowseLoading />;
  }

  if (data?.length === 0) {
    return (
      <h1 className="font-semibold text-destructive">No Courses Available</h1>
    );
  }

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
