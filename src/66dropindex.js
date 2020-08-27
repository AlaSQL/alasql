/*
//
// DROP TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.DropIndex = function (params) {
	return yy.extend(this, params);
};
yy.DropIndex.prototype.toString = function () {
	return 'DROP INDEX' + this.indexid;
};

// DROP TABLE
yy.DropIndex.prototype.compile = function (db) {
	var indexid = this.indexid;
	return function () {
		return 1;
	};
};
