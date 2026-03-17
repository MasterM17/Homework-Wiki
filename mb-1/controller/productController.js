const Product = require("../models/productModel");

const allProducts = async (req, res) => {
  try {
    const products = await Product.find(req.body);
    res.status(200).json({
      status: "Sucess",
      data: {
        products: products,
      },
    });
  } catch (err) {
    res.status(500).json({
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
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletId = await Product.findByIdAndDelete(req.params.id);
    if (!deletId) {
      return res.status(404).json({
        status: "Fail",
        message: "Nema takov product",
      });
    }
    res.status(200).json({
      status: "sucess",
      data: {
        product: deletId,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  addProduct,
  allProducts,
  deleteProduct,
};
