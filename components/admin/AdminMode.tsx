"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";

const AdminMode = () => {
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? (
        <Link href={"/"}>
          <Button
            className="-ml-[0.42rem] flex items-center gap-2 font-semibold text-destructive hover:text-destructive dark:text-red-500"
            variant={"ghost"}
            size={"sm"}
          >
            <X className="size-4" strokeWidth={3} /> Exit
          </Button>
        </Link>
      ) : (
        <Link href={"/admin/courses"}>
          <Button
            className="font-semibold text-destructive hover:text-destructive dark:text-red-500"
            variant={"ghost"}
            size={"sm"}
          >
            Admin Mode
          </Button>
        </Link>
      )}
    </>
  );
};

export default AdminMode;
