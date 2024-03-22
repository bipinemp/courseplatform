import Container from "@/components/Container";
import CoursesList from "@/components/admin/CoursesList";
import React from "react";

const page = () => {
  return (
    <Container>
      <div className="pl-52 pt-32">
        <CoursesList />
      </div>
    </Container>
  );
};

export default page;
