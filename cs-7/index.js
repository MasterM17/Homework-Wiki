const express = require("express");
const app = express();

const products = require("./products.json"); 

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/category/:category", (req, res) => {
  const category = req.params.category;
  let filteredProd = products.filter(
    (prod) => prod.name.toLowerCase() === category.toLowerCase(),
  );
  if (!filteredProd.length === 0) {
    return res.send("Product not found");
  }
  res.json(filteredProd);
});

app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id);
  const singleProduct = products.find((prod) => prod.id === productId);

  if (!singleProduct) {
    return res.status(404).send("Product not found");
  }

  res.json(singleProduct);
});

app.get("/products/cheaper-than/:priceNum", (req, res) => {
  let price = Number(req.params.priceNum);
  let result = products.filter((prod) => prod.price <= price);
  if (!result.length === 0) {
    return res.send("Produnct not found");
  }

  res.json(result);
});

//server

app.listen(3000, (err) => {
  if (err) return console.log(err.message);
  console.log("Server started on port 3000");
});
