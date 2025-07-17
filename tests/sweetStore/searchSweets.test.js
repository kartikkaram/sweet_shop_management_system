import useSweetStore from "../../store/sweetStore";


describe("Search sweets", () => {
  beforeEach(() => {
    useSweetStore.getState().reset();
  });
test("returns sweets matching the search term (case-insensitive, partial match)", () => {
  const store = useSweetStore.getState();

  const sweets = [
    { id: 1, name: "Kaju Katli", category: "Dry Fruit", price: 50, quantity: 10 },
    { id: 2, name: "Gulab Jamun", category: "Milk-Based", price: 30, quantity: 15 },
    { id: 3, name: "Rasgulla", category: "Milk-Based", price: 25, quantity: 12 },
  ];

  sweets.forEach((sweet) => store.addSweet(sweet));

  const results = store.searchSweets("jam");
  expect(results).toEqual([
    { id: 2, name: "Gulab Jamun", category: "Milk-Based", price: 30, quantity: 15 },
  ]);
});
test("returns multiple sweets that match the search term", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 1, name: "Kaju Katli", category: "Dry Fruit", price: 50, quantity: 10 });
  store.addSweet({ id: 2, name: "Kaju Roll", category: "Dry Fruit", price: 60, quantity: 5 });

  const results = store.searchSweets("kaju");
  expect(results.length).toBe(2);
});
test("returns empty array when no sweet matches the search term", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 3, name: "Rasgulla", category: "Milk-Based", price: 20, quantity: 12 });

  const results = store.searchSweets("laddu");
  expect(results).toEqual([]);
});
test("returns sweets matching the category", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 4, name: "Barfi", category: "Milk-Based", price: 25, quantity: 8 });

  const results = store.searchSweets("milk");
  expect(results[0].name).toBe("Barfi");
});
})