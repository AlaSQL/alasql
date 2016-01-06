if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
	var DOMStorage = require("dom-storage");
//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
};

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 404 OUTER JOIN', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test404;USE test404');
    done();
  });

  var data = {
      COLORS: [{id:1,name:'red'},{id:2,name:'blue'},{id:3,name:'orange'}],            
      FRUITS:[{id:1,name:'apple'},{id:2,name:'grape'},{id:3,name:'orange'}],
      MASCOTS:[{id:1,name:'redsox'},{id:2,name:'whitesox'},{id:3,name:'orange'}]
  };

	it('2. Create table and index before insert', function(done){
    var res = alasql('select t0.name t0n ,t1.name t1n, t2.name t2n from ? t0 full outer join ? t1 on t1.name = t0.name full outer join ? t2 on t2.name = t0.name or t2.name = t1.name',[data.COLORS,data.FRUITS, data.MASCOTS]);
    console.log(res);
    done();
  });

  it('3. Pure SQL test', function(done){
    alasql(function(){/*

create table colors (id int, name varchar(255));
create table fruits (id int, name varchar(255));
create table mascots (id int, name varchar(255));
insert into colors(id, name) values
(1, 'red'),
(2, 'blue'),
(3, 'orange');

insert into fruits(id, name) values
(1, 'apple'),
(2, 'grape'),
(3, 'orange');

insert into mascots(id, name) values
(1, 'redsox'),
(2, 'whitesox'),
(3, 'orange');

    */});



    var res = alasql('select t0.name t0n, t1.name t1n, t2.name t2n \
from colors t0 \
full outer join fruits t1 on t1.name = t0.name \
full outer join mascots t2 on t2.name = t1.name or t2.name = t0.name');
    console.log(res);
    done();
  });



  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test404');
    done();
  });


});
