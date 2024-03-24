"use client";

import { getAllCourses } from "@/apis/apis";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CourseCard from "./CourseCard";

const CoursesList = () => {
  const { data, isPending } = useQuery<Course[]>({
    queryKey: ["usercourses"],
    queryFn: getAllCourses,
  });

  return (
    <div className="flex flex-wrap gap-4">
      {data?.map((course) => <CourseCard key={course.id} data={course} />)}
    </div>
  );
};

export default CoursesList;
