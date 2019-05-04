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
      return;
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
  let sql =
    "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved IS NULL";
  if (Object.keys(req.query).length) {
    sql += ` AND ${toKeyValue(req.query)}`;
  }
  console.log(sql);
  select(
    "roster_all",
    "name, sex, birth, id, apply, active, develop, assessment_1, assessment_2, mark_1, mark_2, scholarship_1, scholarship_2, fail, discipline, percent, adition",
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({
        code: 200,
        msg: "success",
        data: { total: data.length, data }
      });
      return;
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
  let sql =
    "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved IS NULL";
  if (Object.keys(req.query).length) {
    sql += ` AND ${toKeyValue(req.query)}`;
  }
  console.log(sql);
  select(
    "roster_all",
    "name, sex, id, birth, ori_place, nation, id_card, ready, merit_1, merit_2, shortcoming_1, shortcoming_2, sponsor_1, sponsor_2, adition",
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({
        code: 200,
        msg: "success",
        data: { total: data.length, data }
      });
      return;
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
  let sql =
    "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved>0";
  if (Object.keys(req.query).length) {
    sql += ` AND ${toKeyValue(req.query)}`;
  }
  console.log(sql);
  select(
    "roster_all",
    "name, sex, id, apply, active, develop, ready, approved, assessment_1, assessment_2, mark_1, mark_2, fail, discipline, percent, adition",
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({
        code: 200,
        msg: "success",
        data: { total: data.length, data }
      });
      return;
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
