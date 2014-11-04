
// Functions compiler
nodes.FunctionValue.prototype.toJavaScript = function (context, tableid) {
	var s = '';
	s += fns[this.name.toUpperCase()].apply(null,this.arguments.map(function(arg){
		if(arg) return arg.toJavaScript(context, tableid);
		else return '';
	}));
	return s;
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
