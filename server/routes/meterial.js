var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var multer = require("multer"); //引入multer

const filePath = path.join(path.resolve(__dirname, "../../"), "/file/");
var upload = multer({ dest: filePath }); //设置上传文件存储地址
import { select, insert, toKeyValue, del, put } from "../utils";

router.get("/meterial", function(req, res, next) {
  // if (!req.session.login) {
  //   res.json({
  //     code: 302,
  //     msg: "登录信息过期，请重新登录"
  //   });
  //   return;
  // }
  select(
    "meterial",
    "*",
    "",
    results => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({ code: 200, msg: "success", data });
      return;
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

//上传文件
router.post("/meterial/upload", upload.single("file"), function(
  req,
  res,
  next
) {
  req.header("Content-Type", "multipart/form-data");
  res.header("Content-Type", "application/json");
  var file = req.file;
  if (file) {
    var originalname = file.originalname;
    let oldName = `${filePath}${file.filename}`;
    let newName = `${filePath}${originalname}`;
    //文件重命名
    fs.rename(oldName, newName, function(err) {
      if (err) {
        res.json({
          code: 500,
          msg: "server failed"
        });
        throw err;
      }
      res.json({
        code: 200,
        msg: "upload successful",
        data: { fileId: originalname }
      });
    });
  } else {
    res.json({
      code: 201,
      msg: "upload failed"
    });
  }
});

router.post("/meterial/confirm", function(req, res, next) {
  res.json({ code: 200, msg: "successful" });
});

module.exports = router;
