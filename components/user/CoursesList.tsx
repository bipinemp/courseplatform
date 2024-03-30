"use client";

import { getAllCourses } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
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

  if (!isDashboard && data?.length === 0) {
    return (
      <h1 className="pl-4 font-semibold text-red-500">No Courses Available</h1>
    );
  }

  if (isDashboard && UserDetail?.enrollment?.length === 0) {
    return (
      <h1 className="pl-4 font-semibold text-red-500">No Courses Purchased</h1>
    );
  }

  return (
    <div className="ssm:grid-cols-2 grid w-full grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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
