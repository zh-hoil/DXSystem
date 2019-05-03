var express = require("express");
var router = express.Router();
import { select, insert } from "../utils";
var path = require("path");
var xlsx = require("node-xlsx");
var filePath = path.join(path.resolve(__dirname, "../../"), "/file/test.xlsx");

router.post("/test", function(req, res, next) {
  console.log(req.body);
});

router.get("/test", function(req, res, next) {
  //获取到所有sheets
  console.log(filePath);
  var sheets = xlsx.parse(filePath);
});

module.exports = router;
