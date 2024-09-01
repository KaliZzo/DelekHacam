const mongoose = require("mongoose");
const dovenv = require("dotenv");
dotenv.confing({ path: "" });
const app = require("./Server/app");

const DB = process.env.DATABASE;
