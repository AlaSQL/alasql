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
    if(alasql.stdlib[this.funcid]) s += this.funcid.toUpperCase();
    else s += this.funcid.toLowerCase();
    
    s += '(';
	if(this.args && this.args.length > 0) {
		s += this.args.map(function(arg){
			return arg.toString();
		}).join(',');
	};
	s += ')';
	if(this.as) s += ' AS '+this.as.toString();
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
		var s = 'alasql.userlib.'+this.funcid.toLowerCase()+'(';
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

stdlib.abs = function(a) {return 'Math.abs('+a+')'};
stdlib.iif = function(a,b,c) {
	if(arguments.length == 3) {
		return  '(('+a+')?('+b+'):('+c+'))';
	} else {
		throw new Error('Number of arguments of IFF is not equals to 3');
	};
};
stdlib.ifnull = function(a,b) {return '('+a+'||'+b+')'};
stdlib.instr = function(s,p) {return '(('+s+').indexOf('+p+')+1)'};

stdlib.len = function(s) {return '('+s+').length';};
stdlib.length = function(s) {return '('+s+').length'};

stdlib.lower = function(s) {return '('+s+').toLowerCase()';}
stdlib.lcase = function(s) {return '('+s+').toLowerCase()';}


// LTRIM
stdlib.max = function(){return 'Math.max('+arguments.join(',')+')'};
stdlib.min = function(){return 'Math.min('+arguments.join(',')+')'};
stdlib.mid = function(a,b,c){
	if(arguments.length == 2) return '('+a+').substr('+b+'-1)';
	else if(arguments.length == 3) return '('+a+').substr('+b+'-1,'+c+')';
};

stdlib.now = function(){return '(new Date())';};
stdlib.nullif = function(a,b){return '('+a+'=='+b+'?null:'+a+')'};

stdlib.random = function(r) {
	if(arguments.length == 0) {
		return 'Math.random()';
	} else {
		return '(Math.random()*('+r+')|0)';
	}
}
stdlib.round = function(s,d) {
	if(arguments.length == 2) {
		return 'Math.round('+s+'*Math.pow(10,'+d+'))/Math.pow(10,'+d+')';
	} else {
		return 'Math.round('+s+')';
	}
}
stdlib.upper = function(s) {return '('+s+').toUpperCase()';}
stdlib.ucase = function(s) {return '('+s+').toUpperCase()';}
//REPLACE
// RTRIM
// SUBSTR
// TRIM
//REPLACE
// RTRIM
// SUBSTR
// TRIM
