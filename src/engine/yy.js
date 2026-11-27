export default function install(alasql) {
	var alasqlparser = alasql.parser;
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

	/*
		Each SELECT has its own list of the subqueries written in it (#2666). The parser opens
		the list when a SELECT starts and gives it to the SELECT when the SELECT ends. A subquery
		is pushed onto the open list, and its queriesidx is its position there. The SELECT compiles
		its list into queriesfn, and the code of the subquery's expression reads
		this.queriesfn[queriesidx].

		A subquery outside any SELECT (UPDATE, DELETE, INSERT VALUES, SET, IF, WHILE, PRINT) goes
		onto the list at the bottom, which AStatement gives to the statement.

		The parser calls these on its own copy of yy for each parse, so they keep the lists on
		this and not on yy.
	*/
	Object.assign(yy, {
		openQueries() {
			if (!this.queriesStack) this.queriesStack = [];
			this.queriesStack.push(this.queries || []);
			this.queries = [];
		},

		closeQueries(select) {
			if (this.queries.length) select.queries = this.queries;
			this.queries = this.queriesStack.pop();
			// Where the list around the SELECT ended when the SELECT closed, for moveQueries
			if (!this.queriesMarks) this.queriesMarks = new WeakMap();
			this.queriesMarks.set(select, this.queries.length);
		},

		// A subquery: push it onto the open list
		addQuery(query) {
			if (!this.queries) this.queries = [];
			query.queriesidx = this.queries.length;
			this.queries.push(query);
			return query;
		},

		// In (SELECT ...) ORDER BY ..., the SELECT in parentheses is closed before the ORDER BY
		// is read, and it compiles that ORDER BY. Move the subqueries of the ORDER BY and LIMIT
		// from the open list to the list of that SELECT.
		moveQueries(select) {
			var mark = this.queriesMarks && this.queriesMarks.get(select);
			if (mark === undefined || !this.queries || this.queries.length <= mark) return;
			var moved = this.queries.splice(mark);
			if (!select.queries) select.queries = [];
			moved.forEach(function (query) {
				query.queriesidx = select.queries.length;
				select.queries.push(query);
			});
		},

		// IF, WHILE and CREATE TRIGGER share the list of the statement in them, unless that is a
		// SELECT, whose list is its own
		takeQueries(statement, inner) {
			for (var i = 0; i < inner.length; i++) {
				var s = inner[i];
				if (s && s.queries && !(s instanceof yy.Select)) {
					statement.queries = s.queries;
					return;
				}
			}
		},
	});

	alasqlparser.yy = alasql.yy = yy;
}
