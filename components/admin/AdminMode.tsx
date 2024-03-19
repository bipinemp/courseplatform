"use client";

import { useAdminStateStore } from "@/app/store/store";
import { FC } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const AdminMode: FC = () => {
  const { setAdminState, exitAdminState, adminState } = useAdminStateStore();
  const router = useRouter();
  return (
    <>
      {adminState ? (
        <Button
          onClick={() => {
            exitAdminState();
            router.push("/");
            router.refresh();
          }}
          variant={"destructive"}
          className="flex items-center gap-2 text-lg"
        >
          <LogOut className="h-5 w-5" strokeWidth={3} />
          Exit Admin
        </Button>
      ) : (
        <Button
          onClick={() => {
            setAdminState();
            router.push("/");
            router.refresh();
          }}
        >
          Admin State
        </Button>
      )}
    </>
  );
};

export default AdminMode;
