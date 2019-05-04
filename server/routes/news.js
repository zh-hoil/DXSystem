var express = require("express");
var router = express.Router();
import { select } from "../utils";

/* GET home page. */
router.get("/news", function(req, res, next) {
  // if (!req.session.login) {
  //   res.json({
  //     code: 302,
  //     msg: "登录信息过期，请重新登录"
  //   });
  //   return;
  // }
  select(
    "news",
    "*",
    "",
    results => {
      results = JSON.parse(JSON.stringify(results))[0];

      let obj = {};
      for (let key in results) {
        //将每一项解析成数组后添加到obj中
        obj[key] = JSON.parse(results[key]);
      }

      let data = JSON.parse(JSON.stringify(obj));
      res.json({ code: 200, msg: "success", data });
      return;
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
      res.json({ code: 500, msg: "failed" });
    }
  );
});

module.exports = router;
