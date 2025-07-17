import useSweetStore from "../../store/sweetStore";


describe("Add sweets", () => {
  beforeEach(() => {
    useSweetStore.getState().reset();
  });
  test("adds a sweet to the store", () => {
    const sweet = {
      id: 1,
      name: "Kaju Katli",
      category: "Nut-Based",
      image:"",
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
     image:"",
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
     image:"",
    price: "free", 
    quantity: -10, 
  };

 expect(() =>
  store.addSweet({ id: 1, name: "", category: "Candy", price: 10, quantity: 5 })
).toThrow("Name is required");

});
})