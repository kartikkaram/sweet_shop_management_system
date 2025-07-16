import { create } from "zustand";

const useSweetStore = create((set, get) => ({
  sweets: [],

addSweet: (sweet) => {
    const { id, name, category, price, quantity } = sweet;

  if (!id || !name || !category || price == null || quantity == null) {
    throw new Error("Missing required fields");
  }
  const sweets = get().sweets;
  const exists = sweets.some((s) => s.id === sweet.id);
    if (exists) throw new Error("Sweet with this ID already exists");

    set((state) => ({
      sweets: [...state.sweets, sweet],
    }));
  },
  updateSweet: (id, updates) => {
  set((state) => ({
    sweets: state.sweets.map((sweet) =>
      sweet.id === id ? { ...sweet, ...updates } : sweet
    ),
  }));
},


  reset: () => set({ sweets: [] }),
}));

export default useSweetStore;