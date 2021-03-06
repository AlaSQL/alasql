/*
//
// Table class for Alasql.js
// Date: 14.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Table class
var Table = (alasql.Table = function (params) {
	// Step 1: Data array
	this.data = [];

	// Step 2: Columns
	this.columns = [];
	this.xcolumns = {};

	// Step 3: indices
	this.inddefs = {};
	this.indices = {};
	this.uniqs = {};
	this.uniqdefs = {};

	// Step 4: identities
	this.identities = {};

	// Step 5: checkfn...
	this.checks = [];
	this.checkfns = []; // For restore... to be done...

	// Step 6: INSERT/DELETE/UPDATE

	// Step 7: Triggers...
	// Create trigger hubs
	this.beforeinsert = {};
	this.afterinsert = {};
	this.insteadofinsert = {};

	this.beforedelete = {};
	this.afterdelete = {};
	this.insteadofdelete = {};

	this.beforeupdate = {};
	this.afterupdate = {};
	this.insteadofupdate = {};

	// Done
	extend(this, params);
});

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

Table.prototype.indexColumns = function () {
	var self = this;
	self.xcolumns = {};
	self.columns.forEach(function (col) {
		self.xcolumns[col.columnid] = col;
	});
};
