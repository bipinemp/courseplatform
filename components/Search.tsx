"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/createUrl";
import { cn } from "@/lib/utils";

const Search = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return;
  }

  function searchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Reading the value from the input field
    const val = e.target as HTMLFormElement;
    const query = val.query as HTMLInputElement;

    // Initializing the searchParams
    const newParams = new URLSearchParams(searchParams.toString());

    // setting the URL query with the input field value
    if (query.value) {
      newParams.set("query", query.value);
    } else {
      newParams.delete("query");
    }

    router.push(createUrl("/", newParams));
  }

  return (
    <form onSubmit={searchSubmit} className="relative md:w-[300px]">
      <span className="absolute left-3 top-[0.9rem]">
        <SearchIcon className="size-[1.4rem] text-gray-500" />
      </span>
      <Input
        key={searchParams.get("query")}
        defaultValue={searchParams.get("query") || ""}
        autoComplete="off"
        name="query"
        placeholder="Search for a course"
        className={cn("rounded-full bg-accent py-6 pl-10 transition")}
      />
    </form>
  );
};

export default Search;
