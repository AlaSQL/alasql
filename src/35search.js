/* global alasql */
/* global yy */
/*
//
// SEARCH for Alasql.js
// Date: 04.05.2015
// (c) 2015, Andrey Gershun
//
*/

function doSearch(databaseid, params, cb) {
	var res;
	var stope = {};
	var fromdata;
	var selectors = cloneDeep(this.selectors);

	function processSelector(selectors, sidx, value) {
		//		var val;
		/*/*		if(sidx == 0) {
			if(selectors.length > 0 && selectors[0].srchid == 'SHARP') {
				val = alasql.databases[alasql.useid].objects[selectors[0].args[0]];
				return processSelector(selectors,sidx+1,val);
				//selectors.shift();			
			} else if(selectors.length > 0 && selectors[0].srchid == 'AT') {
				val = alasql.vars[selectors[0].args[0]];
				return processSelector(selectors,sidx+1,val);
				//selectors.shift();
			} else if(selectors.length > 0 && selectors[0].srchid == 'CLASS') {
				val = alasql.databases[databaseid].tables[selectors[0].args[0]].data;
				return processSelector(selectors,sidx+1,val);
				//selectors.shift();
				//selectors.unshift({srchid:'CHILD'});
			} else {

			}
		}
*/
		var val, // temp values use many places
			nest, // temp value used many places
			r, // temp value used many places
			sel = selectors[sidx];
		//		console.log(sel);
		//		if(!alasql.srch[sel.srchid]) {
		//			throw new Error('Selector "'+sel.srchid+'" not found');
		//		};

		var SECURITY_BREAK = 100000;

		if (sel.selid) {
			// TODO Process Selector
			if (sel.selid === 'PATH') {
				var queue = [{node: value, stack: []}];
				var visited = {};
				//var path = [];
				var objects = alasql.databases[alasql.useid].objects;
				while (queue.length > 0) {
					var q = queue.shift();
					var node = q.node;
					var stack = q.stack;
					var r = processSelector(sel.args, 0, node);
					if (r.length > 0) {
						if (sidx + 1 + 1 > selectors.length) {
							return stack;
						} else {
							var rv = [];
							if (stack && stack.length > 0) {
								stack.forEach(function (stv) {
									rv = rv.concat(processSelector(selectors, sidx + 1, stv));
								});
							}
							return rv;
							//							return processSelector(selectors,sidx+1,stack);
						}
					} else {
						if (typeof visited[node.$id] !== 'undefined') {
							continue;
						} else {
							//							console.log(node.$id, node.$out);
							visited[node.$id] = true;
							if (node.$out && node.$out.length > 0) {
								node.$out.forEach(function (edgeid) {
									var edge = objects[edgeid];
									var stack2 = stack.concat(edge);
									stack2.push(objects[edge.$out[0]]);
									queue.push({
										node: objects[edge.$out[0]],
										stack: stack2,
									});
								});
							}
						}
					}
				}
				// Else return fail
				return [];
			}
			if (sel.selid === 'NOT') {
				var nest = processSelector(sel.args, 0, value);
				//console.log(1,nest);
				if (nest.length > 0) {
					return [];
				} else {
					if (sidx + 1 + 1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors, sidx + 1, value);
					}
				}
			} else if (sel.selid === 'DISTINCT') {
				var nest;
				if (typeof sel.args === 'undefined' || sel.args.length === 0) {
					nest = distinctArray(value);
				} else {
					nest = processSelector(sel.args, 0, value);
				}
				if (nest.length === 0) {
					return [];
				} else {
					var res = distinctArray(nest);
					if (sidx + 1 + 1 > selectors.length) {
						return res;
					} else {
						return processSelector(selectors, sidx + 1, res);
					}
				}
			} else if (sel.selid === 'AND') {
				var res = true;
				sel.args.forEach(function (se) {
					res = res && processSelector(se, 0, value).length > 0;
				});
				if (!res) {
					return [];
				} else {
					if (sidx + 1 + 1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors, sidx + 1, value);
					}
				}
			} else if (sel.selid === 'OR') {
				var res = false;
				sel.args.forEach(function (se) {
					res = res || processSelector(se, 0, value).length > 0;
				});
				if (!res) {
					return [];
				} else {
					if (sidx + 1 + 1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors, sidx + 1, value);
					}
				}
			} else if (sel.selid === 'ALL') {
				var nest = processSelector(sel.args[0], 0, value);
				if (nest.length === 0) {
					return [];
				} else {
					if (sidx + 1 + 1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors, sidx + 1, nest);
					}
				}
			} else if (sel.selid === 'ANY') {
				var nest = processSelector(sel.args[0], 0, value);
				//				console.log(272,nest);
				if (nest.length === 0) {
					return [];
				} else {
					if (sidx + 1 + 1 > selectors.length) {
						return [nest[0]];
					} else {
						return processSelector(selectors, sidx + 1, [nest[0]]);
					}
				}
			} else if (sel.selid === 'UNIONALL') {
				var nest = [];
				sel.args.forEach(function (se) {
					nest = nest.concat(processSelector(se, 0, value));
				});
				if (nest.length === 0) {
					return [];
				} else {
					if (sidx + 1 + 1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors, sidx + 1, nest);
					}
				}
			} else if (sel.selid === 'UNION') {
				var nest = [];
				sel.args.forEach(function (se) {
					nest = nest.concat(processSelector(se, 0, value));
				});
				var nest = distinctArray(nest);
				if (nest.length === 0) {
					return [];
				} else {
					if (sidx + 1 + 1 > selectors.length) {
						return nest;
					} else {
						return processSelector(selectors, sidx + 1, nest);
					}
				}
			} else if (sel.selid === 'IF') {
				var nest = processSelector(sel.args, 0, value);
				//console.log(1,nest);
				if (nest.length === 0) {
					return [];
				} else {
					if (sidx + 1 + 1 > selectors.length) {
						return [value];
					} else {
						return processSelector(selectors, sidx + 1, value);
					}
				}
			} else if (sel.selid === 'REPEAT') {
				//				console.log(352,sel.sels);
				var lvar,
					lmax,
					lmin = sel.args[0].value;
				if (!sel.args[1]) {
					lmax = lmin; // Add security break
				} else {
					lmax = sel.args[1].value;
				}
				if (sel.args[2]) {
					lvar = sel.args[2].variable;
				}
				//var lsel = sel.sels;
				//				console.log(351,lmin,lmax,lvar);

				var retval = [];

				if (lmin === 0) {
					if (sidx + 1 + 1 > selectors.length) {
						retval = [value];
					} else {
						if (lvar) {
							alasql.vars[lvar] = 0;
						}
						retval = retval.concat(processSelector(selectors, sidx + 1, value));
					}
				}

				//				console.log(364,retval);
				//console.log(370,sel.sels);
				// var nests = processSelector(sel.sels,0,value).slice();
				if (lmax > 0) {
					var nests = [{value: value, lvl: 1}];
					/*/*
						// if(lvl >= lmin) {
						// 	if(sidx+1+1 > selectors.length) {
						// 		retval = retval.concat(nests);
						// 	} else {
						// 		retval = retval.concat(processSelector(selectors,sidx+1,value));
						// 	}						
						// }
*/
					//console.log(371,nests);
					var i = 0;
					while (nests.length > 0) {
						var nest = nests[0];
						//console.log(375,nest);
						nests.shift();
						if (nest.lvl <= lmax) {
							if (lvar) {
								alasql.vars[lvar] = nest.lvl;
							}
							//		console.log(394,sel.sels);
							var nest1 = processSelector(sel.sels, 0, nest.value);
							//						console.log(397,nest1);

							nest1.forEach(function (n) {
								nests.push({value: n, lvl: nest.lvl + 1});
							});
							if (nest.lvl >= lmin) {
								if (sidx + 1 + 1 > selectors.length) {
									retval = retval.concat(nest1);
									//return nests;
								} else {
									nest1.forEach(function (n) {
										retval = retval.concat(processSelector(selectors, sidx + 1, n));
									});
								}
							}
						}
						// Security brake
						i++;
						if (i > SECURITY_BREAK) {
							throw new Error('Security brake. Number of iterations = ' + i);
						}
					}
				}
				return retval;
			} else if (sel.selid === 'OF') {
				if (sidx + 1 + 1 > selectors.length) {
					return [value];
				} else {
					var r1 = [];
					Object.keys(value).forEach(function (keyv) {
						alasql.vars[sel.args[0].variable] = keyv;
						r1 = r1.concat(processSelector(selectors, sidx + 1, value[keyv]));
					});
					return r1;
				}
			} else if (sel.selid === 'TO') {
				//				console.log(347,value,sel.args[0]);
				var oldv = alasql.vars[sel.args[0]];
				var newv = [];
				if (oldv !== undefined) {
					//					console.log(353,typeof oldv);
					newv = oldv.slice(0);
					//					console.log(429, oldv, newv);
				} else {
					newv = [];
				}
				newv.push(value);
				// console.log(428,oldv,newv, value);
				// console.log(435,sidx+1+1,selectors.length);
				//				console.log(355,alasql.vars[sel.args[0]]);
				if (sidx + 1 + 1 > selectors.length) {
					return [value];
				} else {
					alasql.vars[sel.args[0]] = newv;
					var r1 = processSelector(selectors, sidx + 1, value);
					//					console.log('r1 =',r1);
					alasql.vars[sel.args[0]] = oldv;
					return r1;
				}
				/*/*

alasql.srch.TO = function(val,args) {
  // console.log(args[0]);

  alasql.vars[args[0]].push(val);
  return {status: 1, values: [val]};
};

*/
			} else if (sel.selid === 'ARRAY') {
				var nest = processSelector(sel.args, 0, value);
				if (nest.length > 0) {
					val = nest;
				} else {
					return [];
				}
				if (sidx + 1 + 1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors, sidx + 1, val);
				}
			} else if (sel.selid === 'SUM') {
				var nest = processSelector(sel.args, 0, value);
				if (nest.length > 0) {
					var val = nest.reduce(function (sum, current) {
						return sum + current;
					}, 0);
				} else {
					return [];
				}
				if (sidx + 1 + 1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors, sidx + 1, val);
				}
			} else if (sel.selid === 'AVG') {
				nest = processSelector(sel.args, 0, value);
				if (nest.length > 0) {
					val =
						nest.reduce(function (sum, current) {
							return sum + current;
						}, 0) / nest.length;
				} else {
					return [];
				}
				if (sidx + 1 + 1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors, sidx + 1, val);
				}
			} else if (sel.selid === 'COUNT') {
				nest = processSelector(sel.args, 0, value);
				if (nest.length > 0) {
					val = nest.length;
				} else {
					return [];
				}
				if (sidx + 1 + 1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors, sidx + 1, val);
				}
			} else if (sel.selid === 'FIRST') {
				nest = processSelector(sel.args, 0, value);
				if (nest.length > 0) {
					val = nest[0];
				} else {
					return [];
				}

				if (sidx + 1 + 1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors, sidx + 1, val);
				}
			} else if (sel.selid === 'LAST') {
				nest = processSelector(sel.args, 0, value);
				if (nest.length > 0) {
					val = nest[nest.length - 1];
				} else {
					return [];
				}

				if (sidx + 1 + 1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors, sidx + 1, val);
				}
			} else if (sel.selid === 'MIN') {
				nest = processSelector(sel.args, 0, value);
				if (nest.length === 0) {
					return [];
				}
				var val = nest.reduce(function (min, current) {
					return Math.min(min, current);
				}, Infinity);
				if (sidx + 1 + 1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors, sidx + 1, val);
				}
			} else if (sel.selid === 'MAX') {
				var nest = processSelector(sel.args, 0, value);
				if (nest.length === 0) {
					return [];
				}
				var val = nest.reduce(function (max, current) {
					return Math.max(max, current);
				}, -Infinity);
				if (sidx + 1 + 1 > selectors.length) {
					return [val];
				} else {
					return processSelector(selectors, sidx + 1, val);
				}
			} else if (sel.selid === 'PLUS') {
				var retval = [];
				//				retval = retval.concat(processSelector(selectors,sidx+1,n))
				var nests = processSelector(sel.args, 0, value).slice();
				if (sidx + 1 + 1 > selectors.length) {
					retval = retval.concat(nests);
				} else {
					nests.forEach(function (n) {
						retval = retval.concat(processSelector(selectors, sidx + 1, n));
					});
				}

				var i = 0;
				while (nests.length > 0) {
					//					nest = nests[0];
					//					nests.shift();
					var nest = nests.shift();

					//					console.log(281,nest);
					//					console.log(nest,nests);
					nest = processSelector(sel.args, 0, nest);
					//					console.log(284,nest);
					//					console.log('nest',nest,'nests',nests);
					nests = nests.concat(nest);
					//console.log(retval,nests);

					if (sidx + 1 + 1 > selectors.length) {
						retval = retval.concat(nest);
						//return retval;
					} else {
						nest.forEach(function (n) {
							//							console.log(293,n);
							var rn = processSelector(selectors, sidx + 1, n);
							//							console.log(294,rn, retval);
							retval = retval.concat(rn);
						});
					}

					// Security brake
					i++;
					if (i > SECURITY_BREAK) {
						throw new Error('Security brake. Number of iterations = ' + i);
					}
				}
				return retval;
				//console.log(1,nest);
			} else if (sel.selid === 'STAR') {
				var retval = [];
				retval = processSelector(selectors, sidx + 1, value);
				var nests = processSelector(sel.args, 0, value).slice();
				if (sidx + 1 + 1 > selectors.length) {
					retval = retval.concat(nests);
					//return nests;
				} else {
					nests.forEach(function (n) {
						retval = retval.concat(processSelector(selectors, sidx + 1, n));
					});
				}
				var i = 0;
				while (nests.length > 0) {
					var nest = nests[0];
					nests.shift();
					//					console.log(nest,nests);
					nest = processSelector(sel.args, 0, nest);
					//					console.log('nest',nest,'nests',nests);
					nests = nests.concat(nest);

					if (sidx + 1 + 1 <= selectors.length) {
						nest.forEach(function (n) {
							retval = retval.concat(processSelector(selectors, sidx + 1, n));
						});
					}

					// Security brake
					i++;
					if (i > SECURITY_BREAK) {
						throw new Error('Loop brake. Number of iterations = ' + i);
					}
				}

				return retval;
			} else if (sel.selid === 'QUESTION') {
				var retval = [];
				retval = retval.concat(processSelector(selectors, sidx + 1, value));
				var nest = processSelector(sel.args, 0, value);
				if (sidx + 1 + 1 <= selectors.length) {
					nest.forEach(function (n) {
						retval = retval.concat(processSelector(selectors, sidx + 1, n));
					});
				}
				return retval;
			} else if (sel.selid === 'WITH') {
				var nest = processSelector(sel.args, 0, value);
				//				console.log('WITH',nest);
				if (nest.length === 0) {
					return [];
				} else {
					/*/* 
					// if(sidx+1+1 > selectors.length) {
					// 	return [nest];
					// } else {
					// 	return processSelector(selectors,sidx+1,nest);
					// } 
					*/
					var r = {status: 1, values: nest};
				}
			} else if (sel.selid === 'ROOT') {
				if (sidx + 1 + 1 > selectors.length) {
					return [value];
				} else {
					return processSelector(selectors, sidx + 1, fromdata);
				}
			} else {
				throw new Error('Wrong selector ' + sel.selid);
			}
		} else if (sel.srchid) {
			var r = alasql.srch[sel.srchid.toUpperCase()](value, sel.args, stope, params);
			//			console.log(sel.srchid,r);
		} else {
			throw new Error('Selector not found');
		}
		//		console.log(356,sidx,r);
		if (typeof r === 'undefined') {
			r = {status: 1, values: [value]};
		}

		var res = [];
		if (r.status === 1) {
			var arr = r.values;

			if (sidx + 1 + 1 > selectors.length) {
				//			if(sidx+1+1 > selectors.length) {
				res = arr;
				//				console.log('res',r)
			} else {
				for (var i = 0; i < r.values.length; i++) {
					res = res.concat(processSelector(selectors, sidx + 1, arr[i]));
				}
			}
		}
		return res;
	}

	if (selectors !== undefined && selectors.length > 0) {
		//			console.log(selectors[0].args[0].toUpperCase());
		if (
			selectors &&
			selectors[0] &&
			selectors[0].srchid === 'PROP' &&
			selectors[0].args &&
			selectors[0].args[0]
		) {
			//			console.log(selectors[0].args[0]);
			if (selectors[0].args[0].toUpperCase() === 'XML') {
				stope.mode = 'XML';
				selectors.shift();
			} else if (selectors[0].args[0].toUpperCase() === 'HTML') {
				stope.mode = 'HTML';
				selectors.shift();
			} else if (selectors[0].args[0].toUpperCase() === 'JSON') {
				stope.mode = 'JSON';
				selectors.shift();
			}
		}
		if (selectors.length > 0 && selectors[0].srchid === 'VALUE') {
			stope.value = true;
			selectors.shift();
		}
	}

	if (this.from instanceof yy.Column) {
		var dbid = this.from.databaseid || databaseid;
		fromdata = alasql.databases[dbid].tables[this.from.columnid].data;
		//selectors.unshift({srchid:'CHILD'});
	} else if (this.from instanceof yy.FuncValue && alasql.from[this.from.funcid.toUpperCase()]) {
		var args = this.from.args.map(function (arg) {
			var as = arg.toJS();
			//			console.log(as);
			var fn = new Function('params,alasql', 'var y;return ' + as).bind(this);
			return fn(params, alasql);
		});
		//		console.log(args);
		fromdata = alasql.from[this.from.funcid.toUpperCase()].apply(this, args);
		//		console.log(92,fromdata);
	} else if (typeof this.from === 'undefined') {
		fromdata = alasql.databases[databaseid].objects;
	} else {
		var fromfn = new Function('params,alasql', 'var y;return ' + this.from.toJS());
		fromdata = fromfn(params, alasql);
		// Check for Mogo Collections
		if (
			typeof Mongo === 'object' &&
			typeof Mongo.Collection !== 'object' &&
			fromdata instanceof Mongo.Collection
		) {
			fromdata = fromdata.find().fetch();
		}
		//console.log(selectors,fromdata);
		//		if(typeof fromdata == 'object' && Array.isArray(fromdata)) {
		//			selectors.unshift({srchid:'CHILD'});
		//		}
	}

	// If source data is array than first step is to run over array
	//	var selidx = 0;
	//	var selvalue = fromdata;

	if (selectors !== undefined && selectors.length > 0) {
		// Init variables for TO() selectors

		if (false) {
			selectors.forEach(function (selector) {
				if (selector.srchid === 'TO') {
					//* @todo move to TO selector
					alasql.vars[selector.args[0]] = [];
					// TODO - process nested selectors
				}
			});
		}

		res = processSelector(selectors, 0, fromdata);
	} else {
		res = fromdata;
	}

	if (this.into) {
		var a1, a2;
		if (typeof this.into.args[0] !== 'undefined') {
			a1 = new Function('params,alasql', 'var y;return ' + this.into.args[0].toJS())(
				params,
				alasql
			);
		}
		if (typeof this.into.args[1] !== 'undefined') {
			a2 = new Function('params,alasql', 'var y;return ' + this.into.args[1].toJS())(
				params,
				alasql
			);
		}
		res = alasql.into[this.into.funcid.toUpperCase()](a1, a2, res, [], cb);
	} else {
		if (stope.value && res.length > 0) {
			res = res[0];
		}
		if (cb) {
			res = cb(res);
		}
	}
	return res;
}

