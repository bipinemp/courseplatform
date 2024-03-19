"use client";

import { useAdminStateStore } from "@/app/store/store";
import AdminDashboardSidebar from "./admin/AdminDashboardSidebar";
import UserDashboardSidebar from "./UserDashboardSidebar";

const Admin_User_Choose = () => {
  const { adminState } = useAdminStateStore();
  return (
    <>{adminState ? <AdminDashboardSidebar /> : <UserDashboardSidebar />}</>
  );
};

export default Admin_User_Choose;
