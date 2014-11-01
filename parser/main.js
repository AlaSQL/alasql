
var fs = require("fs");
var Parser = require("jison").Parser;
//var options = {type: "slr", moduleType: "commonjs", moduleName: "alasqlparser"};
var grammar = fs.readFileSync('./alasqlparser.jison').toString();

grammar += fs.readFileSync('./grammartwo.jison').toString();

//console.log(grammar);
var alasqlparser = new Parser(grammar);
//var alasqlparser = parser.generate();
//var alasqlparser = require('./alasqlparser');

function extend(a,b){
	if(typeof a == 'undefined') a = {};
	for(key in b) {
		if(b.hasOwnProperty(key)) {
			a[key] = b[key]
		}
	}
	return a;
};

var yy = {};
yy.extend = extend;

yy.Statements = function(params) { return extend(this, params); }
yy.Statements.prototype.toString = function () {
	return this.statements.map(function(st){return st.toString()}).join(';');
}
yy.Select = function (params) { return extend(this, params); }
yy.Select.prototype.toString = function() {
	var s = 'SELECT '+this.columns.map(function(col){
		var s = col.toString();
	//	console.log(col);
		if(col.as) s += ' AS '+col.as;
		return s;
	}).join(',');
	s += ' FROM '+this.from.map(function(f){return f.toString()}).join(',');
	return s;
}

yy.Literal = function (params) { return extend(this, params); }
yy.Literal.prototype.toString = function() {
	var s = this.value;
	if(this.value1) s = this.value1+'.'+s;
	return s;
}

yy.Table = function (params) { return extend(this, params); }
yy.Table.prototype.toString = function() {
	var s = this.tableid;
	if(this.databaseid) s = this.databaseid+'.'+s;
	return s;
}


yy.Op = function (params) { return extend(this, params); }
yy.Op.prototype.toString = function() {
	return this.left.toString()+this.op+this.right.toString();
}

yy.NumValue = function (params) { return extend(this, params); }
yy.NumValue.prototype.toString = function() {
	return this.value.toString();
}

yy.StringValue = function (params) { return extend(this, params); }
yy.StringValue.prototype.toString = function() {
	return this.value.toString();
}


yy.LogicValue = function (params) { return extend(this, params); }
yy.LogicValue.prototype.toString = function() {
	return this.value?'TRUE':'FALSE';
}


yy.UniOp = function (params) { return extend(this, params); }
yy.UniOp.prototype.toString = function() {
	if(this.op == '-') return this.op+this.right.toString();
	if(this.op == 'NOT') return this.op+'('+this.right.toString()+')';
	else if(this.op == null) return '('+this.right.toString()+')';
}


// yy.Star = function (params) { return extend(this, params); }
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

yy.Column = function(params) { return extend(this, params); }
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

yy.FuncValue = function(params){ return extend(this, params); }
yy.FuncValue.prototype.toString = function() {
	var s = this.funcid+'(';
	if(this.expression) s += this.expression.toString();
	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.ColumnDef = function (params) { return extend(this, params); }
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

yy.CreateTable = function (params) { return extend(this, params); }
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


yy.Insert = function (params) { return extend(this, params); }
yy.Insert.prototype.toString = function() {
	var s = 'INSERT INTO '+this.into.toString();
	if(this.columns) s += '('+this.columns.toString()+')';
	s += ' VALUES ('+this.values.toString()+')';;
	return s;
}

yy.Delete = function (params) { return extend(this, params); }
yy.Delete.prototype.toString = function() {
	var s = 'DELETE FROM '+this.table.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}

yy.Update = function (params) { return extend(this, params); }
yy.Update.prototype.toString = function() {
	var s = 'UPDATE '+this.table.toString();
	if(this.columns) s += ' SET '+this.columns.toString();
	if(this.where) s += ' WHERE '+this.where.toString();
	return s;
}

yy.SetColumn = function (params) { return extend(this, params); }
yy.SetColumn.prototype.toString = function() {
	return this.columnid.toString() + '='+this.expression.toString();
}


yy.DropTable = function (params) { return extend(this, params); }
yy.DropTable.prototype.toString = function() {
	var s = 'DROP TABLE';
	if(this.ifexists) s += ' IF EXISTS';
	s += ' '+this.table.toString();
	return s;
}

alasqlparser.yy = yy;

var sqls = [
	'SELECT * FROM students ORDER BY studentid',
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
*/
//	console.log(alasqlparser.parse(sqls.join(';')).toString());
var t = alasqlparser.parse(sqls[0]);
console.log(t);
