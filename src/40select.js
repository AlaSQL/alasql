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

yy.Select = function(params) {
	return yy.extend(this, params);
};
yy.Select.prototype.toString = function() {
	var s;
	s = '';
	if (this.explain) {
		s += 'EXPLAIN ';
	}
	s += 'SELECT ';
	if (this.modifier) {
		s += this.modifier + ' ';
	}
	if (this.distinct) {
		s += 'DISTINCT ';
	}
	if (this.top) {
		s += 'TOP ' + this.top.value + ' ';
		if (this.percent) {
			s += 'PERCENT ';
		}
	}
	s += this.columns
		.map(function(col) {
			var s;
			s = col.toString();
			if (typeof col.as !== 'undefined') {
				s += ' AS ' + col.as;
			}
			return s;
		})
		.join(', ');
	if (this.from) {
		s +=
			' FROM ' +
			this.from
				.map(function(f) {
					var ss;
					ss = f.toString();
					if (f.as) {
						ss += ' AS ' + f.as;
					}
					return ss;
				})
				.join(',');
	}
	if (this.joins) {
		s += this.joins
			.map(function(jn) {
				var ss;
				ss = ' ';
				if (jn.joinmode) {
					ss += jn.joinmode + ' ';
				}
				if (jn.table) {
					ss += 'JOIN ' + jn.table.toString();
				} else if (jn.select) {
					ss += 'JOIN (' + jn.select.toString() + ')';
				} else if (jn instanceof alasql.yy.Apply) {
					ss += jn.toString();
				} else {
					throw new Error('Wrong type in JOIN mode');
				}
				if (jn.as) {
					ss += ' AS ' + jn.as;
				}
				if (jn.using) {
					ss += ' USING ' + jn.using.toString();
				}
				if (jn.on) {
					ss += ' ON ' + jn.on.toString();
				}
				return ss;
			})
			.join('');
	}
	if (this.where) {
		s += ' WHERE ' + this.where.toString();
	}
	if (this.group && this.group.length > 0) {
		s +=
			' GROUP BY ' +
			this.group
				.map(function(grp) {
					return grp.toString();
				})
				.join(', ');
	}
	if (this.having) {
		s += ' HAVING ' + this.having.toString();
	}
	if (this.order && this.order.length > 0) {
		s +=
			' ORDER BY ' +
			this.order
				.map(function(ord) {
					return ord.toString();
				})
				.join(', ');
	}
	if (this.limit) {
		s += ' LIMIT ' + this.limit.value;
	}
	if (this.offset) {
		s += ' OFFSET ' + this.offset.value;
	}
	if (this.union) {
		s += ' UNION ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.union.toString();
	}
	if (this.unionall) {
		s +=
			' UNION ALL ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.unionall.toString();
	}
	if (this.except) {
		s += ' EXCEPT ' + (this.corresponding ? 'CORRESPONDING ' : '') + this.except.toString();
	}
	if (this.intersect) {
		s +=
			' INTERSECT ' +
			(this.corresponding ? 'CORRESPONDING ' : '') +
			this.intersect.toString();
	}
	return s;
};

/**
 Select statement in expression
 */
yy.Select.prototype.toJS = function(context) {
	//	console.log('Expression',this);
	//	if(this.expression.reduced) return 'true';
	//	return this.expression.toJS(context, tableid, defcols);
	// console.log('Select.toJS', 81, this.queriesidx);
	//	var s = 'this.queriesdata['+(this.queriesidx-1)+'][0]';

	var s =
		'alasql.utils.flatArray(this.queriesfn[' +
		(this.queriesidx - 1) +
		'](this.params,null,' +
		context +
		'))[0]';

	//	var s = '(ee=alasql.utils.flatArray(this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')),console.log(999,ee),ee[0])';

	return s;
};

