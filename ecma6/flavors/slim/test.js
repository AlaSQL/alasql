var alasql = require("./dist/alasql-slim.js"),
assert = require("assert");

var data = [{a:1,b:10}, {a:2,b:20}, {a:1,b:30}];
var data2 = [{a:1,c:210}, {a:2,c:560}, {a:1,c:110}];
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

describe("Joins",() => {
    var data = [{a:1,b:10}, {a:2,b:20}, {a:3,b:30}];
    var data2 = [{a:1,c:2222}, {a:2,c:52}, {a:3,c:334}];
    it("inner-join-to-sum",() => {
      var res = alasql("SELECT * FROM ?",[data]);
      //js style summation
      var jssum = data.map(function(rec,i){
        var n = data2[i].c + rec.a + rec.b;
        return n;
      }).reduce((memo,x) => (memo+x));
      //sql style sum
      var sqlsum = alasql(`SELECT
        SUM(x.a+x.b+y.c) as all_of_it FROM ? x
        INNER JOIN ? y
        ON x.a = y.a`,[data,data2])[0].all_of_it;
      assert.deepEqual(jssum,sqlsum);
    });
  });


describe("Order",() => {
  it("order-by-number-then-string",() => {
    var data = [{a:4504,b:"1"},{a:56,b:"2"},{a:56,b:"1"}];
    var expect = [ { a: 4504, b: '1' }, { a: 56, b: '2' }, { a: 56, b: '1' } ];
    var result = alasql(`SELECT a,b FROM ? ORDER BY a DESC,b DESC`,[disorder])
  });
});









