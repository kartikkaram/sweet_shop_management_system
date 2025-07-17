import useSweetStore, { sort } from "../../store/sweetStore";


describe("Sort sweets", () => {
  beforeEach(() => {
    useSweetStore.getState().reset();
  });
test("sorts sweets by price from low to high", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 1, name: "Ladoo", category: "Gram", image:"", price: 40, quantity: 10 });
  store.addSweet({ id: 2, name: "Barfi", category: "Milk-Based", image:"", price: 20, quantity: 5 });
  store.addSweet({ id: 3, name: "Kaju Roll", category: "Dry Fruit", image:"", price: 60, quantity: 8 });

  const sortedByPriceLowToHigh = store.sortSweets(sort.PRICELOWTOHIGH);
  expect(sortedByPriceLowToHigh.map(sweet => sweet.id)).toEqual([2, 1, 3]);
});
test("sorts sweets by price from high to low", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 4, name: "Peda", category: "Milk-Based", image:"", price: 25, quantity: 8 });
  store.addSweet({ id: 5, name: "Halwa", category: "Flour-Based", image:"", price: 50, quantity: 3 });
  store.addSweet({ id: 6, name: "Imarti", category: "Fried", image:"", price: 15, quantity: 6 });

  const sortedByPriceHighToLow = store.sortSweets(sort.PRICEHIGHTOLOW);
  expect(sortedByPriceHighToLow.map(sweet => sweet.id)).toEqual([5, 4, 6]);
});
test("sorts sweets by quantity from low to high", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 7, name: "Besan Ladoo", category: "Gram", image:"", price: 35, quantity: 2 });
  store.addSweet({ id: 8, name: "Kalakand", category: "Milk-Based", image:"", price: 45, quantity: 7 });
  store.addSweet({ id: 9, name: "Chikki", category: "Nut-Based", image:"", price: 20, quantity: 1 });

  const sortedByQuantityLowToHigh = store.sortSweets(sort.QUANTITYLOWTOHIGH);
  expect(sortedByQuantityLowToHigh.map(sweet => sweet.id)).toEqual([9, 7, 8]);
});
test("sorts sweets by quantity from high to low", () => {
  const store = useSweetStore.getState();

  store.addSweet({ id: 10, name: "Balushahi", category: "Fried", image:"", price: 30, quantity: 4 });
  store.addSweet({ id: 11, name: "Rabri", category: "Milk-Based", image:"", price: 60, quantity: 10 });
  store.addSweet({ id: 12, name: "Modak", category: "Festive", image:"", price: 70, quantity: 5 });

  const sortedByQuantityHighToLow = store.sortSweets(sort.QUANTITYHIGHTOLOW);
  expect(sortedByQuantityHighToLow.map(sweet => sweet.id)).toEqual([11, 12, 10]);
});


});