/*
//
// UNION for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// SELECT UNION statement
//formerly 45union.js and yy.Union
export function Union(params) { return yy.extend(this, params); }
Union.prototype.toString = function () {
	return 'UNION';
};

Union.prototype.compile = function (tableid) {
	return null;
};