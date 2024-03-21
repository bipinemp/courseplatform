import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  adminState: boolean;
  setAdminState: () => void;
  exitAdminState: () => void;
}

export const useAdminStateStore = create<AdminState>()(
  persist(
    (set) => ({
      adminState: false,
      setAdminState: () => set({ adminState: true }),
      exitAdminState: () => set({ adminState: false }),
    }),
    {
      name: "admin_state",
    },
  ),
);
