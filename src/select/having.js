import {escapeq} from '../utils/helpers.js';

export default function install(alasql) {
	var yy = alasql.yy;
	/* global yy */

	// A name in HAVING that is not a column of a source reads the SELECT alias of that
	// name, as in SQLite (#887). Aggregates and subqueries keep their own names.
	function resolveHavingAliases(node, query) {
		if (!node || typeof node !== 'object') return;
		if (node instanceof yy.Select || node instanceof yy.AggrValue) return;
		if (node instanceof yy.Column) {
			// Decided again on every compile, as the sources can change
			delete node.toJS;
			var columnid = node.columnid;
			var nick = query.groupColumns[columnid];
			if (
				!node.tableid &&
				nick !== undefined &&
				nick !== columnid &&
				query.defcols[columnid] !== '-' &&
				query.ingroup.indexOf(columnid) === -1
			) {
				// A column of a source wins over the alias, and is read from a row of the
				// group. A subquery, a parameter and a table without column definitions
				// only tell at run time which columns they have (#2878)
				var row = '(this.groupSources.get(g)||{})';
				var sources = query.defcols['.'];
				var js = Object.keys(sources).reduceRight(
					function (rest, alias) {
						var source = row + "['" + escapeq(alias) + "']";
						var read = source + "?.['" + escapeq(columnid) + "']";
						if (sources[alias] instanceof Set) {
							return sources[alias].has(columnid) ? read : rest;
						}
						return (
							"('" + escapeq(columnid) + "' in Object(" + source + ')?' + read + ':' + rest + ')'
						);
					},
					"g['" + nick + "']"
				);
				node.toJS = function () {
					return js;
				};
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
