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
    alasql('CREATE GRAPH Andrey, Olga, John, Andrey >> Olga, Olga >> John');
    alasql('CREATE GRAPH %Andrey {age:44}, Olga {age:25}, Andrey > loves {how:"to much"} > Olga');
    alasql('SEARCH !Andrey age');
    alasql('SEARCH :Person age');
//    assert.deepEqual(res, ["Milano","Odessa"]);

//    !Andrey == "Andrey"#  objects['Andrey']
/*

!Andrey
~Andrey
^Andrey
%Andrey > "loves" > name

Andrey! > "loves" > Mary!
!Andrey > "loves" > !Mary

!Andrey->age
@andrey
alasql('CREATE GRAPH a SELECT * FROM ?',[data]);
alasql('CREATE VERTEX 122:Person a SELECT * FROM ?',[data]);
CREATE GRAPH 1,2,3,1>>2,2>>3,!2>>@a;
*/
    done();    
  });


  it('99. Create database ',function(done){
    var res = alasql('DROP DATABASE test305');
    done();
  });

});

