import { create } from "zustand";

const useSweetStore = create((set, get) => ({
  sweets: [],

  addSweet: (newSweet) => {
    const { id, name, category, price, quantity } = newSweet;

    if (!id || !name || !category || price == null || quantity == null) {
      throw new Error("Missing required fields");
    }

    const currentSweets = get().sweets;
    const isDuplicate = currentSweets.some((sweet) => sweet.id === id);
    if (isDuplicate) {
      throw new Error("Sweet with this ID already exists");
    }

    set((state) => ({
      sweets: [...state.sweets, newSweet],
    }));
  },

  updateSweet: (id, updates) => {
    const sweetExists = get().sweets.some((sweet) => sweet.id === id);
    if (!sweetExists) {
      throw new Error("Sweet not found");
    }

    set((state) => ({
      sweets: state.sweets.map((sweet) =>
        sweet.id === id ? { ...sweet, ...updates } : sweet
      ),
    }));
  },
deleteSweet: (id) => {
  set((state) => ({
    sweets: state.sweets.filter((sweet) => sweet.id !== id),
  }));
},
  reset: () => set({ sweets: [] }),
}));

export default useSweetStore;
