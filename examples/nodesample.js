//
// AlaSQL node.js sample
//

var alasql = require('alasql');

var db = new alasql.Database();

db.exec("CREATE TABLE test (one INT, two INT)");
db.tables.test.data = [   // You can mix SQL and JavaScript
    {one:3,two:4},
    {one:5,two:6},
];

var res = db.exec("SELECT * FROM test ORDER BY two DESC");

console.log(res);
