"use client";

import { getAllCourses } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "./CourseCard";

const Browse = () => {
  const { data, isPending } = useQuery<Course[]>({
    queryKey: ["usercourses"],
    queryFn: getAllCourses,
  });

  return (
    <div className="flex flex-col gap-7 pl-52 pt-32">
      <h1 className="pl-2 font-black text-gray-600">Courses List</h1>
      <div className="flex flex-wrap gap-4">
        {data?.map((course) => <CourseCard key={course.id} data={course} />)}
      </div>
    </div>
  );
};

export default Browse;
