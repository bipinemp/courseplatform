"use client";

import { BarChart, Compass, LayoutDashboard, List } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import SidebarItem from "./SidebarItem";

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
        <SidebarItem
          href={route.href}
          icon={route.icon}
          label={route.label}
          key={i}
        />
      ))}
    </div>
  );
};

export default DashSidebarLinks;
