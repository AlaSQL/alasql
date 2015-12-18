/*
//
// UPDATE for Alasql.js
// Date: 03.11.2014
// Modified: 16.11.2014
// (c) 2014, Andrey Gershun
//
*/

import {extend} from "../utils/object.js";
//formerly 76usedatabase


// DROP DATABASE databaseid
export function DropDatabase(params) { return yy.extend(this, params); }
DropDatabase.prototype.toString = function() {
	var s = 'DROP';
	if(this.ifexists) s += ' IF EXISTS';
	s += ' DATABASE '+this.databaseid;
	return s;
}
//yy.DropDatabase.prototype.compile = returnUndefined;
DropDatabase.prototype.execute = function (databaseid, params, cb) {
	if(this.engineid) {

//		console.log(this,this.databaseid, this.ifexists);
		return alasql.engines[this.engineid].dropDatabase(this.databaseid, this.ifexists, cb);
	}
	var res;

	var dbid = this.databaseid;

	if(dbid == alasql.DEFAULTDATABASEID) {
		throw new Error("Drop of default database is prohibited");
	}
//	console.log(dbid);
	if(!alasql.databases[dbid]) {
		if(!this.ifexists) {
			throw new Error("Database '"+dbid+"' does not exist");
		} else {
			res = 0;
		}
	} else {
		if(alasql.databases[dbid].engineid) {
			throw new Error("Cannot drop database '"+dbid+"', because it is attached. Detach it.");
		}

		delete alasql.databases[dbid];
		if(dbid == alasql.useid) {
			alasql.use();
		}
		res = 1;
	}
	if(cb) cb(res);
	return res;
};