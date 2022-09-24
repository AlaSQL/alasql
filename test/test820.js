if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #1276

  As reported in issue #1276
  WITH using a CSV source throws Error: Data source number 0 in undefined #1276
  Using "alasql": "^0.6.5"

  As an example:

  with c as (
  SELECT *
  FROM CSV("https://cdn.rawgit.com/albertyw/avenews/master/old/data/average-latitude-longitude-countries.csv",{headers:true})
  )
  select * from c

*/

var test = '820'; // insert test file number

describe('Test ' + test + ' for issue #1276', function () {

 	beforeEach(function () {
 		alasql('create database test' + test);
 		alasql('use test' + test);
 	});
 
 	afterEach(function () {
 		alasql('drop database test' + test);
 	});

  it('A) Dont fails a SELECT from local CSV source ', function () {         
     var res = alasql([
       'CREATE TABLE testcvs',
       'SELECT * INTO testcvs FROM CSV("./test820.csv",{headers:true}) AS csv',
       'SELECT FROM testcvs'
     ])
      
     res.then(res => {
       assert.deepEqual(res, [{x: 4}, {y: 2}]);
     });
   });


  it('B) WITH using a CSV source, works as expected', function () {
    var sql = 'with c as ( SELECT * FROM CSV("./test820.csv",{headers:true}))';
    sql += 'select * from c';

    alasql(sql).then(res => {
       assert.deepEqual(res, [{x: 4}, {y: 2}]);
    });

  });

});


