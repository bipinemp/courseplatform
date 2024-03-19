"use client";

import { cn } from "@/lib/utils";
import { BarChart, List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminDashLinks = () => {
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
        <List className="h-5 w-5" />
        Courses
      </Link>
      <Link
        href={"/analytics"}
        className={cn(
          "flex items-center gap-3 px-4 py-4 transition hover:bg-primary/10",
          {
            "border-r-[4px] border-r-primary bg-primary/10":
              pathname === "/analytics",
          },
        )}
      >
        <BarChart className="h-5 w-5" /> Analytics
      </Link>
    </>
  );
};

export default AdminDashLinks;
