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

type ConfettiStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

type SearchStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
