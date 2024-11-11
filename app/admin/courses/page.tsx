import Container from "@/components/Container";
import CoursesList from "@/components/admin/CoursesList";

const page = () => {
  return (
    <Container>
      <div className="mt-32 md:ml-52">
        <CoursesList />
      </div>
    </Container>
  );
};

export default page;
