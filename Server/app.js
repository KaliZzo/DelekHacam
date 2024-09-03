const express = require("express");
const cors = require("cors");
const delekRouter = require("./DelekRouter/delekRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/delek", delekRouter);

module.exports = app;
