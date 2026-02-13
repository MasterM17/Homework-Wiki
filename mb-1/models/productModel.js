const moongose = require("mongoose");

const productSchema = new moongose.Schema({
  ime: {
    type: String,
    required: [true, "Mora da ima ime "],
  },
  kategorija: {
    type: String,
    required: [true, "Mora da ima kategorija"],
  },
  opis: {
    type: String,
    required: [true, "Mora da ima kategorija"],
  },
  cena: {
    type: Number,
  },
  vreme: {
    type: Date,
    default: Date.now,
  },
});

const Product = moongose.model("Products", productSchema);
module.exports = Product;
