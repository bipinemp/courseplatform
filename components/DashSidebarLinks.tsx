"use client";

import { cn } from "@/lib/utils";
import { Compass, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashSidebarLinks = () => {
  const pathname = usePathname();
  return (
    <>
      <Link
        href={"/"}
        className={cn(
          "flex items-center gap-3 px-4 py-4 transition hover:bg-primary/10",
          {
            "border-r-[4px] border-r-primary bg-primary/10": pathname === "/",
          },
        )}
      >
        <Compass className="h-5 w-5" />
        Browse
      </Link>
      <Link
        href={"/dashboard"}
        className={cn(
          "flex items-center gap-3 px-4 py-4 transition hover:bg-primary/10",
          {
            "border-r-[4px] border-r-primary bg-primary/10":
              pathname === "/dashboard",
          },
        )}
      >
        <LayoutDashboard className="h-5 w-5" /> Dashboard
      </Link>
    </>
  );
};

export default DashSidebarLinks;
