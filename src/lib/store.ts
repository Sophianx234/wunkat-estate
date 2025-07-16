import { create } from 'zustand'

export type storeState = {
  openSidebar: boolean;
  openExpandedProperty: boolean;
  toggleSidebar: () => void;
  toggleExpandedProperty: () => void;
}
export const useAppStore = create<storeState>((set) => ({
  openSidebar: false,
  openExpandedProperty: false,
  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
  toggleExpandedProperty: () => set((state) => ({ openExpandedProperty: !state.openExpandedProperty })),
}))
