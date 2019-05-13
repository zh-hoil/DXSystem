var express = require("express");
var router = express.Router();
var xlsx = require("node-xlsx");
var urlencode = require("urlencode");
var path = require("path");
var fs = require("fs");
const filePath = path.join(path.resolve(__dirname, "../../"), "/file/");
import { select } from "../utils";

/* GET home page. */
router.get("/export", function(req, res, next) {
  console.log(req.query);
  let { file } = req.query;
  if (file === "all") {
    file = "roster_all";
  }

  select(
    file,
    "*",
    "",
    results => {
      results = JSON.parse(JSON.stringify(results));
      if (results.length === 0) {
        res.json({ code: 200, data: [] });
        return;
      }
      let data = [];
      let colums = Object.keys(results[0]);
      data.push(colums);
      for (let i = 0; i < results.length; i++) {
        let temp = [];
        for (let key in results[i]) {
          temp.push(results[i][key]);
        }
        data.push(temp);
      }

      var buffer = xlsx.build([{ name: file, data }]);

      fs.writeFile(filePath + file + ".xlsx", buffer, "binary", function(err) {
        if (err) {
          res.set("Content-type", "text/html");
          res.send("failed");
          res.end();
        }

        res.set({
          "Content-type": "application/vnd.ms-excel",
          "Content-Disposition":
            "attachment;filename=" + encodeURIComponent(file) + ".xlsx"
        });
        var fReadStream = fs.createReadStream(filePath + file + ".xlsx");
        fReadStream.on("data", chunk => res.write(chunk, "binary"));
        fReadStream.on("end", function() {
          res.end();
        });

        // res.setHeader(
        //   "Content-Type",
        //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        // ); //setHeader一定要写在生成buffer的下面
        // res.setHeader(
        //   "Content-Disposition",
        //   "attachment; filename=" +
        //     ` ${encodeURIComponent(file)}_${Date.now()}.xlsx`
        // ); //不能使用中文
        // res.writeHead(200);

        // res.end(buffer);
      });
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

module.exports = router;
