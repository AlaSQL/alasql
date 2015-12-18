/*
//
// Query class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

import {extend} from "../utils/object.js";
import {alasql} from "./alasql.js";

// Table class
//formerly 25queryclass.js
//TODO: handle the global alasql.Query
/**
 @class Query Main query class
 */
export function Query(params){
	this.alasql = alasql;
//	console.log(12,alasql);
	// Columns
	this.columns = [];
	this.xcolumns = {};
	this.selectGroup = [];
	this.groupColumns = {};
	// Data array
	extend(this,params);
};

/**
 @class Recordset data object
 */
export function Recordset(params){
	// Data array
	extend(this,params);
};



