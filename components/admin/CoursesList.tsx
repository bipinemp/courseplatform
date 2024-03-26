"use client";

import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { DataTable } from "@/app/admin/courses/_components/DataTable";
import { columns } from "@/app/admin/courses/_components/columns";
import { useQuery } from "@tanstack/react-query";
import { getAllAdminCourses } from "@/apis/apis";

const CoursesList = () => {
  const { data, isPending } = useQuery<Course[] | []>({
    queryKey: ["courseslist"],
    queryFn: getAllAdminCourses,
  });

  if (isPending) {
    return (
      <div className="ml-28 mt-14">
        <Loader2 className="size-28 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold underline underline-offset-4 opacity-85">
          Courses List
        </h1>
        <Link href={"/admin/courses/add_course"}>
          <Button className="flex items-center gap-3">
            <PlusCircle className="h-5 w-5" />
            Add Course
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={data || []} />
    </section>
  );
};

export default CoursesList;
