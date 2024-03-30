"use client";

import AdminMode from "./AdminMode";
import { useSession } from "next-auth/react";

const AdminModeWrapper = () => {
  const session = useSession();

  if (session?.data?.role !== "ADMIN") {
    return;
  }

  return <AdminMode />;
};

export default AdminModeWrapper;
