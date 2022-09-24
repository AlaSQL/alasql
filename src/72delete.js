/*
//
// DELETE for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Delete = function(params) {
	return yy.extend(this, params);
};
yy.Delete.prototype.toString = function() {
	var s = 'DELETE FROM ' + this.table.toString();
	if (this.where) s += ' WHERE ' + this.where.toString();
	return s;
};

yy.Delete.prototype.compile = function(databaseid) {
	//  console.log(11,this);
	databaseid = this.table.databaseid || databaseid;
	var tableid = this.table.tableid;
	var statement;
	var db = alasql.databases[databaseid];

	if (this.where) {
		//		console.log(27, this);
		//		this.query = {};

		if (this.exists) {
			this.existsfn = this.exists.map(function(ex) {
				var nq = ex.compile(databaseid);
				nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}
		if (this.queries) {
			this.queriesfn = this.queries.map(function(q) {
				var nq = q.compile(databaseid);
				nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}

		//		try {
		//		console.log(this, 22, this.where.toJS('r',''));
		//	 } catch(err){console.log(444,err)};
		//		var query = {};
		//console.log(this.where.toJS('r',''));
		var wherefn = new Function(
			'r,params,alasql',
			'var y;return (' + this.where.toJS('r', '') + ')'
		).bind(this);
		//		console.log(wherefn);
		statement = function(params, cb) {
			if (db.engineid && alasql.engines[db.engineid].deleteFromTable) {
				return alasql.engines[db.engineid].deleteFromTable(
					databaseid,
					tableid,
					wherefn,
					params,
					cb
				);
			}

			if (alasql.options.autocommit && db.engineid && db.engineid == 'LOCALSTORAGE') {
				alasql.engines[db.engineid].loadTableData(databaseid, tableid);
			}

			var table = db.tables[tableid];
			//			table.dirty = true;
			var orignum = table.data.length;

			var newtable = [];
			for (var i = 0, ilen = table.data.length; i < ilen; i++) {
				if (wherefn(table.data[i], params, alasql)) {
					// Check for transaction - if it is not possible then return all back
					if (table.delete) {
						table.delete(i, params, alasql);
					} else {
						// Simply do not push
					}
				} else newtable.push(table.data[i]);
			}
			//			table.data = table.data.filter(function(r){return !;});
			table.data = newtable;

			// Trigger prevent functionality
			for (var tr in table.afterdelete) {
				var trigger = table.afterdelete[tr];
				if (trigger) {
					if (trigger.funcid) {
						alasql.fn[trigger.funcid]();
					} else if (trigger.statement) {
						trigger.statement.execute(databaseid);
					}
				}
			}

			var res = orignum - table.data.length;
			if (alasql.options.autocommit && db.engineid && db.engineid == 'LOCALSTORAGE') {
				alasql.engines[db.engineid].saveTableData(databaseid, tableid);
			}

			//			console.log('deletefn',table.data.length);
			if (cb) cb(res);
			return res;
		};
		//  .bind(query);

		// 		if(!this.queries) return;
		// 			query.queriesfn = this.queries.map(function(q) {
		// 			return q.compile(alasql.useid);
		// 		});
	} else {
		statement = function(params, cb) {
			if (alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].loadTableData(databaseid, tableid);
			}

			var table = db.tables[tableid];
			table.dirty = true;
			var orignum = db.tables[tableid].data.length;
			//table.deleteall();
			// Delete all records from the array
			db.tables[tableid].data.length = 0;

			// Reset PRIMARY KEY and indexes
			for (var ix in db.tables[tableid].uniqs) {
				db.tables[tableid].uniqs[ix] = {};
			}

			for (var ix in db.tables[tableid].indices) {
				db.tables[tableid].indices[ix] = {};
			}

			if (alasql.options.autocommit && db.engineid) {
				alasql.engines[db.engineid].saveTableData(databaseid, tableid);
			}

			if (cb) cb(orignum);
			return orignum;
		};
	}

	return statement;
};

yy.Delete.prototype.execute = function(databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
};
