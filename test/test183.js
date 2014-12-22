if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 183 - [] column', function() {

	it("1. ARRAY()", function(done) {

  var arr = [];
  var day, month, year;
  for (var i = 0; i < 10000; i++) {
    day = Math.round(Math.random() * 30);
    month = Math.round(Math.random() * 12);
    year = Math.round(Math.random() * 3 + 2009);
    arr.push(month + "/" + day + "/" + year);
  };

var max = 0;
var group = {};
var value, n, len = arr.length;
for (var i = len; --i >= 0;) {
  value = arr[i];
  n = group[value] = 1 - -(group[value] | 0);
  if (n > max) {
    max = n;
  }
}

var max1 = alasql('SELECT VALUE MAX(cnt) FROM (SELECT COUNT([0]) AS cnt FROM [?] GROUP BY [0])', [arr]);

var max2 = alasql('SELECT VALUE MAX(cnt) FROM (SELECT COUNT(*) AS cnt FROM ? GROUP BY [])', [arr]);


     console.log(max,max1,max2);
//      assert.deepEqual(res,[1,2,3,4,5,6,7,8,9,10]);
      done();
  });

    it("1. ARRAY()", function(done) {
    
        var res = alasql('SELECT [0],FIRST([]) FROM ? GROUP BY [0]',[[[1,10],[2,20],[3,30]]]);
        console.log(res);

        var res = alasql('SELECT [] AS one, COUNT(*) AS cnt FROM ? GROUP BY one',[[1,2,3,1]]);
        console.log(res);

      done();
    });

});
