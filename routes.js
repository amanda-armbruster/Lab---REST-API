const express = require("express");
const { monitorEventLoopDelay } = require("perf_hooks");
const routes = express.Router();

const cartItems = [
  { id: 1, product: "carrots", price: 2.2, quantity: 2 },
  { id: 2, product: "potatoes", price: 5.5, quantity: 1 },
  { id: 3, product: "rosemary", price: 1.0, quantity: 3 },
];

let nextId = 4;

routes.get("/cart-items", (req, res) => {
  const maxPrice = parseInt(req.query.maxPrice);
  const prefix = req.query.prefix;
  const pageSize = parseInt(req.query.pageSize);
  if (maxPrice) {
    const filteredItems = cartItems.filter((item) => item.price <= maxPrice);
    res.json(filteredItems);
  } else if (prefix) {
    const prefixItems = cartItems.filter((item) =>
      item.product.startsWith(prefix)
    );
    res.json(prefixItems);
  } else if (pageSize) {
    const numberOfItems = cartItems.slice(0, pageSize);
    res.json(numberOfItems);
  } else {
    res.json(cartItems);
  }
});

routes.get("/cart-Items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = cartItems.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
  }
});

routes.post("/cart-items", (req, res) => {
  const newItem = req.body;
  newItem.id = nextId++;
  cartItems.push(newItem);

  res.status(201);
  res.json(newItem);
});

module.exports = { routes };
