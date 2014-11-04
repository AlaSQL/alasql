// SELECT
yy.Select = function (params) { return yy.extend(this, params); }
yy.Select.prototype.toString = function() {
	var s = 'SELECT '+this.columns.map(function(col){
		var s = col.toString();
	//	console.log(col);
		if(col.as) s += ' AS '+col.as;
		return s;
	}).join(',');
	s += ' FROM '+this.from.map(function(f){return f.toString()}).join(',');

	if(this.where) s += ' WHERE '+this.where.toString();
	if(this.group) s += ' GROUP BY '+this.group.toString();
	if(this.having) s += ' HAVING '+this.having.toString();
	if(this.order) s += ' ORDER BY '+this.order.toString();
	return s;
}

yy.Select.prototype.compile = function(db) {
	var query = {};
	query.database = db;
//	query.databaseid = db.databaseid;
	this.compileFrom(query);
	if(this.joins) this.compileJoins(query);
	query.selectfn = this.compileSelect(query);
	query.wherefn = this.compileWhere(query);
	if(this.group) query.groupfn = this.compileGroup(query);
	query.distinct = this.distinct;
	query.limit = this.limit?this.limit.value:undefined;
	query.offset = this.offset?this.offset.value:1;
//	console.log(query.offset,query.limit);
	if(this.order) query.orderfn = this.compileOrder(query);

//	query.sources = this.compileSources(query);
//	select.selectfn = function(scope){return {a:1}}; // TODO Remove stub
	// Compile where
//	console.log(this);
//	if(this.where) select.wherefn = this.where.compile('scope.','STUB');
//console.log(query);
	// TODO Remove debug
//	window.q = query;
	return function(params, cb) {
		var res = queryfn(query,params); 
		if(cb) cb(res); 
		return res;
	}
};


function queryfn(query, args) {
//		query.data = query.database.tables[query.defaultTableid].data.filter(query.wherefn);
//		query.data = query.database.tables[query.defaultTableid].data;
//	var query = this;
	preIndex(query);
	query.args = args;
	query.data = [];
	query.xgroups = {};
	query.groups = [];
	var scope = query.scope = {};


	var h = 0;

	doJoin(query, scope, h);

	if(query.groupfn) {
		if(query.havingfn) query.groups = query.groups.filter(query.havingfn)
		query.data = query.groups;
	}

	// delete query.groups;
	// delete query.xgroups;

//	
	doDistinct(query);	
	doLimit(query);
	if(query.orderfn) query.data = query.data.sort(query.orderfn);
//		query.data = data;
	return query.data;
};

function doLimit (query) {
	if(query.limit) {
		var offset = ((query.offset|0)-1)||0;
		var limit = (query.limit|0) + offset;
		console.log(offset, limit);
		query.data = query.data.slice(offset,limit);
	}
}

function doDistinct (query) {
	if(query.distinct) {
//		console.log('distinct');
		var uniq = {};
		// TODO: Speedup
		for(var i=0,ilen=query.data.length;i<ilen;i++) {
			var uix = Object.keys(query.data[i]).map(function(k){return query.data[i][k]}).join('`');

			// for(var key in query.data[i]) {
			// 	uix += '`'+query.data[i][key];
			// }
			uniq[uix] = query.data[i];
		};
//		console.log(uniq);
		query.data = [];
		for(var key in uniq) query.data.push(uniq[key]);
	}
};


preIndex = function(query) {
	// if(query.joins && self.joins.length>0) {
		for(var k=0, klen = query.sources.length;k<klen;k++) {
//			console.log('klen',klen);
			var source = query.sources[k];
			if(source.optimization == 'ix' && source.onleftfn && source.onrightfn) {
//				var h = console.log(hash(source.onrightfn));

				// TODO Check if table index exists
//				if(/*!join.ix || */ join.dirty) {
					source.ix = {};
//					join.dirty = false;
					// Если есть группировка
					var scope = {};
//					console.log('join.recs.length',join.recs, join.recs.length);
					for(var i=0, ilen=source.data.length; i<ilen; i++) {
						scope[source.alias || source.tableid] = source.data[i];
//						console.log('preIndex:scope',scope);

						var group = source.ix [ source.onrightfn(scope) ]; 
						if(!group) {
							group = source.ix [ source.onrightfn(scope) ] = []; 
						}
						group.push(source.data[i]);
					}

				// TODO - Save index to original table	
//				}
			}
		}
//	}
}



