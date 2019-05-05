var express = require("express");
var router = express.Router();
import { select } from "../utils";

/* GET home page. */
router.post("/login", function(req, res, next) {
  let { username, password, remember } = req.body;
  select(
    "user",
    "*",
    `WHERE username='${username}'`,
    results => {
      if (results.length) {
        let data = JSON.parse(JSON.stringify(results))[0];
        if (data.password === password) {
          req.session.login = true;

          if (remember === "true") {
            //设置cookie失效时间为一天
            req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
          }
          res.header("Content-Type", "application/x-www-form-urlencoded");
          res.json({ code: 200, msg: "登录成功" });
          return;
        }
        res.json({ code: 201, msg: "密码错误" });
      } else {
        res.json({ code: 201, msg: "用户尚未注册" });
      }
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

module.exports = router;
