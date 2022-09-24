/*
//
// CREATE VERTEX for AlaSQL
// Date: 21.04.2015
// (c) 2015, Andrey Gershun
//
*/

yy.CreateVertex = function (params) {
	return yy.extend(this, params);
};
yy.CreateVertex.prototype.toString = function () {
	var s = 'CREATE VERTEX ';
	if (this.class) {
		s += this.class + ' ';
	}
	if (this.sharp) {
		s += '#' + this.sharp + ' ';
	}
	if (this.sets) {
		s += this.sets.toString();
	} else if (this.content) {
		s += this.content.toString();
	} else if (this.select) {
		s += this.select.toString();
	}

	return s;
};

yy.CreateVertex.prototype.toJS = function (context) {
	//		console.log('yy.CreateVertex.toJS');
	var s = 'this.queriesfn[' + (this.queriesidx - 1) + '](this.params,null,' + context + ')';
	// var s = '';
	return s;
};

// CREATE TABLE
/*/*
yy.CreateVertex.prototype.execute = function (databaseid,params,cb) {
	var res = 0;
	if(this.sets) {
		// var obj = {};
		// if(this.sets.length > 0) {
		// 	this.sets.forEach(function(st){
		// 		console.log(st);
		// 	});
		// }

	} else if(this.content) {

	} else if(this.select) {

	} else {
		// CREATE VERTEX without parameters
		var db = alasql.databases[databaseid];
		var vertex = {$id: db.counter++, $node:'vertex'};
		db.objects[vertex.$id] = vertex;
		res = vertex;
	}

	if(cb) res = cb(res);
	return res;
};
*/
yy.CreateVertex.prototype.compile = function (databaseid) {
	var dbid = databaseid;

	// CREATE VERTEX #id
	var sharp = this.sharp;

	// CREATE VERTEX "Name"
	if (typeof this.name !== 'undefined') {
		var s = 'x.name=' + this.name.toJS();
		var namefn = new Function('x', s);
	}

	if (this.sets && this.sets.length > 0) {
		var s = this.sets
			.map(function (st) {
				return "x['" + st.column.columnid + "']=" + st.expression.toJS('x', '');
			})
			.join(';');
		var setfn = new Function('x,params,alasql', s);
	}

	// Todo: check for content, select and default
	/*/*
	else if(this.content) {

	} else if(this.select) {

	} else {
	}
	*/

	var statement = function (params, cb) {
		var res;

		// CREATE VERTEX without parameters
		var db = alasql.databases[dbid];
		var id;
		if (typeof sharp !== 'undefined') {
			id = sharp;
		} else {
			id = db.counter++;
		}
		var vertex = {$id: id, $node: 'VERTEX'};
		db.objects[vertex.$id] = vertex;
		res = vertex;
		if (namefn) {
			namefn(vertex);
		}
		if (setfn) {
			setfn(vertex, params, alasql);
		}

		if (cb) {
			res = cb(res);
		}
		return res;
	};
	return statement;
};

/*/*
	console.log('yy.CreateVertex.compile');

	if(this.sets) {
		var s = 'var a={};';
		if(this.sets.length > 0) {
			this.sets.forEach(function(st){
				console.log(st);
			});
		}

	} else if(this.content) {

	} else if(this.select) {

	}

};

*/

yy.CreateEdge = function (params) {
	return yy.extend(this, params);
};
yy.CreateEdge.prototype.toString = function () {
	//	console.log('here!');
	var s = 'CREATE EDGE' + ' ';
	if (this.class) {
		s += this.class + ' ';
	}
	// todo: SET
	// todo: CONTENT
	// todo: SELECT
	return s;
};

yy.CreateEdge.prototype.toJS = function (context) {
	var s = 'this.queriesfn[' + (this.queriesidx - 1) + '](this.params,null,' + context + ')';
	return s;
};

