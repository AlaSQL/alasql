/*
//
// Query class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Table class

/**
 @class Query Main query class
 */
class Query {
	constructor(params) {
		this.alasql = alasql;
		//	console.log(12,alasql);
		// Columns
		this.columns = [];
		this.xcolumns = {};
		this.selectGroup = [];
		this.groupColumns = {};
		// Data array
		Object.assign(this, params);
	}
}

/**
 @class Recordset data object
 */
class Recordset {
	constructor(params) {
		// Data array
		Object.assign(this, params);
	}
}

alasql.Recordset = Recordset;
alasql.Query = Query;
