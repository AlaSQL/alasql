if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 301 CLASSES', function() {

  var john, mary;

  it('1. CREATE DATABASE',function(done){
    var res = alasql('CREATE DATABASE test301; USE 301');
    done();    
  });

  it('2. CREATE CLASS',function(done){
    var res = alasql('CREATE CLASS Person');
    console.log(res == 1);
    done();    
  });

  it('3. Search fruits',function(done){
    var john = alasql('INSERT INTO Person SET name = "John"',[catalog]);
 	console.log(john);
    var mary = alasql('INSERT INTO Person SET name = "Mary"',[catalog]);
 	console.log(mary);
    done();    
  });

  it('4. Search fruits',function(done){
    var res = alasql('SELECT name FROM Person');
    assert(res[0].name == 'John');
    assert(res[1].name == 'Mary');
    var res = alasql('SELECT VALUE COUNT(*) FROM Person');
    assert(res == 2);
    done();
  });

  it('5. SELECT #',function(done){
    var res = alasql('SELECT ROW ?#, ?#',[john, mary]);
    assert(res[0].name == 'John');
    assert(res[1].name == 'Mary');
    done();
  });

  it('6. SELECT #',function(done){
    alasql('SET @john = (SELECT FROM Person WHERE name = "John")');
    assert(alasql.vars.john == john);
    done();
  });

  it('99. DROP DATABASE',function(done){
    var res = alasql('DROP DATABASE test301');
    done();    
  });

});

