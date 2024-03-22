"use client";

import { BarChart, Compass, LayoutDashboard, List } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DashSidebarLinks = () => {
  const userRoutes = [
    { icon: Compass, label: "Browse", href: "/" },
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  ];

  const adminRoutes = [
    { icon: List, label: "Courses", href: "/admin/courses" },
    { icon: BarChart, label: "Analytics", href: "/admin/analytics" },
  ];

  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");

  const routes = isAdminPage ? adminRoutes : userRoutes;

  return (
    <div className="flex flex-col gap-1">
      {routes.map((route, i) => (
        <Link
          key={i}
          href={route.href}
          className={cn(
            "flex items-center gap-3 px-4 py-4 transition hover:bg-primary/10",
            {
              "border-r-[4px] border-r-primary bg-primary/10":
                pathname === route.href,
            },
          )}
        >
          <route.icon className="h-5 w-5" />
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default DashSidebarLinks;
