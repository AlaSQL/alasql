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

  it('1. Test',function(done){

    var data = [];
    for(var i=0;i<10000;i++) {
      data.push({a:i});
    }
    


//    var res1 = alasql('SELECT MEDIAN(a) AS medparam FROM ?', [data]);
//    console.log(res1);

    var res = alasql('SELECT MEDIAN(a) AS medparam FROM ?', [data]);
    assert.deepEqual(res,[ { medparam: 5499 } ]);

	done();
	});


});
