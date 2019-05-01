var express = require("express");
var router = express.Router();
import { select, toKeyValue, del, put } from "../utils";

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

router.get("/roster/all", function(req, res, next) {
  let sql = "";
  if (Object.keys(req.query).length) {
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  console.log(sql);
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
