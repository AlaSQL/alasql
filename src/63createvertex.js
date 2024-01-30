/*
//
// CREATE VERTEX for AlaSQL
// Date: 21.04.2015
// (c) 2015, Andrey Gershun
//
*/

yy.CreateVertex = function (params) {
	return Object.assign(this, params);
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
				return `x[${JSON.stringify(st.column.columnid)}]=` + st.expression.toJS('x', '');
			})
			.join(';');
		var setfn = new Function('x,params,alasql', s);
	}

	// Todo: check for content, select and default

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

yy.CreateEdge = function (params) {
	return Object.assign(this, params);
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
				return `x[${JSON.stringify(st.column.columnid)}]=` + st.expression.toJS('x', '');
			})
			.join(';');
		var setfn = new Function('x,params,alasql', 'var y;' + s);
	}

	const statement = (params, cb) => {
		let res = 0;
		let db = alasql.databases[dbid];
		let edge = {$id: db.counter++, $node: 'EDGE'};
		let v1 = fromfn(params, alasql);
		let v2 = tofn(params, alasql);

		// Set link
		edge.$in = [v1.$id];
		edge.$out = [v2.$id];

		// Initialize and set sides
		v1.$out = v1.$out || [];
		v1.$out.push(edge.$id);

		v2.$in = v2.$in || [];
		v2.$in.push(edge.$id);

		// Save in objects
		db.objects[edge.$id] = edge;
		res = edge;

		// Optional functions
		namefn?.(edge);
		setfn?.(edge, params, alasql);

		// Callback
		return cb ? cb(res) : res;
	};
	return statement;
};

yy.CreateGraph = function (params) {
	return Object.assign(this, params);
};
yy.CreateGraph.prototype.toString = function () {
	var s = 'CREATE GRAPH' + ' ';
	if (this.class) {
		s += this.class + ' ';
	}
	return s;
};

yy.CreateGraph.prototype.execute = function (databaseid, params, cb) {
	var res = [];
	if (this.from) {
		if (alasql.from[this.from.funcid]) {
			this.graph = alasql.from[this.from.funcid.toUpperCase()];
		}
	}

	//	stop;
	this.graph.forEach(g => {
		if (!g.source) {
			createVertex(g);
		} else {
			// CREATE EDGE
			let e = {};
			if (g.as !== undefined) alasql.vars[g.as] = e;
			if (g.prop !== undefined) e.name = g.prop;
			if (g.sharp !== undefined) e.$id = g.sharp;
			if (g.name !== undefined) e.name = g.name;
			if (g.class !== undefined) e.$class = g.class;

			let db = alasql.databases[databaseid];
			e.$id = e.$id !== undefined ? e.$id : db.counter++;
			e.$node = 'EDGE';

			if (g.json !== undefined) {
				Object.assign(e, new Function('params, alasql', `return ${g.json.toJS()}`)(params, alasql));
			}

			const resolveVertex = (sourceOrTarget, isSource) => {
				let vertex, vo;
				if (sourceOrTarget.vars) {
					vo = alasql.vars[sourceOrTarget.vars];
					vertex = typeof vo === 'object' ? vo : db.objects[vo];
				} else {
					let av = sourceOrTarget.sharp || sourceOrTarget.prop;
					vertex = db.objects[av];
					if (
						vertex === undefined &&
						alasql.options.autovertex &&
						(sourceOrTarget.prop || sourceOrTarget.name)
					) {
						vertex =
							findVertex(sourceOrTarget.prop || sourceOrTarget.name) ||
							createVertex(sourceOrTarget);
					}
				}
				if (isSource && vertex && typeof vertex.$out === 'undefined') vertex.$out = [];
				if (!isSource && vertex && typeof vertex.$in === 'undefined') vertex.$in = [];
				return vertex;
			};

			let v1 = resolveVertex(g.source, true);
			let v2 = resolveVertex(g.target, false);

			// Set link and sides
			e.$in = [v1.$id];
			e.$out = [v2.$id];
			v1.$out.push(e.$id);
			v2.$in.push(e.$id);

			db.objects[e.$id] = e;

			if (e.$class !== undefined) {
				let classTable = alasql.databases[databaseid].tables[e.$class];
				if (classTable === undefined) {
					throw new Error('No such class. Please use CREATE CLASS');
				} else {
					classTable.data.push(e);
				}
			}

			res.push(e.$id);
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
	const dbid = databaseid;
	const fromfn = new Function('params, alasql', `return ${this.from.toJS()}`);
	const tofn = new Function('params, alasql', `return ${this.to.toJS()}`);

	let namefn, setfn;

	// CREATE VERTEX "Name"
	if (this.name !== undefined) {
		const s = `x.name = ${this.name.toJS()}`;
		namefn = new Function('x', s);
	}

	if (this.sets && this.sets.length > 0) {
		const s = this.sets
			.map(st => `x[${JSON.stringify(st.column.columnid)}] = ${st.expression.toJS('x', '')}`)
			.join(';');
		setfn = new Function('x, params, alasql', `var y; ${s}`);
	}

	// Todo: handle content, select and default

	const statement = (params, cb) => {
		let res = 0;
		const db = alasql.databases[dbid];
		const edge = {$id: db.counter++, $node: 'EDGE'};
		const v1 = fromfn(params, alasql);
		const v2 = tofn(params, alasql);

		// Set link
		edge.$in = [v1.$id];
		edge.$out = [v2.$id];

		// Set sides
		v1.$out = v1.$out || [];
		v1.$out.push(edge.$id);

		v2.$in = v2.$in || [];
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
