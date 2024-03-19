"use client";

import { useAdminStateStore } from "@/app/store/store";
import AdminHome from "./admin/AdminHome";
import Browse from "./user/Browse";

const HomePage = () => {
  const { adminState } = useAdminStateStore();
  return <>{adminState ? <AdminHome /> : <Browse />}</>;
};

export default HomePage;
