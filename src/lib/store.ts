import { create } from 'zustand'

export type storeState = {
  openSidebar: boolean;
  openAddProperty: boolean;
  openExpandedProperty: boolean;
  toggleSidebar: () => void;
  toggleExpandedProperty: () => void;
  toggleAddProperty: () => void;
}
export const useDashStore = create<storeState>((set) => ({
  openSidebar: false,
  openExpandedProperty: false,
  openAddProperty: false,
  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
  toggleExpandedProperty: () => set((state) => ({ openExpandedProperty: !state.openExpandedProperty })),
  toggleAddProperty: () => set((state) => ({ openAddProperty: !state.openAddProperty })),
}))
