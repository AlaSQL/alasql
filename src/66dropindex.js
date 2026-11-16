/*
//
// DROP TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.DropIndex = function (params) {
	return Object.assign(this, params);
};
yy.DropIndex.prototype.toString = function () {
	return 'DROP INDEX ' + (this.ifexists ? 'IF EXISTS ' : '') + this.indexid;
};

// DROP TABLE
yy.DropIndex.prototype.compile = function (db) {
	var indexid = this.indexid;
	var ifexists = this.ifexists;
	return function () {
		if (ifexists && !alasql.databases[db].indices[indexid]) return 0;
		return 1;
	};
};
