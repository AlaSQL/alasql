if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = 605;

describe('Test ' + test + ' - get autoval', function () {
	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) get autoval from default alasql object', function () {
		alasql('CREATE TABLE session (id INT AUTOINCREMENT, sessid STRING)');
		alasql('INSERT INTO session (sessid) VALUES ("TEST")');

		assert.equal(alasql.autoval('session', 'id'), 1);
		assert.equal(alasql.autoval('session', 'id', true), 2);

		alasql('INSERT INTO session (sessid) VALUES ("TEST"), ("TEST")');
		assert.equal(alasql.autoval('session', 'id'), 3);
		assert.equal(alasql.autoval('session', 'id', true), 4);
	});

	it('B) get autoval from new database', function () {
		//
		var mydb = new alasql.Database('My Database');
		mydb.exec('CREATE TABLE session (id INT AUTOINCREMENT, sessid STRING)');
		mydb.exec('INSERT INTO session (sessid) VALUES ("TEST"), ("TEST")');
		assert.equal(mydb.autoval('session', 'id'), 2);
		assert.equal(mydb.autoval('session', 'id', true), 3);
	});
});
