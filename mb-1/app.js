const express = require("express");
const database = require("./database/database");

const {
  allProducts,
  addProduct,
  deleteProduct,
} = require("./controller/productController");
const { getLanding } = require("./controller/landingController");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database.connectToDataBase();

app.get("/landing", getLanding);
app.get("/api/v1/products", allProducts);
app.post("/api/v1/products", addProduct);
app.delete("/api/v1/products/:id", deleteProduct);

const port = 3500;
app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Sucesfull started server on ${port}`);2
});
