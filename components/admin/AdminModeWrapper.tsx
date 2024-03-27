import { getServerSession } from "next-auth";
import AdminMode from "./AdminMode";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const AdminModeWrapper = async () => {
  const session = await getServerSession(authOptions);

  if (session?.role !== "ADMIN") {
    return;
  }

  return <AdminMode />;
};

export default AdminModeWrapper;
