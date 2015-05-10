if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 322 UNION TEST', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test322; USE test322');
    done();
  });

  it('2. CREATE GRAPH',function(done){
    var data = [{a:1},{a:2},{a:2}, {b:2}];
    var res = alasql('SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION ALL CORRESPONDING SELECT b FROM $0 WHERE NOT b IS NULL',[data]);
    assert.deepEqual(res,
[ { a: 1 },
  { a: 2 },
  { a: 2 },
  { b: 2 } ]
    );

    var res = alasql('SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION ALL SELECT b FROM $0 WHERE NOT b IS NULL',[data]);
    assert.deepEqual(res,[ { a: 1 }, { a: 2 }, { a: 2 }, { a: 2 } ]);

    var res = alasql('SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION SELECT b FROM $0 WHERE NOT b IS NULL',[data]);
    assert.deepEqual(res,[ { a: 1 }, { a: 2 }, { a: 2 }]); // To be checked
// or 1,2,2

//    console.log(res);

    done();
  });

  it('3. SEARCH UNION',function(done){
    var data = [{a:1},{a:2},{a:2}, {b:2}];

    var res = alasql('SEARCH UNION(/a,/b) FROM ?',[data]);
    assert.deepEqual(res,[1,2,2]);
    done();
  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test322');
    done();
  });
});

