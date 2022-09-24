if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 270 RECORDSET tests', function() {
	var emptydata = [];
	var data1 = [{a: 1, b: 10}, {a: 2, b: 20}, {a: 3, b: 30}];
	var data2 = [{b: 10, c: 100}, {b: 20, c: 200}, {b: 40, c: 400}];

	it.skip('1. Create database', function(done) {
		alasql('CREATE DATABASE test270; USE test270');
		alasql('CREATE TABLE one(a INT, b INT)');
		alasql('CREATE TABLE two(b INT, c INT)');
		alasql('CREATE TABLE three');
		alasql('CREATE TABLE four');
		alasql.options.modifier = 'RECORDSET';
		done();
	});

	it.skip('2. Empty test on param throws error', function(done) {
		assert.throws(function() {
			var res = alasql('SELECT * FROM ?', []);
		}, Error);
		done();
	});

	it.skip('3. Empty test on param throws error', function(done) {
		var res = alasql('SELECT * FROM ?', [emptydata]);
		assert.deepEqual(res, {data: [], columns: []});
		done();
	});

	it.skip('4. Empty test on table with columns', function(done) {
		var res = alasql('SELECT * FROM one');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b']);
		done();
	});

	it.skip('5. Test on empty table without column definitions', function(done) {
		var res = alasql('SELECT * FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, []);
		done();
	});

	it.skip('6. Test on empty table without column definitions', function(done) {
		alasql('SELECT * INTO three FROM ?', [data1]);
		var res = alasql('SELECT * FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b']);
		done();
	});

	it.skip('7. Test on empty table without column definitions', function(done) {
		var res = alasql('SELECT a,b FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b']);
		done();
	});

	it.skip('8. Test on empty table without column definitions', function(done) {
		var res = alasql('SELECT b,a FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['b', 'a']);
		done();
	});

	it.skip('9. Test on empty table without column definitions', function(done) {
		var res = alasql('SELECT a,b,a*a AS a2 FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b', 'a2']);
		done();
	});

	it.skip('9a. Test on table without column definitions', function(done) {
		var res = alasql('SELECT a,a*a AS a2,b FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'a2', 'b']);
		done();
	});

	it.skip('9b. Test on table without column definitions', function(done) {
		var res = alasql('SELECT a,* FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b']);
		done();
	});

	it.skip('9c. Test on table without column definitions', function(done) {
		var res = alasql('SELECT *,a FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b']);
		done();
	});

	it.skip('9c1. Test on table without column definitions', function(done) {
		var res = alasql('SELECT b,*,a FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['b', 'a']);
		done();
	});

	it.skip('9d. Test on table without column definitions', function(done) {
		var res = alasql('SELECT a,*,a*a AS a2 FROM three');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'a', 'b', 'a2']);
		done();
	});

	it.skip('10. Array on param with *', function(done) {
		var res = alasql('SELECT * FROM ?', [data1]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b']);
		done();
	});

	it.skip('11. Array with column', function(done) {
		var res = alasql('SELECT a,b FROM ?', [data1]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b']);
		done();
	});

	it.skip('11a. Array with column', function(done) {
		var res = alasql('SELECT b,a FROM ?', [data1]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['b', 'a']);
		done();
	});

	it.skip('11b. Array with column', function(done) {
		var res = alasql('SELECT *,b,a FROM ?', [data1]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b', 'b', 'a']);
		done();
	});

	it.skip('12. Array with column', function(done) {
		var res = alasql('SELECT a,a*a AS a2 FROM ?', [data1]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'a2']);
		done();
	});

	it.skip('12a. Array with column', function(done) {
		var res = alasql('SELECT a,a*a AS a2,b FROM ?', [data1]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'a2', 'b']);
		done();
	});

	it.skip('13. Array with column from table', function(done) {
		var res = alasql('SELECT a,a*a AS a2 FROM one');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'a2']);
		done();
	});

	it.skip('14. Array with column in reversed order', function(done) {
		var res = alasql('SELECT a*a AS a2,a FROM ?', [data1]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a2', 'a']);
		done();
	});

	it.skip('15. Array with column in reversed order', function(done) {
		var res = alasql('SELECT a*a AS a2,a FROM ?', [data1]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a2', 'a']);
		done();
	});

	it.skip('16. JOIN params', function(done) {
		var res = alasql('SELECT one.*,two.* FROM ? one JOIN ? two USING b', [data1, data2]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b', 'c']);
		done();
	});

	it.skip('17. JOIN tables', function(done) {
		alasql('SELECT * INTO one FROM ?', [data1]);
		alasql('SELECT * INTO two FROM ?', [data2]);
		var res = alasql('SELECT one.*,two.* FROM one JOIN two USING b');
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b', 'b', 'c']);
		done();
	});

	it.skip('18. JOIN params', function(done) {
		var res = alasql('SELECT one.*,two.* FROM ? one JOIN ? two USING b', [data1, data2]);
		var colres = _.pluck(res.columns, 'columnid');
		assert.deepEqual(colres, ['a', 'b', 'c']);
		done();
	});

	/*
  it.skip('3. VALUE', function(done) {
    alasql.options.modifier = 'VALUE';
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
    assert.deepEqual(res,1);

    done();    
  });

  it.skip('4. ROW', function(done) {
    alasql.options.modifier = 'ROW';
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
    assert.deepEqual(res,[1,10,100]);

    done();    
  });

  it.skip('5. COLUMN', function(done) {
    alasql.options.modifier = 'COLUMN';
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
    assert.deepEqual(res,[1,2,3,undefined]);

    done();    
  });


  it.skip('6. MATRIX', function(done) {
    alasql.options.modifier = 'MATRIX';
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
//console.log(res);
    // Wrong with reduced rows
    assert.deepEqual(res,[[1,10,100],[2,20,200],[3,30,undefined],[undefined,40,400]]);

    done();    
  });

  it.skip('6a. MATRIX', function(done) {
    alasql.options.modifier = 'MATRIX';
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b \
      ORDER BY a',[data1,data2]);
//console.log(res);
    // Wrong with reduced rows
    assert.deepEqual(res,[[undefined,40,400],[1,10,100],[2,20,200],[3,30,undefined]]);

    done();    
  });


  it.skip('7. RECORDSET', function(done) {
    alasql.options.modifier = "RECORDSET";
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
//console.log(res);
    // Wrong with reduced rows
    assert.deepEqual(res, {data:
     [ { a: 1, b: 10, c: 100 },
     { a: 2, b: 20, c: 200 },
     { a: 3, b: 30 },
     { b: 40, c: 400 } ],
     columns: [{columnid:'a'},{columnid:'b'},{columnid:'c'}]}
    );
    done();    
  });

  it.skip('8. INDEX', function(done) {
    alasql.options.modifier = 'INDEX';
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
    assert.deepEqual(res,{ '1': 10, '2': 20, '3': 30, undefined: 40 });

    done();    
  });

  it.skip('9. TEXTSTRING', function(done) {
    alasql.options.modifier = 'TEXTSTRING';
    var res = alasql('SELECT t1.*,t2.* FROM ? t1 OUTER JOIN ? t2 USING b',[data1,data2]);
    assert.deepEqual(res,'1\n2\n3\n');

    done();    
  });
*/
	it.skip('99. Drop phase', function(done) {
		delete alasql.options.modifier;
		alasql('DROP DATABASE test270');
		done();
	});
});
