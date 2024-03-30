"use client";

import { DarkLightMode } from "./DarkLightMode";
import ProfileDropDown from "./ProfileDropDown";
import Search from "./Search";
import LoginBtn from "./LoginBtn";
import { ConfettiProvider } from "@/providers/ConfettiProvider";
import { useSearchStore } from "@/store/store";
import MblSearch from "./MblSearch";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, SquareMenu } from "lucide-react";
import MblSidebar from "./MblSidebar";

const Navbar = () => {
  const { isOpen } = useSearchStore();
  return (
    <nav className="mx-auto flex min-h-[99px] w-full max-w-[1920px] items-center justify-between gap-5 border-b border-b-primary/50 bg-zinc-50 px-4 py-6 dark:bg-background lg:px-10">
      <div className="vsm:flex vsm:items-center hidden gap-2">
        {!isOpen && (
          <Sheet>
            <SheetTrigger className="block md:hidden">
              <div className="relative cursor-pointer rounded-full border-[2px] border-input p-3 transition hover:bg-zinc-100 hover:dark:bg-neutral-900">
                <Menu className="size-[1.4rem] text-gray-500" strokeWidth={2} />
              </div>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0">
              <MblSidebar />
            </SheetContent>
          </Sheet>
        )}
        <Search />
      </div>
      <div
        className={cn("vsm:hidden relative flex items-center gap-2", {
          "w-full": isOpen,
        })}
      >
        {!isOpen && (
          <Sheet>
            <SheetTrigger className="block md:hidden">
              <div className="relative cursor-pointer rounded-full border-[2px] border-input p-3 transition hover:bg-zinc-100 hover:dark:bg-neutral-900">
                <Menu className="size-[1.4rem] text-gray-500" strokeWidth={2} />
              </div>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0">
              <MblSidebar />
            </SheetContent>
          </Sheet>
        )}
        <MblSearch />
      </div>
      <div className="flex items-center gap-4">
        <ConfettiProvider />
        {!isOpen && (
          <>
            <LoginBtn />
            <ProfileDropDown />
            <DarkLightMode />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
