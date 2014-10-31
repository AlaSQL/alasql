
var fs = require("fs");
var Parser = require("jison").Parser;
//var options = {type: "slr", moduleType: "commonjs", moduleName: "alasqlparser"};
var grammar = fs.readFileSync('./alasqlparser.jison').toString();

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
		console.log(col);
		if(col.alias) s += ' AS '+col.alias;
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


yy.Insert = function (params) { return extend(this, params); }
yy.Insert.prototype.toString = function() {
	return 'INSERT INTO '+this.into.toString()+' VALUES ('+this.values.toString()+')';;
}

alasqlparser.yy = yy;

var sqls = [
	'SELECT 1+1 FROM B',
	'SELECT 1+2 AS three FROM one',
	'SELECT SUM(*) AS qwe FROM one',
	'SELECT COUNT(one.*), SUM((a+b)) FROM two'
];

sqls.forEach(function(sql){
	console.log(alasqlparser.parse(sql).toString());
});

