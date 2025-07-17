import { create } from "zustand";



const validateSweet = (sweet) => {
  const { id, name, category, price, quantity } = sweet;

  if (typeof id !== "number") throw new Error("ID must be a number");
  if (typeof name !== "string" || !name.trim()) throw new Error("Name is required");
  if (typeof category !== "string" || !category.trim()) throw new Error("Category is required");
  if (typeof price !== "number" || price < 0) throw new Error("Price must be a non-negative number");
  if (typeof quantity !== "number" || quantity < 0) throw new Error("Quantity must be a non-negative number");
};

const useSweetStore = create((set, get) => ({
  sweets: [],

  addSweet: (newSweet) => {
    const { id, name, category, price, quantity } = newSweet;
    validateSweet(newSweet)


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
     if ("quantity" in updates && updates.quantity < 0) {
    throw new Error("Quantity cannot be negative");
  }

    set((state) => ({
      sweets: state.sweets.map((sweet) =>
        sweet.id === id ? { ...sweet, ...updates } : sweet
      ),
    }));
  },
deleteSweet: (id) => {
  const currentSweets = get().sweets;
  const sweetExists = currentSweets.some((sweet) => sweet.id === id);
  if (!sweetExists) throw new Error("Sweet not found");
  set((state) => ({
    sweets: state.sweets.filter((sweet) => sweet.id !== id),
  }));
},
restockSweet: (id, amount) => {
  const sweetToRestock = get().sweets.find((sweet) => sweet.id === id);
  if (!sweetToRestock) throw new Error("Sweet not found");
  if (amount <= 0) throw new Error("Invalid restock amount");

  set((state) => ({
    sweets: state.sweets.map((sweet) =>
      sweet.id === id
        ? { ...sweet, quantity: sweet.quantity + amount }
        : sweet
    ),
  }));
},
  reset: () => set({ sweets: [] }),
}));

export default useSweetStore;
