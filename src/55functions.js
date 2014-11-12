/*
//
// Functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.FuncValue = function(params){ return yy.extend(this, params); }
yy.FuncValue.prototype.toString = function() {
	var s = '';
    if(alasql.stdlib[funcid]) s += this.funcid.substr(1).toUpperCase();
    else s += this.funcid.substr(1).toLowerCase();
    
    s += '(';
	if(this.args && this.args.length > 0) {
		s += this.args.map(function(arg){
			return arg.toString();
		}).join(',');
	};
	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

yy.FuncValue.prototype.toJavaScript = function(context, tableid) {
	var s = '';
    var funcid = this.funcid;
	// IF this is standard compile functions
	if(alasql.stdlib[funcid]) {
		if(this.args && this.args.length > 0) {
			s += alasql.stdlib[funcid].apply(this, this.args.map(function(arg) {return arg.toJavaScript(context, tableid)}));
		} else {
			s += alasql.stdlib[funcid]();
		}
	} else {
	// This is user-defined run-time function
	// TODO arguments!!!
		var s = 'alasql.userlib.'+this.funcid.substr(1).toLowerCase()+'(';
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

alasql.fn = {}; // Keep for compatibility
alasql.userlib = alasql.fn;

var stdlib = alasql.stdlib = {}

stdlib._abs = function(a) {return 'Math.abs('+a+')'};
stdlib._iif = function(a,b,c) {
	if(arguments.length == 3) {
		return  '(('+a+')?('+b+'):('+c+'))';
	} else {
		throw new Error('Number of arguments of IFF is not equals to 3');
	};
};
stdlib._ifnull = function(a,b) {return '('+a+'||'+b+')'};
stdlib._instr = function(s,p) {return '(('+s+').indexOf('+p+')+1)'};

stdlib._len = function(s) {return '('+s+').length';};
stdlib._length = function(s) {return '('+s+').length'};

stdlib._lower = function(s) {return '('+s+').toLowerCase()';}
stdlib._lcase = function(s) {return '('+s+').toLowerCase()';}


// LTRIM
stdlib._max = function(){return 'Math.max('+arguments.join(',')+')'};
stdlib._min = function(){return 'Math.min('+arguments.join(',')+')'};
stdlib._mid = function(a,b,c){
	if(arguments.length == 2) return '('+a+').substr('+b+'-1)';
	else if(arguments.length == 3) return '('+a+').substr('+b+'-1,'+c+')';
};

stdlib._now = function(){return '(new Date())';};
stdlib._nullif = function(a,b){return '('+a+'=='+b+'?null:'+a+')'};

stdlib._round = function(s,d) {
	if(arguments.length == 2) {
		return 'Math.round('+s+'*Math.pow(10,'+d+'))/Math.pow(10,'+d+')';
	} else {
		return 'Math.round('+s+')';
	}
}
stdlib._upper = function(s) {return '('+s+').toUpperCase()';}
stdlib._ucase = function(s) {return '('+s+').toUpperCase()';}
//REPLACE
// RTRIM
// SUBSTR
// TRIM
//REPLACE
// RTRIM
// SUBSTR
// TRIM
