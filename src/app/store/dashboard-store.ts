import { create } from 'zustand'
type dashState = {
  bears: number
  increasePopulation: () => void

}
export const useDashStore = create<dashState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears:number) => set({ bears: newBears }),
}))
