var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'dxsystem'
});
 
connection.connect();

export function select(table, keys, sql, success, failed){
    connection.query(`SELECT ${keys} from ${table} ${sql}`, function (error, results, fields) {
    if (error){
      failed(error);
      return
    }
    success(results);
  });
}

export function del(){

}