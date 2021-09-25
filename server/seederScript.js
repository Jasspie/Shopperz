require("dotenv").config();

const productsData = require("./data/Products");
const usersData = require("./data/Users");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(productsData);
    await User.deleteMany({});
    await User.insertMany(usersData);
    console.log("Data import success");
    process.exit();
  } catch (error) {
    console.error("Data import error", error);
    process.exit(1);
  }
};

importData();