/**	
	Search class
	@class
	@example
	SEARCH SUM(/a) FROM ? -- search over parameter object
*/

yy.Search = function (params) {
	return yy.extend(this, params);
};

yy.Search.prototype.toString = function () {
	var s = 'SEARCH' + ' ';
	if (this.selectors) {
		s += this.selectors.toString();
	}
	if (this.from) {
		s += 'FROM' + ' ' + this.from.toString();
	}
	//console.log(s);
	return s;
};

yy.Search.prototype.toJS = function (context) {
	//		console.log('yy.CreateVertex.toJS');
	var s = 'this.queriesfn[' + (this.queriesidx - 1) + '](this.params,null,' + context + ')';
	// var s = '';
	return s;
};

yy.Search.prototype.compile = function (databaseid) {
	var dbid = databaseid;
	var self = this;

	var statement = function (params, cb) {
		// console.log(31,self);
		// console.log(32,arguments);
		var res;
		doSearch.bind(self)(dbid, params, function (data) {
			// console.log(35,data);
			res = modify(statement.query, data);
			// console.log(37,data);
			if (cb) {
				res = cb(res);
			}
		});
		// console.log(39,res);
		//		if(cb) res = cb(res);
		return res;
	};
	statement.query = {};
	return statement;
};

// List of search functions
alasql.srch = {};

