/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//
// Main part of SELECT procedure
//

/* global yy */

yy.Select = class Select {
	constructor(params) {
		Object.assign(this, params);
	}

	toString() {
		var s = '';
		if (this.explain) s += 'EXPLAIN ';
		s += 'SELECT ';
		if (this.modifier) s += this.modifier + ' ';
		if (this.distinct) s += 'DISTINCT ';
		if (this.top) {
			s += 'TOP ' + this.top.value + ' ';
			if (this.percent) s += 'PERCENT ';
		}

		s += this.columns
			.map(col => {
				let sc = col.toString();
				if (typeof col.as !== 'undefined') sc += ' AS ' + col.as;
				return sc;
			})
			.join(', ');

		if (this.from) {
			s +=
				' FROM ' +
				this.from
					.map(f => {
						let ss = f.toString();
						if (f.as) ss += ' AS ' + f.as;
						return ss;
					})
					.join(',');
		}
		if (this.joins) {
			s += this.joins
				.map(jn => {
					let ss = ' ';
					if (jn.joinmode) ss += jn.joinmode + ' ';
					if (jn.table) ss += 'JOIN ' + jn.table.toString();
					else if (jn.select) ss += 'JOIN (' + jn.select.toString() + ')';
					else if (jn instanceof alasql.yy.Apply) ss += jn.toString();
					else throw new Error('Wrong type in JOIN mode');
					if (jn.as) ss += ' AS ' + jn.as;
					if (jn.using) ss += ' USING ' + jn.using.toString();
					if (jn.on) ss += ' ON ' + jn.on.toString();
					return ss;
				})
				.join('');
		}
		if (this.where) s += ' WHERE ' + this.where.toString();
		if (this.group && this.group.length > 0)
			s += ' GROUP BY ' + this.group.map(grp => grp.toString()).join(', ');
		if (this.having) s += ' HAVING ' + this.having.toString();
		if (this.order && this.order.length > 0)
			s += ' ORDER BY ' + this.order.map(ord => ord.toString()).join(', ');
		if (this.limit) s += ' LIMIT ' + this.limit.value;
		if (this.offset) s += ' OFFSET ' + this.offset.value;
		if (this.union)
			s += ' UNION ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.union.toString();
		if (this.unionall)
			s +=
				' UNION ALL ' +
				(this.corresponding ? 'CORRESPONDING ' : '') +
				this.unionall.toString();
		if (this.except)
			s += ' EXCEPT ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.except.toString();
		if (this.intersect)
			s +=
				' INTERSECT ' +
				(this.corresponding ? 'CORRESPONDING ' : '') +
				this.intersect.toString();
		return s;
	}

	toJS(context) {
		return (
			"alasql.utils.flatArray(this.queriesfn[" +
			(this.queriesidx - 1) +
			"](this.params,null," +
			context +
			"))[0]"
		);
	}

	compile(databaseid, params) {
		var db = alasql.databases[databaseid];
		var query = new Query();
		query.removeKeys = [];
		query.aggrKeys = [];
		query.explain = this.explain;
		query.explaination = [];
		query.explid = 1;
		query.modifier = this.modifier;
		query.database = db;

		this.compileWhereExists(query);
		this.compileQueries(query);
		query.defcols = this.compileDefCols(query, databaseid);
		query.fromfn = this.compileFrom(query);

		if (this.joins) this.compileJoins(query);

		query.rownums = [];
		this.compileSelectGroup0(query);

		if (this.group || query.selectGroup.length > 0) {
			query.selectgfns = this.compileSelectGroup1(query);
		} else {
			query.selectfns = this.compileSelect1(query, params);
		}

		this.compileRemoveColumns(query);
		if (this.where) this.compileWhereJoins(query);
		query.wherefn = this.compileWhere(query);

		if (this.group || query.selectGroup.length > 0)
			query.groupfn = this.compileGroup(query);

		if (this.having) query.havingfn = this.compileHaving(query);
		if (this.order) query.orderfn = this.compileOrder(query, params);

		if (this.group || query.selectGroup.length > 0)
			query.selectgfn = this.compileSelectGroup2(query);
		else query.selectfn = this.compileSelect2(query, params);

		query.distinct = this.distinct;
		if (this.pivot) query.pivotfn = this.compilePivot(query);
		if (this.unpivot) query.pivotfn = this.compileUnpivot(query);

		if (this.top) query.limit = this.top.value;
		else if (this.limit) {
			query.limit = this.limit.value;
			if (this.offset) query.offset = this.offset.value;
		}
		query.percent = this.percent;

		query.corresponding = this.corresponding;
		if (this.union) {
			query.unionfn = this.union.compile(databaseid);
			query.orderfn = this.union.order ? this.union.compileOrder(query, params) : null;
		} else if (this.unionall) {
			query.unionallfn = this.unionall.compile(databaseid);
			query.orderfn = this.unionall.order
				? this.unionall.compileOrder(query, params)
				: null;
		} else if (this.except) {
			query.exceptfn = this.except.compile(databaseid);
			query.orderfn = this.except.order ? this.except.compileOrder(query, params) : null;
		} else if (this.intersect) {
			query.intersectfn = this.intersect.compile(databaseid);
			query.orderfn = this.intersect.order
				? this.intersect.compileOrder(query, params)
				: null;
		}

		// INTO logic (unchanged)
		if (this.into) {
			if (this.into instanceof yy.Table) {
				if (
					alasql.options.autocommit &&
					alasql.databases[this.into.databaseid || databaseid].engineid
				) {
					query.intoallfns = `return alasql
								.engines[${JSON.stringify(alasql.databases[this.into.databaseid || databaseid].engineid)}]
								.intoTable(
									${JSON.stringify(this.into.databaseid || databaseid)},
									${JSON.stringify(this.into.tableid)},
									this.data,
									columns,
									cb
								);`;
				} else {
					query.intofns = `alasql
							.databases[${JSON.stringify(this.into.databaseid || databaseid)}]
							.tables[${JSON.stringify(this.into.tableid)}]
							.data.push(r);`;
				}
			} else if (this.into instanceof yy.VarValue) {
				query.intoallfns = `
					alasql.vars[${JSON.stringify(this.into.variable)}]=this.data;
					res=this.data.length;
					if(cb) res = cb(res);
					return res;
				`;
			} else if (this.into instanceof yy.FuncValue) {
				var qs = 'return alasql.into[' + JSON.stringify(this.into.funcid.toUpperCase()) + '](';
				if (this.into.args && this.into.args.length > 0) {
					qs += this.into.args[0].toJS() + ',';
					if (this.into.args.length > 1) qs += this.into.args[1].toJS() + ',';
					else qs += 'undefined,';
				} else {
					qs += 'undefined, undefined,';
				}
				query.intoallfns = qs + 'this.data,columns,cb)';
			} else if (this.into instanceof yy.ParamValue) {
				query.intofns = `params[${JSON.stringify(this.into.param)}].push(r)`;
			}

			if (query.intofns)
				query.intofn = new Function('r,i,params,alasql', 'var y;' + query.intofns);
			else if (query.intoallfns)
				query.intoallfn = new Function('columns,cb,params,alasql', 'var y;' + query.intoallfns);
		}

		var statement = function (params, cb, oldscope) {
			query.params = params;
			var res1 = queryfn(query, oldscope, function (res, err) {
				if (err) {
					if (cb) return cb(null, err);
					throw err;
				}
				if (query.rownums.length > 0) {
					for (var i = 0, ilen = res.length; i < ilen; i++) {
						for (var j = 0, jlen = query.rownums.length; j < jlen; j++) {
							res[i][query.rownums[j]] = i + 1;
						}
					}
				}
				var res2 = modify(query, res);
				if (cb) cb(res2);
				return res2;
			});
			return res1;
		};
		statement.query = query;
		return statement;
	}

	execute(databaseid, params, cb) {
		return this.compile(databaseid)(params, cb);
	}

	compileWhereExists(query) {
		if (!this.exists) return;
		query.existsfn = this.exists.map(function (ex) {
			var nq = ex.compile(query.database.databaseid);
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}

	compileQueries(query) {
		if (!this.queries) return;
		query.queriesfn = this.queries.map(function (q) {
			var nq = q.compile(query.database.databaseid);
			nq.query.modifier = 'RECORDSET';
			return nq;
		});
	}
};

/**
 * Modify res according to modifier
 */
function modify(query, res) {
	if (
		typeof res === 'undefined' ||
		typeof res === 'number' ||
		typeof res === 'string' ||
		typeof res === 'boolean'
	) {
		return res;
	}

	let modifier = query.modifier || alasql.options.modifier;
	let columns = query.columns;

	// Auto-detect columns if missing
	if (!columns || columns.length === 0) {
		if (res.length > 0) {
			const allcol = {};
			for (let i = 0; i < Math.min(res.length, alasql.options.columnlookup || 10); i++) {
				for (const key in res[i]) allcol[key] = true;
			}
			columns = Object.keys(allcol).map(k => ({ columnid: k }));
		} else columns = [];
	}

	switch (modifier) {
		case 'VALUE':
			if (res.length === 0) return undefined;
			const keyValue = columns?.[0]?.columnid || Object.keys(res[0])[0];
			return res[0][keyValue];

		case 'ROW':
			if (res.length === 0) return undefined;
			return Object.values(res[0]);

		case 'COLUMN':
			if (res.length === 0) return [];
			const key = columns?.[0]?.columnid || Object.keys(res[0])[0];
			return res.map(r => r[key]);

		case 'MATRIX':
			if (res.length === 0) return undefined;
			return res.map(row => columns.map(col => row[col.columnid]));

		case 'INDEX':
			if (res.length === 0) return undefined;
			const keyIndex = columns?.[0]?.columnid || Object.keys(res[0])[0];
			const valIndex = columns?.[1]?.columnid || Object.keys(res[0])[1];
			return res.reduce((acc, row) => {
				acc[row[keyIndex]] = row[valIndex];
				return acc;
			}, {});

case 'RECORDSET': {
    // Fix for missing columns (e.g., t.* + computed columns)
    let allCols = [];
    if (res.length > 0) {
        const colMap = {};
        res.forEach(row => {
            Object.keys(row).forEach(k => (colMap[k] = true));
        });
        allCols = Object.keys(colMap).map(k => ({ columnid: k }));
    } else {
        allCols = columns;
    }
    return new alasql.Recordset({ columns: allCols, data: res });
}


		case 'TEXTSTRING':
			if (res.length === 0) return undefined;
			const keyText = columns?.[0]?.columnid || Object.keys(res[0])[0];
			return res.map(row => row[keyText]).join('\n');
	}

	return res;
}

// ✅ Custom RECORDSET class
yy.Recordset = class Recordset extends yy.Select {
	compile(databaseid) {
		const superSelect = super.compile(databaseid);
		return (params, cb) => {
			const data = superSelect(params, cb);
			const allKeys = new Set(Object.keys(data[0] || {}));
			const mergedColumns = Array.from(allKeys).map(k => ({ columnid: k }));
			return { columns: mergedColumns, data };
		};
	}
};
