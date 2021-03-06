if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test381.json', {strict: false, ws: ''});
}

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 383 - MySQL compatibility issue #452', function () {
	before(function () {
		alasql('CREATE DATABASE test383;USE test383');
	});

	after(function () {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test383');
	});

	it('2. Create table issue', function (done) {
		alasql(function () {
			/*
    CREATE TABLE `org1` (
      `id` CHAR(36) NOT NULL,
      `name` VARCHAR(100) NOT NULL,
      `createUser` VARCHAR(100),
      `updateUser` VARCHAR(100),
      `createTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `lastUpdateTime` TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
      `deleteId` CHAR(36) NOT NULL DEFAULT "",
      PRIMARY KEY (`id`)
     );

    */
		});

		done();
	});

	it('3. UNIQUE KEY issue', function (done) {
		alasql(function () {
			/*
    CREATE TABLE `org2` (
      `id` CHAR(36) NOT NULL,
      `name` VARCHAR(100) NOT NULL,
      `createUser` VARCHAR(100),
      `updateUser` VARCHAR(100),
      `deleteId` CHAR(36) NOT NULL DEFAULT "",
      PRIMARY KEY (`id`),
      UNIQUE KEY `org_u1` (`name`, `deleteId`)
     ) ;
    */
		});

		done();
	});

	it('4. COLLATE issue', function (done) {
		alasql(function () {
			/*
    CREATE TABLE `org3` (
      `id` CHAR(36) NOT NULL,
      `name` VARCHAR(100) NOT NULL,
      `createUser` VARCHAR(100),
      `updateUser` VARCHAR(100),
      PRIMARY KEY (`id`)
     )  CHARSET=utf8 COLLATE=utf8_bin;
    */
		});

		done();
	});

	it('5. All issues', function (done) {
		alasql(function () {
			/*
    CREATE TABLE `org4` (
      `id` CHAR(36) NOT NULL,
      `name` VARCHAR(100) NOT NULL,
      `createUser` VARCHAR(100),
      `updateUser` VARCHAR(100),
      `createTime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      `lastUpdateTime` TIMESTAMP NOT NULL DEFAULT 0 ON UPDATE CURRENT_TIMESTAMP,
      `deleteId` CHAR(36) NOT NULL DEFAULT "",
      PRIMARY KEY (`id`),
      UNIQUE KEY `org_u1` (`name`, `deleteId`)
     )  CHARSET=utf8 COLLATE=utf8_bin;
    */
		});

		done();
	});

	it('6. ON UPDATE', function (done) {
		alasql('INSERT INTO org4 (id,name) VALUES (1,"Peter")');
		var res = alasql('SELECT * FROM org4');
		assert(res[0].lastUpdateTime === 0);

		alasql('UPDATE org4 SET name="George"');

		var res = alasql('SELECT * FROM org4');
		assert(res[0].lastUpdateTime >= res[0].createTime);
		done();
	});
});
