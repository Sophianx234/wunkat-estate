import { create } from "zustand";
import { userType } from "./jwtConfig";

export type signupType = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  acceptTerms: true;
};

export type storeState = {
  user: userType | null;
  openSidebar: boolean;
  openAddProperty: boolean;
  openExpandedProperty: boolean;
  signupData: signupType | null;
  setSignupData: (data: signupType) => void;
  toggleSidebar: () => void;
  toggleExpandedProperty: () => void;
  toggleAddProperty: () => void;
  setUser: (user: userType) => void;
  openNotifications: boolean;
  toggleNotification: () => void;
};

export const useDashStore = create<storeState>((set) => ({
  openSidebar: false,
  openExpandedProperty: false,
  openAddProperty: false,
  openNotifications: false,
  user: null,
  signupData: null,

  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
  toggleExpandedProperty: () =>
    set((state) => ({ openExpandedProperty: !state.openExpandedProperty })),
  toggleAddProperty: () =>
    set((state) => ({ openAddProperty: !state.openAddProperty })),
  toggleNotification: () =>
    set((state) => ({ openNotifications: !state.openNotifications })),

  setUser: (user: userType) => set(() => ({ user })),
  setSignupData: (data: signupType) => set(() => ({ signupData: data })), // ✅ fixed
}));
