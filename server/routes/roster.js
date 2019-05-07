var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var xlsx = require("node-xlsx");
var multer = require("multer"); //引入multer
const filePath = path.join(path.resolve(__dirname, "../../"), "/file/");
var upload = multer({ dest: filePath }); //设置上传文件存储地址
import {
  select,
  insert,
  del,
  put,
  newTables,
  toKeyValue
} from "../utils";

//获取年级信息
router.get("/grade", function(req, res, next) {
  select(
    "grade",
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

//获取支部信息
router.get("/branch", function(req, res, next) {
  select(
    "branch",
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

//获取入党批次信息
router.get("/ready", function(req, res, next) {
  res.json({ code: 200, msg: "success", data: [] });
  // select(
  //   "ready",
  //   "*",
  //   "",
  //   results => {
  //     let data = JSON.parse(JSON.stringify(results));
  //     res.json({ code: 200, msg: "success", data });
  //     return;
  //   },
  //   () => {
  //     console.log(">>>>>>>>>>>>>>> ERROR");
  //     res.json({ code: 500, msg: "failed" });
  //   }
  // );
});

//获取所有人员信息
router.get("/roster/all", function(req, res, next) {
  // if (!req.session.login) {
  //   res.json({
  //     code: 302,
  //     msg: "登录信息过期，请重新登录"
  //   });
  //   return;
  // }
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  select(
    "roster_all",
    "*",
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      if (data.length) {
        res.json({
          code: 200,
          msg: "success",
          data: { total: data.length, data }
        });
      } else {
        res.json({
          code: 201,
          msg: "没有数据, 请先上传数据表格",
          data: []
        });
      }
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

//获取积极分子数据
router.get("/roster/activist", function(req, res, next) {
  // if (!req.session.login) {
  //   res.json({
  //     code: 302,
  //     msg: "登录信息过期，请重新登录"
  //   });
  //   return;
  // }
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  select(
    "active",
    "*",
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({
        code: 200,
        msg: "success",
        data: { total: data.length, data }
      });
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});
//获取拟发展对象数据
router.get("/roster/candidate", function(req, res, next) {
  // if (!req.session.login) {
  //   res.json({
  //     code: 302,
  //     msg: "登录信息过期，请重新登录"
  //   });
  //   return;
  // }
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  select(
    "candidate",
    "*",
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({
        code: 200,
        msg: "success",
        data: { total: data.length, data }
      });
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});
//获取预备党员数据
router.get("/roster/ready", function(req, res, next) {
  // if (!req.session.login) {
  //   res.json({
  //     code: 302,
  //     msg: "登录信息过期，请重新登录"
  //   });
  //   return;
  // }
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  select(
    "ready",
    "*",
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({
        code: 200,
        msg: "success",
        data: { total: data.length, data }
      });
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

//获取正式党员数据
router.get("/roster/approved", function(req, res, next) {
  // if (!req.session.login) {
  //   res.json({
  //     code: 302,
  //     msg: "登录信息过期，请重新登录"
  //   });
  //   return;
  // }
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  select(
    "approved",
    "*",
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({
        code: 200,
        msg: "success",
        data: { total: data.length, data }
      });
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

//删除某条数据
router.delete("/roster/all/delete", function(req, res, next) {
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  } else {
    res.json({ code: 500, msg: "参数错误" });
    return;
  }
  console.log(sql);
  del(
    "roster_all",
    sql,
    result => {
      res.json({ code: 200, msg: "delete successfully" });
    },
    err => {
      res.json({ code: 200, msg: "delete failed" });
    }
  );
});

//更新数据
router.put("/roster/all/update", function(req, res, next) {
  let data = [];
  let params = JSON.parse(req.body.params);
  if (Object.keys(params).length > 1) {
    let key = "";
    Object.keys(params).map((item, index) => {
      data.push(params[item]);
      if (item !== "id") {
        key = item;
      }
    });
    data.reverse();
    put(
      "roster_all",
      key,
      data,
      result => {
        res.json({ code: 200, msg: "update successfully" });
      },
      err => {
        res.json({ code: 500, msg: "更新失败" });
      }
    );
  } else {
    res.json({ code: 500, msg: "参数错误" });
    return;
  }
});

//上传文件
router.post("/roster/all/upload", upload.single("file"), function(
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

//新建大表
router.post("/roster/all/confirm", function(req, res, next) {
  let { fileId } = req.body;
  let sheets = xlsx.parse(filePath + fileId);
  let sheet = sheets[0];
  let data = sheet.data;
  //i=0时，表头信息
  let flag = false;
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    //由于数据库查询有延时，所以使用闭包来保存每个i的值
    (function(i) {
      let id = data[i][3];
      if (!id) {
        return;
      }
      if (flag) {
        return;
      }

      //先查询表中是否有该数据 如果有 则跳过该记录
      select(
        "roster_all",
        "*",
        `WHERE id=${id}`,

        results => {
          console.log("<<<<<<<<<<<<<>>>>>>>>>>>>>");
          results = JSON.parse(JSON.stringify(results));
          if (results.length) {
            count++;
            if (count === data.length - 1) {
              res.json({ code: 200, msg: "successful" });
            }
            console.log("有该记录，退出");
          } else {
            //没有该记录 则插入
            insert(
              "roster_all",
              data[0],
              data[i],
              result => {
                count++;
                if (count === data.length - 1) {
                  //重写ready表
                  newTables(res);
                }
                console.log("插入成功的id为：" + id);
              },
              err => {
                console.log("没有该记录，但是添加发生错误");
                flag = true;
                res.json({
                  code: 500,
                  msg: "insert failed"
                });
              }
            );
          }
        },
        err => {
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

// router.get('/login', function(req, res, next) {
//   select("user",
//   "*",
//   "id=1",
//   (results) => {
//     let data = JSON.parse(JSON.stringify(results));
//     res.json({code: 200, msg: "success", data});
//   },
//   () => {
//     res.json({code: 500, msg: "failed"});
//   })
// });

module.exports = router;
