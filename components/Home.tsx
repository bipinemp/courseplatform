"use client";

import { getServerSession } from "next-auth";
import DashboardSidebar from "./DashboardSidebar";
import Navbar from "./Navbar";
import { authOptions } from "@/lib/authOptions";
import { useSession } from "next-auth/react";

const HomePage = () => {
  // const session = await getServerSession(authOptions);
  const session = useSession();

  return (
    <div className="relative w-full">
      <div className="fixed inset-y-0 z-20 h-[80px] w-full md:pl-[10rem] lg:pl-[14rem]">
        <Navbar user={session?.data?.user} role={session?.data?.role} />
      </div>
      <div className="fixed inset-y-0 z-30 hidden h-full w-[160px] flex-col border-r border-r-primary/50 md:flex lg:w-56">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default HomePage;
