import Container from "@/components/Container";
import Browse from "@/components/user/Browse";

export default function Home() {
  
  return (
    <Container>
      <Browse isDashboard={false} />
    </Container>
  );
}
