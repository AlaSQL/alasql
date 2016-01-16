var alasql = require("../dist/alasql-slim.js"),
assert = require("assert");

var data = [{a:1,b:"a"}, {a:2,b:"b"}, {a:1,b:"c"}];

exports.test = function(){

  describe("Case",() => {
    it("basic-syntax",() => {
      var expect = "apple";
      var result = alasql(`
        SELECT
        CASE b
        WHEN 'a' THEN 'apple'
        WHEN 'b' THEN 'bear'
        ELSE 'crystal'
        END AS case_test
        FROM ?
        WHERE b='a'
      `,[data])[0].case_test;
      assert.deepEqual(result,expect);
    });

    it("other-syntax",() => {
      var expect = "crystal";
      var result = alasql(`
        SELECT
        CASE
        WHEN b='a' THEN 'apple'
        WHEN b='b' THEN 'bear'
        ELSE 'crystal'
        END AS case_test
        FROM ?
        WHERE b='c'
      `,[data])[0].case_test;
      assert.deepEqual(result,expect);
    });
  });



};
