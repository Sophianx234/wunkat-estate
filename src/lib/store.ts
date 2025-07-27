import { create } from "zustand";
import { userType } from "./jwtConfig";

export type storeState = {
  user: userType | null;
  openSidebar: boolean;
  openAddProperty: boolean;
  openExpandedProperty: boolean;
  toggleSidebar: () => void;
  toggleExpandedProperty: () => void;
  toggleAddProperty: () => void;
  setUser: (user: userType) => void;
    openNotifications: boolean;
  toggleNotification: () => void
};
export const useDashStore = create<storeState>((set) => ({
  openSidebar: false,
  openExpandedProperty: false,
  openAddProperty: false,
  user: null,
  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
  toggleExpandedProperty: () =>
    set((state) => ({ openExpandedProperty: !state.openExpandedProperty })),
  toggleAddProperty: () =>
    set((state) => ({ openAddProperty: !state.openAddProperty })),
  setUser: (user: userType) => set(() => ({ user })),
  openNotifications: false,
  toggleNotification: () => set((state) => ({ openNotifications: !state.openNotifications })),
}));
