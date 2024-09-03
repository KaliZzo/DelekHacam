const express = require("express");
const delekController = require("./../DelekController/delekController");
const router = express.Router();

router.route("/").get(delekController.getDelekData);

module.exports = router;
