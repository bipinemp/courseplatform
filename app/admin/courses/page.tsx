import Container from "@/components/Container";
import CoursesList from "@/components/admin/CoursesList";

const page = () => {
  return (
    <Container>
      <div className="ml-52 mt-32">
        <CoursesList />
      </div>
    </Container>
  );
};

export default page;
