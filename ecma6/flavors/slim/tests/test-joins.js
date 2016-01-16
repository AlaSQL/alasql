var alasql = require("../dist/alasql-slim.js"),
assert = require("assert");

exports.test = function(){
  var data = [{a:1,b:10}, {a:2,b:20}, {a:3,b:30}];
  var data2 = [{a:1,c:2222}, {a:2,c:52}, {a:3,c:334}];
  describe("More Joins",function(){
    it("left-outer",() => {
      var result = alasql(`SELECT
        SUM(x.a+x.b+y.c) as summit FROM ? x
        LEFT OUTER JOIN ? y
        ON x.a = y.a`,[data,data2]);
        var expected = 2674;
        assert.equal(result[0].summit,expected);
    });
  });

}

//exports.test();