// Compile SELECT statement
yy.Select.prototype.compile = function(databaseid, params) {
	var db = alasql.databases[databaseid];
	// Create variable for query
	var query = new Query();

	// Array with columns to be removed
	query.removeKeys = [];
	query.aggrKeys = [];

	query.explain = this.explain; // Explain
	query.explaination = [];
	query.explid = 1;
	//console.log(this.modifier);
	query.modifier = this.modifier;

	query.database = db;
	// 0. Precompile whereexists
	this.compileWhereExists(query);

	// 0. Precompile queries for IN, NOT IN, ANY and ALL operators
	this.compileQueries(query);

	query.defcols = this.compileDefCols(query, databaseid);

	// 1. Compile FROM clause
	query.fromfn = this.compileFrom(query);

	// 2. Compile JOIN clauses
	if (this.joins) {
		this.compileJoins(query);
	}

	// todo?: 3. Compile SELECT clause

	// For ROWNUM()
	query.rownums = [];

	this.compileSelectGroup0(query);

	if (this.group || query.selectGroup.length > 0) {
		query.selectgfns = this.compileSelectGroup1(query);
	} else {
		query.selectfns = this.compileSelect1(query, params);
	}

	// Remove columns clause
	this.compileRemoveColumns(query);

	// 5. Optimize WHERE and JOINS
	if (this.where) {
		this.compileWhereJoins(query);
	}

	// 4. Compile WHERE clause
	query.wherefn = this.compileWhere(query);

	// 6. Compile GROUP BY
	if (this.group || query.selectGroup.length > 0) {
		query.groupfn = this.compileGroup(query);
	}

	// 6. Compile HAVING
	if (this.having) {
		query.havingfn = this.compileHaving(query);
	}

	// 8. Compile ORDER BY clause
	if (this.order) {
		query.orderfn = this.compileOrder(query);
	}

	if (this.group || query.selectGroup.length > 0) {
		query.selectgfn = this.compileSelectGroup2(query);
	} else {
		query.selectfn = this.compileSelect2(query);
	}

	// 7. Compile DISTINCT, LIMIT and OFFSET
	query.distinct = this.distinct;

	// 9. Compile PIVOT clause
	if (this.pivot) query.pivotfn = this.compilePivot(query);
	if (this.unpivot) query.pivotfn = this.compileUnpivot(query);

	// 10. Compile TOP/LIMIT/OFFSET/FETCH cleuse
	if (this.top) {
		query.limit = this.top.value;
	} else if (this.limit) {
		query.limit = this.limit.value;
		if (this.offset) {
			query.offset = this.offset.value;
		}
	}

	query.percent = this.percent;

	// 9. Compile ordering function for UNION and UNIONALL
	query.corresponding = this.corresponding; // If CORRESPONDING flag exists
	if (this.union) {
		query.unionfn = this.union.compile(databaseid);
		if (this.union.order) {
			query.orderfn = this.union.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if (this.unionall) {
		query.unionallfn = this.unionall.compile(databaseid);
		if (this.unionall.order) {
			query.orderfn = this.unionall.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if (this.except) {
		query.exceptfn = this.except.compile(databaseid);
		if (this.except.order) {
			query.orderfn = this.except.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if (this.intersect) {
		query.intersectfn = this.intersect.compile(databaseid);
		if (this.intersect.order) {
			query.intersectfn = this.intersect.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	}

	// SELECT INTO
	if (this.into) {
		if (this.into instanceof yy.Table) {
			//
			// Save into the table in database
			//
			if (
				alasql.options.autocommit &&
				alasql.databases[this.into.databaseid || databaseid].engineid
			) {
				// For external database when AUTOCOMMIT is ONs
				query.intoallfns =
					'return alasql.engines["' +
					alasql.databases[this.into.databaseid || databaseid].engineid +
					'"]' +
					'.intoTable("' +
					(this.into.databaseid || databaseid) +
					'","' +
					this.into.tableid +
					'",this.data, columns, cb);';
			} else {
				// Into AlaSQL tables
				query.intofns =
					"alasql.databases['" +
					(this.into.databaseid || databaseid) +
					"'].tables" +
					"['" +
					this.into.tableid +
					"'].data.push(r);";
			}
		} else if (this.into instanceof yy.VarValue) {
			//
			// Save into local variable
			// SELECT * INTO @VAR1 FROM ?
			//
			query.intoallfns =
				'alasql.vars["' +
				this.into.variable +
				'"]=this.data;res=this.data.length;if(cb)res=cb(res);return res;';
		} else if (this.into instanceof yy.FuncValue) {
			//
			// If this is INTO() function, then call it
			// with one or two parameters
			//
			var qs = "return alasql.into['" + this.into.funcid.toUpperCase() + "'](";
			if (this.into.args && this.into.args.length > 0) {
				qs += this.into.args[0].toJS() + ',';
				if (this.into.args.length > 1) {
					qs += this.into.args[1].toJS() + ',';
				} else {
					qs += 'undefined,';
				}
			} else {
				qs += 'undefined, undefined,';
			}
			query.intoallfns = qs + 'this.data,columns,cb)';
			//console.log('999');
		} else if (this.into instanceof yy.ParamValue) {
			//
			// Save data into parameters array
			// like alasql('SELECT * INTO ? FROM ?',[outdata,srcdata]);
			//
			query.intofns = "params['" + this.into.param + "'].push(r)";
		}

		if (query.intofns) {
			// Create intofn function
			// console.log(234234, query.intofns);
			query.intofn = new Function('r,i,params,alasql', 'var y;' + query.intofns);
		} else if (query.intoallfns) {
			// Create intoallfn function
			// console.log(23423234, query.intoallfns);
			query.intoallfn = new Function('columns,cb,params,alasql', 'var y;' + query.intoallfns);
		}
	}
	//console.log(query);

	// Now, compile all togeather into one function with query object in scope
	var statement = function(params, cb, oldscope) {
		query.params = params;
		// Note the callback function has the data and error reversed due to existing code in promiseExec which has the
		// err and data swapped.  This trickles down into alasql.exec and further. Rather than risk breaking the whole thing,
		// the (data, err) standard is maintained here.
		var res1 = queryfn(query, oldscope, function(res, err) {
			if (err) {
				return cb(err, null);
			}
			if (query.rownums.length > 0) {
				for (var i = 0, ilen = res.length; i < ilen; i++) {
					for (var j = 0, jlen = query.rownums.length; j < jlen; j++) {
						res[i][query.rownums[j]] = i + 1;
					}
				}
			}

			var res2 = modify(query, res);

			if (cb) {
				cb(res2);
			}
			//console.log(8888,res2);
			return res2;
		});
		//console.log(9999,res1);

		//		if(typeof res1 != 'undefined') res1 =  modify(query,res1);

		return res1;
	};

	//	statement.dbversion = ;
	//	console.log(statement.query);
	//console.log(202,statement);
	statement.query = query;
	return statement;
};

/**
 Modify res according modifier
 @function
 @param {object} query Query object
 @param res {object|number|string|boolean} res Data to be converted
 */
function modify(query, res) {
	// jshint ignore:line
	//	console.log(arguments);

	/* If source is a primitive value then return it */
	if (
		typeof res === 'undefined' ||
		typeof res === 'number' ||
		typeof res === 'string' ||
		typeof res === 'boolean'
	) {
		return res;
	}

	var modifier = query.modifier || alasql.options.modifier;
	var columns = query.columns;
	if (typeof columns === 'undefined' || columns.length == 0) {
		// Try to create columns
		if (res.length > 0) {
			var allcol = {};
			for (var i = Math.min(res.length, alasql.options.columnlookup || 10) - 1; 0 <= i; i--) {
				for (var key in res[i]) {
					allcol[key] = true;
				}
			}

			columns = Object.keys(allcol).map(function(columnid) {
				return {columnid: columnid};
			});
		} else {
			// Cannot recognize columns
			columns = [];
		}
	}

	//	console.log(columns);

	if (modifier === 'VALUE') {
		//		console.log(222,res);
		if (res.length > 0) {
			var key;
			if (columns && columns.length > 0) {
				key = columns[0].columnid;
			} else {
				key = Object.keys(res[0])[0];
			}
			res = res[0][key];
		} else {
			res = undefined;
		}
	} else if (modifier === 'ROW') {
		if (res.length > 0) {
			var key;
			var a = [];
			for (var key in res[0]) {
				a.push(res[0][key]);
			}
			res = a;
		} else {
			res = undefined;
		}
	} else if (modifier === 'COLUMN') {
		var ar = [];
		if (res.length > 0) {
			var key;
			if (columns && columns.length > 0) {
				key = columns[0].columnid;
			} else {
				key = Object.keys(res[0])[0];
			}

			for (var i = 0, ilen = res.length; i < ilen; i++) {
				ar.push(res[i][key]);
			}
		}
		res = ar;
	} else if (modifier === 'MATRIX') {
		// Returns square matrix of rows
		var ar = [];
		for (var i = 0; i < res.length; i++) {
			var a = [];
			var r = res[i];
			for (var j = 0; j < columns.length; j++) {
				a.push(r[columns[j].columnid]);
			}
			ar.push(a);
		}
		res = ar;
	} else if (modifier === 'INDEX') {
		var ar = {};
		var key, val;
		if (columns && columns.length > 0) {
			key = columns[0].columnid;
			val = columns[1].columnid;
		} else {
			var okeys = Object.keys(res[0]);
			key = okeys[0];
			val = okeys[1];
		}
		for (var i = 0, ilen = res.length; i < ilen; i++) {
			ar[res[i][key]] = res[i][val];
		}
		res = ar;
		//		res = arrayOfArrays(res);
	} else if (modifier === 'RECORDSET') {
		res = new alasql.Recordset({columns: columns, data: res});
		//		res = arrayOfArrays(res);
	} else if (modifier === 'TEXTSTRING') {
		var key;
		if (columns && columns.length > 0) {
			key = columns[0].columnid;
		} else {
			key = Object.keys(res[0])[0];
		}

		for (var i = 0, ilen = res.length; i < ilen; i++) {
			res[i] = res[i][key];
		}
		res = res.join('\n');
		//		res = arrayOfArrays(res);
	}
	return res;
}

//  yy.Select.prototype.exec = function(databaseid) {
// 	throw new Error('Select statement should be precompiled');

//  };
yy.Select.prototype.execute = function(databaseid, params, cb) {
	return this.compile(databaseid)(params, cb);
	//	throw new Error('Insert statement is should be compiled')
};
