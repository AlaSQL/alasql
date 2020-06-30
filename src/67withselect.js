/*
//
// WITH SELECT for Alasql.js
// Date: 11.01.2015
// (c) 2015, Andrey Gershun
//
*/

yy.WithSelect = function (params) {
	return yy.extend(this, params);
};
yy.WithSelect.prototype.toString = function () {
	var s = 'WITH ';
	s +=
		this.withs
			.map(function (w) {
				return w.name + ' AS (' + w.select.toString() + ')';
			})
			.join(',') + ' ';
	s += this.select.toString();
	return s;
};

yy.WithSelect.prototype.execute = function (databaseid, params, cb) {
	var self = this;
	// Create temporary tables
	var savedTables = [];
	self.withs.forEach(function (w) {
		savedTables.push(alasql.databases[databaseid].tables[w.name]);
		var tb = (alasql.databases[databaseid].tables[w.name] = new Table({tableid: w.name}));
		tb.data = w.select.execute(databaseid, params);
	});

	var res = 1;
	res = this.select.execute(databaseid, params, function (data) {
		// Clear temporary tables
		//		setTimeout(function(){
		self.withs.forEach(function (w, idx) {
			if (savedTables[idx]) alasql.databases[databaseid].tables[w.name] = savedTables[idx];
			else delete alasql.databases[databaseid].tables[w.name];
		});
		//		},0);

		if (cb) data = cb(data);
		return data;
	});
	return res;
};

/*/*
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

yy.DropView = function (params) { return yy.extend(this, params); }
yy.DropView.prototype.toString = function() {
	var s = 'DROP'+' '+'VIEW';
	s += ' '+this.view.toString();
	return s;
};

// CREATE TABLE
//yy.CreateTable.prototype.compile = returnUndefined;
yy.DropView.prototype.execute = function (databaseid) {
//	var self = this;
};

*/
