//
// alasql.js
// Alasql - JavaScript to SQL compiler and database
// Date: 27.10.2014
// Version: 0.0.6
// (ñ) 2014, Andrey Gershun
//

//  UMD header

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([',/alasqlparser'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('./alasqlparser'));
    } else {
        root.alasqlparser = factory(root.parser);
    }
}(this, function (alasqlparser) {

// var alasql = new function(){
// 	this.databases = {};
// 	return this;
// };

// var fs = require("fs");
// var Parser = require("jison").Parser;
// //var options = {type: "slr", moduleType: "commonjs", moduleName: "alasqlparser"};
// var grammar = fs.readFileSync('./alasqlparser.jison').toString();

// //grammar += fs.readFileSync('./grammartwo.jison').toString();

// //console.log(grammar);
// var alasqlparser = new Parser(grammar);
//var alasqlparser = parser.generate();
//var alasqlparser = require('./alasqlparser');

var yy = alasqlparser.yy = {};

// Utility
// TODO Replace with standard function
yy.extend = function (a,b){
	if(typeof a == 'undefined') a = {};
	for(key in b) {
		if(b.hasOwnProperty(key)) {
			a[key] = b[key]
		}
	}
	return a;
};;

// Statements container
yy.Statements = function(params) { return yy.extend(this, params); };

yy.Statements.prototype.toString = function () {
	return this.statements.map(function(st){return st.toString()}).join(';');
};

yy.Statements.prototype.compile = function(db) {
	var statements = this.statements.map(function(st){return st.compile(db)});
	if(statements.length == 1) {
		return statements[0];	
	} else {
		return function(){
			return statements.map(function(st){ return st(); });
		}
	}
};

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
	if(query.joins || this.from.length > 1) this.compileJoins(query);
	query.selectfn = this.compileSelect(query);
	query.wherefn = this.compileWhere(query);
	if(this.order) query.orderfn = this.compileOrder(query);
	if(this.group) query.groupfn = this.compileGroup(query);

//	query.sources = this.compileSources(query);
//	select.selectfn = function(scope){return {a:1}}; // TODO Remove stub
	// Compile where
//	console.log(this);
//	if(this.where) select.wherefn = this.where.compile('scope.','STUB');
//console.log(query);
	window.q = query;
	return function() {return queryfn(query,arguments); }
};


function queryfn(query, args) {
//		query.data = query.database.tables[query.defaultTableid].data.filter(query.wherefn);
//		query.data = query.database.tables[query.defaultTableid].data;
//	var query = this;
	query.args = args;
	query.data = [];
	query.xgroups = {};
	query.groups = [];
	var scope = query.scope = {};

	var tableid =query.sources[0].tableid; 
	var srcdata = query.sources[0].data;

//			console.log(query);

/// REWRITE JOINS!!!

	for(var i=0, ilen=srcdata.length; i<ilen; i++) {
		scope[tableid] = srcdata[i];
//
		if(query.wherefn(scope)) {
			var res = query.selectfn(scope);
			if(query.groupfn) {
				query.groupfn(res)
			} else {
				query.data.push(res);
			}	
		}
	};

	if(query.groupfn) {
		if(query.havingfn) query.groups = query.groups.filter(query.havingfn)
		query.data = query.groups;
	}

	// delete query.groups;
	// delete query.xgroups;

//		
	if(query.orderfn) query.data = data.sort(query.orderfn);
//		query.data = data;
	return query.data;
};


yy.Select.prototype.compileJoins = function(query) {
	console.log(query.sources);
}

yy.Select.prototype.compileGroup = function(query) {


	var self = this;
	var s = 'var g=this.xgroups[';

//	var gcols = this.group.map(function(col){return col.columnid}); // Group fields with r

	// Array with group columns from record
//	var rg = gcols.map(function(columnid){return 'r.'+columnid});
	var rg = this.group.map(function(col){return col.toJavaScript('r','')});


	s += rg.join('+"`"+');
	s += '];if(!g) {this.groups.push(g=this.xgroups[';
	s += rg.join('+"`"+');
	s += '] = {';

	// columnid:r.columnid
	var srg = [];//rg.map(function(fn){ return (fn+':'+fn); });

// Initializw aggregators


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

/*****************/

	s += srg.join(',');

	// var ss = [];
	// gff.forEach(function(fn){
	// 	ss.push(fn+':rec.'+fn);
	// });
	// s += ss.join(',');
	s += '});};';

//	console.log(s, this.columns);

console.log(query.selectfn);
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
//	s += '}';
	//s += '	group.amt += rec.emplid;';
	//s += 'group.count++;';

//	console.log(s);
	return new Function('r',s);

}

yy.Select.prototype.compileFrom = function(query) {
	var self = this;
	query.sources = [];
//	var tableid = this.from[0].tableid;
//	var as = '';
//	if(self.from[0].as) as = this.from[0].as;
	query.defaultTableid = this.from[0].tableid;
	query.aliases = {};
	self.from.forEach(function(tq){
		var alias = tq.as || tq.tableid;
		query.aliases[alias] = {tableid: tq.tableid, databaseid: tq.databaseid || query.database.databaseid};

		var source = {
			alias: alias,
			databaseid: tq.databaseid || query.database.databaseid,
			tableid: tq.tableid,
			jointype: 'INNER'
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
				var tcol = xcolumns[col.columnid];
				var coldef = {
					columnid:col.as || col.columnid, 
					dbtypeid:tcol.dbtypeid, 
					dbsize:tcol.dbsize, 
					dbpecision:tcol.dbprecision
				};
				query.columns.push(coldef);
				query.xcolumns[coldef.columnid]=coldef;

			}
		} else if(col instanceof yy.AggrValue) {
			if(!col.as) col.as = col.toString();
			if (col.aggregatorid == 'SUM' || col.aggregatorid == 'MAX' ||  col.aggregatorid == 'MIN' ) {
				ss.push("'"+col.as+'\':'+col.expression.toJavaScript("p.",query.defaultTableid))	
			} else if (col.aggregatorid == 'COUNT') {
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
		s = this.where.toJavaScript('p.',query.defaultTableid);
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




yy.Expression = function(params) { return yy.extend(this, params); };
yy.Expression.prototype.toString = function() {
	return this.expression.toString();
};
yy.Expression.prototype.toJavaScript = function(context, tableid) {
	return this.expression.toJavaScript(context, tableid);
};
yy.Expression.prototype.compile = function(context, tableid){
	return new Function('scope','return '+this.toJavaScript(context, tableid));
};


yy.Literal = function (params) { return yy.extend(this, params); }
yy.Literal.prototype.toString = function() {
	var s = this.value;
	if(this.value1) s = this.value1+'.'+s; 
//	else s = tableid+'.'+s;
	return s;
}


yy.Table = function (params) { return yy.extend(this, params); }
yy.Table.prototype.toString = function() {
	var s = this.tableid;
	if(this.databaseid) s = this.databaseid+'.'+s;
	return s;
}


yy.Op = function (params) { return yy.extend(this, params); }
yy.Op.prototype.toString = function() {
	return this.left.toString()+this.op+this.right.toString();
}
yy.Op.prototype.toJavaScript = function(context,tableid) {
//	console.log(this);
	var op = this.op;
	if(this.op == '=') op = '===';
	else if(this.op == '<>') op = '!=';
	return '('+this.left.toJavaScript(context,tableid)+op+this.right.toJavaScript(context,tableid)+')';
}



yy.NumValue = function (params) { return yy.extend(this, params); }
yy.NumValue.prototype.toString = function() {
	return this.value.toString();
}
yy.NumValue.prototype.toJavaScript = function() {
	return this.value.toString();
}


yy.StringValue = function (params) { return yy.extend(this, params); }
yy.StringValue.prototype.toString = function() {
	return this.value.toString();
}


yy.LogicValue = function (params) { return yy.extend(this, params); }
yy.LogicValue.prototype.toString = function() {
	return this.value?'TRUE':'FALSE';
}


yy.UniOp = function (params) { return yy.extend(this, params); }
yy.UniOp.prototype.toString = function() {
	if(this.op == '-') return this.op+this.right.toString();
	if(this.op == 'NOT') return this.op+'('+this.right.toString()+')';
	else if(this.op == null) return '('+this.right.toString()+')';
}


// yy.Star = function (params) { return yy.extend(this, params); }
// yy.Star.prototype.toString = function() {
// 	var s = this.fieldid;
// 	if(this.tableid) {
// 		s = this.tableid+'.'+s;
// 		if(this.databaseid) {
// 			s = this.databaseid+'.'+s;
// 		}
// 	}
// 	if(this.alias) s += ' AS '+this.alias;
// 	return s;
// }

yy.Column = function(params) { return yy.extend(this, params); }
yy.Column.prototype.toString = function() {
	var s = this.columnid;
	if(this.tableid) {
		s = this.tableid+'.'+s;
		if(this.databaseid) {
			s = this.databaseid+'.'+s;
		}
	}
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.Column.prototype.toJavaScript = function(context, tableid) {
//	var s = this.value;
// 	var s = this.columnid;
// 	if(this.tableid) {
// 		s = this.tableid+'.'+s;
// //		if(this.databaseid) {
// //			s = this.databaseid+'.'+s;
// //		}
// 	} else {
// 		s = tableid+'.'+s;
// 	}
	return context+(this.tableid || tableid) + '.'+this.columnid;
}


yy.FuncValue = function(params){ return yy.extend(this, params); }
yy.FuncValue.prototype.toString = function() {
	var s = this.funcid+'(';
	if(this.expression) s += this.expression.toString();
	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.FuncValue.prototype.toJavaScript = function(context, tableid) {
	var s = 'alasql.functions.'+this.funcid+'(';
	if(this.expression) s += this.expression.toJavaScript(context, tableid);
	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.AggrValue = function(params){ return yy.extend(this, params); }
yy.AggrValue.prototype.toString = function() {
	var s = this.aggregatorid+'(';
	if(this.expression) s += this.expression.toString();
	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.AggrValue.prototype.toJavaScript = function(context, tableid) {
	var s = 'alasql.functions.'+this.funcid+'(';
	if(this.expression) s += this.expression.toJavaScript(context, tableid);
	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}


yy.OrderExpression = function(params){ return yy.extend(this, params); }
yy.OrderExpression.prototype.toString = function() {
	var s = this.expression.toString();
	if(this.order) s += ' '+this.order.toString();
	return s;
}

yy.GroupExpression = function(params){ return yy.extend(this, params); }
yy.GroupExpression.prototype.toString = function() {
	return this.type+'('+this.group.toString()+')';
}


yy.ColumnDef = function (params) { return yy.extend(this, params); }
yy.ColumnDef.prototype.toString = function() {
	var s =  this.columnid;
	if(this.dbtypeid) s += ' '+this.dbtypeid;
	if(this.dbsize) {
		s += '('+this.dbsize;
		if(this.dbprecision) s += ','+this.dbprecision;
		s += ')';
	};
	if(this.primarykey) s += ' PRIMARY KEY';
	if(this.notnull) s += ' NOT NULL';
	return s;
}

yy.CreateTable = function (params) { return yy.extend(this, params); }
yy.CreateTable.prototype.toString = function() {
	var s = 'CREATE';
	if(this.temporary) s+=' TEMPORARY';
	s += ' TABLE';
	if(this.ifnotexists) s += ' IF NOT EXISTS';
	s += ' '+this.table.toString();
	if(this.as) s += ' AS '+this.as;
	else { 
		var ss = this.columns.map(function(col){
			return col.toString();
		});
		s += ' ('+ss.join(',')+')';
	}
	return s;
}


yy.Insert = function (params) { return yy.extend(this, params); }
yy.Insert.prototype.toString = function() {
	var s = 'INSERT INTO '+this.into.toString();
	if(this.columns) s += '('+this.columns.toString()+')';
	s += ' VALUES ('+this.values.toString()+')';;
	return s;
}

yy.Delete = function (params) { return yy.extend(this, params); }
yy.Delete.prototype.toString = function() {
	var s = 'DELETE FROM '+this.table.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}

yy.Update = function (params) { return yy.extend(this, params); }
yy.Update.prototype.toString = function() {
	var s = 'UPDATE '+this.table.toString();
	if(this.columns) s += ' SET '+this.columns.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}

yy.SetColumn = function (params) { return yy.extend(this, params); }
yy.SetColumn.prototype.toString = function() {
	return this.columnid.toString() + '='+this.expression.toString();
}


yy.DropTable = function (params) { return yy.extend(this, params); }
yy.DropTable.prototype.toString = function() {
	var s = 'DROP TABLE';
	if(this.ifexists) s += ' IF EXISTS';
	s += ' '+this.table.toString();
	return s;
}


/*
var sqls = [
	'SELECT * FROM students WHERE studentid>2 '+
	'GROUP BY GROUPING SETS (studentid, studentname, CUBE(age, city)) '+
	'HAVING studentid > 10 '+
	'ORDER BY studentid',
	'CREATE TABLE IF NOT EXISTS students (studentid INT PRIMARY KEY, studentname STRING)',
	"INSERT INTO students (studentid, studentname) VALUES (100, 'Paul Johnson')",
	'SELECT COUNT(one.*), SUM((a+b)) FROM two',
	'SELECT 1+a as b FROM two, three',
	'DROP TABLE IF EXISTS students',
	'DELETE FROM students WHERE studentid = 500',
	"UPDATE students SET studentname = 'Susan' WHERE studentid = 500",
];

/*
var tm = Date.now();
for(var i=0; i<1000; i++) {
//	sqls.forEach(function(sql){
//		alasqlparser.parse(sql);//.toString();
//	});
	alasqlparser.parse(sqls.join(';'));
}
console.log(Date.now()-tm);
//*/
/*
//	console.log(alasqlparser.parse(sqls.join(';')).toString());
var t = alasqlparser.parse(sqls[0]);
console.log(t.group);
console.log(t.toString());

*/
	return alasqlparser;
}));