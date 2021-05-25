var express = require("express");
var router = express.Router();
const dbConnection = require("../lib/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("ini adalah category");
});

router.get("/add", function (req, res, next) {
  res.render("ini adalah add category");
});

module.exports = router;
