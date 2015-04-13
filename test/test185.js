if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 185 - IN Expression', function() {
    it("1. IN Field", function(done) {
      var data = [{a:[1,2,3,4,1,2,2,3],b:1},{a:[10],b:10}];
      var res = alasql('SELECT * FROM ? WHERE 1 IN a',[data]);
      assert.deepEqual(res,[ { a: [ 1, 2, 3, 4, 1, 2, 2, 3 ], b: 1 } ])
//      console.log(res);
      var res = alasql('SELECT * FROM ? WHERE b IN a',[data]);
      assert.deepEqual(res,[ { a: [ 1, 2, 3, 4, 1, 2, 2, 3 ], b: 1 },
          { a: [ 10 ], b: 10 } ]);
//      console.log(res);
      var res = alasql('SELECT * FROM ? WHERE b IN @(a)',[data]);
      assert.deepEqual(res,[ { a: [ 1, 2, 3, 4, 1, 2, 2, 3 ], b: 1 },
          { a: [ 10 ], b: 10 } ]);
//      console.log(res);
//      console.log(alasql.parse('SELECT * FROM ? WHERE 1 IN a').statements[0].where.expression.right);

//      assert.deepEqual(res,{"1":[1,1],"2":[2,2,2],"3":[3,3],"4":[4]});
      done();
    });
    it("1. REDUCE Aggregator", function(done) {
      var data = [{a:[1,2,3,4,1,2,2,3],b:1},{a:[10],b:10}];
      alasql.aggr.Summa = function(v,s){
        return v+(s|0);
      };
      var res = alasql('SELECT VALUE Summa(b) FROM ?',[data]);
      assert(res==11);

      alasql.aggr.Concat = function(v,s){
        if(typeof s == 'undefined') return v;
        return s.concat(v);
      };
      var a1 = [{a:1,b:[1,2,3]},{a:2,b:[4,5]},{a:1,b:[1,2,3,4]}];
      var res = alasql('SELECT a,Concat(b),COUNT(*) FROM ? GROUP BY a',[a1]);

//      console.log(res);
      done();
    });
});
