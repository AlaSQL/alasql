/*
//
// CREATE TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.CreateIndex = function (params) {
	return yy.extend(this, params);
};
yy.CreateIndex.prototype.toString = function () {
	var s = 'CREATE';
	if (this.unique) s += ' UNIQUE';
	s += ' INDEX ' + this.indexid + ' ON ' + this.table.toString();
	s += '(' + this.columns.toString() + ')';
	return s;
};

// CREATE TABLE
yy.CreateIndex.prototype.execute = function (databaseid, params, cb) {
	//	var self = this;
	var db = alasql.databases[databaseid];
	var tableid = this.table.tableid;
	var table = db.tables[tableid];
	var indexid = this.indexid;
	db.indices[indexid] = tableid;

	var rightfns = this.columns
		.map(function (expr) {
			return expr.expression.toJS('r', '');
		})
		.join("+'`'+");

	var rightfn = new Function('r,params,alasql', 'return ' + rightfns);

	if (this.unique) {
		table.uniqdefs[indexid] = {
			rightfns: rightfns,
		};
		var ux = (table.uniqs[indexid] = {});
		if (table.data.length > 0) {
			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				var addr = rightfns(table.data[i]);
				if (!ux[addr]) {
					ux[addr] = {num: 0};
				}
				ux[addr].num++;
			}
		}
	} else {
		var hh = hash(rightfns);
		table.inddefs[indexid] = {rightfns: rightfns, hh: hh};
		table.indices[hh] = {};

		var ix = (table.indices[hh] = {});
		if (table.data.length > 0) {
			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				var addr = rightfn(table.data[i], params, alasql);
				if (!ix[addr]) {
					ix[addr] = [];
				}
				ix[addr].push(table.data[i]);
			}
		}
	}
	var res = 1;
	if (cb) res = cb(res);
	return res;
};

yy.Reindex = function (params) {
	return yy.extend(this, params);
};
yy.Reindex.prototype.toString = function () {
	var s = 'REINDEX ' + this.indexid;
	return s;
};

// CREATE TABLE
yy.Reindex.prototype.execute = function (databaseid, params, cb) {
	//	var self = this;
	var db = alasql.databases[databaseid];
	var indexid = this.indexid;
	//	console.log(db.indices);
	var tableid = db.indices[indexid];
	var table = db.tables[tableid];
	table.indexColumns();
	var res = 1;
	if (cb) res = cb(res);
	return res;
};
