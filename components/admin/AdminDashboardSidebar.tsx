import { BookType } from "lucide-react";
import AdminDashLinks from "./AdminDashLinks";

const AdminDashboardSidebar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex h-[99px] items-center justify-center gap-2 border-b border-b-primary/50 px-4">
        <BookType className="h-9 w-9 text-gray-500" />
        <h1 className="font-bold text-gray-500">Coursify</h1>
      </div>
      <div className="flex flex-col gap-1">
        <AdminDashLinks />
      </div>
    </div>
  );
};

export default AdminDashboardSidebar;
