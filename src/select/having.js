export default function install(alasql) {
	var yy = alasql.yy;
/* global yy */

// A name in HAVING that is not a column of a source table reads the SELECT alias
// of that name, as in SQLite (#887). Aggregates and subqueries keep their own names.
function resolveHavingAliases(node, query) {
	if (!node || typeof node !== 'object') return;
	if (node instanceof yy.Select || node instanceof yy.AggrValue) return;
	if (node instanceof yy.Column) {
		var nick = query.groupColumns[node.columnid];
		if (
			!node.tableid &&
			nick !== undefined &&
			nick !== node.columnid &&
			!(query.defcols && query.defcols[node.columnid])
		) {
			node.nick = nick;
		}
		return;
	}
	for (var key in node) {
		resolveHavingAliases(node[key], query);
	}
}

yy.Select.prototype.compileHaving = function (query) {
	if (this.having) {
		resolveHavingAliases(this.having, query);
		var s = this.having.toJS('g', -1);
		query.havingfns = s;
		//		console.log(s);
		return new Function('g,params,alasql', 'var y;return ' + s);
	}

	return function () {
		return true;
	};
};
}
