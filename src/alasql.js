//
// alasql.js
// "A la SQL" - Pure JavaScript SQL database
// Date: 27.10.2014
// Version: 0.0.5
// (ñ) 2014, Andrey Gershun
//

//  UMD header

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../lib/sql-parser/sql-parser'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('../lib/sql-parser/sql-parser').SQLParser);
    } else {
        root.alasql = factory(root.SQLParser);
    }
}(this, function (SQLParser) {

// Alias
var nodes = SQLParser.nodes;

// Database class constructor
var Database = function(){
	this.tables = {};
	this.sqlcache = {};
	return this;
};

var Table = function(tableid) {
	this.tableid = tableid;
	this.recs = [];
	this.flds = [];
	this.xflds = {};
	return this;
};

var Query = function() {
	this.recs = [];
	this.flds = []; // TODO - заполнять
	this.xflds = {};
	this.tableid = 'tmp';
//	this.tables = {};
//window.q = this;
	return this;	
}

Query.prototype.exec = function (db) {
	var self = this;
//	self.tables.prototype = db.tables;
	self.recs = [];
	self.groups = {};

	// Prepare indices for optimal joins
	self.preIndex(db);

	// Do joins
	var scope = {};
	// TODO: Optimize for WHERE
	for(var i=0, ilen=self.source.recs.length; i<ilen; i++) {
		scope[self.source.tableid] = self.source.recs[i];
//		console.log(self.tableid, scope.test, self.source.recs[i]);
		self.doJoin(scope,0);
	};

	if(self.groupfn) self.doGroup();
	if(self.distinct) self.doDistinct();
	if(self.orderfn) self.recs = self.recs.sort(self.orderfn);
	if(self.limitnum) self.recs = self.recs.slice(0,self.limitnum);
// console.log(self);	
	return self.recs
};

// Do for every joins
Query.prototype.doJoin = function(scope, k) {
	var self = this;
	if(!this.joins || k >= this.joins.length) {
		self.selectwherefn(scope);
	} else {
		var pass = false;
		var join = self.joins[k];
		var recs = join.recs;
		if(join.optimization == 'ix' && join.onleftfn) {
//			console.log('join.ix', join.ix)
			recs = join.ix[join.onleftfn(scope) ] || [];
		}

//			if(k == 0) scope[self.join[k].tableid] = self.join[k].ix.fpartid[scope.fpart.fpartid] || {};
//			else scope[self.join[k].tableid] = self.join[k].ix.deptid[scope.fpart.deptid] || {};

//			self.dojoindo(scope,k+1);
//		} else {


		for(var j=0, jlen=recs.length; j<jlen; j++) {
			scope[join.tableid] = recs[j];
			if( join.optimization == 'ix' 
				|| (join.onleftfn && join.onrightfn 
					&& (join.onleftfn(scope) === join.onrightfn(scope)))) {
				pass = true;
				self.doJoin(scope,k+1);
			}
		};
//		} 

		if(join.mode == 'OUTER' && join.side == 'LEFT' && !pass) {
			scope[join.tableid] = {};
			self.doJoin(scope,k+1);
		}	
	}
}

Query.prototype.selectwherefn = function (scope) {
//	console.log(this.wherefn(scope), scope.test);
	if(!this.wherefn || this.wherefn(scope)) {


	//		console.log('selectwherefn', scope);
			
			// var res = this.selectfn(scope);
			// this.groupfn(self.recs[i])
			var rec = this.selectfn(scope);

			if(!this.mdxwherefn || this.mdxwherefn(rec)) {

				if(this.mdxselectfn) this.mdxselectfn(scope,rec);

				if(this.groupfn) {
					this.groupfn(rec);
				} else {
					this.recs.push(rec);
				};
	//		this.recs.push(this.selectfn(scope));
			};

//		if(this.selectfn) this.recs.push(this.selectfn(scope));
//		else this.recs.push(this.selectfnstar(scope));
//		else this.recs.push(scope);
	}	
};

//
// DISTINCT
// TODO: Check group and distinct togeather
//
Query.prototype.doDistinct = function() {
	if(self.distinct) {
		var uniq = {};
		for(var i=0,ilen=self.recs.length;i<ilen;i++) {
			var uix = '';
			for(var key in self.recs[i]) {
				uix += '`'+self.recs[i][key];
			}
			uniq[uix] = self.recs[i];
		};

		self.recs = [];
		for(var key in uniq) self.recs.push(uniq[key]);

	}
};

Query.prototype.doGroup = function() {
	var self = this;
	if(self.groupfn) {
	//	console.log(self.recs);
//	console.log(self.groupfn);

//		self.groups = {};
		// Если есть группировка
//		for(var i=0, ilen=self.recs.length; i<ilen; i++) {
//			self.groupfn(self.recs[i])
//		};
//		console.log(self.groups)
		self.recs = [];
		for(var key in self.groups) {
			group = self.groups[key];
			if(self.havingfn) {
				if (self.havingfn(group)) self.recs.push(group);
			} else self.recs.push(group);
		};

	};
};

Query.prototype.preIndex = function(db) {
	var self = this;
	if(self.joins && self.joins.length>0) {
		for(var k=0, klen = self.joins.length;k<klen;k++) {
//			console.log('klen',klen);
			var join = self.joins[k];
			if(join.optimization == 'ix' && join.onleftfn && join.onrightfn) {
//				if(/*!join.ix || */ join.dirty) {
					join.ix = {};
//					join.dirty = false;
					// Если есть группировка
					var scope = {};
//					console.log('join.recs.length',join.recs, join.recs.length);
					for(var i=0, ilen=join.recs.length; i<ilen; i++) {
						scope[join.tableid] = join.recs[i];
//						console.log('preIndex:scope',scope);

						var group = join.ix [ join.onrightfn(scope) ]; 
						if(!group) {
							group = join.ix [ join.onrightfn(scope) ] = []; 
						}
						group.push(join.recs[i]);
					}
//				}
			}
		}
	}
}



// Execute SQL statement
Database.prototype.exec = function (sql, params, cb) {
	if(this.sqlcache[sql]) {
		var query =  this.sqlcache[sql];	
		res = query.exec(this);

	} else {
		var parsql = SQLParser.parse(sql);
	//	console.log(parsql);
		var res;
	//	if(parsql.constructor.name == 'Select') {
		if(parsql instanceof SQLParser.nodes.Select) {
			var query = parsql.compileQuery(sql, this);
	//		console.log(1);
	//		console.log(query);
			this.sqlcache[sql] = query;
			res = query.exec(this);
		} else {
			res = parsql.exec(this);
		}
	}
//	var res = res2.exec(db);
	if(cb) cb(res);
//	console.log(res);
	return res;
};

Database.prototype.compileQuery = function (sql) {
	if(db.sqlcache[sql]) return db.sqlcache[sql];

	var parsql = SQLParser.parse(sql);
	var query = parsql.compileQuery(sql, this);
	db.sqlcache[sql] = query;
	return query;
}

// 
// Modifiing SQLParser - add compile() and toJavaScript(context) functions
// This is a not good practice. Probably I will change something later
//



// Execute SELECT statement
nodes.Select.prototype.compileQuery = function (sql, db) {

	var query = new Query();
	var tableid = this.source.name.value;
	query.selectfn = this.compile(tableid);
	query.source = new Query();
	query.source.tableid = tableid;
	query.source.recs = db.tables[tableid].recs; // TODO Subqueies
//	console.log(this.joins);
	if(this.joins.length > 0) {
		query.joins = this.joins.map(function(jn){ 
			var join = jn.compile(tableid); 
			join.recs = db.tables[join.tableid].recs;
//			console.log(join);
			return join;
		});
	} else {
		query.joins = [];
	};
//	console.log(query.joins);
	if(this.where) query.wherefn = this.where.compile(tableid);
	if(this.group) query.groupfn = this.group.compile(tableid, this.fields);
//	console.log(query.groupfn);
	if(this.having) query.havingfn = this.having.compile();
	if(this.order) query.orderfn = this.order.compile();
	if(this.limit) query.limitnum = this.limit.compile();
//	console.log(query.selectfn);


	return query;

//	return query.exec(db);
};

nodes.Insert.prototype.exec = function (db) {
	var self = this;
	var table = db.tables[self.target.value];
	var rec = {};
	if(self.fields) {
		self.fields.forEach(function(f, idx){
			// TODO: type checking and conversions
			rec[f.name.value] = eval(self.insertExpression[idx].toJavaScript('',''));
//			console.log(rec[f.name.value]);
//			if(rec[f.name.value] == "NULL") rec[f.name.value] = undefined;

			if(table.xflds[f.name.value].dbtypeid == "INT") rec[f.name.value] = +rec[f.name.value]|0;
			else if(table.xflds[f.name.value].dbtypeid == "FLOAT") rec[f.name.value] = +rec[f.name.value];
		});
	} else {
//		console.log('table', table.flds);
		table.flds.forEach(function(fld, idx){
//			console.log(fld);
			// TODO: type checking and conversions
			rec[fld.fldid] = eval(self.insertExpression[idx].toJavaScript('',''));
//			console.log(rec[fld.fldid]);
//			if(rec[fld.fldid] == "NULL") rec[fld.fldid] = undefined;

			if(table.xflds[fld.fldid].dbtypeid == "INT") rec[fld.fldid] = +rec[fld.fldid]|0;
			else if(table.xflds[fld.fldid].dbtypeid == "FLOAT" || table.xflds[fld.fldid].dbtypeid == "MONEY" ) 
				rec[fld.fldid] = +rec[fld.fldid];
		});
	}
	table.recs.push(rec);
	return 1;
};

nodes.Update.prototype.exec = function (db) {
	var table =  db.tables[this.target.value];
	
	if(this.updateCondition) {
		var wherefn = new Function('rec','return '+this.updateCondition.toJavaScript('rec',''));
	};

	// Construct update function
	var s = '';
	this.assignList.forEach(function(al){
		s += 'rec.'+al.left.value+'='+al.right.toJavaScript('rec','')+';'; 
	});
	var assignfn = new Function('rec',s);

	var numrows = 0;
	for(var i=0, ilen=table.recs.length; i<ilen; i++) {
		if(!wherefn || wherefn(table.recs[i]) ) {
			assignfn(table.recs[i]);
			numrows++;
		}
	}

	return numrows;
};

nodes.Delete.prototype.exec = function (db) {
	var table = db.tables[this.target.value];
	var orignum = table.recs.length;

	if(this.deleteCondition) {
		var wherenotfn = new Function('rec','return !('+this.deleteCondition.toJavaScript('rec','')+')');
//		console.log(this.deleteCondition.toJavaScript('rec',''));
		table.recs = table.recs.filter(wherenotfn);
	} else {
		table.recs.length = 0;		
	}

	return orignum - table.recs.length;
};

nodes.Where.prototype.toJavaScript = function (context, tableid) {
	return this.conditions.toJavaScript(context, tableid);
};

// CREATE TABLE
nodes.CreateTable.prototype.exec = function (db) {

	if(this.ifNotExists && !db.tables[this.target.value] || !this.ifNotExists) {

		if(db.tables[this.target.value]) throw new Error('Can not create table \''+this.target.value+'\', because it already exists in the database.');

		var table = db.tables[this.target.value] = {};
		var flds = table.flds = [];
		this.fieldDef.forEach(function(fd) {
			flds.push({
				fldid: fd.field.value.toLowerCase(),
				dbtypeid: fd.type.value.toUpperCase() // TODO: Add types table
			});
		});

		// Index fields definitions
		table.xflds = {};
		table.flds.forEach(function(fld){
			table.xflds[fld.fldid] = fld;
		});

		table.recs = [];
	};
	return 1;
};

// DROP TABLE
nodes.DropTable.prototype.exec = function (db) {
	if(this.ifExists && db.tables[this.target.value] || !this.ifExists) {
		if(!db.tables[this.target.value]) throw new Error('Can not drop table \''+this.target.value+'\', because it does not exist in the database.');
		delete db.tables[this.target.value];
	}
	return 1;
};

// ALTER TABLE table1 RENAME TO table2
nodes.AlterTable.prototype.exec = function (db) {
	if(this.newName.value != this.target.value) {
		db.tables[this.newName.value] = db.tables[this.target.value];
		delete db.tables[this.target.value];
	}
	return 1;
};

// 
// SQL FUNCTIONS COMPILERS
// Based on SQLite functions

var fns = {};
fns.ABS = function(a) {return 'Math.abs('+a+')'};
fns.IIF = function(a,b,c) {
	if(arguments.length == 3) {
		return  '(('+a+')?('+b+'):('+c+'))';
	};
	// TODO: check number of arguments
};
fns.SUM = function(a) {return "(+"+a+")"};
fns.COUNT = function(a) {return "1"};
fns.LOWER = function(s) {return '('+s+').toLowerCase()';}
fns.UPPER = function(s) {return '('+s+').toUpperCase()';}
fns.IFNULL = function(a,b) {return '('+a+'||'+b+')'};
fns.INSTR = function(s,p) {return '(('+s+').indexOf('+p+')+1)'};
fns.LENGTH = function(s) {return '('+s+').length'};
// fns.LIKE = function(x,y,z) {
// 	return x.match(new RegExp(y.replace(/\%/g,'*')))[0].length;
// };
// LTRIM
fns.MAX = function(){return 'Math.max('+arguments.join(',')+')'};
fns.MIN = function(){return 'Math.min('+arguments.join(',')+')'};
//fns.MIN = function(){return Math.min.apply(null, arguments)};
fns.NULLIF = function(a,b){return '('+a+'=='+b+'?null:'+a+')'};
//REPLACE
// RTRIM
// SUBSTR
// TRIM

nodes.Star.prototype.toJavaScript = function (context, tableid) {
	return '*';
};

// Functions compiler
nodes.FunctionValue.prototype.toJavaScript = function (context, tableid) {
	var s = '';
	s += fns[this.name.toUpperCase()].apply(null,this.arguments.map(function(arg){
		if(arg) return arg.toJavaScript(context, tableid);
		else return '';
	}));
	return s;
};


// Operations compilers

nodes.Op.prototype.toJavaScript = function (context, tableid) {
	var s = '';
	if('+`-`*`/`=`<`>`>=`<=`<>`!=`AND`OR'.indexOf(this.operation.toUpperCase()) > -1) {
		s += '(';
		s += this.left.toJavaScript(context, tableid);
		if(this.operation == '=') s += '==';
		else if(this.operation == '<>') s += '!=';
		else if(this.operation.toUpperCase() == 'AND') s += '&&';
		else if(this.operation.toUpperCase() == 'OR') s += '||';
		else s += this.operation;
		s += this.right.toJavaScript(context, tableid);
		s += ')';
	};
	return s;
};

// Number
nodes.BooleanValue.prototype.toJavaScript = function (context, tableid) {
//	console.log(this.value);
	return ""+this.value;
};


// Number
nodes.NumberValue.prototype.toJavaScript = function (context, tableid) {
	return '('+this.sign + this.value+')';
};

// String
nodes.StringValue.prototype.toJavaScript = function (context, tableid) {
	return '"'+this.value+'"';
};


// TODO:
nodes.LiteralValue.prototype.toJavaScript = function (context, tableid) {
	if(this.values.length == 1) {
		// Надо будет подправить
		return context+tableid+'.' + this.value;
	} else if(this.values.length == 2) {
		return context+this.values[0]+'.' + this.values[1];
	}
};


// SELECT
nodes.Select.prototype.compile = function(tableid) {
	var s = 'var res = {};';
	this.fields.forEach(function(f){
//		if(f.constructor.name == "Field") {

		if(f instanceof SQLParser.nodes.Field) {

			if(f.field instanceof SQLParser.nodes.LiteralValue) {
		//	if(f.field.constructor.name == "LiteralValue") {
				if(f.field.values.length == 1) {
					s += 'res["'+f.name.values[0] + '"]='+f.field.toJavaScript('scope.',tableid)+';';
				} else if(f.field.values.length == 2) {
					s += 'res["'+f.name.values[1] + '"]='+f.field.toJavaScript('scope.',tableid)+';';
				}
			} else 	if(f.field instanceof SQLParser.nodes.Op 
				|| f.field instanceof SQLParser.nodes.FunctionValue ) {
				s += 'res.'+f.name.values[0] +'='+f.field.toJavaScript('scope.',tableid)+';';
			}
		} else if(f instanceof SQLParser.nodes.Star) {
			if(f.literal) {
				// If table name provided
				s += 'var w = scope["'+f.literal.values[0]+'"];for(var key in w){res[key]=w[key]};';
			} else {
				// All fileds of all tables
				s += 'Object.keys(scope).forEach(function(key1){'+
							'Object.keys(scope[key1]).forEach(function(key2){'+
								'res[key2] = scope[key1][key2];'+
							'});'+			
						'});';
			}
		};
	});
	s += 'return res;';
//	console.log(s);
	return new Function('scope',s);
};


nodes.Where.prototype.compile = function (tableid) {
	return new Function('scope','return'+this.conditions.toJavaScript('scope.', tableid));
};

// HAVING
nodes.Having.prototype.compile = function (tableid) {
	return new Function('scope','return'+this.conditions.toJavaScript('rec.', ''));
};


// GROUP BY
nodes.Group.prototype.compile = function (tableid, selectFields) {
	var self = this;
	var s = '';

	s += 'var group = this.groups[';
	var gf = [];
	var gff = [];
	this.fields.forEach(function(f){
		if(f.values.length == 1) {
			gf.push("rec."+f.values[0]);
			gff.push(f.values[0]);
		} else if(f.values.length == 2) {
			gf.push('rec.'+f.values[1]);
			gff.push(f.values[1]);
		}
	});
	s += gf.join('+"`"+');
	s += '];if(!group) {group = this.groups[';
	s += gf.join('+"`"+');
	s += '] = {';



	var sa = gff.map(function(fn){
		return (fn+':rec.'+fn);
	});

	selectFields.forEach(function(f){
//		console.log(f);
//			if(f.constructor.name == 'LiteralValue') return '';
		if (f.field instanceof SQLParser.nodes.FunctionValue 
			&& (f.field.name.toUpperCase() == 'SUM' || f.field.name.toUpperCase() == 'COUNT')) {
//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
			sa.push(f.name.value+':0'); //f.field.arguments[0].toJavaScript(); 	
		};
	});

	s += sa.join(',');

	// var ss = [];
	// gff.forEach(function(fn){
	// 	ss.push(fn+':rec.'+fn);
	// });
	// s += ss.join(',');
	s += '};};';

	s += selectFields.map(function(f){
//			console.log(f);
//			if(f.constructor.name == 'LiteralValue') return '';
			if (f.field instanceof SQLParser.nodes.FunctionValue 
				&& (f.field.name.toUpperCase() == 'SUM' || f.field.name.toUpperCase() == 'COUNT')) {
//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
//				return 'group.'+f.name.value+'+='+f.field.arguments[0].toJavaScript('rec','')+';'; //f.field.arguments[0].toJavaScript(); 	
				return 'group.'+f.name.value+'+=rec.'+f.name.value+';'; //f.field.arguments[0].toJavaScript(); 	
			};
			return '';
		}).join('');
//	s += '}';
	//s += '	group.amt += rec.emplid;';
	//s += 'group.count++;';

//	console.log(s);
	return new Function('rec',s);
};

// ORDER BY
nodes.Order.prototype.compile = function (tableid) {
	var s = '';
	var sk = '';
	this.orderings.forEach(function(ord){
		s += 'if(a.'+ord.value.value+(ord.direction == 'ASC'?'>':'<')+'b.'+ord.value.value+') return 1;';
		s += 'if(a.'+ord.value.value+'==b.'+ord.value.value+'){';
		sk += '}';
	});
	s += 'return 0;';
	s += sk+'return -1';

	return new Function('a,b',s);
};

nodes.Limit.prototype.compile = function (tableid) {
	return +q.limit.numRows.toString();
};

// JOINS
nodes.Join.prototype.compile = function (tableid) {
	var join = {};

//	console.log(this);

	join.tableid = this.right.name.value;

	// Optimization if there is a left and right parts 
	// TODO - make a serious optimization of AND expression
	if(this.conditions instanceof SQLParser.nodes.Op && this.conditions.operation == '=') {
		join.optimization = 'ix';
		join.onleftfn = new Function('scope', 'return '+this.conditions.left.toJavaScript('scope.',tableid));
		join.onrightfn = new Function('scope', 'return '+this.conditions.right.toJavaScript('scope.',tableid));
	} else {
		join.optimization = 'no';
		join.onleftfn = new Function('return true');
		join.onrightfn = new Function('scope','return '+this.conditions.toJavaScript('scope.',tableid));
	};

	join.mode = this.mode;
	join.side = this.side;

//	console.log(join.onleftfn, join.onrightfn);
//	join.joinfn
	return join;
};

nodes.Union.prototype.compile = function (tableid) {
	var union = {};
//	join.joinfn
	return union;
};


// export module
	return {Database:Database, Table:Table, Query:Query};
}));