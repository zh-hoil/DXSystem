var express = require("express");
var router = express.Router();
import { select } from "../utils";

/* GET home page. */
router.get("/structure", function(req, res, next) {
  // if (!req.session.login) {
  //   res.json({
  //     code: 302,
  //     msg: "登录信息过期，请重新登录"
  //   });
  //   return;
  // }

  let totalSql = "";
  let applySql =
    "WHERE apply>0 AND active IS NULL AND develop IS NULL AND ready IS NULL AND approved IS NULL";
  let activeSql =
    "WHERE apply>0 AND active>0 AND develop IS NULL AND ready IS NULL AND approved IS NULL";
  let readySql =
    "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved IS NULL";
  let approvedSql =
    "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved>0";

  select(
    "roster_all",
    "*",
    totalSql,
    results => {
      let total = 0;
      let applyCount = 0;
      let activeCount = 0;
      let readyCount = 0;
      let approvedCount = 0;

      let applyGrade = {};
      let totalGrade = {};
      let activeGrade = {};
      let readyGrade = {};
      let approvedGrade = {};

      results = JSON.parse(JSON.stringify(results));
      total = results.length; //总人数
      results.forEach(item => {
        //计算总人数里面年级分布
        if (!totalGrade[item.grade]) {
          totalGrade[item.grade] = 0;
        } else {
          totalGrade[item.grade]++;
        }

        //入党申请
        if (
          item.apply > 0 &&
          !item.active &&
          !item.develop &&
          !item.ready &&
          !item.approved
        ) {
          applyCount++;
          //计算申请入党人数里面年级分布
          if (!applyGrade[item.grade]) {
            applyGrade[item.grade] = 1;
          } else {
            applyGrade[item.grade]++;
          }
        }

        //积极分子
        if (
          item.apply > 0 &&
          item.active > 0 &&
          !item.develop &&
          !item.ready &&
          !item.approved
        ) {
          activeCount++;
          //计算积极分子人数里面年级分布
          if (!activeGrade[item.grade]) {
            activeGrade[item.grade] = 1;
          } else {
            activeGrade[item.grade]++;
          }
        }

        //预备党员
        if (
          item.apply > 0 &&
          item.active > 0 &&
          item.develop > 0 &&
          item.ready > 0 &&
          !item.approved
        ) {
          readyCount++;
          //计算预备党员人数里面年级分布
          if (!readyGrade[item.grade]) {
            readyGrade[item.grade] = 1;
          } else {
            readyGrade[item.grade]++;
          }
        }

        //正式党员
        if (
          item.apply > 0 &&
          item.active > 0 &&
          item.develop > 0 &&
          item.ready > 0 &&
          item.approved > 0
        ) {
          approvedCount++;
          //计算正式党员人数里面年级分布
          if (!approvedGrade[item.grade]) {
            approvedGrade[item.grade] = 1;
          } else {
            approvedGrade[item.grade]++;
          }
        }
      });
      let apply = {
        count: applyCount,
        ...applyGrade
      };
      let active = {
        count: activeCount,
        ...activeGrade
      };
      let ready = {
        count: readyCount,
        ...readyGrade
      };
      let approved = {
        count: approvedCount,
        ...approvedGrade
      };
      res.json({
        code: 200,
        msg: "success",
        data: { total, apply, active, ready, approved }
      });
    },
    () => {
      console.log(">>>>>>>>>>>>>>> ERROR");
    }
  );

  // select(
  //   "roster_all",
  //   "*",
  //   applySql,
  //   results => {
  //     results = JSON.parse(JSON.stringify(results));
  //     applyCount = results.length;
  //     if (
  //       total > -1 &&
  //       applyCount > -1 &&
  //       activeCount > -1 &&
  //       readyCount > -1 &&
  //       approvedCount > -1
  //     ) {
  //       res.json({
  //         code: 200,
  //         msg: "success",
  //         data: {
  //           total,
  //           applyCount,
  //           activeCount,
  //           readyCount,
  //           approvedCount
  //         }
  //       });
  //     }
  //   },
  //   () => {
  //     console.log(">>>>>>>>>>>>>>> ERROR");
  //   }
  // );

  // select(
  //   "roster_all",
  //   "*",
  //   activeSql,
  //   results => {
  //     results = JSON.parse(JSON.stringify(results));
  //     activeCount = results.length;
  //     if (
  //       total > -1 &&
  //       applyCount > -1 &&
  //       activeCount > -1 &&
  //       readyCount > -1 &&
  //       approvedCount > -1
  //     ) {
  //       res.json({
  //         code: 200,
  //         msg: "success",
  //         data: {
  //           total,
  //           applyCount,
  //           activeCount,
  //           readyCount,
  //           approvedCount
  //         }
  //       });
  //     }
  //   },
  //   () => {
  //     console.log(">>>>>>>>>>>>>>> ERROR");
  //   }
  // );

  // select(
  //   "roster_all",
  //   "*",
  //   readySql,
  //   results => {
  //     results = JSON.parse(JSON.stringify(results));
  //     readyCount = results.length;
  //     if (
  //       total > -1 &&
  //       applyCount > -1 &&
  //       activeCount > -1 &&
  //       readyCount > -1 &&
  //       approvedCount > -1
  //     ) {
  //       res.json({
  //         code: 200,
  //         msg: "success",
  //         data: {
  //           total,
  //           applyCount,
  //           activeCount,
  //           readyCount,
  //           approvedCount
  //         }
  //       });
  //     }
  //   },
  //   () => {
  //     console.log(">>>>>>>>>>>>>>> ERROR");
  //   }
  // );

  // select(
  //   "roster_all",
  //   "*",
  //   approvedSql,
  //   results => {
  //     results = JSON.parse(JSON.stringify(results));
  //     approvedCount = results.length;
  //     if (
  //       total > -1 &&
  //       applyCount > -1 &&
  //       activeCount > -1 &&
  //       readyCount > -1 &&
  //       approvedCount > -1
  //     ) {
  //       res.json({
  //         code: 200,
  //         msg: "success",
  //         data: {
  //           total,
  //           applyCount,
  //           activeCount,
  //           readyCount,
  //           approvedCount
  //         }
  //       });
  //     }
  //   },
  //   () => {
  //     console.log(">>>>>>>>>>>>>>> ERROR");
  //   }
  // );
});

module.exports = router;