function doJoin (query, scope, h) {
	if(h>=query.sources.length) {

		if(query.wherefn(scope)) {
			var res = query.selectfn(scope);
			if(query.groupfn) {
				query.groupfn(res)
			} else {
				query.data.push(res);
			}	
		}
	} else {
//		console.log(query.sources, h);
		var source = query.sources[h];
//		var nextjointype = query.sources[h+1] ? query.sources[h+1].jointype: undefined;
		var tableid =source.tableid; 
		var pass = false;
		var data = source.data;

		if(source.optimization == 'ix') {
//			console.log('join.ix', source.ix)
			data = source.ix[ source.onleftfn(scope) ] || [];
		}


		// Main cycle
		for(var i=0, ilen=data.length; i<ilen; i++) {
			scope[tableid] = data[i];
			if(!source.onleftfn || (source.onleftfn(scope) == source.onrightfn(scope))) {
//				console.log(source, source.jointype);
				doJoin(query, scope, h+1);
				pass = true;
			}
		};

//		console.log("out",h,i,pass, source.joinmode );

		// Additional for LEFT JOINS
		if((source.joinmode == 'LEFT') && !pass) {
			scope[tableid] = {};
			doJoin(query,scope,h+1);
		}	

	}
};


yy.Select.prototype.compileJoins = function(query) {
//	console.log(this.join);
	var self = this;
	this.joins.forEach(function(jn){
		var tq = jn.table;
		var source = {
			alias: tq.alias||tq.tableid,
			databaseid: jn.databaseid || query.database.databaseid,
			tableid: tq.tableid,
			joinmode: jn.joinmode
		};

		var alias = tq.as || tq.tableid;
		query.aliases[alias] = {tableid: tq.tableid, databaseid: tq.databaseid || query.database.databaseid};

		if(jn.using) {
			var prevSource = query.sources[query.sources.length-1];
//			console.log(query.sources[0],prevSource,source);
			source.onleftfns = jn.using.map(function(colid){
				return "p['"+(prevSource.alias||prevSource.tableid)+"']['"+colid+"']";
			}).join('+"`"+');
			source.onleftfn = new Function('p','return '+source.onleftfns);
			source.onrightfns = jn.using.map(function(colid){
				return "p['"+(source.alias||source.tableid)+"']['"+colid+"']";
			}).join('+"`"+');
			source.onrightfn = new Function('p','return '+source.onrightfns);
			source.optimization = 'ix';
		} else if(jn.on) {
//console.log(jn.on);
			if(jn.on instanceof yy.Op && jn.on.operation == '=') {
				source.optimization = 'ix';
				source.onleftfns = jn.on.left.toJavaScript('p',query.defaultTableid);
				source.onleftfn = new Function('p', 'return '+source.onleftfns);
				source.onrightfns = jn.on.right.toJavaScript('p',query.defaultTableid);
				source.onrightfn = new Function('p', 'return '+source.onrightfns);
			} else {
				source.optimization = 'no';
				source.onleftfn = new Function('return true');
				source.onrightfn = new Function('p','return '+jn.on.toJavaScript('p',query.defaultTableid));
			};

			// Optimization function
		};

//		source.data = alasql.databases[source.databaseid].tables[source.tableid].data;
//console.log(source, jn);
		// TODO SubQueries
		if(!query.database.tables[source.tableid]) {
			throw new Error('Table \''+source.tableid+
			'\' is not exists in database \''+query.database.databaseid)+'\'';
		};
		source.data = query.database.tables[source.tableid].data;
		if(source.joinmode == 'RIGHT') {
			var prevSource = query.sources.pop();
			if(prevSource.joinmode == 'INNER') {
				prevSource.joinmode = 'LEFT';
				prevSource.onleftfn = source.onrightfn;
				prevSource.onleftfns = source.onrightfns;
				prevSource.onrightfn = source.onleftfn;
				prevSource.onrightfns = source.onleftfns;
				source.onleftfn = undefined;
				source.onleftfns = undefined;
				source.onrightfn = undefined;
				source.onrightfns = undefined;
				source.joinmode = 'INNER';
				query.sources.push(source);
				query.sources.push(prevSource);
			} else {
				throw new Error('Do not know how to process this SQL');
			}
		} else {
			query.sources.push(source);
		}
	});
//	console.log('sources',query.sources);
}

