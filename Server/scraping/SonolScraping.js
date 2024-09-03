const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Sonol = require("./../model/SonolModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

const url = "https://www.sonol.co.il/gas-stations/price_list/";
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

async function getHTML() {
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    },
  });
  return html;
}

async function scrapeAndSave() {
  try {
    const html = await getHTML();
    const $ = cheerio.load(html);

    const firstTd = $("tr:contains('95') td").eq(1).text().trim();
    const secondTd = $("tr:contains('98') td").eq(1).text().trim();
    const thirdTd = $("tr:contains('סולר') td").eq(1).text().trim();

    const delekData = {
      Benzin95: firstTd,
      Benzin98: secondTd,
      Solar: thirdTd,
    };

    const newSonolData = new Sonol(delekData);
    await newSonolData.save();
    console.log("Data saved successfully in Sonol collection");
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    mongoose.connection.close(); // Close the connection after the operation
  }
}

scrapeAndSave();