// CREATE TABLE
/*/*
yy.CreateEdge.prototype.execute = function (databaseid,params,cb) {
	var res = 1;
	if(cb) res = cb(res);
	return res;
};
*/
yy.CreateEdge.prototype.compile = function (databaseid) {
	var dbid = databaseid;
	var fromfn = new Function('params,alasql', 'var y;return ' + this.from.toJS());
	var tofn = new Function('params,alasql', 'var y;return ' + this.to.toJS());

	// CREATE VERTEX "Name"
	if (typeof this.name !== 'undefined') {
		var s = 'x.name=' + this.name.toJS();
		var namefn = new Function('x', s);
	}

	if (this.sets && this.sets.length > 0) {
		var s = this.sets
			.map(function (st) {
				return "x['" + st.column.columnid + "']=" + st.expression.toJS('x', '');
			})
			.join(';');
		var setfn = new Function('x,params,alasql', 'var y;' + s);
	}

	/*
	todo: handle content, select and default
	else if(this.content) {

	} else if(this.select) {

	} else {
	}
	*/

	var statement = function (params, cb) {
		var res = 0;
		// CREATE VERTEX without parameters
		var db = alasql.databases[dbid];
		var edge = {$id: db.counter++, $node: 'EDGE'};
		var v1 = fromfn(params, alasql);
		var v2 = tofn(params, alasql);
		// Set link
		edge.$in = [v1.$id];
		edge.$out = [v2.$id];
		// Set sides
		if (v1.$out === undefined) {
			v1.$out = [];
		}
		v1.$out.push(edge.$id);

		if (typeof v2.$in === undefined) {
			v2.$in = [];
		}
		v2.$in.push(edge.$id);

		// Save in objects
		db.objects[edge.$id] = edge;
		res = edge;
		if (namefn) {
			namefn(edge);
		}

		if (setfn) {
			setfn(edge, params, alasql);
		}

		if (cb) {
			res = cb(res);
		}

		return res;
	};
	return statement;
};

yy.CreateGraph = function (params) {
	return yy.extend(this, params);
};
yy.CreateGraph.prototype.toString = function () {
	var s = 'CREATE GRAPH' + ' ';
	if (this.class) {
		s += this.class + ' ';
	}
	return s;
};

//  yy.CreateEdge.prototype.toJS = function(context, tableid, defcols) {
// 	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
// 	return s;
//  };

yy.CreateGraph.prototype.execute = function (databaseid, params, cb) {
	var res = [];
	if (this.from) {
		if (alasql.from[this.from.funcid]) {
			this.graph = alasql.from[this.from.funcid.toUpperCase()];
		}
	}

	//	stop;
	this.graph.forEach(function (g) {
		if (g.source) {
			// GREATE EDGE
			var e = {};
			if (typeof g.as !== 'undefined') {
				alasql.vars[g.as] = e;
			}

			if (typeof g.prop !== 'undefined') {
				//				e[g.prop] = e;
				//				v.$id = g.prop; // We do not create $id for edge automatically
				e.name = g.prop;
			}
			if (typeof g.sharp !== 'undefined') {
				e.$id = g.sharp;
			}
			if (typeof g.name !== 'undefined') {
				e.name = g.name;
			}
			if (typeof g.class !== 'undefined') {
				e.$class = g.class;
			}

			var db = alasql.databases[databaseid];
			if (typeof e.$id === 'undefined') {
				e.$id = db.counter++;
			}
			e.$node = 'EDGE';
			if (typeof g.json !== 'undefined') {
				extend(e, new Function('params,alasql', 'var y;return ' + g.json.toJS())(params, alasql));
			}

			var v1;
			if (g.source.vars) {
				var vo = alasql.vars[g.source.vars];
				if (typeof vo === 'object') {
					v1 = vo;
				} else {
					v1 = db.objects[vo];
				}
			} else {
				var av1 = g.source.sharp;
				if (typeof av1 === 'undefined') {
					av1 = g.source.prop;
				}
				v1 = alasql.databases[databaseid].objects[av1];
				if (
					typeof v1 === 'undefined' &&
					alasql.options.autovertex &&
					(typeof g.source.prop !== 'undefined' || typeof g.source.name !== 'undefined')
				) {
					v1 = findVertex(g.source.prop || g.source.name);
					if (typeof v1 === 'undefined') {
						v1 = createVertex(g.source);
					}
				}
			}

			var v2;
			if (g.source.vars) {
				var vo = alasql.vars[g.target.vars];
				if (typeof vo === 'object') {
					v2 = vo;
				} else {
					v2 = db.objects[vo];
				}
			} else {
				var av2 = g.target.sharp;
				if (typeof av2 === 'undefined') {
					av2 = g.target.prop;
				}
				v2 = alasql.databases[databaseid].objects[av2];
				if (
					typeof v2 === 'undefined' &&
					alasql.options.autovertex &&
					(typeof g.target.prop !== 'undefined' || typeof g.target.name !== 'undefined')
				) {
					v2 = findVertex(g.target.prop || g.target.name);
					if (typeof v2 === 'undefined') {
						v2 = createVertex(g.target);
					}
				}
			}

			//console.log(v1,v2);
			// Set link
			e.$in = [v1.$id];
			e.$out = [v2.$id];
			// Set sides
			if (typeof v1.$out === 'undefined') {
				v1.$out = [];
			}
			v1.$out.push(e.$id);
			if (typeof v2.$in === 'undefined') {
				v2.$in = [];
			}
			v2.$in.push(e.$id);

			db.objects[e.$id] = e;
			if (typeof e.$class !== 'undefined') {
				if (typeof alasql.databases[databaseid].tables[e.$class] === 'undefined') {
					throw new Error('No such class. Pleace use CREATE CLASS');
				} else {
					// TODO - add insert()
					alasql.databases[databaseid].tables[e.$class].data.push(e);
				}
			}

			res.push(e.$id);
		} else {
			createVertex(g);
		}
	});

	if (cb) {
		res = cb(res);
	}
	return res;

	// Find vertex by name
	function findVertex(name) {
		var objects = alasql.databases[alasql.useid].objects;
		for (var k in objects) {
			if (objects[k].name === name) {
				return objects[k];
			}
		}
		return undefined;
	}

	function createVertex(g) {
		// GREATE VERTEX
		var v = {};
		if (typeof g.as !== 'undefined') {
			alasql.vars[g.as] = v;
		}

		if (typeof g.prop !== 'undefined') {
			//				v[g.prop] = true;
			v.$id = g.prop;
			v.name = g.prop;
		}

		if (typeof g.sharp !== 'undefined') {
			v.$id = g.sharp;
		}
		if (typeof g.name !== 'undefined') {
			v.name = g.name;
		}
		if (typeof g.class !== 'undefined') {
			v.$class = g.class;
		}

		var db = alasql.databases[databaseid];
		if (typeof v.$id === 'undefined') {
			v.$id = db.counter++;
		}
		v.$node = 'VERTEX';
		if (typeof g.json !== 'undefined') {
			extend(v, new Function('params,alasql', 'var y;return ' + g.json.toJS())(params, alasql));
		}
		db.objects[v.$id] = v;
		if (typeof v.$class !== 'undefined') {
			if (typeof alasql.databases[databaseid].tables[v.$class] === 'undefined') {
				throw new Error('No such class. Pleace use CREATE CLASS');
			} else {
				// TODO - add insert()
				alasql.databases[databaseid].tables[v.$class].data.push(v);
			}
		}

		res.push(v.$id);
		return v;
	}
};

