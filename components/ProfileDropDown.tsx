import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Settings, User } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import LogOutBtn from "./LogOutBtn";

const ProfileDropDown = async () => {
  const session = await getServerSession();

  if (!Boolean(session?.user)) {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative h-[40px] w-[40px] cursor-pointer">
          {session?.user?.image ? (
            <Image
              fill
              src={session.user.image}
              alt=""
              className="h-[40px] w-[40px] rounded-full bg-gray-400"
            />
          ) : (
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary text-2xl text-zinc-50">
              {session?.user?.name?.charAt(0)}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuItem>
          <Link
            href={"/profile"}
            className="flex w-full items-center gap-1 px-2 text-lg"
          >
            <User className="mr-2 h-[1.2rem] w-[1.2rem]" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="hover:bg-none">
          <LogOutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
