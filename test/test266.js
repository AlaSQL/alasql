if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

if(typeof exports == 'object') {

describe('Test 266 Custom MEDIAN Aggregator', function() {

  it('1. MEDIAN', function(done) {
  	var data = [
  		{a:1,b:1},{a:1,b:3},{a:1,b:1},{a:1,b:5},{a:1,b:1},{a:1,b:2},
  		{a:2,b:1},{a:2,b:1},{a:2,b:5},{a:2,b:5},{a:2,b:8},
  		{a:3,b:1},{a:3,b:1},{a:3,b:5},
 	];

  alasql.aggr.MYMEDIAN = function(v,s,acc){
    // Init
    if(typeof acc.arr == 'undefined') {
      acc.arr = [v];
      return v; 
    // Pass
    } else {
      acc.arr.push(v);
      var p = acc.arr.sort();
      return p[(p.length/2|0)];     
    };
  };

  alasql.aggr.MYCOUNT = function(v,s,acc){
    if(typeof acc.cnt == 'undefined') {
      acc.cnt = 1;
    } else {
      acc.cnt++;
    }
    return acc.cnt; 
  };

  alasql.aggr.MYSUM = function(v,s,acc){
    if(typeof acc.sum == 'undefined') {
      acc.sum = v;
    } else {
      acc.sum += v;
    }
    return acc.sum; 
  };

  alasql.aggr.MYFIRST = function(v,s,acc){
    if(typeof acc.val == 'undefined') {
      acc.val = v;
    }; 
    return acc.val; 
  };

  alasql.aggr.MYLAST = function(v,s,acc){
    return v; 
  };

  alasql.aggr.MYMIN = function(v,s,acc){
    if(typeof acc.min == 'undefined') {
      acc.min = v;
    } else {
      acc.min = Math.min(acc.min,v);
    }
    return acc.min; 
  };

  alasql.aggr.MYMAX = function(v,s,acc){
    if(typeof acc.max == 'undefined') {
      acc.max = v;
    } else {
      acc.max = Math.max(acc.max,v);
    }
    return acc.max; 
  };

 	var res = alasql('SELECT a,MYMEDIAN(b),MYCOUNT(b),MYSUM(b),\
     MYMIN(b),MYMAX(b),MYFIRST(b),MYLAST(b) FROM ? GROUP BY a',[data]);

  assert.deepEqual(res,
[ { a: 1,
    'MYMEDIAN(b)': 2,
    'MYCOUNT(b)': 6,
    'MYSUM(b)': 13,
    'MYMIN(b)': 1,
    'MYMAX(b)': 5,
    'MYFIRST(b)': 1,
    'MYLAST(b)': 2 },
  { a: 2,
    'MYMEDIAN(b)': 5,
    'MYCOUNT(b)': 5,
    'MYSUM(b)': 20,
    'MYMIN(b)': 1,
    'MYMAX(b)': 8,
    'MYFIRST(b)': 1,
    'MYLAST(b)': 8 },
  { a: 3,
    'MYMEDIAN(b)': 1,
    'MYCOUNT(b)': 3,
    'MYSUM(b)': 7,
    'MYMIN(b)': 1,
    'MYMAX(b)': 5,
    'MYFIRST(b)': 1,
    'MYLAST(b)': 5 } ]

  );

    done();    
  });


});

}

