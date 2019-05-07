var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "dxsystem"
});

connection.connect();

//党支部相关
let branchKeys = "branch";
let branchColumns = "branch varchar(255) PRIMARY KEY";
let branchSql = "WHERE branch IS NOT NULL";

//年级相关
let gradeKeys = "grade";
let gradeColumns = "grade varchar(255) PRIMARY KEY";
let gradeSql = "WHERE grade IS NOT NULL";

//入党申请相关
let applyKeys = "branch, grade, class, id, name, birth, apply";
let applyColumns =
  "branch varchar(255), grade varchar(255), class double, id int(11) PRIMARY KEY, name varchar(255), birth double, apply double";
let applySql =
  "WHERE apply>0 AND active IS NULL AND develop IS NULL AND ready IS NULL AND approved IS NULL";

//积极分子相关
let activeKeys = "branch, grade, class, id, name, birth, apply, active";
let activeColumns =
  "branch varchar(255), grade varchar(255), class double, id int(11) PRIMARY KEY, name varchar(255), birth double, apply double, active double";
let activeSql =
  "WHERE apply>0 AND active>0 AND develop IS NULL AND ready IS NULL AND approved IS NULL";

//拟发展对象相关
let candidateKeys =
  "branch, grade, class, id, name, birth, apply, active, develop";
let candidateColumns =
  "branch varchar(255), grade varchar(255), class double, id int(11) PRIMARY KEY, name varchar(255), birth double, apply double, active double, develop double";
let candidateSql =
  "WHERE apply>0 AND active>0 AND develop>0 AND ready IS NULL AND approved IS NULL";

//预备党员相关
let readyKeys =
  "branch, grade, class, id, name, birth, apply, active, develop, ready, sponsor_1, sponsor_2";
let readyColumns =
  "branch varchar(255), grade varchar(255), class double, id int(11) PRIMARY KEY, name varchar(255), birth double, apply double, active double, develop double, ready double, sponsor_1 varchar(255), sponsor_2 varchar(255)";
let readySql =
  "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved IS NULL";

//正式党员相关
let approvedKeys =
  "branch, grade, class, id, name, birth, apply, active, develop, ready,approved, leadership, sponsor_1, sponsor_2";
let approvedColumns =
  "branch varchar(255), grade varchar(255), class double, id int(11) PRIMARY KEY, name varchar(255), birth double, apply double, active double, develop double, ready double,approved double, leadership varchar(255), sponsor_1 varchar(255), sponsor_2 varchar(255)";
let approvedSql =
  "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved>0";

// //表一相关
// let tableKeys_1 =
//   "branch, grade, class, id, name, birth, apply, active, develop, ready,approved, leadership, sponsor_1, sponsor_2";
// let tableColumns_1 =
//   "branch varchar(255), grade varchar(255), class double, id int(11) PRIMARY KEY, name varchar(255), birth double, apply double, active double, develop double, ready double,approved double, leadership varchar(255), sponsor_1 varchar(255), sponsor_2 varchar(255)";
// let tableSql_1 =
//   "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved>0";

//表二相关
let tableKeys_2 =
  "name, sex, birth, id, apply, active, develop, assessment_1, assessment_2, mark_1, mark_2, scholarship_1, scholarship_2, fail, discipline, percent, adition";
let tableColumns_2 =
  "name varchar(255), sex varchar(255), birth double, id int(11) PRIMARY KEY, apply double, active double, develop double, assessment_1 varchar(255), assessment_2 varchar(255), mark_1 float, mark_2 float, scholarship_1 varchar(255), scholarship_2 varchar(255), fail varchar(255), discipline varchar(255), percent float, adition varchar(255)";
let tableSql_2 =
  "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved IS NULL";

//表三相关
let tableKeys_3 =
  "name, sex, id, birth, ori_place, nation, id_card, ready, merit_1, merit_2, shortcoming_1, shortcoming_2, sponsor_1, sponsor_2, adition";
let tableColumns_3 =
  "name varchar(255), sex varchar(255), id int(11) PRIMARY KEY, birth double, ori_place varchar(255), nation varchar(255), id_card double, ready double, merit_1 varchar(255), merit_2 varchar(255), shortcoming_1 varchar(255), shortcoming_2 varchar(255), sponsor_1 varchar(255), sponsor_2 varchar(255), adition varchar(255)";
let tableSql_3 =
  "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved IS NULL";

//表四相关
let tableKeys_4 =
  "name, sex, id, apply, active, develop, ready, approved, assessment_1, assessment_2, mark_1, mark_2, scholarship_1, scholarship_2, discipline, fail, adition";
let tableColumns_4 =
  "name varchar(255), sex varchar(255), id int(11) PRIMARY KEY, apply double, active double, develop double, ready double, approved double, assessment_1 varchar(255), assessment_2 varchar(255), mark_1 float, mark_2 float, scholarship_1 varchar(255), scholarship_2 varchar(255), discipline varchar(255), fail varchar(255), adition varchar(255)";
