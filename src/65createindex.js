/*
//
// CREATE TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// The key function of a regular index (INDEX, CREATE INDEX), compiled once and not for every row (#2880)
var indexKeyFns = {};
function indexKeyFn(indexdef) {
	return (indexKeyFns[indexdef.rightfns] =
		indexKeyFns[indexdef.rightfns] ||
		new Function('r,params,alasql', 'return ' + indexdef.rightfns));
}

function addToIndexes(table, r, params) {
	for (var indexid in table.inddefs) {
		var indexdef = table.inddefs[indexid];
		var ix = table.indices[indexdef.hh];
		if (!ix) continue;
		var addr = indexKeyFn(indexdef)(r, params, alasql);
		(ix[addr] = ix[addr] || []).push(r);
	}
}

function removeFromIndexes(table, r, params) {
	for (var indexid in table.inddefs) {
		var indexdef = table.inddefs[indexid];
		var ix = table.indices[indexdef.hh];
		if (!ix) continue;
		var addr = indexKeyFn(indexdef)(r, params, alasql);
		var pos = ix[addr] ? ix[addr].indexOf(r) : -1;
		if (pos > -1) ix[addr].splice(pos, 1);
		if (ix[addr] && !ix[addr].length) delete ix[addr];
	}
}

// Fill the regular indexes again from the rows, after DELETE, UPDATE or TRUNCATE (#2880)
function rebuildIndexes(table, params) {
	if (!table.inddefs || !Object.keys(table.inddefs).length) return;
	for (var indexid in table.inddefs) {
		var hh = table.inddefs[indexid].hh;
		if (table.indices[hh]) table.indices[hh] = {};
	}
	table.data.forEach(function (r) {
		addToIndexes(table, r, params);
	});
}

yy.CreateIndex = function (params) {
	return Object.assign(this, params);
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
	var db = alasql.databases[this.table.databaseid || databaseid];
	var tableid = this.table.tableid;
	var table = db.tables[tableid];
	var indexid = this.indexid;
	db.indices[indexid] = tableid;
	// The schema changed, so statements in the statement cache must be compiled again
	schemaChanged(db);

	var rightfns = this.columns
		.map(function (expr) {
			return indexColumnToJS(expr.expression, table);
		})
		.join("+'`'+");

	var rightfn = new Function('r,params,alasql', 'return ' + rightfns);

	if (this.unique) {
		// Create a unique constraint similar to table.uk
		var uniqueConstraint = {};
		table.uk = table.uk || [];
		table.uk.push(uniqueConstraint);
		uniqueConstraint.columns = this.columns;
		uniqueConstraint.onrightfns = rightfns;
		// Callers pass only the row, so pass alasql here for keys like ROUND(a) (#2876)
		uniqueConstraint.onrightfn = function (r, params) {
			return rightfn(r, params, alasql);
		};
		uniqueConstraint.hh = hash(rightfns);

		// Store in uniqdefs for reference
		table.uniqdefs[indexid] = {
			rightfns: rightfns,
			hh: uniqueConstraint.hh,
		};

		// Initialize the unique index
		table.uniqs[uniqueConstraint.hh] = {};

		// Populate existing data and check for duplicates
		if (table.data.length > 0) {
			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				var addr = rightfn(table.data[i], params, alasql);
				if (typeof table.uniqs[uniqueConstraint.hh][addr] !== 'undefined') {
					throw new Error('Cannot create unique index with duplicate values');
				}
				table.uniqs[uniqueConstraint.hh][addr] = table.data[i];
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
	return Object.assign(this, params);
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
