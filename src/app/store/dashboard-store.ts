import { create } from 'zustand'
type dashState = {
  openNotifications: boolean
  toggleNotification: () => void

}
export const useDashStore = create<dashState>((set) => ({
  openNotifications: false,
  toggleNotification: () => set((state) => ({ openNotifications: !state.openNotifications })),
  
}))
