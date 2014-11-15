/*
//
// Table class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Table class
Table = function(){
	this.data = [];
	this.columns = [];
	this.ixcolumns = {};
	this.ixdefs = {};
	this.indices = {};
};

alasql.Table = Table;

// View = function(){
// 	this.data = [];
// 	this.columns = [];
// 	this.ixcolumns = {};
// 	this.ixdefs = {};
// 	this.indices = {};
// };

// alasql.View = View;

Table.prototype.indexColumns = function() {
	this.xcolumns = {};
	this.columns.forEach(function(col){
		table.xcolumns[col.columnid] = col;
	});	
}


