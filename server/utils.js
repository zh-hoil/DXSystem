var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "dxsystem"
});

connection.connect();

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

export function toKeyValue(obj) {
  let str = "";
  for (let key in obj) {
    str += ` AND ${key}="${obj[key]}"`;
  }
  return str.substr(5);
}

export function del(table, sql, success, failed) {
  connection.query(`DELETE from ${table} ${sql}`, function(error, result) {
    if (error) {
      failed(error);
      return;
    }
    success(result);
  });
}

export function put(table, key, data, success, failed) {
  console.log("4");
  console.log(data);
  console.log("5");
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
