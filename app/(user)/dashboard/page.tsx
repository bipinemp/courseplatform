import Container from "@/components/Container";
import Browse from "@/components/user/Browse";
import React from "react";

const page = () => {
  return (
    <Container>
      <Browse isDashboard={true} />
    </Container>
  );
};

export default page;
