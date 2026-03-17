const Product = require("../models/productModel");

const getLanding = async (req, res) => {
  try {
    console.log("The URL Query is:", req.query);
    let filter = {};
    if (req.query.naslov) {
      filter.$or = [
        { ime: { $regex: req.query.naslov, $options: "i" } },
        { kategorija: { $regex: req.query.naslov, $options: "i" } },
      ];
    }
    const products = await Product.find(filter);
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
