"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/createUrl";
import { useSearchStore } from "@/store/store";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const MblSearch = () => {
  const { onClose, onOpen, isOpen } = useSearchStore();
  const ref = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return;
  }

  function searchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onClose();

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
    <form onSubmit={searchSubmit} className="w-full">
      {isOpen && (
        <div onClick={onOpen} className="absolute left-3 top-[0.9rem]">
          <SearchIcon className="size-[1.4rem] text-gray-500" />
        </div>
      )}
      {!isOpen && (
        <div
          onClick={() => {
            onOpen();
            setTimeout(() => ref.current?.focus(), 0);
          }}
          className="relative cursor-pointer rounded-full border-[2px] border-input p-3 transition hover:bg-zinc-100 hover:dark:bg-neutral-900"
        >
          <SearchIcon className="size-[1.4rem] text-gray-500" />
        </div>
      )}
      {isOpen && (
        <Input
          ref={ref}
          onFocus={onOpen}
          onBlur={onClose}
          key={searchParams.get("query")}
          defaultValue={searchParams.get("query") || ""}
          autoComplete="off"
          name="query"
          placeholder="Search for a course"
          className={cn("rounded-full bg-accent py-6 pl-10 transition", {
            "w-full": isOpen,
          })}
        />
      )}
    </form>
  );
};

export default MblSearch;
