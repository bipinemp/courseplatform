"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { DataTable } from "@/app/admin/courses/_components/DataTable";
import { columns } from "@/app/admin/courses/_components/columns";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "@/apis/apis";

const CoursesList = () => {
  const { data, isPending } = useQuery({
    queryKey: ["courseslist"],
    queryFn: getAllCourses,
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3>Search Course</h3>
        <Link href={"/admin/courses/add_course"}>
          <Button className="flex items-center gap-3">
            <PlusCircle className="h-5 w-5" />
            Add Course
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        <h1>Courses List</h1>
        <DataTable columns={columns} data={data?.courses} />
      </div>
    </section>
  );
};

export default CoursesList;
