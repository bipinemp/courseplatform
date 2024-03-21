import { BookType } from "lucide-react";
import React from "react";
import DashSidebarLinks from "./DashSidebarLinks";

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[99px] items-center justify-center gap-2 border-b border-b-primary/50 px-4">
        <BookType className="h-9 w-9 text-gray-500" />
        <h1 className="font-bold text-gray-500">Coursify</h1>
      </div>

      <DashSidebarLinks />
    </div>
  );
};

export default DashboardSidebar;
