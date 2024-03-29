import React from "react";
import Container from "./Container";
import { Loader2 } from "lucide-react";

interface Props {
  alreadyMargin?: boolean;
}

// 13 8
const GlobalLoading = ({ alreadyMargin }: Props) => {
  return (
    <>
      {alreadyMargin ? (
        <Container>
          <div className="mx-auto ml-[23rem] mt-[15rem]">
            <Loader2 className="size-28 animate-spin text-primary" />
          </div>
        </Container>
      ) : (
        <Container>
          <div className="mx-auto ml-[40rem] mt-[15rem]">
            <Loader2 className="size-28 animate-spin text-primary" />
          </div>
        </Container>
      )}
    </>
  );
};

export default GlobalLoading;
