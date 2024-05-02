import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container>
      <div className="mb-20 mt-44 flex flex-col items-center gap-y-5 md:ml-40 lg:ml-52 2xl:-ml-14 2xl:w-full">
        <h1 className="text-center text-[1.2rem] font-black text-red-500 opacity-80 ssm:text-[2rem]">
          Not Found :(
        </h1>
        <p className="text-center">Could not find requested resource</p>
        <Link href="/">
          <Button
            variant={"destructive"}
            size={"lg"}
            className="text-sm font-bold ssm:text-lg"
          >
            Return Home
          </Button>
        </Link>
      </div>
    </Container>
  );
}
