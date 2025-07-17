import useSweetStore from "../../store/sweetStore";


describe("Update sweets", () => {
  beforeEach(() => {
    useSweetStore.getState().reset();
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
})