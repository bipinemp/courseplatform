import Navbar from "./Navbar";
import Admin_User_Choose from "./Admin_User_Choose";

const Home = () => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-56">
        <Navbar />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col border-r border-r-primary/50 md:flex">
        <Admin_User_Choose />
      </div>
    </div>
  );
};

export default Home;
