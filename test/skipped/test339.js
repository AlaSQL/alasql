if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 339 UNION EXTRACT INTERSECT', function() {
  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test339;USE test339');
    alasql.options.modifier = "COLUMN";    
    done();
  });


  it('2. CREATE TABLE',function(done){

  var res = alasql(function(){/*

create table a (col int);
insert into a (col) values (1), (2), (3);

create table b (col int);
insert into b (col) values (1), (2), (4);

create table c (col int);
insert into c (col) values (1), (2), (5);

*/});
//  console.log(res);

    done();
  });


  it('3. UNION',function(done){
    var res = alasql(function(){/*
      select col from a
      union
      select col from b;
    */});
//    console.log(res);
    assert.deepEqual(res.sort(),[1,2,3,4]);
    done();
  });

  it('4. UNION ALL',function(done){
    var res = alasql(function(){/*
      select col from a
      union all
      select col from b;
    */});
//    console.log(res);
    assert.deepEqual(res.sort(), [1,1,2,2,3,4]);
    done();
  });

  it('5. EXCEPT',function(done){
    var res = alasql(function(){/*
      select col from a
      except
      select col from b;
    */});
//    console.log(res);
    assert.deepEqual(res.sort(), [3]);
    done();
  });
  it('6. INTERSECT',function(done){
    var res = alasql(function(){/*
      select col from a
      intersect
      select col from b;
    */});
//    console.log(res);
    assert.deepEqual(res.sort(), [1,2]);
    done();
  });


  it('7. INTERSECT',function(done){
    var res = alasql(function(){/*
      select col from a
      intersect
      select col from b;
    */});
//    console.log(res);
    assert.deepEqual(res.sort(), [1,2]);
    done();
  });

  it('8. UNION UNION',function(done){
    var res = alasql(function(){/*
      select col from a
      union
      select col from b
      union
      select col from c;
    */});
//    console.log(res);
    assert.deepEqual(res.sort(), [1,2,3,4,5]);
    done();
  });


  it('9. UNION EXCEPT',function(done){
    var res = alasql(function(){/*
      select col from a
      union
      select col from b
      except
      select col from c;
    */});
    console.log(res);
    assert.deepEqual(res.sort(), [3]);
    done();
  });

  it('10. UNION EXCEPT',function(done){
    var res = alasql(function(){/*
      select col from a
      except
      select col from b
      union
      select col from c;
    */});
    console.log(res);
    assert.deepEqual(res.sort(), [1,2,3,5]);
    done();
  });

  it('11. UNION INTERSECT',function(done){
    var res = alasql(function(){/*
      select col from a
      union
      select col from b
      intersect
      select col from c;
    */});
    console.log(res);
    assert.deepEqual(res.sort(), [1,2,3]);
    done();
  });

  it('12. INTERSECT UNION',function(done){
    var res = alasql(function(){/*
      select col from a
      intersect
      select col from b
      union
      select col from c;
    */});
    console.log(res);
    assert.deepEqual(res.sort(), [1,2,3]);
    done();
  });

  it('13. UNION INTERSECT',function(done){
    var res = alasql(function(){/*
      select col from a
      except
      select col from b
      intersect
      select col from c;
    */});
//    console.log(res);
    assert.deepEqual(res.sort(), [3]);
    done();
  });

  it('14. INTERSECT UNION',function(done){
    var res = alasql(function(){/*
      select col from a
      intersect
      select col from b
      except
      select col from c;
    */});
//    console.log(res);
    assert.deepEqual(res.sort(), []);
    done();
  });


  it('99. DROP DATABASE',function(done){
    alasql.options.modifier = undefined;
    alasql('DROP DATABASE test339');
    done();
  });

});
