"use client";

import DashboardSidebar from "./DashboardSidebar";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div className="relative w-full">
      <div className="fixed inset-y-0 z-20 h-[80px] w-full md:pl-[10rem] lg:pl-[14rem]">
        <Navbar />
      </div>
      <div className="fixed inset-y-0 z-30 hidden h-full w-[160px] flex-col border-r border-r-primary/50 md:flex lg:w-56">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default HomePage;
