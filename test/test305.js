if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

describe('Test 305 CREATE GRAPH', function() {

  it('0. Create database ',function(done){
    var res = alasql('CREATE DATABASE test305;USE test305');
    done();
  });


  it('1. CREATE GRAPH',function(done){
    alasql('CREATE CLASS Person');
    var res = alasql('CREATE GRAPH Andrey #Andrey:Person, Olga "Olga Ivanova",\
     John, Andrey >> Olga, Olga >> John');
    assert.deepEqual(res,["Andrey","Olga","John",0,1]);
    var res = alasql('CREATE GRAPH Peter:Person {age:63}');
    assert.deepEqual(res,["Peter"]);
    var res = alasql('CREATE GRAPH Serge {age:44}, Helen {age:25}, \
      Serge > loves {how:"to much"} > Helen');
    assert.deepEqual(res,["Serge","Helen",2]);
    var res = alasql('SEARCH #Peter');
    assert.deepEqual(res.age,63);
    var res = alasql('SEARCH #Peter');
    assert.deepEqual(res.age,63);
    var res = alasql('SEARCH #Peter age');
    assert.deepEqual(res,[63]);
    var res = alasql('SEARCH :Person age');
    assert.deepEqual(res,[63]);

    var res = alasql('SEARCH #Andrey >> name');
    assert.deepEqual(res,["Olga Ivanova"]);

    var res = alasql('SEARCH #Andrey >> >> name');
    assert.deepEqual(res,["John"]);

    var res = alasql('SEARCH #Andrey (>>)+ name');
    assert.deepEqual(res,["Olga Ivanova","John"]);

    var res = alasql('SEARCH #Andrey (>>)* name');
    assert.deepEqual(res,["Andrey","Olga Ivanova","John"]);

    var res = alasql('SEARCH :Person age');
    assert.deepEqual(res,[63]);

    var res = alasql('SEARCH age');
    assert.deepEqual(res,[63,44,25]);

    var res = alasql('SEARCH AS @p1 >"loves"> @p1 name');
    console.log(res);
    assert.deepEqual(res,["Serge"]);

    done();    
  });

  it('2. Create database ',function(done){
    var res = alasql('DROP DATABASE test305');
    done();
  });

  it('3. Create database ',function(done){
    var res = alasql('CREATE DATABASE test305a;USE test305a');
    done();
  });

  it('4. Create graph from file ',function(done){
    var res = alasql('SEARCH FROM XML("test305a.gexf")',[],function(data){
      console.log(res);
      done();
    });
//    var res = alasql('CREATE GRAPH FROM GEXF("test305a.gexf")');
  });


  it('5. Create database ',function(done){
    var res = alasql('DROP DATABASE test305a');
    done();
  });

});