yy.CreateGraph.prototype.compile1 = function (databaseid) {
	var dbid = databaseid;
	var fromfn = new Function('params,alasql', 'var y;return ' + this.from.toJS());
	var tofn = new Function('params,alasql', 'var y;return ' + this.to.toJS());

	// CREATE VERTEX "Name"
	if (typeof this.name !== 'undefined') {
		var s = 'x.name=' + this.name.toJS();
		var namefn = new Function('x', s);
	}

	if (this.sets && this.sets.length > 0) {
		var s = this.sets
			.map(function (st) {
				return "x['" + st.column.columnid + "']=" + st.expression.toJS('x', '');
			})
			.join(';');
		var setfn = new Function('x,params,alasql', 'var y;' + s);
	}

	// Todo: handle content, select and default

	/*/*
	else if(this.content) {

	} else if(this.select) {

	} else {
	
	}
	*/

	var statement = function (params, cb) {
		var res = 0;
		// CREATE VERTEX without parameters
		var db = alasql.databases[dbid];
		var edge = {$id: db.counter++, $node: 'EDGE'};
		var v1 = fromfn(params, alasql);
		var v2 = tofn(params, alasql);
		// Set link
		edge.$in = [v1.$id];
		edge.$out = [v2.$id];
		// Set sides
		if (typeof v1.$out === 'undefined') {
			v1.$out = [];
		}
		v1.$out.push(edge.$id);

		if (typeof v2.$in === 'undefined') {
			v2.$in = [];
		}
		v2.$in.push(edge.$id);
		// Save in objects
		db.objects[edge.$id] = edge;
		res = edge;
		if (namefn) {
			namefn(edge);
		}
		if (setfn) {
			setfn(edge, params, alasql);
		}

		if (cb) {
			res = cb(res);
		}
		return res;
	};
	return statement;
};
