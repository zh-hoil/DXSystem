var express = require("express");
var router = express.Router();
import { select, insert } from "../utils";

/* 用户注册 */
router.post("/sign", function(req, res, next) {
  let { username, password } = req.body;
  console.log(username);
  select(
    "user",
    "*",
    `WHERE username='${username}'`,
    results => {
      if (results.length) {
        res.json({ code: 201, msg: "该账号已注册" });
      } else {
        let keys = ["username", "password"];
        insert(
          "user",
          keys,
          [username, password],
          res => {
            if (res.length) {
              res.json({ code: 200, msg: "注册成功" });
            } else {
              res.json({ code: 500, msg: "注册失败" });
            }
          },
          err => {
            res.json({ code: 500, msg: "failed" });
          }
        );
      }
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

module.exports = router;
