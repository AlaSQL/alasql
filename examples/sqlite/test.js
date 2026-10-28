var fs = require('fs');
var SQL = require('./sql.js');
var data = fs.readFileSync('./Chinook_Sqlite.sqlite');
var sqldb = new SQL.Database(data);
console.log(sqldb);
