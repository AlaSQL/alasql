if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

/*
  Test for issue #379
*/

var test = 416;

describe('Test '+test+' Loosing expression with GROUP BY', function() {

  before(function(){
    alasql('CREATE DATABASE test'+test+';USE test'+test);
  });

  after(function(){
    alasql('DROP DATABASE test'+test);
  });

  it.skip('1. Test',function(done){

  var res = alasql(function(){/*
	create table data( id INTEGER PRIMARY KEY, grp INTEGER);
	insert into data select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range;
	select id, id +1 from data group by id;
	select a.id, a.id +1, CAST(a.id AS INTEGER) +1 from data as a, data as b where a.id < b.id and a.grp = b.grp group by a.id
  */});

  console.log(res[2]);
  console.log(res[3]);

	done();
	});

  it('2. Test Modified',function(done){

  var res = alasql(function(){/*
	create table data( id INTEGER PRIMARY KEY, grp INTEGER);
	insert into data select range._ as id , range._ % 3 as grp  from RANGE(0,9)as range;
	select id, (id +1), CAST(id AS INTEGER) +1 from data as a, data as b where a.id < b.id and a.grp = b.grp group by a.id,b.id
  */});

  console.log(res[2]);
  console.log(res[3]);
  
	done();
	});


});
