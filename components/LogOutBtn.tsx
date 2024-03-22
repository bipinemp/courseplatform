"use client";

import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const LogOutBtn = () => {
  return (
    <Button
      onClick={() => signOut()}
      className="flex w-full items-center gap-1 px-2 text-lg"
    >
      <LogOutIcon className="mr-2 h-[1.2rem] w-[1.2rem]" />
      <span>Logout</span>
    </Button>
  );
};

export default LogOutBtn;
