import { create } from "zustand";
import { userType } from "./jwtConfig";
import { IRoom } from "@/app/dashboard/properties/page";
import { transactionType } from "@/app/dashboard/transactions/PaymentHistory";

export type signupType = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  acceptTerms: true;
};

export type storeState = {
  filteredPayments: transactionType[]|[]
  user: userType | null;
  openSidebar: boolean;
  openAddProperty: boolean;
  openAddHouse:boolean
  openExpandedProperty: boolean;
  signupData: signupType | null;
  avatar: string;
  filteredRooms: IRoom[] | null;

  setAvatar: (url: string) => void;
  setSignupData: (data: signupType) => void;
  setFilteredRooms: (data: IRoom[]|null) => void;
  setFilteredPayments: (data: transactionType[]|[]) => void;
  toggleSidebar: () => void;
  toggleExpandedProperty: () => void;
  toggleAddProperty: () => void;
  toggleAddHouse: ()=>void
  setUser: (user: userType) => void;
  openNotifications: boolean;
  toggleNotification: () => void;
};

export const useDashStore = create<storeState>((set) => ({
  filteredPayments: [],
  openSidebar: false,
  openExpandedProperty: false,
  openAddProperty: false,
  openNotifications: false,
  user: null,
  signupData: null,
  avatar: '', // ✅ Initial value for avatar
  openAddHouse:false,
  filteredRooms:null,
  toggleAddHouse: () =>
    set((state) => ({ openAddHouse: !state.openAddHouse })),

  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
  toggleExpandedProperty: () =>
    set((state) => ({ openExpandedProperty: !state.openExpandedProperty })),
  toggleAddProperty: () =>
    set((state) => ({ openAddProperty: !state.openAddProperty })),
  toggleNotification: () =>
    set((state) => ({ openNotifications: !state.openNotifications })),

  setUser: (user: userType) => set(() => ({ user })),
  setAvatar: (url: string) => set(() => ({ avatar: url })), // ✅ Corrected function
  setSignupData: (data: signupType) => set(() => ({ signupData: data })),
  setFilteredRooms: (data: IRoom[] | null) => set(() => ({ filteredRooms: data })),
  setFilteredPayments: (data: transactionType[] | []) => set(() => ({ filteredPayments: data })),
}));
