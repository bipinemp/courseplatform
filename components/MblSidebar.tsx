"use client";

import { BookType } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MblSidebarLinks from "./MblSidebarLinks";

const MblSidebar = ({ onClose }: { onClose: () => void }) => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="flex w-full flex-col">
      {isAdmin ? (
        <Link
          href={"/admin/courses"}
          className="flex h-[99px] items-center justify-center gap-2 border-b border-b-primary/50 px-4"
        >
          <BookType className="h-9 w-9 opacity-60" />
          <h1 className="text-[1rem] font-bold opacity-60 sm:text-[1.3rem]">
            Coursify
          </h1>
        </Link>
      ) : (
        <Link
          href={"/"}
          className="flex h-[99px] items-center justify-center gap-2 border-b border-b-primary/50 px-4"
        >
          <BookType className="h-9 w-9 opacity-60" />
          <h1 className="text-[1rem] font-bold opacity-60 xl:text-[2rem]">
            Coursify
          </h1>
        </Link>
      )}

      <MblSidebarLinks onClose={onClose} />
    </div>
  );
};

export default MblSidebar;
