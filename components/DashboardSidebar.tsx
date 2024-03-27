"use client";

import { BookType } from "lucide-react";
import React from "react";
import DashSidebarLinks from "./DashSidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      {pathname.startsWith("/admin") ? (
        <Link
          href={"/admin/courses"}
          className="flex h-[99px] items-center justify-center gap-2 border-b border-b-primary/50 px-4"
        >
          <BookType className="h-9 w-9 opacity-60" />
          <h1 className="font-bold opacity-60">Coursify</h1>
        </Link>
      ) : (
        <Link
          href={"/"}
          className="flex h-[99px] items-center justify-center gap-2 border-b border-b-primary/50 px-4"
        >
          <BookType className="h-9 w-9 opacity-60" />
          <h1 className="font-bold opacity-60">Coursify</h1>
        </Link>
      )}

      <DashSidebarLinks />
    </div>
  );
};

export default DashboardSidebar;