alasql.srch.PROP = function (val, args, stope) {
	//		console.log('PROP',args[0],val);
	if (stope.mode === 'XML') {
		var arr = [];
		val.children.forEach(function (v) {
			if (v.name.toUpperCase() === args[0].toUpperCase()) {
				arr.push(v);
			}
		});
		if (arr.length > 0) {
			return {status: 1, values: arr};
		} else {
			return {status: -1, values: []};
		}
	} else {
		if (
			typeof val !== 'object' ||
			val === null ||
			typeof args !== 'object' ||
			typeof val[args[0]] === 'undefined'
		) {
			return {status: -1, values: []};
		} else {
			return {status: 1, values: [val[args[0]]]};
		}
	}
};

alasql.srch.APROP = function (val, args) {
	if (
		typeof val !== 'object' ||
		val === null ||
		typeof args !== 'object' ||
		typeof val[args[0]] === 'undefined'
	) {
		return {status: 1, values: [undefined]};
	} else {
		return {status: 1, values: [val[args[0]]]};
	}
};

// Test expression
alasql.srch.EQ = function (val, args, stope, params) {
	var exprs = args[0].toJS('x', '');
	var exprfn = new Function('x,alasql,params', 'return ' + exprs);
	if (val === exprfn(val, alasql, params)) {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

// Test expression
alasql.srch.LIKE = function (val, args, stope, params) {
	var exprs = args[0].toJS('x', '');
	var exprfn = new Function('x,alasql,params', 'return ' + exprs);
	if (
		val
			.toUpperCase()
			.match(
				new RegExp(
					'^' +
						exprfn(val, alasql, params).toUpperCase().replace(/%/g, '.*').replace(/\?|_/g, '.') +
						'$'
				),
				'g'
			)
	) {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.ATTR = function (val, args, stope) {
	if (stope.mode === 'XML') {
		if (typeof args === 'undefined') {
			return {status: 1, values: [val.attributes]};
		} else {
			if (
				typeof val === 'object' &&
				typeof val.attributes === 'object' &&
				typeof val.attributes[args[0]] !== 'undefined'
			) {
				return {status: 1, values: [val.attributes[args[0]]]};
			} else {
				return {status: -1, values: []};
			}
		}
	} else {
		throw new Error('ATTR is not using in usual mode');
	}
};

alasql.srch.CONTENT = function (val, args, stope) {
	if (stope.mode === 'XML') {
		return {status: 1, values: [val.content]};
	} else {
		throw new Error('ATTR is not using in usual mode');
	}
};

alasql.srch.SHARP = function (val, args) {
	var obj = alasql.databases[alasql.useid].objects[args[0]];
	if (typeof val !== 'undefined' && val === obj) {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.PARENT = function (/*val,args,stope*/) {
	// TODO: implement
	console.error('PARENT not implemented', arguments);

	return {status: -1, values: []};
};

alasql.srch.CHILD = function (val, args, stope) {
	//    	console.log(641,val);
	if (typeof val === 'object') {
		if (Array.isArray(val)) {
			return {status: 1, values: val};
		} else {
			if (stope.mode === 'XML') {
				return {
					status: 1,
					values: Object.keys(val.children).map(function (key) {
						return val.children[key];
					}),
				};
			} else {
				return {
					status: 1,
					values: Object.keys(val).map(function (key) {
						return val[key];
					}),
				};
			}
		}
	} else {
		// If primitive value
		return {status: 1, values: []};
	}
};

// Return all keys
alasql.srch.KEYS = function (val) {
	if (typeof val === 'object' && val !== null) {
		return {status: 1, values: Object.keys(val)};
	} else {
		// If primitive value
		return {status: 1, values: []};
	}
};

// Test expression
alasql.srch.WHERE = function (val, args, stope, params) {
	var exprs = args[0].toJS('x', '');
	var exprfn = new Function('x,alasql,params', 'return ' + exprs);
	if (exprfn(val, alasql, params)) {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.NAME = function (val, args) {
	if (val.name === args[0]) {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.CLASS = function (val, args) {
	//	console.log(val,args);
	// Please avoid `===` here
	if (val.$class == args) {
		// jshint ignore:line
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.VERTEX = function (val) {
	if (val.$node === 'VERTEX') {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.INSTANCEOF = function (val, args) {
	if (val instanceof alasql.fn[args[0]]) {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.EDGE = function (val) {
	if (val.$node === 'EDGE') {
		return {status: 1, values: [val]};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.EX = function (val, args, stope, params) {
	var exprs = args[0].toJS('x', '');
	var exprfn = new Function('x,alasql,params', 'return ' + exprs);
	return {status: 1, values: [exprfn(val, alasql, params)]};
};

// Transform expression
alasql.srch.RETURN = function (val, args, stope, params) {
	var res = {};
	if (args && args.length > 0) {
		args.forEach(function (arg) {
			var exprs = arg.toJS('x', '');
			var exprfn = new Function('x,alasql,params', 'return ' + exprs);
			if (typeof arg.as === 'undefined') {
				arg.as = arg.toString();
			}
			res[arg.as] = exprfn(val, alasql, params);
		});
	}
	return {status: 1, values: [res]};
};

// Transform expression
alasql.srch.REF = function (val) {
	return {status: 1, values: [alasql.databases[alasql.useid].objects[val]]};
};

// Transform expression
alasql.srch.OUT = function (val) {
	if (val.$out && val.$out.length > 0) {
		var res = val.$out.map(function (v) {
			return alasql.databases[alasql.useid].objects[v];
		});
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.OUTOUT = function (val) {
	if (val.$out && val.$out.length > 0) {
		var res = [];
		val.$out.forEach(function (v) {
			var av = alasql.databases[alasql.useid].objects[v];
			if (av && av.$out && av.$out.length > 0) {
				av.$out.forEach(function (vv) {
					res = res.concat(alasql.databases[alasql.useid].objects[vv]);
				});
			}
		});
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.IN = function (val) {
	if (val.$in && val.$in.length > 0) {
		var res = val.$in.map(function (v) {
			return alasql.databases[alasql.useid].objects[v];
		});
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

alasql.srch.ININ = function (val) {
	if (val.$in && val.$in.length > 0) {
		var res = [];
		val.$in.forEach(function (v) {
			var av = alasql.databases[alasql.useid].objects[v];
			if (av && av.$in && av.$in.length > 0) {
				av.$in.forEach(function (vv) {
					res = res.concat(alasql.databases[alasql.useid].objects[vv]);
				});
			}
		});
		return {status: 1, values: res};
	} else {
		return {status: -1, values: []};
	}
};

// Transform expression
alasql.srch.AS = function (val, args) {
	alasql.vars[args[0]] = val;
	return {status: 1, values: [val]};
};

// Transform expression
alasql.srch.AT = function (val, args) {
	var v = alasql.vars[args[0]];
	return {status: 1, values: [v]};
};

// Transform expression
alasql.srch.CLONEDEEP = function (val) {
	// TODO something wrong
	var z = cloneDeep(val);
	return {status: 1, values: [z]};
};

// // Transform expression
// alasql.srch.DELETE = function(val,args) {
// 	// TODO something wrong
// 	delete val;
//   return {status: 1, values: []};
// };

// Transform expression
alasql.srch.SET = function (val, args, stope, params) {
	//	console.log(arguments);
	var s = args
		.map(function (st) {
			//console.log(898,st);
			if (st.method === '@') {
				return "alasql.vars['" + st.variable + "']=" + st.expression.toJS('x', '');
			} else if (st.method === '$') {
				return "params['" + st.variable + "']=" + st.expression.toJS('x', '');
			} else {
				return "x['" + st.column.columnid + "']=" + st.expression.toJS('x', '');
			}
		})
		.join(';');
	var setfn = new Function('x,params,alasql', s);

	setfn(val, params, alasql);

	return {status: 1, values: [val]};
};

alasql.srch.ROW = function (val, args, stope, params) {
	var s = 'var y;return [';
	//  console.log(args[0]);
	s += args
		.map(function (arg) {
			return arg.toJS('x', '');
		})
		.join(',');
	s += ']';
	var setfn = new Function('x,params,alasql', s);
	var rv = setfn(val, params, alasql);

	return {status: 1, values: [rv]};
};

alasql.srch.D3 = function (val) {
	if (val.$node !== 'VERTEX' && val.$node === 'EDGE') {
		val.source = val.$in[0];
		val.target = val.$out[0];
	}

	return {status: 1, values: [val]};
};

var compileSearchOrder = function (order) {
	if (order) {
		//			console.log(990, this.order);
		if (
			order &&
			order.length === 1 &&
			order[0].expression &&
			typeof order[0].expression === 'function'
		) {
			//			console.log(991, this.order[0]);
			var func = order[0].expression;
			//			console.log(994, func);
			return function (a, b) {
				var ra = func(a),
					rb = func(b);
				if (ra > rb) {
					return 1;
				}
				if (ra === rb) {
					return 0;
				}
				return -1;
			};
		}

		var s = '';
		var sk = '';
		order.forEach(function (ord) {
			// console.log(ord instanceof yy.Expression);
			// console.log(ord.toJS('a',''));
			// console.log(ord.expression instanceof yy.Column);

			// Date conversion
			var dg = '';
			//console.log(ord.expression, ord.expression instanceof yy.NumValue);
			if (ord.expression instanceof yy.NumValue) {
				ord.expression = self.columns[ord.expression.value - 1];
			}

			if (ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid;

				if (alasql.options.valueof) {
					dg = '.valueOf()'; // TODO Check
				}
				// COLLATE NOCASE
				if (ord.nocase) {
					dg += '.toUpperCase()';
				}

				if (columnid === '_') {
					s += 'if(a' + dg + (ord.direction === 'ASC' ? '>' : '<') + 'b' + dg + ')return 1;';
					s += 'if(a' + dg + '==b' + dg + '){';
				} else {
					s +=
						"if((a['" +
						columnid +
						"']||'')" +
						dg +
						(ord.direction === 'ASC' ? '>' : '<') +
						"(b['" +
						columnid +
						"']||'')" +
						dg +
						')return 1;';
					s += "if((a['" + columnid + "']||'')" + dg + "==(b['" + columnid + "']||'')" + dg + '){';
				}
			} else {
				dg = '.valueOf()';
				// COLLATE NOCASE
				if (ord.nocase) {
					dg += '.toUpperCase()';
				}
				s +=
					'if((' +
					ord.toJS('a', '') +
					"||'')" +
					dg +
					(ord.direction === 'ASC' ? '>(' : '<(') +
					ord.toJS('b', '') +
					"||'')" +
					dg +
					')return 1;';
				s +=
					'if((' +
					ord.toJS('a', '') +
					"||'')" +
					dg +
					'==(' +
					ord.toJS('b', '') +
					"||'')" +
					dg +
					'){';
			}

			// TODO Add date comparision
			// s += 'if(a[\''+columnid+"']"+dg+(ord.direction == 'ASC'?'>':'<')+'b[\''+columnid+"']"+dg+')return 1;';
			// s += 'if(a[\''+columnid+"']"+dg+'==b[\''+columnid+"']"+dg+'){';
			//			}
			sk += '}';
		});
		s += 'return 0;';
		s += sk + 'return -1';
		//console.log(s);
		return new Function('a,b', s);
	}
};

alasql.srch.ORDERBY = function (val, args /*,stope*/) {
	//	console.log(val);
	var res = val.sort(compileSearchOrder(args));
	return {status: 1, values: res};
};
