/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// Modified: 16.11.2014
// (c) 2014, Andrey Gershun
//
*/

import {extend} from "../utils/object.js";
import {alasql} from "../global/alasql.js";
//formerly 76usedatabase


// USE DATABSE databaseid
// USE databaseid
export function UseDatabase(params) { return extend(this, params); };
UseDatabase.prototype.toString = function() {
	return 'USE' +' '+'DATABASE'+' '+this.databaseid;
}
//yy.UseDatabase.prototype.compile = returnUndefined;
UseDatabase.prototype.execute = function (databaseid, params, cb) {
	var dbid = this.databaseid;
	if(!alasql.databases[dbid]) {
		throw new Error("Database '"+dbid+"' does not exist")
	};
	alasql.use(dbid);
	var res = 1;
	if(cb) cb(res);
	return res;
};