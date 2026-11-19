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

	// Helper to add a single-table WHERE condition to a source: generated code that reads only
	// that source, run against each of its rows before the join
	function addSourceWhereCondition(source, condition) {
		source.srcwherefns = source.srcwherefns ? source.srcwherefns + '&&' + condition : condition;
	}

	// Comma joins: FROM t1, t2, t3 WHERE t1.b = t2.a AND t2.b = t3.a. The conditions in WHERE say
	// how the tables link; each table but the first gets an index on its side of one link, so
	// doJoin looks rows up instead of trying every combination (#118, #2279), and a condition
	// that reads one table alone, whatever its operator (=, IN, OR, LIKE, BETWEEN ...), filters
	// that table before the join (#2916). The join order is chosen here when FROM is out of
	// chain order (#2910): the first table is one with such a filter, and every next table is
	// one linked to the tables already placed, so no table is scanned in full for every row so
	// far. Bare column names resolve to their table through defcols, as they do in the
	// generated code.
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

		var conditions = whereConjuncts(this.where);

		var aliasToIdx = {};
		query.sources.forEach(function (source, idx) {
			aliasToIdx[source.alias] = idx;
		});

		// links: {a, aExpr, b, bExpr}, an equality between two sources; pinned: the sources with a
		// filter of their own, 2 for an equality against a constant, 1 for any other condition
		var links = [];
		var pinned = [];
		conditions.forEach(function (cond) {
			if (!(cond instanceof yy.Op) || cond.op !== '=' || cond.allsome) {
				// Not an equality: a filter on one source when it reads that source alone, else
				// left to the WHERE clause (a subquery, a column no single source answers for)
				var read = sourcesRead(cond, query.defcols);
				if (read && read.length === 1 && aliasToIdx[read[0]] !== undefined) {
					var idx = aliasToIdx[read[0]];
					addSourceWhereCondition(
						query.sources[idx],
						'(' + cond.toJS('p', query.defaultTableid, query.defcols) + ')'
					);
					pinned[idx] = pinned[idx] || 1;
				}
				return;
			}

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
				if (leftIdx === undefined || rightIdx === undefined) return;
				if (leftIdx === rightIdx) {
					// Both sides read the same table (t1.a = t1.b): a filter on it, like any other
					// condition on one table
					addSourceWhereCondition(
						query.sources[leftIdx],
						'(' + cond.toJS('p', query.defaultTableid, query.defcols) + ')'
					);
					pinned[leftIdx] = pinned[leftIdx] || 1;
					return;
				}
				links.push({a: leftIdx, aExpr: ls, b: rightIdx, bExpr: rs});
			} else if (leftAliases.length === 1 && rightAliases.length === 0) {
				// Single-table condition (e.g., t1.a = 5)
				if (aliasToIdx[leftAliases[0]] !== undefined) {
					addSourceWhereCondition(
						query.sources[aliasToIdx[leftAliases[0]]],
						'(' + ls + '==' + rs + ')'
					);
					pinned[aliasToIdx[leftAliases[0]]] = 2;
				}
			} else if (leftAliases.length === 0 && rightAliases.length === 1) {
				// Single-table condition with alias on right (e.g., 5 = t1.a)
				if (aliasToIdx[rightAliases[0]] !== undefined) {
					addSourceWhereCondition(
						query.sources[aliasToIdx[rightAliases[0]]],
						'(' + ls + '==' + rs + ')'
					);
					pinned[aliasToIdx[rightAliases[0]]] = 2;
				}
			}
		});

		// FROM order is kept when every source links to one before it: each is then found through its
		// index and the rows come out in FROM order without sorting. Only when a source has no such
		// link, so FROM order would try it against every row so far, is the order chosen: the first
		// source with an equality against a constant, else the first with any filter, else the first
		// in FROM; then, while sources are left, the first in FROM order that a link ties to a placed
		// source, and when none is linked the first in FROM order (a cross product, as before).
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
			for (var i = 1; i < n; i++) {
				if ((pinned[i] || 0) > (pinned[start] || 0)) start = i;
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

	// The conditions the WHERE clause ANDs together, each a node of its own
	function whereConjuncts(where) {
		var conditions = [];

		function traverse(node) {
			if (!node) return;

			// Handle Expression wrapper - get the inner expression
			if (node instanceof yy.Expression) {
				traverse(node.expression);
				return;
			}

			if (node instanceof yy.Op && node.op === 'AND') {
				traverse(node.left);
				traverse(node.right);
			} else {
				conditions.push(node);
			}
		}

		traverse(where);
		return conditions;
	}

	// The aliases of the sources an expression reads, in the order met, or null when that cannot
	// be told: a subquery, a search, an aggregate, raw JavaScript, a node this does not know, or
	// a bare column that no single source answers for (ambiguous, or not among the declared
	// columns). A bare column resolves through defcols, as Column.toJS resolves it, inside a
	// function, CASE or list as well (#2917).
	function sourcesRead(node, defcols) {
		var aliases = [];
		var known = true;

		function walk(n) {
			if (!known || n === null || typeof n !== 'object') return;
			if (Array.isArray(n)) {
				// the list of IN (1, 2, 3)
				n.forEach(function (item) {
					walk(item);
				});
			} else if (n instanceof yy.Column) {
				var alias = n.tableid || (defcols && defcols[n.columnid]);
				if (typeof alias !== 'string' || alias === '-' || alias === '.') {
					known = false;
				} else if (aliases.indexOf(alias) === -1) {
					aliases.push(alias);
				}
			} else if (n instanceof yy.Op) {
				if (n.allsome || n.queriesidx !== undefined) known = false;
				else {
					walk(n.left);
					walk(n.right);
					walk(n.right1); // BETWEEN
					walk(n.right2);
					walk(n.escape); // LIKE ... ESCAPE
				}
			} else if (n instanceof yy.UniOp) {
				walk(n.right);
			} else if (n instanceof yy.FuncValue) {
				if (n.over) known = false;
				else
					(n.args || []).forEach(function (arg) {
						walk(arg);
					});
			} else if (n instanceof yy.Convert) {
				walk(n.expression);
			} else if (n instanceof yy.CaseValue) {
				walk(n.expression);
				(n.whens || []).forEach(function (w) {
					walk(w.when);
					walk(w.then);
				});
				walk(n.elses);
			} else if (n instanceof yy.ArrayValue) {
				(n.value || []).forEach(function (item) {
					walk(item);
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

		walk(node);
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