let tableSql_4 =
  "WHERE apply>0 AND active>0 AND develop>0 AND ready>0 AND approved>0";

//查询
export function select(table, keys, sql, success, failed) {
  connection.query(`SELECT ${keys} from ${table} ${sql}`, function(
    error,
    results,
    fields
  ) {
    if (error) {
      failed(error);
      return;
    }
    success(results);
  });
}

//插入
export function insert(table, keys, data, success, failed) {
  let values = [];
  for (let i = 0; i < data.length; i++) {
    values[i] = "?";
  }
  //传入的data的长度有可能与keys的长度不同 需要做匹配
  keys = keys.slice(0, data.length);

  connection.query(
    `INSERT INTO ${table}(${keys.join(",")}) VALUES(${values.join(",")})`,
    data,
    function(error, result) {
      if (error) {
        failed(error);
        return;
      }
      success(result);
    }
  );
}

//删除
export function del(table, sql, success, failed) {
  connection.query(`DELETE from ${table} ${sql}`, function(error, result) {
    if (error) {
      failed(error);
      return;
    }
    success(result);
  });
}

//修改
export function put(table, key, data, success, failed) {
  connection.query(
    `UPDATE ${table} SET ${key} = ? WHERE id = ?`,
    data,
    function(error, result) {
      if (error) {
        failed(error);
        return;
      }
      success(result);
    }
  );
}

//建表
function createTable(name, sql, success, failed) {
  connection.query(`CREATE TABLE ${name}(${sql})`, function(err, result) {
    if (err) {
      failed(err);
    }
    success(result);
  });
}

// //查询数据库中的某张表
// function selectTable(table, dbname, success, failed) {
//   connection.query(
//     `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA="${dbname}" AND TABLE_NAME="${table}"`,
//     function(err, result) {
//       if (err) {
//         failed(err);
//       }
//       success(result);
//     }
//   );
// }
//重写某张表
function override(table, keys, sql, success) {
  select(
    "roster_all",
    keys,
    sql,
    results => {
      let data = JSON.parse(JSON.stringify(results));
      let count = 0;
      if (data.length === 0) {
        success();
        return;
      }
      data.forEach(item => {
        let keys = Object.keys(item);
        let temp = [];
        for (let i = 0; i < keys.length; i++) {
          temp.push(item[keys[i]]);
        }
        //插入数据
        insert(
          table,
          keys,
          temp,
          result => {
            count++;
            if (count === data.length) {
              success();
            }
          },
          err => {
            throw err;
          }
        );
      });
    },
    err => {
      throw err;
    }
  );
}
export function newTable(table, keys, columns, sql, success) {
  //删除表
  connection.query(`DROP TABLE IF EXISTS ${table}`, function(err, result) {
    if (err) {
      throw err;
    }
    console.log(JSON.parse(JSON.stringify(result)));
    //建立表
    createTable(
      table,
      columns,
      result => {
        result = JSON.parse(JSON.stringify(result));
        if (result) {
          //插入数据
          override(table, keys, sql, success);
        }
      },
      err => {
        throw err;
      }
    );
  });
}

export function newTables(res) {
  let tableCount = 0;
  newTable("branch", branchKeys, branchColumns, branchySql, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({ code: 200, msg: "successful" });
    }
  });
  newTable("grade", gradeKeys, gradeColumns, gradeSql, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({ code: 200, msg: "successful" });
    }
  });
  newTable("apply", applyKeys, applyColumns, applySql, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({ code: 200, msg: "successful" });
    }
  });
  newTable("active", activeKeys, activeColumns, activeSql, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({ code: 200, msg: "successful" });
    }
  });
  newTable(
    "candidate",
    candidateKeys,
    candidateColumns,
    candidateSql,
    result => {
      tableCount++;
      if (tableCount === 10) {
        res.json({
          code: 200,
          msg: "successful"
        });
      }
    }
  );
  newTable("ready", readyKeys, readyColumns, readySql, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({
        code: 200,
        msg: "successful"
      });
    }
  });
  newTable("approved", approvedKeys, approvedColumns, approvedSql, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({
        code: 200,
        msg: "successful"
      });
    }
  });

  //表二-表四
  newTable("table_2", tableKeys_2, tableColumns_2, tableSql_2, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({
        code: 200,
        msg: "successful"
      });
    }
  });
  newTable("table_3", tableKeys_3, tableColumns_3, tableSql_3, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({
        code: 200,
        msg: "successful"
      });
    }
  });
  newTable("table_4", tableKeys_4, tableColumns_4, tableSql_4, result => {
    tableCount++;
    if (tableCount === 10) {
      res.json({
        code: 200,
        msg: "successful"
      });
    }
  });
}

//生成查询键值对
export function toKeyValue(obj) {
  let str = "";
  for (let key in obj) {
    str += ` AND ${key}="${obj[key]}"`;
  }
  return str.substr(5);
}
