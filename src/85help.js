// NOT included when building

/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Help = function (params) {
	return yy.extend(this, params);
};
yy.Help.prototype.toString = function () {
	var s = 'HELP';
	if (this.subject) s += ' ' + this.subject;
	return s;
};

// Help string
var helpdocs = [
	{command: 'ALTER TABLE table RENAME TO table'},
	{command: 'ALTER TABLE table ADD COLUMN column coldef'},
	{command: 'ALTER TABLE table MODIFY COLUMN column coldef'},
	{command: 'ALTER TABLE table RENAME COLUMN column TO column'},
	{command: 'ALTER TABLE table DROP column'},
	{command: 'ATTACH engine DATABASE database'},
	{command: 'ASSERT value'},
	{command: 'BEGIN [TRANSACTION]'},
	{command: 'COMMIT [TRANSACTION]'},
	{command: 'CREATE [engine] DATABASE [IF NOT EXISTS] database'},
	{command: 'CREATE TABLE [IF NOT EXISTS] table (column definitions)'},
	{command: 'DELETE FROM table [WHERE expression]'},
	{command: 'DETACH DATABASE database'},
	{command: 'DROP [engine] DATABASE [IF EXISTS] database'},
	{command: 'DROP TABLE [IF EXISTS] table'},
	{command: 'INSERT INTO table VALUES value,...'},
	{command: 'INSERT INTO table DEFAULT VALUES'},
	{command: 'INSERT INTO table SELECT select'},
	{command: 'HELP [subject]'},
	{command: 'ROLLBACK [TRANSACTION]'},
	{
		command:
			'SELECT [modificator] columns [INTO table] [FROM table,...] [[mode] JOIN [ON] [USING]] [WHERE ] [GROUP BY] [HAVING] [ORDER BY] ',
	},
	{command: 'SET option value'},
	{command: 'SHOW [engine] DATABASES'},
	{command: 'SHOW TABLES'},
	{command: 'SHOW CREATE TABLE table'},
	{command: 'UPDATE table SET column1 = expression1, ... [WHERE expression]'},
	{command: 'USE [DATABASE] database'},
	{command: 'expression'},
	{
		command:
			'See also <a href="http://github/agershun/alasql">http://github/agershun/alasql</a> for more information',
	},
];

// execute
yy.Help.prototype.execute = function (databaseid, params, cb) {
	var ss = [];
	if (!this.subject) {
		ss = helpdocs;
	} else {
		ss.push(
			'See also <a href="http://github/agershun/alasql">http://github/agershun/alasql</a> for more information'
		);
	}
	if (cb) ss = cb(ss);
	return ss;
};
