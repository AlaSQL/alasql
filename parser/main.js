
var fs = require("fs");
var Parser = require("jison").Parser;
//var options = {type: "slr", moduleType: "commonjs", moduleName: "alasqlparser"};
var grammar = fs.readFileSync('./alasqlparser.jison').toString();

//console.log(grammar);
var alasqlparser = new Parser(grammar);
//var alasqlparser = parser.generate();
//var alasqlparser = require('./alasqlparser');

function extend(a,b){
	for(key in b) {
		if(b.hasOwnProperty(key)) {
			a[key] = b[key]
		}
	}
	return a;
};

function Statements(params) { return extend(this, params); }
Statements.prototype.toString = function () {
	return this.statements.map(function(st){return st.toString()}).join(';');
}
function Select(params) { return extend(this, params); }
Select.prototype.toString = function() {
	return 'SELECT '+this.fields.map(function(f){return f.toString()}).join(',')
	+' FROM '+this.from.map(function(f){return f.toString()}).join(',');
}

function Literal(params) { return extend(this, params); }
Literal.prototype.toString = function() {
	var s = this.value0;
	if(this.value1) s = this.value1+'.'+s;
	return s;
}

function Star(params) { return extend(this, params); }
Star.prototype.toString = function() {
	return '*';
}

function Insert(params) { return extend(this, params); }
Insert.prototype.toString = function() {
	return 'INSERT INTO '+this.into.toString()+' VALUES ('+this.values.toString()+')';;
}

yy = {Statements: Statements, Select:Select, Literal:Literal, Star:Star, Insert:Insert};
alasqlparser.yy = yy;

var sql = 'SELECT * FROM one; SELECT * FROM two;INSERT INTO one VALUES (100)';

var ast = alasqlparser.parse(sql);
//console.log(ast, ast instanceof Statements);
console.log(ast.toString());

