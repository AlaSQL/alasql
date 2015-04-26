if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};

if(typeof exports == 'object') {
  var DOMStorage = require("dom-storage")
  global.localStorage = new DOMStorage("./restest267.json", { strict: false, ws: '' });
};



describe('Test 268 INNER JOIN stress test', function() {

  it('1. Create database', function(done) {
    alasql('CREATE DATABASE test268; USE test268');
    done();    
  });

    var data1 = [{a:1,b:10},{a:2,b:20}];
    var data2 = [{b:10,c:100},{b:20,c:200}];


  it('2. INNER JOIN on Array', function(done) {
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 INNER JOIN ? t2 USING b',[data1,data2]);
    assert.deepEqual(res,
      [ { a: 1, b: 10, c: 100 }, { a: 2, b: 20, c: 200 } ]
    );
    done();    
  });

  it('3. INNER JOIN on Tables', function(done) {
    alasql('CREATE TABLE table1(a INT, b INT);');
    alasql('SELECT * INTO table1 FROM ?', [data1]);
    alasql('CREATE TABLE table2(b INT, c INT);');
    alasql('INSERT INTO table2 SELECT * FROM ?',[data2]);
    var res = alasql('SELECT t1.*,t2.* FROM table1 t1 INNER JOIN table2 t2 USING b',[data1,data2]);
    assert.deepEqual(res,
      [ { a: 1, b: 10, c: 100 }, { a: 2, b: 20, c: 200 } ]
    );
    done();    
  });


  it('99. Drop phase', function(done) {
    alasql('DROP DATABASE test268');
    done();    
  });

});


