yy.Select.prototype.compileWhere = function(query) {
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
		return function() {
			return true;
		};
};

yy.Select.prototype.compileWhereJoins = function(query) {
	return;

	// TODO Fix Where optimization
	//console.log(query);

	optimizeWhereJoin(query, this.where.expression);

	//for sources compile wherefs
	query.sources.forEach(function(source) {
		if (source.srcwherefns) {
			source.srcwherefn = new Function(
				'p,params,alasql',
				'var y;return ' + source.srcwherefns
			);
		}
		if (source.wxleftfns) {
			source.wxleftfn = new Function('p,params,alasql', 'var y;return ' + source.wxleftfns);
		}
		if (source.wxrightfns) {
			source.wxrightfn = new Function('p,params,alasql', 'var y;return ' + source.wxrightfns);
		}
		//		console.log(source.alias, source.wherefns)
		//		console.log(source);
	});
};

function optimizeWhereJoin(query, ast) {
	if (!ast) return false;
	if (!(ast instanceof yy.Op)) return;
	if (ast.op != '=' && ast.op != 'AND') return;
	if (ast.allsome) return;

	var s = ast.toJS('p', query.defaultTableid, query.defcols);
	var fsrc = [];
	query.sources.forEach(function(source, idx) {
		// Optimization allowed only for tables only
		if (source.tableid) {
			// This is a good place to remove all unnecessary optimizations
			if (s.indexOf("p['" + source.alias + "']") > -1) fsrc.push(source);
		}
	});
	//console.log(fsrc.length);
	//	if(fsrc.length < query.sources.length) return;
	//	console.log(ast);
	//	console.log(s);
	//	console.log(fsrc.length);
	if (fsrc.length == 0) {
		//		console.log('no optimization, can remove this part of ast');
		return;
	} else if (fsrc.length == 1) {
		if (
			!(s.match(/p\[\'.*?\'\]/g) || []).every(function(s) {
				return s == "p['" + fsrc[0].alias + "']";
			})
		) {
			return;
			// This is means, that we have column from parent query
			// So we return without optimization
		}

		var src = fsrc[0]; // optmiization source
		src.srcwherefns = src.srcwherefns ? src.srcwherefns + '&&' + s : s;

		if (ast instanceof yy.Op && (ast.op == '=' && !ast.allsome)) {
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
		ast.reduced = true; // To do not duplicate wherefn and srcwherefn
		return;
	} else {
		if ((ast.op = 'AND')) {
			optimizeWhereJoin(query, ast.left);
			optimizeWhereJoin(query, ast.right);
		}
	}
}
