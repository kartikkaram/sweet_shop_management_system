import useSweetStore from "../../store/sweetStore";


describe("Delete sweets", () => {
  beforeEach(() => {
    useSweetStore.getState().reset();
  });
test("deletes a sweet by ID", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 10,
    name: "Soan Papdi",
    category: "Flaky",
     image:"",
    price: 20,
    quantity: 15,
  };

  store.addSweet(sweet);
  store.deleteSweet(10);

  const sweets = useSweetStore.getState().sweets;
  expect(sweets.find((sweet) => sweet.id === 10)).toBeUndefined();
});
test("throws error when trying to delete a non-existent sweet", () => {
  const store = useSweetStore.getState();

  expect(() => store.deleteSweet(999))
    .toThrow("Sweet not found");
});
test("deletes the correct sweet when multiple sweets are present", () => {
  const store = useSweetStore.getState();

  const sweet1 = { id: 1, name: "Barfi", category: "Milk", image:"", price: 30, quantity: 10 };
  const sweet2 = { id: 2, name: "Peda", category: "Milk", image:"", price: 25, quantity: 15 };

  store.addSweet(sweet1);
  store.addSweet(sweet2);

  store.deleteSweet(1);

  const sweets = useSweetStore.getState().sweets;
  expect(sweets).toHaveLength(1);
  expect(sweets[0].id).toBe(2);
});
test("can delete all sweets one by one", () => {
  const store = useSweetStore.getState();

  const sweet1 = { id: 1, name: "Kalakand", category: "Milk", image:"", price: 40, quantity: 12 };
  const sweet2 = { id: 2, name: "Imarti", category: "Fried", image:"", price: 20, quantity: 8 };

  store.addSweet(sweet1);
  store.addSweet(sweet2);

  store.deleteSweet(1);
  store.deleteSweet(2);

  const sweets = useSweetStore.getState().sweets;
  expect(sweets).toHaveLength(0);
});
})