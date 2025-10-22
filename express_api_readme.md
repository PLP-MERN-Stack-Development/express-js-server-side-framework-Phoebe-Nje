# Express.js Week 2 RESTful API Assignment

## Overview
This project is a RESTful API built using **Express.js**. It provides CRUD operations for a `products` resource, along with middleware for logging, authentication, validation, and error handling. Advanced features like filtering, pagination, and search are included.

---

## Table of Contents
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Examples](#examples)
- [Project Structure](#project-structure)

---

## Technologies
- Node.js v18.x
- Express.js v5.x
- UUID v8.x
- body-parser

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/express-week2.git
   ```
2. Navigate to the project folder:
   ```bash
   cd express-week2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Server
Start the server using:

```bash
npm start
```

Server runs at: `http://localhost:3000`  
Root endpoint: `http://localhost:3000/`  

---

## API Endpoints

### **GET /api/products**
- Returns all products.  
- Headers: `x-api-key: 12345`  

### **GET /api/products/:id**
- Returns a product by ID.  
- Headers: `x-api-key: 12345`  

### **POST /api/products**
- Creates a new product.  
- Headers: `x-api-key: 12345`  
- Body (JSON):
```json
{
  "name": "Phone",
  "description": "Smartphone",
  "price": 500,
  "category": "electronics",
  "inStock": true
}
```

### **PUT /api/products/:id**
- Updates a product by ID.  
- Headers: `x-api-key: 12345`  
- Body (JSON) same as POST.  

### **DELETE /api/products/:id**
- Deletes a product by ID.  
- Headers: `x-api-key: 12345`  

---

## Middleware
- **Logger**: Logs request method, URL, and timestamp.  
- **Authentication**: Checks `x-api-key` header.  
- **Validation**: Ensures product data is valid.  
- **Error handling**: Global error handling for not found and validation errors.  

---

## Examples

### Get all products
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Headers @{ "x-api-key" = "12345" }
```

### Create a product
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method POST -Headers @{ "x-api-key" = "12345" } -Body '{"name":"Phone","description":"Smartphone","price":500,"category":"electronics"}' -ContentType "application/json"
```

---

## Project Structure
```
express-week2/
│
├─ server.js
├─ package.json
├─ package-lock.json
├─ README.md
└─ node_modules/
```

---

## Notes
- API key required for all `/api/products` routes.
- Product IDs are generated using **UUID v4**.
- Data is stored in-memory (no database). Data will reset on