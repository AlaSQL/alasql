/*
//
// CREATE TABLE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

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

// MySQL's ANALYZE, OPTIMIZE, CHECK and REPAIR TABLE, FLUSH, and LOCK and UNLOCK TABLES (#2864).
// An in-memory database has nothing to do for them, so they only check the tables
yy.TableMaintenance = function (params) {
	return Object.assign(this, params);
};
yy.TableMaintenance.prototype.toString = function () {
	var s = this.op.toUpperCase();
	if (this.what) return s + ' ' + this.what;
	s += this.op.toUpperCase() === 'FLUSH' || /LOCK$/i.test(this.op) ? ' TABLES' : ' TABLE';
	if (this.tables.length) {
		s +=
			' ' +
			this.tables
				.map(function (t) {
					return t.toString() + (t.lock ? ' ' + t.lock : '');
				})
				.join(', ');
	}
	return s;
};
yy.TableMaintenance.prototype.execute = function (databaseid, params, cb) {
	var op = this.op.toUpperCase();
	var res;
	if (['ANALYZE', 'OPTIMIZE', 'CHECK', 'REPAIR'].includes(op)) {
		// One row per table, as MySQL gives
		res = this.tables.map(function (t) {
			var dbid = t.databaseid || databaseid;
			if (!alasql.databases[dbid].tables[t.tableid]) {
				throw new Error("Table '" + dbid + '.' + t.tableid + "' does not exist");
			}
			return {
				Table: dbid + '.' + t.tableid,
				Op: op.toLowerCase(),
				Msg_type: 'status',
				Msg_text: 'OK',
			};
		});
	} else {
		// FLUSH, LOCK and UNLOCK
		res = [];
	}
	if (cb) res = cb(res);
	return res;
};
