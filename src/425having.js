/* global yy */

// A name in HAVING that is not a column of a source table reads the SELECT alias
// of that name, as in SQLite (#887). Aggregates and subqueries keep their own names.
// The value of a computed alias like g * 10 AS z, read from the row that the
// SELECT list already computed for the group (#2769)
class SelectRowValue {
	constructor(columnid) {
		this.columnid = columnid;
	}

	toString() {
		return this.columnid;
	}

	toJS() {
		return "r['" + escapeq(this.columnid) + "']";
	}
}

// Returns the node to use in place of the given one.
function resolveHavingAliases(node, query, columns) {
	if (!node || typeof node !== 'object') return node;
	if (node instanceof yy.Select || node instanceof yy.AggrValue) return node;
	// Already resolved by an earlier compile of the same statement
	if (node instanceof SelectRowValue) {
		query.havingReadsRow = true;
		return node;
	}
	if (node instanceof yy.Column) {
		var nick = query.groupColumns[node.columnid];
		if (
			!node.tableid &&
			nick !== undefined &&
			nick !== node.columnid &&
			!(query.defcols && query.defcols[node.columnid])
		) {
			var col = columns.find(function (c) {
				return c.as === node.columnid;
			});
			if (col && !(col instanceof yy.Column) && !(col instanceof yy.AggrValue)) {
				query.havingReadsRow = true;
				return new SelectRowValue(node.columnid);
			}
			node.nick = nick;
		}
		return node;
	}
	for (var key in node) {
		node[key] = resolveHavingAliases(node[key], query, columns);
	}
	return node;
}

yy.Select.prototype.compileHaving = function (query) {
	if (this.having) {
		this.having = resolveHavingAliases(this.having, query, this.columns);
		var s = this.having.toJS('g', -1);
		query.havingfns = s;
		//		console.log(s);
		return new Function('g,params,alasql,r', 'var y;return ' + s);
	}

	return function () {
		return true;
	};
};
