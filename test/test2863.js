if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2863'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - PREPARE, EXECUTE and DEALLOCATE PREPARE`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t1 (a INT)');
		alasql('INSERT INTO t1 VALUES (1), (2)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) the statements from the issue', function () {
		let res = [];
		res.push(alasql("PREPARE stmt2863 FROM 'SELECT a FROM t1 WHERE a = ?'"));
		res.push(alasql('SET @x = 2'));
		res.push(alasql('EXECUTE stmt2863 USING @x'));
		res.push(alasql('DEALLOCATE PREPARE stmt2863'));
		assert.deepStrictEqual(res, [1, 1, [{a: 2}], 1]);
	});

	it('B) the text from a variable, several parameters, and names in any case', function () {
		alasql("SET @q = 'SELECT a FROM t1 WHERE a >= ? AND a <= ?'");
		alasql('SET @lo = 1');
		alasql('SET @hi = 2');
		alasql('prepare Range2863 from @q');
		assert.deepStrictEqual(alasql('execute RANGE2863 using @lo, @hi'), [{a: 1}, {a: 2}]);
		alasql('DEALLOCATE PREPARE range2863');
	});

	it('C) errors', function () {
		assert.throws(() => alasql("PREPARE bad2863 FROM 'SELEC'"), /Parse error/);
		assert.throws(() => alasql('EXECUTE nothere2863'), /Unknown prepared statement/);
		assert.throws(() => alasql('DEALLOCATE PREPARE nothere2863'), /Unknown prepared statement/);
	});

	it('D) EXECUTE of a function and the new words as names still work', function () {
		alasql.fn.hello2863 = () => 7;
		alasql('CREATE TABLE z (prepare INT, deallocate INT)');
		alasql('INSERT INTO z VALUES (1, 2)');
		let res = [alasql('EXECUTE hello2863()'), alasql('SELECT prepare, deallocate FROM z')];
		delete alasql.fn.hello2863;
		assert.deepStrictEqual(res, [7, [{prepare: 1, deallocate: 2}]]);
	});
});
