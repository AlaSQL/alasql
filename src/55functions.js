/*
//
// Functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.FuncValue = function(params){ return yy.extend(this, params); }
yy.FuncValue.prototype.toString = function() {
	var s = this.funcid+'(';
	s += this.args.map(function(arg){
		return arg.toString();
	}).join(',');
	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.FuncValue.prototype.toJavaScript = function(context, tableid) {
	var s = '';
	// IF this is standard compile functions
	if(alasql.stdlib[this.funcid.toUpperCase()]) {
		s += alasql.stdlib[this.funcid.toUpperCase()].apply(this, this.args);
	} else {
	// This is user-defined run-time function
	// TODO arguments!!!
		var s = 'alasql.userlib.'+this.funcid.toUpperCase()+'(';
//		if(this.args) s += this.args.toJavaScript(context, tableid);
		s += this.args.map(function(arg){
			return arg.toJavaScript(context, tableid);
		}).join(',');
		s += ')';
	}
//console.log('userfn:',s,this);

//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

// // Functions compiler
// nodes.FunctionValue.prototype.toJavaScript = function (context, tableid) {
// 	var s = '';
// 	s += fns[this.name.toUpperCase()].apply(null,this.arguments.map(function(arg){
// 		if(arg) return arg.toJavaScript(context, tableid);
// 		else return '';
// 	}));
// 	return s;
// };

// 
// SQL FUNCTIONS COMPILERS
// Based on SQLite functions

// IMPORTANT: These are compiled functions

alasql.userlib = {};
var stdlib = alasql.stdlib = {}

stdlib.ABS = function(a) {return 'Math.abs('+a+')'};
stdlib.IIF = function(a,b,c) {
	if(arguments.length == 3) {
		return  '(('+a+')?('+b+'):('+c+'))';
	};
	// TODO: check number of arguments
};
stdlib.LOWER = function(s) {return '('+s+').toLowerCase()';}
stdlib.UPPER = function(s) {return '('+s+').toUpperCase()';}
stdlib.IFNULL = function(a,b) {return '('+a+'||'+b+')'};
stdlib.INSTR = function(s,p) {return '(('+s+').indexOf('+p+')+1)'};
stdlib.LENGTH = function(s) {return '('+s+').length'};
// fns.LIKE = function(x,y,z) {
// 	return x.match(new RegExp(y.replace(/\%/g,'*')))[0].length;
// };
// LTRIM
stdlib.MAX = function(){return 'Math.max('+arguments.join(',')+')'};
stdlib.MIN = function(){return 'Math.min('+arguments.join(',')+')'};
//fns.MIN = function(){return Math.min.apply(null, arguments)};
stdlib.NULLIF = function(a,b){return '('+a+'=='+b+'?null:'+a+')'};
//REPLACE
// RTRIM
// SUBSTR
// TRIM
