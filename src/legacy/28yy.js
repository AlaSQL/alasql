/*
//
// Parser helper for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Base class for all yy classes
class Base {
	constructor(params) {
		Object.assign(this, params);
	}
	toString() {}
	toType() {}
	toJS() {}
	exec() {}
	compile() {}
}

var yy = {
	// Utility
	/** @deprecated use `Object.assign` instead */
	extend: Object.assign,

	// Option for case sensitive
	casesensitive: alasql.options.casesensitive,
	Base,

	// Helper for ParamValue handling in UPDATE/DELETE/INSERT
	compileParamValue: function (paramIndex, operation, needsSync, databaseid, self, refProp) {
		return function (params, cb) {
			var data = params[paramIndex];
			if (!Array.isArray(data)) {
				var err = new Error(operation + ' requires an array for parameter ' + paramIndex);
				if (cb) return cb(null, err);
				throw err;
			}

			// Create temp table, execute, sync, cleanup
			var tmpid = '__p' + paramIndex + '_' + Date.now();
			var db = alasql.databases[databaseid || 'alasql'];
			db.tables[tmpid] = new alasql.Table({tableid: tmpid});
			db.tables[tmpid].data = data;

			try {
				var origRef = self[refProp];
				self[refProp] = new yy.Table({tableid: tmpid, databaseid: db.databaseid});
				var stmt = self.compile(databaseid);
				self[refProp] = origRef;

				var res = stmt(params, cb);

				// Sync back changes for operations that replace the array
				if (needsSync) {
					var newData = db.tables[tmpid].data;
					data.length = 0;
					Array.prototype.push.apply(data, newData);
				}

				return res;
			} catch (err) {
				if (cb) return cb(null, err);
				throw err;
			} finally {
				delete db.tables[tmpid];
			}
		};
	},
};

alasqlparser.yy = alasql.yy = yy;
