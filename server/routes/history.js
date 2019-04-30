var express = require('express');
var router = express.Router();
import {select} from "../utils";


/* GET home page. */
router.get('/history', function(req, res, next) {
  select("history", 
  "*", 
  "",
  (results) => {
    let data = JSON.parse(JSON.stringify(results));
    res.json({code: 200, msg: "success", data});
    return
  }),
  () => {
    console.log(">>>>>>>>>>>>>>> ERROR")
    res.json({code: 500, msg: "failed"});
  }
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
