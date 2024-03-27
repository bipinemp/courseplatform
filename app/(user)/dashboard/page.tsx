import Container from "@/components/Container";
import Browse from "@/components/user/Browse";

const page = () => {
  return (
    <Container>
      <Browse isDashboard={true} />
    </Container>
  );
};

export default page;
