import {extend} from "../utils/object.js";

/*
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//formerly from 50expression.js

/**
	Table class
	@class
*/

export function Table(params) { return extend(this, params); };
Table.prototype.toString = function() {
	var s = this.tableid;
//	if(this.joinmode)
	if(this.databaseid){
		s = this.databaseid+'.'+s;
	}
	return s;
};