"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <Container>
      <div className="mb-20 mt-44 flex flex-col items-center gap-y-5 md:ml-40 lg:ml-52 2xl:-ml-14 2xl:w-full">
        <h1 className="text-center text-[1.2rem] font-black text-red-500 opacity-80 ssm:text-[2rem]">
          Oops Something went wrong :(
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-5">
          <Button
            variant={"destructive"}
            size={"lg"}
            className="text-sm font-bold ssm:text-lg"
            onClick={reset}
          >
            Try Again
          </Button>
          <Button
            variant={"default"}
            size={"lg"}
            className="text-sm font-bold ssm:text-lg"
          >
            Go To Home
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default error;
