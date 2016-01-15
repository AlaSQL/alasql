if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

/*
  Test for issue #379
*/

var test = 415;

describe('Test '+test+' Aggregators', function() {

  before(function(){
    alasql('CREATE DATABASE test'+test+';USE test'+test);
  });

  after(function(){
    alasql('DROP DATABASE test'+test);
  });

  it('3. Test',function(done){

    var resultSet = [];
    for(var i=0;i<10000;i++) {
      resultSet.push({_date:new Date('01.01.2015'), selectedChem:1});
    }
    
alasql.aggr.MYMEDIAN = function(v,s,acc){
  // Init
  if(typeof acc.arr == 'undefined') {
    acc.arr = [v];
    return v; 
  // Pass
  } else {
    acc.arr.push(v);
    var p = acc.arr.sort();
    return p[(p.length/2)|0];     
  };
};


    var res = alasql('SELECT count(1) AS ct, min(_date) AS minDate, max(_date) AS maxDate, \
      min(selectedChem) AS minparam, max(selectedChem) AS maxparam, \
      AVG(selectedChem) AS avgparam, MEDIAN(selectedChem) AS medparam, \
      STDEV( selectedChem) AS sdevparam FROM ? \
      WHERE selectedChem is not null AND selectedChem != -9999 ORDER BY _date', [ resultSet ]);

    console.log(res);

	done();
	});


});
