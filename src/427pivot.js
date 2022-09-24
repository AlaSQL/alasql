// Pivot functions
/**
	Compile Pivot functions
	@param {object} query Source query
	@return {function} Pivoting functions
*/
yy.Select.prototype.compilePivot = function (query) {
	var self = this;
	/** @type {string} Main pivoting column */

	var columnid = self.pivot.columnid;
	var aggr = self.pivot.expr.aggregatorid;
	var inlist = self.pivot.inlist;

	var exprcolid = null;

	if (self.pivot.expr.expression.hasOwnProperty('columnid')) {
		exprcolid = self.pivot.expr.expression.columnid;
	} else {
		exprcolid = self.pivot.expr.expression.expression.columnid;
	}

	if (null == exprcolid) {
		throw 'columnid not found';
	}

	if (inlist) {
		inlist = inlist.map(function (l) {
			return l.expr.columnid;
		});
	}

	// Function for PIVOT post production
	return function () {
		var query = this;
		var cols = query.columns
			.filter(function (col) {
				return col.columnid != columnid && col.columnid != exprcolid;
			})
			.map(function (col) {
				return col.columnid;
			});

		var newcols = [];
		var gnewcols = {};
		var gr = {};
		var ga = {};
		var data = [];
		query.data.forEach(function (d) {
			if (!inlist || inlist.indexOf(d[columnid]) > -1) {
				var gx = cols
					.map(function (colid) {
						return d[colid];
					})
					.join('`');
				var g = gr[gx];
				if (!g) {
					g = {};
					gr[gx] = g;
					data.push(g);
					cols.forEach(function (colid) {
						g[colid] = d[colid];
					});
				}

				if (!ga[gx]) {
					ga[gx] = {};
				}

				if (ga[gx][d[columnid]]) {
					ga[gx][d[columnid]]++;
				} else {
					ga[gx][d[columnid]] = 1;
				}

				if (!gnewcols[d[columnid]]) {
					gnewcols[d[columnid]] = true;
					newcols.push(d[columnid]);
				}

				if (aggr == 'SUM' || aggr == 'AVG') {
					if (typeof g[d[columnid]] == 'undefined') g[d[columnid]] = 0;
					g[d[columnid]] += +d[exprcolid];
				} else if (aggr == 'COUNT') {
					if (typeof g[d[columnid]] == 'undefined') g[d[columnid]] = 0;
					g[d[columnid]]++;
				} else if (aggr == 'MIN') {
					if (typeof g[d[columnid]] == 'undefined') g[d[columnid]] = d[exprcolid];
					if (d[exprcolid] < g[d[columnid]]) g[d[columnid]] = d[exprcolid];
				} else if (aggr == 'MAX') {
					if (typeof g[d[columnid]] == 'undefined') g[d[columnid]] = d[exprcolid];
					if (d[exprcolid] > g[d[columnid]]) g[d[columnid]] = d[exprcolid];
				} else if (aggr == 'FIRST') {
					if (typeof g[d[columnid]] == 'undefined') g[d[columnid]] = d[exprcolid];
				} else if (aggr == 'LAST') {
					g[d[columnid]] = d[exprcolid];
				} else if (alasql.aggr[aggr]) {
					// Custom aggregator
					alasql.aggr[aggr](g[d[columnid]], d[exprcolid]);
				} else {
					throw new Error('Wrong aggregator in PIVOT clause');
				}
			}
		});

		if (aggr == 'AVG') {
			for (var gx in gr) {
				var d = gr[gx];
				for (var colid in d) {
					if (cols.indexOf(colid) == -1 && colid != exprcolid) {
						d[colid] = d[colid] / ga[gx][colid];
					}
				}
			}
		}

		//		console.log(query.columns,newcols);
		// columns
		query.data = data;

		if (inlist) newcols = inlist;

		var ncol = query.columns.filter(function (col) {
			return col.columnid == exprcolid;
		})[0];
		query.columns = query.columns.filter(function (col) {
			return !(col.columnid == columnid || col.columnid == exprcolid);
		});
		newcols.forEach(function (colid) {
			var nc = cloneDeep(ncol);
			nc.columnid = colid;
			query.columns.push(nc);
		});
	};
};

// var columnid = this.pivot.columnid;

// return function(data){
// 	* @type {object} Collection of grouped records
// 	var gx = {};
// 	/** @type {array} Array of grouped records */
// 	var gr = [];

// if(false) {
// 		for(var i=0,ilen=data.length;i<ilen;i++) {
// 			var r = data[i];
// 			var q = g[r[columnid]];  // Take
// 			if(q === undefined) {
// 				q = g[r[columnid]] = clone(r);
// 				delete q[columnid];
// 				gr.push(q);
// 			};
// 			if(r[columnid]) {
// 				gfn(r,q,query.params,alasql);
// 			}
// 			q[r[columnid]] = arrfn(r);

// 		}
// 	};
// }

// if(false) {
// 	var als = {};
// 	var s = 'var z;if(['+this.pivot.inlist.map(function(ie){
// 		var v;
// 		if(ie.expr instanceof yy.Column) {
// 			v = "'"+ie.expr.columnid+"'";
// 		} else if(ie.expr instanceof yy.StringValue) {
// 			return ie.expr.value;
// 		} else {
// 			return ie.expr.toJS();
// 		}
// 		if(ie.as) {
// 			als[v] = ie.as;
// 		} else {
// 			als[v] = v
// 		}
// 		return "'"+v+"'";
// 	}).join(',')+'].indexOf(r[\''+columnid+'\'])>-1){z=r[\''+columnid+'\'];';
// 	s += 'g[z] = (g[z]||0)+1;';
// 	s += '}';
// console.log(this.pivot.expr.toJS());
// 	console.log(this.pivot);
// 	console.log(s);
// 	var gfn = new Function('g,r,params,alasql','var y;'+s);

// 	return function(data){
// 		var g = {}, gr = [];
// 		for(var i=0,ilen=data.length;i<ilen;i++) {
// 			var r = data[i];
// 			var q = g[r[columnid]];
// 			if(q === undefined) {
// 				q = g[r[columnid]] = clone(r);
// 				delete q[columnid];
// 				gr.push(q);
// 			};
// 			if(r[columnid]) {
// 				gfn(r,q,query.params,alasql);
// 			}
// 			q[r[columnid]] = arrfn(r);

// 		}
// 	};
// }
// };

/**
	Compile UNPIVOT clause
	@param {object} query Query object
	@return {function} Function for unpivoting
*/
yy.Select.prototype.compileUnpivot = function (query) {
	var self = this;
	var tocolumnid = self.unpivot.tocolumnid;
	var forcolumnid = self.unpivot.forcolumnid;
	var inlist = self.unpivot.inlist.map(function (l) {
		return l.columnid;
	});

	//	console.log(inlist, tocolumnid, forcolumnid);

	return function () {
		var data = [];

		var xcols = query.columns
			.map(function (col) {
				return col.columnid;
			})
			.filter(function (colid) {
				return inlist.indexOf(colid) == -1 && colid != forcolumnid && colid != tocolumnid;
			});

		query.data.forEach(function (d) {
			inlist.forEach(function (colid) {
				var nd = {};
				xcols.forEach(function (xcolid) {
					nd[xcolid] = d[xcolid];
				});
				nd[forcolumnid] = colid;
				nd[tocolumnid] = d[colid];
				data.push(nd);
			});
		});

		query.data = data;

		//		});
	};
};
