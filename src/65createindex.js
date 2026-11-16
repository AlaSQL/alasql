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

function hasRegularIndexes(table) {
	return !!table.inddefs && Object.keys(table.inddefs).length > 0;
}

// The key of a row in each regular index, read before UPDATE changes the row in place
function indexKeys(table, r, params) {
	var keys = {};
	for (var indexid in table.inddefs) {
		var indexdef = table.inddefs[indexid];
		if (table.indices[indexdef.hh]) keys[indexid] = indexKeyFn(indexdef)(r, params, alasql);
	}
	return keys;
}

// Bring the regular indexes in step after DELETE, UPDATE or REPLACE. Each change
// holds the row before, its index keys before (read before UPDATE changes the
// row in place) and the row after, which DELETE leaves out. Each bucket that a
// change touches is read once, so a large change costs no more than a rebuild.
function syncIndexes(table, changes, params) {
	if (!changes.length) return;
	for (var indexid in table.inddefs) {
		var indexdef = table.inddefs[indexid];
		var ix = table.indices[indexdef.hh];
		if (!ix) continue;
		var keyFn = indexKeyFn(indexdef);
		// Bucket key, then each row before with the row that takes its place
		var moves = new Map();
		var added = [];
		changes.forEach(function (change) {
			var key = String(change[1] ? change[1][indexid] : keyFn(change[0], params, alasql));
			var after = change[2];
			var keyAfter = after ? String(keyFn(after, params, alasql)) : key;
			if (!moves.has(key)) moves.set(key, new Map());
			// A row that keeps its key stays where it is in the bucket
			moves.get(key).set(change[0], after && keyAfter === key ? after : null);
			if (after && keyAfter !== key) added.push([keyAfter, after]);
		});
		moves.forEach(function (rows, key) {
			var bucket = [];
			(ix[key] || []).forEach(function (r) {
				var next = rows.has(r) ? rows.get(r) : r;
				if (next) bucket.push(next);
			});
			if (bucket.length) ix[key] = bucket;
			else delete ix[key];
		});
		added.forEach(function (a) {
			(ix[a[0]] = ix[a[0]] || []).push(a[1]);
		});
	}
}

// Fill the regular indexes again from the rows (#2880)
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
