"use client";

import { cn } from "@/lib/utils";
import { Link, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className={cn(
        "flex cursor-pointer items-center gap-3 px-4 py-4 transition hover:bg-primary/10",
        {
          "border-r-[4px] border-r-primary bg-primary/10": pathname === href,
        },
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </div>
  );
};

export default SidebarItem;
