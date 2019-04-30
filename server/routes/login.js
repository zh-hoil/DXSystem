var express = require('express');
var router = express.Router();
import {select} from "../utils";


/* GET home page. */
router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  select("user", 
  "*", 
  `WHERE username='${username}'`,
  (results) => {
    if(results.length){
      let data = JSON.parse(JSON.stringify(results))[0];
      if(data.password === password){
        res.json({code: 200, msg: "登录成功"});
        return
      }
      res.json({code: 201, msg: "密码错误"});
    }else{
      res.json({code: 201, msg: "用户尚未注册"});
    }
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
