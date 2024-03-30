"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LogOutBtn from "./LogOutBtn";
import AdminModeWrapper from "./admin/AdminModeWrapper";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const ProfileDropDown = () => {
  const session = useSession();

  if (!Boolean(session?.data?.user)) {
    return;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="relative h-[40px] w-[40px] cursor-pointer">
          {session?.data?.user?.image ? (
            <Image
              fill
              src={session?.data.user.image}
              alt=""
              className="h-[40px] w-[40px] rounded-full bg-gray-400"
            />
          ) : (
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary text-2xl text-zinc-50">
              {session?.data?.user?.name?.charAt(0)}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuItem>
          <Link href={"/profile"}>
            <Button
              className="-ml-[0.42rem] flex items-center gap-2"
              variant={"ghost"}
              size={"sm"}
            >
              <User className="size-4" />
              <span>Profile</span>
            </Button>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-none">
          <LogOutBtn />
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-none">
          <AdminModeWrapper />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
