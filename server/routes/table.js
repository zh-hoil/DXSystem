var express = require("express");
var router = express.Router();
import { select } from "../utils";

//获取表一信息
router.get("/table/table_1", function(req, res, next) {
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

//获取表二信息
router.get("/table/table_2", function(req, res, next) {
  if (!req.session.login) {
    res.json({
      code: 302,
      msg: "登录信息过期，请重新登录"
    });
    return;
  }
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  select(
    "table_2",
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
    err => {
      console.log(err);
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

//获取表三信息
router.get("/table/table_3", function(req, res, next) {
  if (!req.session.login) {
    res.json({
      code: 302,
      msg: "登录信息过期，请重新登录"
    });
    return;
  }
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  select(
    "table_3",
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
    err => {
      console.log(err);
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

//获取表四信息
router.get("/table/table_4", function(req, res, next) {
  if (!req.session.login) {
    res.json({
      code: 302,
      msg: "登录信息过期，请重新登录"
    });
    return;
  }
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  select(
    "table_4",
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
    err => {
      console.log(err);
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

// router.get('/login', function(req, res, next) {
//   select("user",
//   "*",
//   "id=1",
//   (results) => {
//     let data = JSON.parse(JSON.stringify(results));
//     res.json({code: 200, msg: "success", data});
//   }),
//   () => {
//     res.json({code: 500, msg: "failed"});
//   }
// });

module.exports = router;
