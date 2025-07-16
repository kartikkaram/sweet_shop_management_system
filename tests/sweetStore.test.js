import useSweetStore from "../store/sweetStore";


describe("Sweet Store", () => {
  beforeEach(() => {
    useSweetStore.getState().reset();
  });

  test("adds a sweet to the store", () => {
    const sweet = {
      id: 1,
      name: "Kaju Katli",
      category: "Nut-Based",
      price: 50,
      quantity: 20,
    };

    useSweetStore.getState().addSweet(sweet);

    const sweets = useSweetStore.getState().sweets;

    expect(sweets).toHaveLength(1);
    expect(sweets[0]).toMatchObject(sweet);
  });
  test("throws error when adding a sweet with duplicate ID", () => {
  const sweet = {
    id: 1,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };

  const store = useSweetStore.getState();

  store.addSweet(sweet);

  expect(() => store.addSweet(sweet)).toThrow("Sweet with this ID already exists");
});
test("throws error when adding a sweet with missing required fields", () => {
  const sweet = {
    id: 2,
    category: "Candy",
    price: 20,
    quantity: 10,
  };

  const store = useSweetStore.getState();

  expect(() => store.addSweet(sweet)).toThrow("Missing required fields");
});
test("adds multiple sweets correctly", () => {
  const store = useSweetStore.getState();

  const sweet1 = { id: 1, name: "Kaju Katli", category: "Nut", price: 50, quantity: 20 };
  const sweet2 = { id: 2, name: "Rasgulla", category: "Milk", price: 30, quantity: 25 };

  store.addSweet(sweet1);
  store.addSweet(sweet2);

  expect(useSweetStore.getState().sweets).toHaveLength(2);

});
test("updates an existing sweet by ID", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 1,
    name: "Kaju Katli",
    category: "Nut-Based",
    price: 50,
    quantity: 20,
  };

  store.addSweet(sweet);

  store.updateSweet(1, { price: 60, quantity: 25 });

  const updated = useSweetStore.getState().sweets.find(s => s.id === 1);
  expect(updated.price).toBe(60);
  expect(updated.quantity).toBe(25);
});
test("throws error when trying to update a non-existent sweet", () => {
  const store = useSweetStore.getState();

  expect(() => store.updateSweet(999, { price: 100 }))
    .toThrow("Sweet not found");
});
test("does not change sweet when update object is empty", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 3,
    name: "Ladoo",
    category: "Gram-Based",
    price: 25,
    quantity: 10,
  };

  store.addSweet(sweet);
  store.updateSweet(3, {});

  const updatedSweet = useSweetStore.getState().sweets.find(sweet => sweet.id === 3);
  expect(updatedSweet).toMatchObject(sweet);
});

});