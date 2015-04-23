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

 	alasql.fn.MEDIAN = function(s) {
 		var p = s.sort();
		return s[(p.length/2|0)]; 		
 	};

  alasql.aggr.CONCAT = function(v,s){
    if(typeof s == 'undefined') return [v];
    return s.concat([v]);
  };

  var acc = {};
  alasql.aggr.MYMEDIAN = function(v,s){
    if(typeof s == 'undefined') {
    	acc.a = [v];
    	return v;	
    } else {
    	acc.a.push(v);
 		var p = acc.a.sort();
		return acc[(p.length/2|0)]; 		
    }
  };


 	var res = alasql('SELECT a,MEDIAN(CONCAT(b)), MYMEDIAN(b) FROM ? GROUP BY a',[data]);
 	console.log(res);
    done();    
  });


});

}

