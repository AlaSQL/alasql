var alasql = require("../dist/alasql-slim.js"),
assert = require("assert");



exports.test = function(){

  describe("Operators",function(){
    it("like",() => {
        var data = [{x:"apple"},{x:"bad apple"},{x:"applet"},{x:"banana"}];
        var expected = data.slice(0);
        expected.pop();
        var result = alasql(`SELECT x FROM ? WHERE x LIKE '%ap_le%'`,[data]);
        assert.deepEqual(result,expected);
    });
    it("between",() => {
      var data = [{x:1},{x:2},{x:5},{x:7}];
      var expected = [{x:2},{x:5}];
      var result = alasql(`SELECT x FROM ? WHERE x BETWEEN 2 AND 5`,[data]);
      assert.deepEqual(result,expected);
    });
  });

}

