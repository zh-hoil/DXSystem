var express = require('express');
var router = express.Router();
import { select, toKeyValue } from "../utils";

router.get('/grade', function(req, res, next) {
  select("grade", 
  "*", 
  "",
  (results) => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({code: 200, msg: "success", data});
      return
  },
  () => {
    console.log(">>>>>>>>>>>>>>> ERROR")
    res.json({code: 500, msg: "failed"});
  })
});

router.get('/branch', function(req, res, next) {
  select("branch", 
  "*", 
  "",
  (results) => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({code: 200, msg: "success", data});
      return
  },
  () => {
    console.log(">>>>>>>>>>>>>>> ERROR")
    res.json({code: 500, msg: "failed"});
  })
});

router.get('/roster/all', function(req, res, next) {
  let sql = "";
  if(Object.keys(req.query).length){
    sql = `WHERE ${toKeyValue(req.query)}`;
  }
  console.log(sql);
  select("roster_all", 
  "*", 
  sql,
  (results) => {
      let data = JSON.parse(JSON.stringify(results));
      res.json({code: 200, msg: "success", data: {total: data.length, data}});
      return
  },
  () => {
    console.log(">>>>>>>>>>>>>>> ERROR")
    res.json({code: 500, msg: "failed"});
  })
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
