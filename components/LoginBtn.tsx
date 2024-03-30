"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

const LoginBtn = () => {
  const session = useSession();
  if (Boolean(session?.data?.user)) {
    return;
  }
  return (
    <Link href={"/login"}>
      <Button>Login</Button>
    </Link>
  );
};

export default LoginBtn;
