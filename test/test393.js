if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on this article:

*/

describe('Test 393 Triggers', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test393;USE test393');
		done();
	});

	it('2. BEFORE INSERT', function (done) {
		var test = 0;
		alasql.fn.onchange1 = function () {
			test++;
		};
		alasql.fn.onchange2 = function (r) {
			assert(r.a == 123);
			test++;
		};
		alasql('CREATE TABLE one (a INT)');

		alasql('CREATE TRIGGER tr1 BEFORE INSERT ON one CALL onchange1()');
		alasql('CREATE TRIGGER tr2 BEFORE INSERT ON one onchange2');

		alasql('INSERT INTO one VALUES (123)'); // This will fire onchange()

		//    setTimeout(function(){
		assert(test == 2);
		done();
		//    },10);
	});

	it('3. Prevent BEFORE INSERT', function (done) {
		alasql.fn.onchange3 = function (r) {
			if (r.a == 276) return false;
		};
		alasql('CREATE TABLE two (a INT)');
		alasql('CREATE TRIGGER tr3 BEFORE INSERT ON two onchange3');
		alasql('INSERT INTO two VALUES (276),(145)');

		var res = alasql('COLUMN OF SELECT * FROM two');
		assert.deepEqual(res, [145]);
		done();
	});

	it('4. Prevent AFTER INSERT', function (done) {
		alasql.fn.onchange4 = function (r) {
			assert(r.a == 983);
			assert(alasql.databases.test393.tables.two.data.length == 2);
		};
		assert(alasql.databases.test393.tables.two.data.length == 1);
		alasql('CREATE TRIGGER tr4 AFTER INSERT ON two onchange4');
		alasql('INSERT INTO two VALUES (983)');
		done();
	});

	it('5. INSTEAD OF INSERT', function (done) {
		var test = 0;
		alasql.fn.onchange5 = function (r) {
			assert(r.a == 222);
			test++;
		};
		alasql('CREATE TABLE three (a INT)');
		alasql('CREATE TRIGGER tr5 INSTEAD OF INSERT ON three onchange5');
		alasql('INSERT INTO three VALUES (222)');

		var res = alasql('COLUMN OF SELECT * FROM three');
		assert.deepEqual(res, []);
		assert(test == 1);
		done();
	});

	it('6. BEFORE AND AFTER DELETE', function (done) {
		var test = 0;
		alasql.fn.onchange61 = function (r) {
			test++;
			var res = alasql('COLUMN OF SELECT * FROM four');
			assert.deepEqual(res, [1, 2, 3, 4, 5]);
		};
		alasql.fn.onchange62 = function () {
			test++;
			var res = alasql('COLUMN OF SELECT * FROM four');
			assert.deepEqual(res, [2, 3, 4, 5]);
		};
		alasql.fn.onchange63 = function () {
			test++;
			var res = alasql('COLUMN OF SELECT * FROM four');
			assert.deepEqual(res, [2, 3, 4, 5]);
		};
		alasql('CREATE TABLE four (a INT)');
		alasql('CREATE TRIGGER tr61 BEFORE DELETE ON four onchange61');
		alasql('CREATE TRIGGER tr62 AFTER DELETE ON four CALL onchange62()');
		alasql('CREATE TRIGGER tr63 AFTER DELETE ON four onchange63');
		alasql('INSERT INTO four VALUES (1),(2),(3),(4),(5)');
		alasql('DELETE FROM four WHERE a = 1');

		assert(test == 3);
		done();
	});

	it('7. BEFORE AND AFTER UPDATE', function (done) {
		var test = 0;
		alasql.fn.onchange7 = function (p, r) {
			assert(p.a == 2);
			assert(r.a == 7);
			test++;
		};
		alasql.fn.onchange7after = function (p, r) {
			assert(p.a == 2);
			assert(r.a == 7);
			test++;
		};
		alasql('CREATE TRIGGER tr7 BEFORE UPDATE ON four onchange7');
		alasql('CREATE TRIGGER tr7after BEFORE UPDATE ON four onchange7after');
		alasql('UPDATE four SET a = 7 WHERE a = 2');

		var res = alasql('COLUMN OF SELECT * FROM four');
		assert.deepEqual(res, [7, 3, 4, 5]);
		assert(test == 2);
		done();
	});

	it('8. INSTEAD OF UPDATE', function (done) {
		var test = 0;
		alasql.fn.onchange8 = function (p, r) {
			assert(p.a == 2);
			assert(r.a == 7);
			test++;
		};
		alasql('CREATE TABLE five (a INT)');
		alasql('CREATE TRIGGER tr8 INSTEAD OF UPDATE ON five onchange8');
		alasql('INSERT INTO five VALUES (1),(2),(3),(4),(5)');
		alasql('UPDATE five SET a = 7 WHERE a = 2');

		var res = alasql('COLUMN OF SELECT * FROM five');
		assert.deepEqual(res, [1, 2, 3, 4, 5]);
		assert(test == 1);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test393');
		done();
	});
});
