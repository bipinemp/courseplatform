import Link from "next/link";
import { DarkLightMode } from "./DarkLightMode";
import ProfileDropDown from "./ProfileDropDown";
import Search from "./Search";
import AdminMode from "./admin/AdminMode";

import { Button } from "./ui/button";
import LoginBtn from "./LoginBtn";

const Navbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-[1920px] items-center justify-between gap-5 border-b border-b-primary/50 px-4 py-6 lg:px-10 2xl:px-72">
      <div>
        <Search />
      </div>
      <div className="flex items-center gap-7">
        <LoginBtn />
        <AdminMode />
        <ProfileDropDown />
        <DarkLightMode />
      </div>
    </nav>
  );
};

export default Navbar;
