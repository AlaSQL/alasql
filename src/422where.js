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

// Helper to set up join optimization on a source
function setupJoinOptimization(source, leftExpr, rightExpr) {
	if (source.onleftfn) return; // Already optimized
	source.onleftfns = leftExpr;
	source.onrightfns = rightExpr;
	source.onleftfn = new Function('p,params,alasql', 'var y;return ' + leftExpr);
	source.onrightfn = new Function('p,params,alasql', 'var y;return ' + rightExpr);
	source.optimization = 'ix';
}

// Helper to add a single-table WHERE condition to a source
function addSourceWhereCondition(source, leftExpr, rightExpr) {
	var condition = '(' + leftExpr + '==' + rightExpr + ')';
	source.srcwherefns = source.srcwherefns ? source.srcwherefns + '&&' + condition : condition;
}

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

		// Extract aliases directly from the AST nodes instead of parsing JS strings
		var leftAliases = extractAliasesFromAst(cond.left);
		var rightAliases = extractAliasesFromAst(cond.right);

		var ls = cond.left.toJS('p', query.defaultTableid, query.defcols);
		var rs = cond.right.toJS('p', query.defaultTableid, query.defcols);

		// For a join condition, we need exactly one alias on each side
		if (leftAliases.length === 1 && rightAliases.length === 1) {
			var leftAlias = leftAliases[0];
			var rightAlias = rightAliases[0];

			// Make sure both aliases exist in our sources
			if (aliasToIdx[leftAlias] === undefined || aliasToIdx[rightAlias] === undefined) {
				return;
			}

			var leftIdx = aliasToIdx[leftAlias];
			var rightIdx = aliasToIdx[rightAlias];

			// The source that comes later in the FROM list should get the join optimization
			// because doJoin processes sources in order
			if (rightIdx > leftIdx) {
				setupJoinOptimization(query.sources[rightIdx], ls, rs);
			} else if (leftIdx > rightIdx) {
				setupJoinOptimization(query.sources[leftIdx], rs, ls);
			}
		} else if (leftAliases.length === 1 && rightAliases.length === 0) {
			// Single-table condition (e.g., t1.a = 5)
			if (aliasToIdx[leftAliases[0]] !== undefined) {
				addSourceWhereCondition(query.sources[aliasToIdx[leftAliases[0]]], ls, rs);
			}
		} else if (leftAliases.length === 0 && rightAliases.length === 1) {
			// Single-table condition with alias on right (e.g., 5 = t1.a)
			if (aliasToIdx[rightAliases[0]] !== undefined) {
				addSourceWhereCondition(query.sources[aliasToIdx[rightAliases[0]]], ls, rs);
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

// Helper function to extract table aliases from an AST node
function extractAliasesFromAst(node) {
	var aliases = [];

	function traverse(n) {
		if (!n) return;

		// If it's a Column node, extract the tableid
		if (n instanceof yy.Column) {
			if (n.tableid && aliases.indexOf(n.tableid) === -1) {
				aliases.push(n.tableid);
			}
			return;
		}

		// Recursively traverse child nodes for operators
		if (n instanceof yy.Op) {
			traverse(n.left);
			traverse(n.right);
		}
	}

	traverse(node);
	return aliases;
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
