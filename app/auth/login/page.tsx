import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Container from "@/components/Container";
import LoginBtn from "@/components/auth/LoginBtn";

const Page: React.FC = () => {
  return (
    <Container>
      <div className="mx-auto mt-20 flex min-h-[200px] max-w-[400px] flex-col gap-10">
        <Link
          href="/"
          className="flex items-center font-semibold text-gray-600"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Home
        </Link>
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-black tracking-wide">Welcome back</h1>
          <p className="text-center text-[0.9rem] tracking-wide text-gray-600">
            By continuing, you are setting up a Writz account and agree to our
            User Agreement and Privacy Policy.
          </p>
          <LoginBtn />
        </div>
      </div>
    </Container>
  );
};

export default Page;
