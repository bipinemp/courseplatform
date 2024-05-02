"use client";

import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const LogOutBtn = () => {
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={() => {
        signOut();
      }}
      className="-ml-[0.42rem] flex w-full justify-start gap-2 py-1"
    >
      <LogOutIcon className="size-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogOutBtn;