yy.Select.prototype.compileGroup = function(query) {


	var self = this;
	var s = 'var g=this.xgroups[';

//	var gcols = this.group.map(function(col){return col.columnid}); // Group fields with r

	// Array with group columns from record
//	var rg = gcols.map(function(columnid){return 'r.'+columnid});
	var rg = this.group.map(function(col){
		if(col == '') return '1';
//		console.log(col.toJavaScript('r',''));
//		console.log(col, col.toJavaScript('r',''));
		else return col.toJavaScript('r','');
	});

//	console.log('rg',rg);

	s += rg.join('+"`"+');
	s += '];if(!g) {this.groups.push(g=this.xgroups[';
	s += rg.join('+"`"+');
//	s += '] = {';
	s += ']=r';

	// columnid:r.columnid
	var srg = [];//rg.map(function(fn){ return (fn+':'+fn); });

//	var srg = this.group.map(function(col){
//		if(col == '') return '';
//		else return col.columnid+':'+col.toJavaScript('r','');
//	});

// Initializw aggregators

/*
	this.columns.forEach(function(col){
//		console.log(f);
//			if(f.constructor.name == 'LiteralValue') return '';


		if (col instanceof yy.AggrValue) { 
			if (col.aggregatorid == 'SUM') { srg.push("'"+col.as+'\':0'); }//f.field.arguments[0].toJavaScript(); 	
			else if(col.aggregatorid == 'COUNT') {srg.push( "'"+col.as+'\':0'); }
			else if(col.aggregatorid == 'MIN') { srg.push( "'"+col.as+'\':Infinity'); }
			else if(col.aggregatorid == 'MAX') { srg.push( "'"+col.as+'\':-Infinity'); }
//			else if(col.aggregatorid == 'AVG') { srg.push(col.as+':0'); }
//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
		};

	});

*/

/*****************/

//	s += srg.join(',');

	// var ss = [];
	// gff.forEach(function(fn){
	// 	ss.push(fn+':rec.'+fn);
	// });
	// s += ss.join(',');
//	s += '});};';

	s += ');} else {';
//	console.log(s, this.columns);

//console.log(query.selectfn);
	s += this.columns.map(function(col){
		if (col instanceof yy.AggrValue) { 
			if (col.aggregatorid == 'SUM') { return 'g[\''+col.as+'\']+=r[\''+col.as+'\'];'; }//f.field.arguments[0].toJavaScript(); 	
			else if(col.aggregatorid == 'COUNT') { return 'g[\''+col.as+'\']++;'; }
			else if(col.aggregatorid == 'MIN') { return 'g[\''+col.as+'\']=Math.min(g[\''+col.as+'\'],r[\''+col.as+'\']);'; }
			else if(col.aggregatorid == 'MAX') { return 'g[\''+col.as+'\']=Math.max(g[\''+col.as+'\'],r[\''+col.as+'\']);'; }
//			else if(col.aggregatorid == 'AVG') { srg.push(col.as+':0'); }
			return '';
		} else return '';
	}).join('');


//	s += selectFields.map(function(f){
//			console.log(f);
//			if(f.constructor.name == 'LiteralValue') return '';
//			if (f.field instanceof SQLParser.nodes.FunctionValue 
//				&& (f.field.name.toUpperCase() == 'SUM' || f.field.name.toUpperCase() == 'COUNT')) {
//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
//				return 'group.'+f.name.value+'+='+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
//				return 'group.'+f.name.value+'+=rec.'+f.name.value+';'; //f.field.arguments[0].toJavaScript(); 	
//			};
//			return '';
//		}).join('');

	//s += '	group.amt += rec.emplid;';
	//s += 'group.count++;';

	s += '}';
//	console.log(s, this.group);
	return new Function('r',s);

}

yy.Select.prototype.compileFrom = function(query) {
	var self = this;
	query.sources = [];
//	var tableid = this.from[0].tableid;
//	var as = '';
//	if(self.from[0].as) as = this.from[0].as;
//console.log(this);
	query.defaultTableid = this.from[0].tableid;
	query.aliases = {};
	self.from.forEach(function(tq){
		var alias = tq.as || tq.tableid;
		query.aliases[alias] = {tableid: tq.tableid, databaseid: tq.databaseid || query.database.databaseid};

		var source = {
			alias: alias,
			databaseid: tq.databaseid || query.database.databaseid,
			tableid: tq.tableid,
			joinmode: 'INNER'
		};
//		source.data = alasql.databases[source.databaseid].tables[source.tableid].data;
		source.data = query.database.tables[source.tableid].data;
		query.sources.push(source);

	});
	// TODO Add joins
};

// yy.Select.prototype.compileSources = function(query) {
// 	return sources;
// };

function compileSelectStar (query,alias) {
	// console.log(query.aliases[alias]);
//	console.log(query,alias);
	// console.log(query.aliases[alias].tableid);
	var s = '', sp = '', ss=[];
	var columns = query.database.tables[query.aliases[alias].tableid].columns;
	if(columns) {
		columns.forEach(function(tcol){
			ss.push(tcol.columnid+':p.'+alias+'.'+tcol.columnid);

//		console.log('ok',s);

			var coldef = {
				columnid:tcol.columnid, 
				dbtypeid:tcol.dbtypeid, 
				dbsize:tcol.dbsize, 
				dbpecision:tcol.dbprecision
			};
			query.columns.push(coldef);
			query.xcolumns[coldef.columnid]=coldef;

		});
	} else {
		// if column not exists, then copy all
		sp += 'var w=p["'+alias+'"];for(var k in w){r[k]=w[k]};';
		query.dirtyColumns = true;
	}
	return {s:ss.join(','),sp:sp};
}


