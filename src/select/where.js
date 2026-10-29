export default function install(alasql) {
	var yy = alasql.yy;
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

	// Comma joins: FROM t1, t2, t3 WHERE t1.b = t2.a AND t2.b = t3.a. The conditions in WHERE say
	// how the tables link; each table but the first gets an index on its side of one link, so
	// doJoin looks rows up instead of trying every combination (#118, #2279), and a condition
	// on one table alone filters that table before the join. The join order is chosen here, not
	// taken from FROM (#2910): the first table is one with a condition against a constant, and
	// every next table is one linked to the tables already placed, so no table is scanned in
	// full for every row so far. Bare column names resolve to their table through defcols, as
	// they do in the generated code.
	yy.Select.prototype.compileWhereJoins = function (query) {
		if (!this.where) return;

		// Only comma joins: one source is nothing to join, an explicit JOIN ... ON has its own
		// index already (compileJoins), and an APPLY depends on the sources before it
		if (query.sources.length <= 1) return;
		var hasExplicitJoins = query.sources.some(function (source, idx) {
			return idx > 0 && source.onleftfn;
		});
		if (hasExplicitJoins) return;
		var movable = query.sources.every(function (source) {
			return !source.applyselect && (!source.joinmode || source.joinmode === 'INNER');
		});

		var conditions = extractWhereConditions(this.where);

		var aliasToIdx = {};
		query.sources.forEach(function (source, idx) {
			aliasToIdx[source.alias] = idx;
		});

		// links: {a, aExpr, b, bExpr}, a condition between two sources; pinned: the sources with a
		// condition against something that reads no source
		var links = [];
		var pinned = [];
		conditions.forEach(function (cond) {
			if (cond.op !== '=') return;
			if (cond.allsome) return;

			var leftAliases = sourcesRead(cond.left, query.defcols);
			var rightAliases = sourcesRead(cond.right, query.defcols);
			// A side that cannot be told (a subquery, a column no single source answers for) is
			// left to the WHERE clause
			if (!leftAliases || !rightAliases) return;

			var ls = cond.left.toJS('p', query.defaultTableid, query.defcols);
			var rs = cond.right.toJS('p', query.defaultTableid, query.defcols);

			if (leftAliases.length === 1 && rightAliases.length === 1) {
				var leftIdx = aliasToIdx[leftAliases[0]];
				var rightIdx = aliasToIdx[rightAliases[0]];
				if (leftIdx === undefined || rightIdx === undefined || leftIdx === rightIdx) return;
				links.push({a: leftIdx, aExpr: ls, b: rightIdx, bExpr: rs});
			} else if (leftAliases.length === 1 && rightAliases.length === 0) {
				// Single-table condition (e.g., t1.a = 5)
				if (aliasToIdx[leftAliases[0]] !== undefined) {
					addSourceWhereCondition(query.sources[aliasToIdx[leftAliases[0]]], ls, rs);
					pinned[aliasToIdx[leftAliases[0]]] = true;
				}
			} else if (leftAliases.length === 0 && rightAliases.length === 1) {
				// Single-table condition with alias on right (e.g., 5 = t1.a)
				if (aliasToIdx[rightAliases[0]] !== undefined) {
					addSourceWhereCondition(query.sources[aliasToIdx[rightAliases[0]]], ls, rs);
					pinned[aliasToIdx[rightAliases[0]]] = true;
				}
			}
		});

		// FROM order is kept when every source links to one before it: each is then found through its
		// index and the rows come out in FROM order without sorting. Only when a source has no such
		// link, so FROM order would try it against every row so far, is the order chosen: the first
		// source with a condition against a constant, else the first in FROM; then, while sources are
		// left, the first in FROM order that a link ties to a placed source, and when none is linked
		// the first in FROM order (a cross product, as before).
		var n = query.sources.length;
		var order = [];
		var linkedInFrom = true;
		for (var k = 1; k < n && linkedInFrom; k++) {
			linkedInFrom = links.some(function (l) {
				return (l.a === k && l.b < k) || (l.b === k && l.a < k);
			});
		}
		if (links.length > 0 && movable && !linkedInFrom) {
			var placed = [];
			var start = 0;
			for (var i = 0; i < n; i++) {
				if (pinned[i]) {
					start = i;
					break;
				}
			}
			order.push(start);
			placed[start] = true;
			while (order.length < n) {
				var next = -1;
				for (var i = 0; i < n && next < 0; i++) {
					if (placed[i]) continue;
					for (var j = 0; j < links.length; j++) {
						var l = links[j];
						if ((l.a === i && placed[l.b]) || (l.b === i && placed[l.a])) {
							next = i;
							break;
						}
					}
				}
				if (next < 0) {
					for (var i = 0; i < n; i++) {
						if (!placed[i]) {
							next = i;
							break;
						}
					}
				}
				order.push(next);
				placed[next] = true;
			}
		} else {
			for (var i = 0; i < n; i++) order.push(i);
		}

		// Each source after the first gets an index on the first link to a source placed before it;
		// doJoin looks its rows up by the value from the sources already in scope
		var position = [];
		order.forEach(function (idx, k) {
			position[idx] = k;
		});
		order.forEach(function (idx, k) {
			if (k === 0) return;
			var source = query.sources[idx];
			for (var j = 0; j < links.length; j++) {
				var l = links[j];
				if (l.a === idx && position[l.b] < k) {
					setupJoinOptimization(source, l.bExpr, l.aExpr);
					break;
				} else if (l.b === idx && position[l.a] < k) {
					setupJoinOptimization(source, l.aExpr, l.bExpr);
					break;
				}
			}
		});

		var reordered = order.some(function (idx, k) {
			return idx !== k;
		});
		if (reordered) {
			query.sources = order.map(function (idx) {
				return query.sources[idx];
			});
			// 4.x keeps the row order of a query without ORDER BY, which was the FROM order: the join
			// collects its rows with each source's position in FROM and hands them on sorted (queryfn3)
			query.sources.forEach(function (source, k) {
				source.fromidx = order[k];
			});
			query.joinsorted = true;
		}

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

	// The aliases of the sources an expression reads, in the order met, or null when that cannot
	// be told: a subquery, a search, an aggregate, raw JavaScript, a node this does not know, or
	// a bare column that no single source answers for (ambiguous, or not among the declared
	// columns). A bare column resolves through defcols, as Column.toJS resolves it, except inside a
	// function, CASE or list: their code still reads a bare column from the first source (#2615), so
	// such a condition is left to the WHERE clause.
	function sourcesRead(node, defcols) {
		var aliases = [];
		var known = true;

		function walk(n, nested) {
			if (!known || n === null || typeof n !== 'object') return;
			if (n instanceof yy.Column) {
				var alias = n.tableid || (!nested && defcols && defcols[n.columnid]);
				if (typeof alias !== 'string' || alias === '-' || alias === '.') {
					known = false;
				} else if (aliases.indexOf(alias) === -1) {
					aliases.push(alias);
				}
			} else if (n instanceof yy.Op) {
				if (n.allsome || n.queriesidx !== undefined) known = false;
				else {
					walk(n.left, nested);
					walk(n.right, nested);
				}
			} else if (n instanceof yy.UniOp) {
				walk(n.right, nested);
			} else if (n instanceof yy.FuncValue) {
				(n.args || []).forEach(function (arg) {
					walk(arg, true);
				});
			} else if (n instanceof yy.CaseValue) {
				walk(n.expression, true);
				(n.whens || []).forEach(function (w) {
					walk(w.when, true);
					walk(w.then, true);
				});
				walk(n.elses, true);
			} else if (n instanceof yy.ArrayValue) {
				(n.value || []).forEach(function (item) {
					walk(item, true);
				});
			} else if (
				n instanceof yy.NumValue ||
				n instanceof yy.StringValue ||
				n instanceof yy.LogicValue ||
				n instanceof yy.NullValue ||
				n instanceof yy.ParamValue ||
				n instanceof yy.VarValue ||
				n instanceof yy.DomainValueValue
			) {
				// reads no source
			} else {
				known = false;
			}
		}

		walk(node, false);
		return known ? aliases : null;
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
}
