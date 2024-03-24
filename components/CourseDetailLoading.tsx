import Container from "./Container";
import { Loader2 } from "lucide-react";

const CourseDetailLoading = () => {
  return (
    <Container>
      <div className="ml-[28rem] mt-52">
        <Loader2 className="h-24 w-24 animate-spin text-primary" />
      </div>
    </Container>
  );
};

export default CourseDetailLoading;
