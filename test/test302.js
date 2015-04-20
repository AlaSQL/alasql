if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 302 CREATE CLASS ', function() {

  it('1. CREATE CLASS',function(done){
    alasql('CREATE DATABASE test302;USE test302');
    done();
  });

  it('2. CREATE CLASS',function(done){
    var res = alasql('CREATE CLASS Person');
    assert(res == 1);
    assert(alasql.databases.test302.tables.Person.isclass)
    done();    
  });

  var italy,rome,milano,romeo,paola,peter,berlin,germany;

  it('3. CREATE CLASS Country and City',function(done){
    alasql('CREATE CLASS Country');
    italy = alasql('INSERT INTO Country VALUES {name:"Italy"}');
    germany = alasql('INSERT INTO Country VALUES {name:"Germany"}');

    alasql('CREATE CLASS City');
    rome = alasql('INSERT INTO City VALUES {name:"Rome",country:'+italy+'}');
    milano = alasql('INSERT INTO City VALUES {name:"Milano",country:'+italy+'}');
    berlin = alasql('INSERT INTO City VALUES {name:"Berlin",country:'+germany+'}');

    assert(alasql.databases.test302.tables.Person.isclass)
    done();    
  });

  it('4. INSERT INTO CLASS',function(done){
    romeo = alasql('INSERT INTO Person VALUES {name:"Romeo",age:32, city:'+rome+'}');
    paola = alasql('INSERT INTO Person VALUES {name:"Paola",age:25, city:'+milano+'}');
    peter = alasql('INSERT INTO Person VALUES {name:"Peter",age:18, city:'+berlin+'}');
//    assert(alasql.databases.test302.tables.Person.isclass);
    done();    
  });

  it('5. SELECT with # operator', function (done) {
    var res = alasql('SELECT COLUMN DISTINCT city#country#name FROM Person');
    assert.deepEqual(res,['Italy','Germany']);
    done();
  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test302');
    done();
  });


});

