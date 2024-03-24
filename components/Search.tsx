"use client";

import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";

const Search = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return;
  }

  return (
    <form className="relative w-[300px]">
      <span className="absolute left-3 top-[0.88rem]">
        <SearchIcon className="h-5 w-5 text-gray-500" />
      </span>
      <Input
        placeholder="Search for a course"
        className="rounded-full bg-accent py-6 pl-10"
      />
    </form>
  );
};

export default Search;
