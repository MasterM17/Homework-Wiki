const Product = require("../models/productModel");



const allProducts = async (req, res) => {
  try {
    const products = await Product.find(req.body);
    res.status(201).json({
      status: "Sucess",
      data: {
        products: products,
      },
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      status: "Sucess",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  addProduct,
  allProducts,
};
