// server.js
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Custom middleware - Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Custom middleware - API key authentication
const API_KEY = "12345";
app.use((req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid or missing API key" });
  }
  next();
});

// Product data (in-memory)
let products = [
  {
    id: uuidv4(),
    name: "Laptop",
    description: "High-performance laptop",
    price: 1200,
    category: "electronics",
    inStock: true,
  },
  {
    id: uuidv4(),
    name: "Shoes",
    description: "Running shoes",
    price: 80,
    category: "fashion",
    inStock: true,
  },
  {
    id: uuidv4(),
    name: "Book",
    description: "Inspirational novel",
    price: 20,
    category: "books",
    inStock: true,
  },
];

// Routes

// GET all products (with search, category filter, and pagination)
app.get("/api/products", (req, res) => {
  let result = [...products];
  const { search, category, page = 1, limit = 5 } = req.query;

  // Filter by search
  if (search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by category
  if (category) {
    result = result.filter((p) => p.category === category.toLowerCase());
  }

  // Pagination
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + parseInt(limit));

  res.json(paginated);
});

// GET single product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// POST create a new product
app.post("/api/products", (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name, price, or category" });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category: category.toLowerCase(),
    inStock: inStock ?? true,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update a product
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { name, description, price, category, inStock } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (category) product.category = category.toLowerCase();
  if (inStock !== undefined) product.inStock = inStock;

  res.json(product);
});

// DELETE a product
app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const deleted = products.splice(index, 1);
  res.json({ message: "Product deleted", deleted });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
