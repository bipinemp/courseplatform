import DashboardSidebar from "./DashboardSidebar";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-56">
        <Navbar />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col border-r border-r-primary/50 md:flex">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default HomePage;
