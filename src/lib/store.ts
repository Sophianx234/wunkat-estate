import { create } from 'zustand'

export type storeState = {
  openSidebar: boolean;
  toggleSidebar: () => void;
}
export const useAppStore = create<storeState>((set) => ({
  openSidebar: false,
  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
}))
