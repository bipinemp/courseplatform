"use client";

import { DarkLightMode } from "./DarkLightMode";
import ProfileDropDown from "./ProfileDropDown";
import Search from "./Search";
import LoginBtn from "./LoginBtn";
import { ConfettiProvider } from "@/providers/ConfettiProvider";
import { useSearchStore } from "@/store/store";
import MblSearch from "./MblSearch";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import MblSidebar from "./MblSidebar";

interface Props {
  user?: any;
  role?: "ADMIN" | "USER";
}
const Navbar = ({ user, role }: Props) => {
  const { isOpen, onClose, onOpen } = useSearchStore();

  return (
    <nav className="mx-auto flex min-h-[99px] w-full max-w-[1920px] items-center justify-between gap-5 border-b border-b-primary/50 bg-zinc-50 px-4 py-6 dark:bg-background lg:px-10">
      <div className="hidden gap-2 vsm:flex vsm:items-center">
        <Sheet
          open={isOpen}
          onOpenChange={(open) => (open ? onOpen() : onClose())}
        >
          {!isOpen && (
            <SheetTrigger className="block md:hidden">
              <div className="relative cursor-pointer rounded-full border-[2px] border-input p-3 transition hover:bg-zinc-100 hover:dark:bg-neutral-900">
                <Menu className="size-[1.4rem] text-gray-500" strokeWidth={2} />
              </div>
            </SheetTrigger>
          )}
          <SheetContent side={"left"} className="p-0">
            <MblSidebar onClose={onClose} />
          </SheetContent>
        </Sheet>
        <Search />
      </div>
      <div
        className={cn("relative flex items-center gap-2 vsm:hidden", {
          "w-full": isOpen,
        })}
      >
        <Sheet
          open={isOpen}
          onOpenChange={(open) => (open ? onOpen() : onClose())}
        >
          {!isOpen && (
            <SheetTrigger className="block md:hidden">
              <div className="relative cursor-pointer rounded-full border-[2px] border-input p-3 transition hover:bg-zinc-100 hover:dark:bg-neutral-900">
                <Menu className="size-[1.4rem] text-gray-500" strokeWidth={2} />
              </div>
            </SheetTrigger>
          )}
          <SheetContent side={"left"} className="p-0">
            <MblSidebar onClose={onClose} />
          </SheetContent>
        </Sheet>
        <MblSearch />
      </div>
      <div className="flex items-center gap-4">
        <ConfettiProvider />
        {!isOpen && (
          <>
            <LoginBtn />
            <ProfileDropDown user={user} role={role} />
            <DarkLightMode />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
