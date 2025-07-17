import useSweetStore, { sort } from "../store/sweetStore";


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
test("adds multiple sweets correctly", () => {
  const store = useSweetStore.getState();

  const sweet1 = { id: 1, name: "Kaju Katli", category: "Nut", price: 50, quantity: 20 };
  const sweet2 = { id: 2, name: "Rasgulla", category: "Milk", price: 30, quantity: 25 };

  store.addSweet(sweet1);
  store.addSweet(sweet2);

  expect(useSweetStore.getState().sweets).toHaveLength(2);

});
test("throws error when sweet has invalid field types or missing fields", () => {
  const store = useSweetStore.getState();

  const invalidSweet = {
    id: "abc", 
    name: "", 
    category: "Candy",
    price: "free", 
    quantity: -10, 
  };

 expect(() =>
  store.addSweet({ id: 1, name: "", category: "Candy", price: 10, quantity: 5 })
).toThrow("Name is required");

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
test("throws error when trying to update quantity to a negative value", () => {
  const store = useSweetStore.getState();

  const sweet = {
    id: 5,
    name: "Jalebi",
    category: "Fried",
    price: 30,
    quantity: 10,
  };

  store.addSweet(sweet);

  expect(() => store.updateSweet(5, { quantity: -5 }))
    .toThrow("Quantity cannot be negative");
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
test("sorts sweets by price from low to high", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 1, name: "Ladoo", category: "Gram", price: 40, quantity: 10 });
  store.addSweet({ id: 2, name: "Barfi", category: "Milk-Based", price: 20, quantity: 5 });
  store.addSweet({ id: 3, name: "Kaju Roll", category: "Dry Fruit", price: 60, quantity: 8 });

  const sortedByPriceLowToHigh = store.sortSweets(sort.PRICELOWTOHIGH);
  expect(sortedByPriceLowToHigh.map(sweet => sweet.id)).toEqual([2, 1, 3]);
});
test("sorts sweets by price from high to low", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 4, name: "Peda", category: "Milk-Based", price: 25, quantity: 8 });
  store.addSweet({ id: 5, name: "Halwa", category: "Flour-Based", price: 50, quantity: 3 });
  store.addSweet({ id: 6, name: "Imarti", category: "Fried", price: 15, quantity: 6 });

  const sortedByPriceHighToLow = store.sortSweets(sort.PRICEHIGHTOLOW);
  expect(sortedByPriceHighToLow.map(s => s.id)).toEqual([5, 4, 6]);
});
test("sorts sweets by quantity from low to high", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 7, name: "Besan Ladoo", category: "Gram", price: 35, quantity: 2 });
  store.addSweet({ id: 8, name: "Kalakand", category: "Milk-Based", price: 45, quantity: 7 });
  store.addSweet({ id: 9, name: "Chikki", category: "Nut-Based", price: 20, quantity: 1 });

  const sortedByQuantityLowToHigh = store.sortSweets(sort.QUANTITYLOWTOHIGH);
  expect(sortedByQuantityLowToHigh.map(s => s.id)).toEqual([9, 7, 8]);
});

});