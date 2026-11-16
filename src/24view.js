/*
//
// View class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Table class
class View {
	constructor(params) {
		// Columns
		this.columns = [];
		this.xcolumns = {};
		// Data array
		this.query = [];

		Object.assign(this, params);
	}
}

alasql.View = View;

/*/*
// View = function(){
// 	this.data = [];
// 	this.columns = [];
// 	this.ixcolumns = {};
// 	this.ixdefs = {};
// 	this.indices = {};
// };

// alasql.View = View;
*/
