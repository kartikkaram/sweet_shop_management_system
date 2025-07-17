import useSweetStore from "../../store/sweetStore";


describe("Sweet Store", () => {
  beforeEach(() => {
    useSweetStore.getState().reset();
  });
  test("reduces quantity when a sweet is purchased", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 10,
    name: "Kaju Katli",
    category: "Dry Fruit",
    price: 50,
    quantity: 20,
  };

  store.addSweet(sweet);
  store.purchaseSweet(10, 5);

  const updatedSweet = useSweetStore.getState().sweets.find((sweet) => sweet.id === 10);
  expect(updatedSweet.quantity).toBe(15);
});
test("throws error when purchasing more than available quantity", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 11,
    name: "Gulab Jamun",
    category: "Milk-Based",
    price: 30,
    quantity: 10,
  };

  store.addSweet(sweet);
  expect(() => store.purchaseSweet(11, 15)).toThrow("Not enough quantity in stock");
});
test("throws error when purchasing with invalid amount", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 12,
    name: "Rasgulla",
    category: "Milk-Based",
    price: 20,
    quantity: 10,
  };

  store.addSweet(sweet);
  expect(() => store.purchaseSweet(12, 0)).toThrow("Invalid purchase amount");
  expect(() => store.purchaseSweet(12, -3)).toThrow("Invalid purchase amount");
});
test("throws error when purchasing a sweet that does not exist", () => {
  const store = useSweetStore.getState();

  expect(() => store.purchaseSweet(999, 2)).toThrow("Sweet not found");
});
})