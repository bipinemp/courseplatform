"use client";

import AdminMode from "./AdminMode";

interface Props {
  user?: any;
  role?: "ADMIN" | "USER";
}

const AdminModeWrapper = ({ user, role }: Props) => {
  if (role !== "ADMIN") {
    return;
  }

  return <AdminMode />;
};

export default AdminModeWrapper;
