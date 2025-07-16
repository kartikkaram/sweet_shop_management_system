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
test("deletes a sweet by ID", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 10,
    name: "Soan Papdi",
    category: "Flaky",
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

  const sweet1 = { id: 1, name: "Barfi", category: "Milk", price: 30, quantity: 10 };
  const sweet2 = { id: 2, name: "Peda", category: "Milk", price: 25, quantity: 15 };

  store.addSweet(sweet1);
  store.addSweet(sweet2);

  store.deleteSweet(1);

  const sweets = useSweetStore.getState().sweets;
  expect(sweets).toHaveLength(1);
  expect(sweets[0].id).toBe(2);
});
test("can delete all sweets one by one", () => {
  const store = useSweetStore.getState();

  const sweet1 = { id: 1, name: "Kalakand", category: "Milk", price: 40, quantity: 12 };
  const sweet2 = { id: 2, name: "Imarti", category: "Fried", price: 20, quantity: 8 };

  store.addSweet(sweet1);
  store.addSweet(sweet2);

  store.deleteSweet(1);
  store.deleteSweet(2);

  const sweets = useSweetStore.getState().sweets;
  expect(sweets).toHaveLength(0);
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

    const updatedSweet = store.sweets.find((s) => s.id === 7);
    expect(updatedSweet.quantity).toBe(15);
  });
  
});