const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: `${__dirname}/../../config.env` });

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const initDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Successfully connected to DATABASE");
  } catch (err) {
    console.log("Error with Database");
  }
};

module.exports = {
  initDB,
};
