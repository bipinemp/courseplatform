"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";

const AdminMode = () => {
  const session = useSession();
  const pathname = usePathname();

  if (!Boolean(session.data?.user)) {
    return;
  }

  if (session.data?.role !== "ADMIN") {
    return;
  }

  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {isAdminRoute ? (
        <Link href={"/"}>
          <Button
            className="flex items-center gap-2 font-semibold"
            variant={"destructive"}
          >
            <LogOut className="h-4 w-4" strokeWidth={3} /> Exit
          </Button>
        </Link>
      ) : (
        <Link href={"/admin/courses"}>
          <Button className="font-semibold">Admin Mode</Button>
        </Link>
      )}
    </>
  );
};

export default AdminMode;
