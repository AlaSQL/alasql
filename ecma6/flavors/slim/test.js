var alasql = require("./dist/alasql-slim.js"),
assert = require("assert");

var data = [{a:1,b:10}, {a:2,b:20}, {a:1,b:30}];
var statement = 'SELECT a, SUM(b) AS b FROM ? GROUP BY a';
var expected = [{"a":1,"b":40},{"a":2,"b":20}];


alasql.parse(statement);
describe("Small Rollup/ECMA6 test",function(){
  it("Parse",function(){
    alasql.parse(statement);
  });
  it("Compile",function(){
    alasql.compile(statement);
  });
  it("Execute properly",function(){
    var res = alasql(statement,[data]);
    assert.deepEqual(expected,res);
  });
});



describe("Select",() => {
  it("*",() => {
    var res = alasql("SELECT * FROM ?",[data]);
    assert.deepEqual(res,data);
  });
  it("where",() => {
    var res = alasql("SELECT * FROM ? WHERE a=1",[data]);
    assert.deepEqual(res,[{a:1,b:10}, {a:1,b:30}]);
  });
  it("where2",() =>{
    var data = [{a:"1",b:"2"},{a:"2",b:"1"}];
    var res = alasql(`SELECT a FROM ? WHERE a='1' AND b='2'`,[data]);
    assert.deepEqual(res,[{a:"1"}])
  });
  it("Literals",() => {
    var res = alasql("SELECT (1+1-7)/14 AS N, 'String' as S FROM ?",[data])[0];
    assert.deepEqual({n:((1+1-7)/14),s:"String"},res);
  });
});









