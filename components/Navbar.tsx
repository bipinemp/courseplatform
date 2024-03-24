import { DarkLightMode } from "./DarkLightMode";
import ProfileDropDown from "./ProfileDropDown";
import Search from "./Search";
import AdminMode from "./admin/AdminMode";
import LoginBtn from "./LoginBtn";

const Navbar = () => {
  return (
    <nav className="mx-auto flex min-h-[99px] w-full max-w-[1920px] items-center justify-between gap-5 border-b border-b-primary/50 bg-zinc-50 px-4 py-6 lg:px-10 2xl:px-72">
      <div>
        <Search />
      </div>
      <div className="flex items-center gap-4">
        <LoginBtn />
        <AdminMode />
        <ProfileDropDown />
        <DarkLightMode />
      </div>
    </nav>
  );
};

export default Navbar;
