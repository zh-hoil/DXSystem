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

  sheets.forEach(function(sheet) {
    let data = sheet.data;
    //i=0时，表头信息
    for (let i = 1; i < data.length; i++) {
      //由于数据库查询有延时，所以使用闭包来保存每个i的值
      (function(i) {
        let id = data[i][3];
        console.log(data);
        //先查询表中是否有该数据 如果有 则跳过该记录
        select(
          "roster_all",
          "*",
          `WHERE id=${id}`,

          results => {
            console.log("<<<<<<<<<<<<<>>>>>>>>>>>>>");
            results = JSON.parse(JSON.stringify(results));
            if (results.length) {
              console.log("有该记录，退出");
              if (!data[i + 1] || !data[i + 1].length) {
                res.json({
                  code: 201,
                  msg: "重复添加"
                });
                return;
              }
            } else {
              console.log("没有该记录，添加");

              //没有该记录 则插入
              insert(
                "roster_all",
                data[0],
                data[i],
                result => {
                  if (!data[i + 1] || !data[i + 1].length) {
                    res.json({
                      code: 200,
                      msg: "success"
                    });
                    return;
                  }
                },
                err => {
                  res.json({
                    code: 500,
                    msg: "insert failed"
                  });
                  return;
                }
              );
            }
          },
          () => {
            console.log(id);
            res.json({
              code: 500,
              msg: "failed"
            });
          }
        );
        return;
      })(i);
    }
  });
});

module.exports = router;
