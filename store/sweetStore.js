import { create } from "zustand";

const useSweetStore = create((set, get) => ({
  sweets: [],

  addSweet: (sweet) => {
    set((state) => ({
      sweets: [...state.sweets, sweet],
    }));
  },

  reset: () => set({ sweets: [] }),
}));

export default useSweetStore;