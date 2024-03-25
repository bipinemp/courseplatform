import Container from "@/components/Container";
import CoursesList from "@/components/admin/CoursesList";

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
