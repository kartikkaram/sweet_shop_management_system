import useSweetStore from "../../store/sweetStore";


describe("Sweet Store", () => {
  beforeEach(() => {
    useSweetStore.getState().reset();
  });
test("restocks a sweet and increases quantity", () => {
    const store = useSweetStore.getState();

    const sweet = {
      id: 7,
      name: "Motichoor Laddu",
      category: "Fried",
      price: 15,
      quantity: 10,
    };

    store.addSweet(sweet);
    store.restockSweet(7, 5);

    const updatedSweet = useSweetStore.getState().sweets.find((sweet) => sweet.id === 7);

    expect(updatedSweet.quantity).toBe(15);
  });
  test("throws error when restocking a non-existent sweet", () => {
  const store = useSweetStore.getState();

  expect(() => store.restockSweet(999, 10)).toThrow("Sweet not found");
});
test("throws error when restocking with invalid amount", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 8,
    name: "Cham Cham",
    category: "Milk-Based",
    price: 25,
    quantity: 12,
  };

  store.addSweet(sweet);

  expect(() => store.restockSweet(8, 0)).toThrow("Invalid restock amount");
  expect(() => store.restockSweet(8, -5)).toThrow("Invalid restock amount");
});
})