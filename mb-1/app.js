const express = require("express");
const mongoose = require("mongoose");
const { allProducts, addProduct } = require("./controller/productController");
const { getLanding } = require("./controller/landingController");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api/v1/landing", getLanding);
app.get("/api/v1/products", allProducts);
app.post("/api/v1/products", addProduct);

const port = 3500;
app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Sucesfull started server on ${port}`);
});
