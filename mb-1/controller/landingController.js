const Product = require("../models/productModel");

const getLanding = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("landing", {
      products: products,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Database error");
  }
};

module.exports = {
  getLanding,
};
