yy.Select.prototype.compileWhere = function (query) {
	if (this.where) {
		if (typeof this.where == 'function') {
			return this.where;
		} else {
			var s = this.where.toJS('p', query.defaultTableid, query.defcols);
			query.wherefns = s;
			//		console.log(s);
			return new Function('p,params,alasql', 'var y;return ' + s);
		}
	} else
		return function () {
			return true;
		};
};

yy.Select.prototype.compileWhereJoins = function (query) {
	// Optimize implicit joins by extracting join conditions from WHERE clause
	// and setting up indexed lookups on sources
	if (!this.where) return;

	// Only optimize if we have multiple sources from FROM clause (implicit joins)
	if (query.sources.length <= 1) return;

	// Check if any sources already have optimization (from explicit JOINs)
	// If so, skip optimization to avoid conflicts
	var hasExplicitJoins = query.sources.some(function (source, idx) {
		return idx > 0 && source.onleftfn;
	});
	if (hasExplicitJoins) return;

	// Extract equality conditions from WHERE clause
	var conditions = extractWhereConditions(this.where);

	// Build a map of source aliases to their indices
	var aliasToIdx = {};
	query.sources.forEach(function (source, idx) {
		aliasToIdx[source.alias] = idx;
	});

	// Process each condition to find join relationships
	conditions.forEach(function (cond) {
		if (cond.op !== '=') return;
		if (cond.allsome) return;

		var ls = cond.left.toJS('p', query.defaultTableid, query.defcols);
		var rs = cond.right.toJS('p', query.defaultTableid, query.defcols);

		// Find which sources are involved
		var leftAliases = extractAliases(ls);
		var rightAliases = extractAliases(rs);

		// For a join condition, we need exactly one alias on each side
		if (leftAliases.length === 1 && rightAliases.length === 1) {
			var leftAlias = leftAliases[0];
			var rightAlias = rightAliases[0];

			// Make sure both aliases exist in our sources
			if (
				typeof aliasToIdx[leftAlias] === 'undefined' ||
				typeof aliasToIdx[rightAlias] === 'undefined'
			) {
				return;
			}

			var leftIdx = aliasToIdx[leftAlias];
			var rightIdx = aliasToIdx[rightAlias];

			// The source that comes later in the FROM list should get the join optimization
			// because doJoin processes sources in order
			if (rightIdx > leftIdx) {
				// rightAlias is the later source, set up its join optimization
				var source = query.sources[rightIdx];
				// Only set up optimization if not already done
				if (!source.onleftfn) {
					source.onleftfns = ls;
					source.onrightfns = rs;
					source.onleftfn = new Function('p,params,alasql', 'var y;return ' + ls);
					source.onrightfn = new Function('p,params,alasql', 'var y;return ' + rs);
					source.optimization = 'ix';
				}
			} else if (leftIdx > rightIdx) {
				// leftAlias is the later source
				var source = query.sources[leftIdx];
				if (!source.onleftfn) {
					source.onleftfns = rs;
					source.onrightfns = ls;
					source.onleftfn = new Function('p,params,alasql', 'var y;return ' + rs);
					source.onrightfn = new Function('p,params,alasql', 'var y;return ' + ls);
					source.optimization = 'ix';
				}
			}
		} else if (leftAliases.length === 1 && rightAliases.length === 0) {
			// Single-table condition (e.g., t1.a = 5)
			var alias = leftAliases[0];
			if (typeof aliasToIdx[alias] !== 'undefined') {
				var source = query.sources[aliasToIdx[alias]];
				source.srcwherefns = source.srcwherefns
					? source.srcwherefns + '&&(' + ls + '==' + rs + ')'
					: '(' + ls + '==' + rs + ')';
			}
		} else if (leftAliases.length === 0 && rightAliases.length === 1) {
			// Single-table condition with alias on right
			var alias = rightAliases[0];
			if (typeof aliasToIdx[alias] !== 'undefined') {
				var source = query.sources[aliasToIdx[alias]];
				source.srcwherefns = source.srcwherefns
					? source.srcwherefns + '&&(' + ls + '==' + rs + ')'
					: '(' + ls + '==' + rs + ')';
			}
		}
	});

	// Compile the srcwherefn for sources that have single-table conditions
	query.sources.forEach(function (source) {
		if (source.srcwherefns) {
			source.srcwherefn = new Function('p,params,alasql', 'var y;return ' + source.srcwherefns);
		}
	});
};

// Helper function to extract all equality conditions from a WHERE clause
function extractWhereConditions(where) {
	var conditions = [];

	function traverse(node) {
		if (!node) return;

		// Handle Expression wrapper - get the inner expression
		if (node.expression) {
			traverse(node.expression);
			return;
		}

		if (!(node instanceof yy.Op)) return;

		if (node.op === 'AND') {
			traverse(node.left);
			traverse(node.right);
		} else if (node.op === '=') {
			conditions.push(node);
		}
	}

	traverse(where);
	return conditions;
}

// Helper function to extract table aliases from a JS expression
function extractAliases(js) {
	var matches = js.match(/p\['([^']+)'\]/g) || [];
	var aliases = matches.map(function (m) {
		return m.match(/p\['([^']+)'\]/)[1];
	});
	// Return unique aliases
	return aliases.filter(function (v, i, a) {
		return a.indexOf(v) === i;
	});
}

function optimizeWhereJoin(query, ast) {
	if (!ast) return false;
	if (!(ast instanceof yy.Op)) return;
	if (ast.op != '=' && ast.op != 'AND') return;
	if (ast.allsome) return;

	var s = ast.toJS('p', query.defaultTableid, query.defcols);
	var fsrc = [];
	query.sources.forEach(function (source, idx) {
		// Optimization allowed only for tables only
		if (source.tableid) {
			// This is a good place to remove all unnecessary optimizations
			if (s.indexOf("p['" + source.alias + "']") > -1) fsrc.push(source);
		}
	});
	if (fsrc.length == 0) {
		return;
	} else if (fsrc.length == 1) {
		if (
			!(s.match(/p\[\'.*?\'\]/g) || []).every(function (s) {
				return s == "p['" + fsrc[0].alias + "']";
			})
		) {
			return;
		}

		var src = fsrc[0];
		src.srcwherefns = src.srcwherefns ? src.srcwherefns + '&&' + s : s;

		if (ast instanceof yy.Op && ast.op == '=' && !ast.allsome) {
			if (ast.left instanceof yy.Column) {
				var ls = ast.left.toJS('p', query.defaultTableid, query.defcols);
				var rs = ast.right.toJS('p', query.defaultTableid, query.defcols);
				if (rs.indexOf("p['" + fsrc[0].alias + "']") == -1) {
					fsrc[0].wxleftfns = ls;
					fsrc[0].wxrightfns = rs;
				}
			}
			if (ast.right instanceof yy.Column) {
				var ls = ast.left.toJS('p', query.defaultTableid, query.defcols);
				var rs = ast.right.toJS('p', query.defaultTableid, query.defcols);
				if (ls.indexOf("p['" + fsrc[0].alias + "']") == -1) {
					fsrc[0].wxleftfns = rs;
					fsrc[0].wxrightfns = ls;
				}
			}
		}
		ast.reduced = true;
		return;
	} else {
		if (ast.op == 'AND') {
			optimizeWhereJoin(query, ast.left);
			optimizeWhereJoin(query, ast.right);
		}
	}
}
