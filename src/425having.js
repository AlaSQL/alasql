/* global yy */

// A name in HAVING that is not a column of a source table reads the SELECT alias
// of that name, as in SQLite (#887). Aggregates and subqueries keep their own names.
// Returns the node to use in place of the given one.
function resolveHavingAliases(node, query, columns) {
	if (!node || typeof node !== 'object') return node;
	if (node instanceof yy.Select || node instanceof yy.AggrValue) return node;
	if (node instanceof yy.Column) {
		var nick = query.groupColumns[node.columnid];
		if (
			!node.tableid &&
			nick !== undefined &&
			nick !== node.columnid &&
			!(query.defcols && query.defcols[node.columnid])
		) {
			// The group row has no value for a computed alias like g * 10 AS z,
			// so HAVING computes the SELECT expression itself (#2769)
			var col = columns.find(function (c) {
				return c.as === node.columnid;
			});
			if (col && !(col instanceof yy.Column) && !(col instanceof yy.AggrValue)) return col;
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
		return new Function('g,params,alasql', 'var y;return ' + s);
	}

	return function () {
		return true;
	};
};
