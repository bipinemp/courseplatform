"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative h-[40px] w-[40px] cursor-pointer">
          <Image
            fill
            src="https://github.com/shadcn.png"
            alt=""
            className="h-[40px] w-[40px] rounded-full bg-gray-400"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px">
        <DropdownMenuItem>
          <Link
            href={"/profile"}
            className="flex w-full items-center gap-1 px-2 text-lg"
          >
            <User className="mr-2 h-[1.2rem] w-[1.2rem]" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            href={"/settings"}
            className="flex w-full items-center gap-1 px-2 text-lg"
          >
            <Settings className="mr-2 h-[1.2rem] w-[1.2rem]" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link
            href={"/encolled_courses"}
            className="flex w-full items-center gap-1 px-2 text-lg"
          >
            <BookOpen className="mr-2 h-[1.2rem] w-[1.2rem]" />
            <span>Enrolled Courses</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
