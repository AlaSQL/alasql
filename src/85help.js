/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Help = function (params) { return yy.extend(this, params); }
yy.Help.prototype.toString = function() {
	var s = 'HELP';
	if(this.subject) s += ' '+this.subject;
	return s;
}


alasql.helpdocs = [
	{Command:'CREATE DATABASE database'},
	{Command:'CREATE TABLE table (columns)'},
	{Command:'DROP DATABASE database'},
	{Command:'DROP TABLE table'},
	{Command:'See <a href="http://alasql.org/docs">alasql.org/docs</a> for documentation'}
];

// DROP TABLE
yy.Help.prototype.execute = function (databaseid) {
	var ss = [];
	if(!this.subject) {
		ss = alasql.helpdocs;
	} else {
		ss.push('See <a href="http://alasql.org/docs">alasql.org/docs</a> for documentation');
	}
	return ss;
};
