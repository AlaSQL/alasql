/*
//
// CREATE VIEW for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.CreateView = function (params) { return yy.extend(this, params); }
yy.CreateView.prototype.toString = function() {
	var s = 'CREATE VIEW';
	s += ' '+this.view.toString();
	if(this.columns) { 
		var ss = this.columns.map(function(col){
			return col.toString();
		});
		s += ' ('+ss.join(',')+')';
	}
	s += ' AS '+this.select.toString();
	return s;
};

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.CreateView.prototype.execute = function (databaseid) {
//	var self = this;
	var db = alasql.databases[this.view.databaseid || databaseid];
	var v = db.views[this.view.viewid] = new View();

//	console.log(databaseid);
//	console.log(db.databaseid,db.tables);
//	console.log(table);

	return 1;
};


