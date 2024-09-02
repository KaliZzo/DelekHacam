const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");

const app = express();
const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    mongoose.connect(DB);
    console.log("Database Connected");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
};

connectDB();

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
