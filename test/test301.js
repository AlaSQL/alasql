if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 301 Vertices and Edges', function() {


  it('1. CREATE DATABASE',function(done){
    var res = alasql('CREATE DATABASE test301; USE test301');
    done();    
  });

  it('2. Create vetices',function(done){
    var res = alasql('CREATE CLASS Person');
    var res = alasql('CREATE VERTEX Person SET name = "Olga",age=56,sex="F"');
    var res = alasql('CREATE VERTEX Person CONTENT {name:"Mike",age:45,sex:"M"},{name:"Paola",age:21,sex:"F"}');
    var res = alasql('CREATE VERTEX Person SELECT * FROM ?');
    var res = alasql('CREATE VERTEX Person');
    var res = alasql('CREATE VERTEX');
    var res = alasql('SET @v1 = (CREATE VERTEX)');
    var res = alasql('SET @v2 = (CREATE VERTEX)');
    var res = alasql('SET @e12 = (CREATE EDGE FROM @v1 TO @v2)');
    var res = alasql('SET @e12#name = "Lisa"');
    var res = alasql('SET @e12#age = 43');
    done();    
  });

if(false) {
  it('3. Create edges',function(done){
    alasql('SET @john = (CREATE VERTEX Person SET name = "John",age=23,sex="M")');
    alasql('SET @peter = (CREATE VERTEX Person SET name = "Peter",age=18,sex="M")');
    alasql('SET @mike = (CREATE VERTEX Person CONTENT {name:"Mike",age:45,sex:"M"},{name:"Paola",age:21,sex:"F"})');
    alasql('SET @girls = (CREATE VERTEX Person SELECT * FROM ?',[[{name:"Mary",age:25,sex:"F"},{name:"Helen",age:33,sex:"F"}]]);
    alasql('SET @mary = @girls->0; SET @helen = @girls->1');
    alasql('SET @paola = (CREATE VERTEX Person SET name = "Paola",age:19,sex="M")');
    done();    
  });

  it('3. Create edges',function(done){
    alasql('CREATE EDGE FROM @john TO @mary SET relation="likes"');
    alasql('CREATE EDGE FROM @peter TO @mary SET relation="loves"');
    alasql('CREATE EDGE FROM @mike TO @mary CONTENT {relation:"hates"}');
    alasql('CREATE EDGE FROM @mike TO @paola CONTENT ?',[{relation:'loves'}]);
    alasql('CREATE EDGE FROM (SELECT * FROM Person WHERE sex="M") TO @helen SET relation:"love"');
    alasql('CREATE EDGE FROM @john TO (SELECT * FROM Person WHERE sex="M" AND [$id] <> @john) SET relation:"is friend of"');
    done();    
  });

  it('4. Create edges',function(done){
    alasql('SEARCH OUT(relation="is friend of") FROM @john');
    alasql('SEARCH @john # OUT(relation="is friend of") OUT(relation="loves") (class="Person" AND name="Mary")');
  });

}

  it('99. DROP DATABASE',function(done){
    var res = alasql('DROP DATABASE test301');
    done();    
  });

});

