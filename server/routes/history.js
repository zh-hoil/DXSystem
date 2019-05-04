var express = require("express");
var router = express.Router();
import { select } from "../utils";

/* GET home page. */
router.get("/history", function(req, res, next) {
  if (!req.session.login) {
    res.json({
      code: 302,
      msg: "登录信息过期，请重新登录"
    });
    return;
  }
  select(
    "history",
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

module.exports = router;