yy.Select.prototype.compileSelect = function(query) {
	var self = this;
	query.columns = [];
	query.xcolumns = {};
	query.dirtyColumns = false;
	var s = 'var r={';
	var sp = '';
	var ss = [];
//	console.log(this.columns);
	this.columns.forEach(function(col){
		if(col instanceof yy.Column) {
			if(col.columnid == '*') {
				if(col.tableid) {
					//Copy all
					var ret = compileSelectStar(query, col.tableid);
					if(ret.s)  ss = ss.concat(ret.s);
					sp += ret.sp;

				} else {
					for(var alias in query.aliases) {
						var ret = compileSelectStar(query, alias); //query.aliases[alias].tableid);
						if(ret.s) ss = ss.concat(ret.s);
						sp += ret.sp;
					}
					// TODO Remove these lines
					// In case of no information 
					// sp += 'for(var k1 in p){var w=p[k1];'+
					// 			'for(k2 in w) {r[k2]=w[k2]}}'
				}
			} else {
				// If field, otherwise - expression
				ss.push((col.as || col.columnid)+':p.'+(col.tableid||query.defaultTableid)+'.'+col.columnid);

				var xcolumns = query.database.tables[query.aliases[col.tableid||query.defaultTableid].tableid].xcolumns;

				if(xcolumns) {
					var tcol = xcolumns[col.columnid];
					var coldef = {
						columnid:col.as || col.columnid, 
						dbtypeid:tcol.dbtypeid, 
						dbsize:tcol.dbsize, 
						dbpecision:tcol.dbprecision
					};
					query.columns.push(coldef);
					query.xcolumns[coldef.columnid]=coldef;
				} else {
					query.dirtyColumns = true;
				}

			}
		} else if(col instanceof yy.AggrValue) {
			if(!self.group) {
//				self.group=[new yy.Column({columnid:'q',as:'q'	})];
				self.group = [''];
			}
			if(!col.as) col.as = col.toString();
			if (col.aggregatorid == 'SUM' || col.aggregatorid == 'MAX' ||  col.aggregatorid == 'MIN' ) {
				ss.push("'"+col.as+'\':'+col.expression.toJavaScript("p",query.defaultTableid))	
			} else if (col.aggregatorid == 'COUNT') {
				ss.push("'"+col.as+"':1");
				// Nothing
			} 
//			else if (col.aggregatorid == 'MAX') {
//				ss.push((col.as || col.columnid)+':'+col.toJavaScript("p.",query.defaultTableid))
//			} else if (col.aggregatorid == 'MIN') {
//				ss.push((col.as || col.columnid)+':'+col.toJavaScript("p.",query.defaultTableid))
//			}
		} else {
			ss.push((col.as || col.columnid)+':'+col.toJavaScript("p.",query.defaultTableid));
			//if(col instanceof yy.Expression) {
		}
	});
	s += ss.join(',')+'};'+sp;
//	console.log(s);
	query.selectfns = s;
	return new Function('p',s+'return r');
};

yy.Select.prototype.compileWhere = function(query) {
	if(this.where) {
		s = this.where.toJavaScript('p',query.defaultTableid);
		query.wherefns = s;
//		console.log(s);
		return new Function('p','return '+s);
	} else return function(){return true};
};




yy.Select.prototype.compileOrder = function (query) {
	if(this.order) {
		var s = '';
		var sk = '';
		this.order.forEach(function(ord){
			var columnid = ord.expression.columnid; 
			
			// Date conversion
			var dg = ''; 
			var dbtypeid = query.xcolumns[columnid].dbtypeid;
			if( dbtypeid == 'DATE' || dbtypeid == 'DATETIME') dg = '+';
			
			// COLLATE NOCASE
			if(ord.nocase) columnid += '.toUpperCase()';

			// TODO Add date comparision
			s += 'if('+dg+'a.'+columnid+(ord.direction == 'ASC'?'>':'<')+dg+'b.'+columnid+')return 1;';
			s += 'if('+dg+'a.'+columnid+'=='+dg+'b.'+columnid+'){';
			sk += '}';
		});
		s += 'return 0;';
		s += sk+'return -1';
		query.orderfns = s;

		return new Function('a,b',s);
	};
};

