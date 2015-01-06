if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 53 - Automatic types parsing', function() {

	describe('Primitive types', function() {

		it('Primitive types', function(done){
			var ast = alasql.parse('SELECT 1, "Peter", TRUE');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'number');
			assert.equal(cols[1].toType(), 'string');
			assert.equal(cols[2].toType(), 'boolean');
			done();
		});

		it('Date type... Not yet realized', function(done){
			var ast = alasql.parse('SELECT DATE("2014-10-12")');
			done();
		});

		it('Arifmetic operations', function(done){
			var ast = alasql.parse('SELECT 10, 1+1, 1-1, 1*1, 1/1, 1%1');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'number');
			assert.equal(cols[1].toType(), 'number');
			assert.equal(cols[2].toType(), 'number');
			assert.equal(cols[3].toType(), 'number');
			assert.equal(cols[4].toType(), 'number');
			assert.equal(cols[5].toType(), 'number');
			done();
		});

		it('String operations', function(done){
			var ast = alasql.parse('SELECT "Serge","Peter"+"Alba"');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'string');
			assert.equal(cols[1].toType(), 'string');
			done();
		});

		it('Logic operations', function(done){
			var ast = alasql.parse('SELECT TRUE, TRUE AND TRUE, TRUE OR TRUE, NOT TRUE');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'boolean');
			assert.equal(cols[1].toType(), 'boolean');
			assert.equal(cols[2].toType(), 'boolean');
			assert.equal(cols[3].toType(), 'boolean');
			done();
		});

		it('Logic operations on numbers', function(done){
			var ast = alasql.parse('SELECT 1=1, 1!=1, 1<1, 1<=1, 1>1, 1>=1');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'boolean');
			assert.equal(cols[1].toType(), 'boolean');
			assert.equal(cols[2].toType(), 'boolean');
			assert.equal(cols[3].toType(), 'boolean');
			assert.equal(cols[4].toType(), 'boolean');
			assert.equal(cols[5].toType(), 'boolean');
			done();
		});
		it('Logic operations on strings', function(done){
			var ast = alasql.parse('SELECT "Peter"="Peter", "Peter"!="Peter", "Peter"<"Peter",'+
				' "Peter"<="Peter", "Peter">"Peter", "Peter">="Peter"');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'boolean');
			assert.equal(cols[1].toType(), 'boolean');
			assert.equal(cols[2].toType(), 'boolean');
			assert.equal(cols[3].toType(), 'boolean');
			assert.equal(cols[4].toType(), 'boolean');
			assert.equal(cols[5].toType(), 'boolean');
			done();
		});

		it('Logic operations on BETWEEN', function(done){
			var ast = alasql.parse('SELECT a BETWEEN 1 AND 2, a NOT BETWEEN 1 AND 2,'+
				' b BETWEEN "Peter" AND "Sonya",  b NOT BETWEEN "Peter" AND "Sonya"');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'boolean');
			assert.equal(cols[1].toType(), 'boolean');
			assert.equal(cols[2].toType(), 'boolean');
			assert.equal(cols[3].toType(), 'boolean');
			done();
		});

		it('Logic operations on IN', function(done){
			var ast = alasql.parse('SELECT a IN (SELECT b FROM c), a NOT IN (SELECT b FROM c)');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'boolean');
			assert.equal(cols[1].toType(), 'boolean');
			done();
		});

		it('Logic operations on ALL and SOME', function(done){
			var ast = alasql.parse('SELECT a > ALL(SELECT b FROM c), a < SOME (SELECT b FROM c)');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'boolean');
			assert.equal(cols[1].toType(), 'boolean');
			done();
		});

		it('Logic operations on EXISTS', function(done){
			var ast = alasql.parse('SELECT EXISTS (SELECT b FROM c), NOT EXISTS (SELECT b FROM c)');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'boolean');
			assert.equal(cols[1].toType(), 'boolean');
			done();
		});


		it('Aggregators on SUM, COUNT, AVG', function(done){
			var ast = alasql.parse('SELECT COUNT(*), SUM(a), AVG(a) FROM d');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'number');
			assert.equal(cols[1].toType(), 'number');
			done();
		});

		it('Aggregators FIRST, LAST, MIN, MAX on numbers', function(done){
			var ast = alasql.parse('SELECT FIRST(10), LAST(20), MIN(10), MAX(40) FROM d');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'number');
			assert.equal(cols[1].toType(), 'number');
			assert.equal(cols[2].toType(), 'number');
			assert.equal(cols[3].toType(), 'number');
			done();
		});

		it('Aggregators FIRST, LAST, MIN, MAX on strings', function(done){
			var ast = alasql.parse('SELECT FIRST("Peter"), LAST("Peter") FROM d');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'string');
			assert.equal(cols[1].toType(), 'string');
			done();
		});

if(false) {

		it('Columns from tables', function(done){
			var ast = alasql.parse('SELECT a, a=a, a+a, a-a FROM test');
			var cols = ast.statements[0].columns;
			assert.deepEqual(cols[0].toType(), {tableid:'test', columnid:'a'});
			assert.equal(cols[1].toType(), 'boolean');
			assert.equal(cols[1].toType(), 'strnum');
			assert.equal(cols[1].toType(), 'number');
			done();
		});

		it('Columns from tables', function(done){
			var ast = alasql.parse('SELECT FIRST(a), FIRST(1), FIRT("Peter"), FIRST(TRUE) FROM test');
			var cols = ast.statements[0].columns;
			assert.deepEqual(cols[0].toType(), {tableid:'test', columnid:'a'});
			assert.equal(cols[1].toType(), 'number');
			assert.equal(cols[2].toType(), 'string');
			assert.equal(cols[3].toType(), 'boolean');
			done();
		});
		it('Columns from subqueries', function(done){
			var ast = alasql.parse('SELECT * FROM test');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'unknown');
			done();
		});

		it('Columns from subqueries', function(done){
			var ast = alasql.parse('SELECT a FROM (SELECT 1 AS a)');
			var cols = ast.statements[0].columns;
			assert.equal(cols[0].toType(), 'number');
			done();
		});

		it('Columns from subqueries', function(done){
			var ast = alasql.parse('SELECT a FROM (SELECT b AS a FROM test1)');
			var cols = ast.statements[0].columns;
			assert.deepEqual(cols[0].toType(), {tableid:'test', columnid:'b'});
			done();
		});

}
	});

});
