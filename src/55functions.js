/*
//
// Functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.FuncValue = function(params){ return yy.extend(this, params); }
yy.FuncValue.prototype.toString = function(dontas) {
	var s = '';
    
    if(alasql.fn[this.funcid]) s += this.funcid;
    else if(alasql.aggr[this.funcid]) s += this.funcid;
    else if(alasql.stdlib[this.funcid.toUpperCase()] || alasql.stdfn[this.funcid.toUpperCase()]) s += this.funcid.toUpperCase();
    
    s += '(';
	if(this.args && this.args.length > 0) {
		s += this.args.map(function(arg){
			return arg.toString();
		}).join(',');
	};
	s += ')';
	if(this.as && !dontas) s += ' AS '+this.as.toString();
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}



yy.FuncValue.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	alasql.precompile(this,databaseid,params); // Precompile queries
//	console.log(34,this.toJS('','',null));
	var expr =  new Function('params,alasql','var y;return '+this.toJS('','',null));
	expr(params,alasql);
	if(cb) res = cb(res);
	return res;
}

/*/*
//yy.FuncValue.prototype.compile = function(context, tableid, defcols){
//	console.log('Expression',this);
//	if(this.reduced) return returnTrue();
//	return new Function('p','var y;return '+this.toJS(context, tableid, defcols));
//};


// yy.FuncValue.prototype.compile = function(context, tableid, defcols){
// //	console.log('Expression',this);
// 	if(this.reduced) return returnTrue();
// 	return new Function('p','var y;return '+this.toJS(context, tableid, defcols));
// };

*/

yy.FuncValue.prototype.findAggregator = function(query) {
	if(this.args && this.args.length > 0) {
		this.args.forEach(function(arg){ 
			if(arg.findAggregator) arg.findAggregator(query); 
		});
	}
};

yy.FuncValue.prototype.toJS = function(context, tableid, defcols) {
	var s = '';
    var funcid = this.funcid;
	// IF this is standard compile functions
	if(!alasql.fn[funcid] && alasql.stdlib[funcid.toUpperCase()]) {
		if(this.args && this.args.length > 0) {
			s += alasql.stdlib[funcid.toUpperCase()].apply(this, this.args.map(function(arg) {return arg.toJS(context, tableid)}));
		} else {
			s += alasql.stdlib[funcid.toUpperCase()]();
		}
	} else if(!alasql.fn[funcid] && alasql.stdfn[funcid.toUpperCase()]) {
		if(this.newid) s+= 'new ';
		s += 'alasql.stdfn.'+this.funcid.toUpperCase()+'(';
//		if(this.args) s += this.args.toJS(context, tableid);
		if(this.args && this.args.length > 0) {
			s += this.args.map(function(arg){
				return arg.toJS(context, tableid, defcols);
			}).join(',');
		};
		s += ')';		
	} else {
	// This is user-defined run-time function
	// TODO arguments!!!
//		var s = '';
		if(this.newid) s+= 'new ';
		s += 'alasql.fn.'+this.funcid+'(';
//		if(this.args) s += this.args.toJS(context, tableid);
		if(this.args && this.args.length > 0) {
			s += this.args.map(function(arg){
				return arg.toJS(context, tableid, defcols);
			}).join(',');
		};
		s += ')';
	}
//console.log('userfn:',s,this);

//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

/*/*
// // Functions compiler
// nodes.FunctionValue.prototype.toJS = function (context, tableid) {
// 	var s = '';
// 	s += fns[this.name.toUpperCase()].apply(null,this.arguments.map(function(arg){
// 		if(arg) return arg.toJS(context, tableid);
// 		else return '';
// 	}));
// 	return s;
// };
*/

/*/*
// 
// SQL FUNCTIONS COMPILERS
// Based on SQLite functions

// IMPORTANT: These are compiled functions

//alasql.fn = {}; // Keep for compatibility
//alasql.userlib = alasql.fn; 
*/

var stdlib = alasql.stdlib = {}
var stdfn = alasql.stdfn = {}

stdlib.ABS = function(a) {return 'Math.abs('+a+')'};
stdlib.CLONEDEEP = function(a) {return 'alasql.utils.cloneDeep('+a+')'};

stdfn.CONCAT = function(){
	return Array.prototype.slice.call(arguments).join('');
};
stdlib.EXP = function(a) {return 'Math.pow(Math.E,'+a+')'};

stdlib.IIF = function(a,b,c) {
	if(arguments.length == 3) {
		return  '(('+a+')?('+b+'):('+c+'))';
	} else {
		throw new Error('Number of arguments of IFF is not equals to 3');
	};
};
stdlib.IFNULL = function(a,b) {return '('+a+'||'+b+')'};
stdlib.INSTR = function(s,p) {return '(('+s+').indexOf('+p+')+1)'};

//stdlib.LEN = stdlib.LENGTH = function(s) {return '('+s+'+"").length';};



stdlib.LEN = stdlib.LENGTH = function(s) {return und(s,'y.length');}
//stdlib.LENGTH = function(s) {return '('+s+').length'};

stdlib.LOWER = stdlib.LCASE = function(s) {return und(s,'String(y).toLowerCase()');}
//stdlib.LCASE = function(s) {return '('+s+').toLowerCase()';}


// LTRIM

stdlib.MAX = stdlib.GREATEST = function(){
      return 'Math.max('+Array.prototype.join.call(arguments, ',')+')'
};

stdlib.MIN = stdlib.LEAST = function(){
      return 'Math.min('+Array.prototype.join.call(arguments, ',')+')'
};

stdlib.SUBSTRING = stdlib.SUBSTR = stdlib.MID = function(a,b,c){
	if(arguments.length == 2) return und(a,'y.substr('+b+'-1)');
	else if(arguments.length == 3) return und(a,'y.substr('+b+'-1,'+c+')');
};

stdfn.REGEXP_LIKE = function(a,b,c) {
//	console.log(a,b,c);
	return (a||'').search(RegExp(b,c))>-1;
}

// Here we uses undefined instead of null
stdlib.ISNULL = stdlib.NULLIF = function(a,b){return '('+a+'=='+b+'?undefined:'+a+')'};

stdlib.POWER = function(a,b) {return 'Math.pow('+a+','+b+')'};

stdlib.RANDOM = function(r) {
	if(arguments.length == 0) {
		return 'Math.random()';
	} else {
		return '(Math.random()*('+r+')|0)';
	}
};
stdlib.ROUND = function(s,d) {
	if(arguments.length == 2) {
		return 'Math.round(('+s+')*Math.pow(10,('+d+')))/Math.pow(10,('+d+'))';
	} else {
		return 'Math.round('+s+')';
	}
};
stdlib.CEIL = stdlib.CEILING = function(s) {return 'Math.ceil('+s+')'};
stdlib.FLOOR = function(s) {return 'Math.floor('+s+')'};

stdlib.ROWNUM = function() {return '1'};
stdlib.ROW_NUMBER = function() {return '1'};

stdlib.SQRT = function(s) {return 'Math.sqrt('+s+')'};

stdlib.TRIM = function(s) {return und(s,'y.trim()');}

stdlib.UPPER = stdlib.UCASE = function(s) {return und(s,'String(y).toUpperCase()');}

// Concatination of strings
stdfn.CONCAT_WS = function() {
    args = Array.prototype.slice.call(arguments);
    return args.slice(1, args.length).join(args[0]);
};


//stdlib.UCASE = function(s) {return '('+s+').toUpperCase()';}
//REPLACE
// RTRIM
// SUBSTR
// TRIM
//REPLACE
// RTRIM
// SUBSTR
// TRIM


// Aggregator for joining strings
alasql.aggr.GROUP_CONCAT = function(v,s,stage){
    if(stage == 1) {
    	return v; 
    } else if(stage == 2) {
    	return s+','+v;
    }
};

// Median
// alasql.aggr.MEDIAN = function(v,s,acc){
// 	// Init
// 	if(typeof acc.arr == 'undefined') {
// 	  acc.arr = [v];
// 	  return v; 
// 	// Pass
// 	} else {
// 	  acc.arr.push(v);
// 	  var p = acc.arr.sort();
// 	  return p[(p.length/2)|0];     
// 	};
// };

alasql.aggr.MEDIAN = function(v,s,stage){
	if(stage === 2) {
		if(v === null){
			return s;
		}
		s.push(v);    
		return s;
	} else if(stage === 1) {
	  	if(v === null){
	  		return [];
	  	}
	    return [v];
  	} else {
		var p = s.sort();
		return p[(p.length/2)|0];     
	};
};



// Standard deviation
alasql.aggr.VAR = function(v,s,stage){
	if(stage === 1) {
		if(v === null){
			return {arr:[],sum:0};
		} 
		return {arr:[v],sum:v};
	} else if(stage === 2) {
		if(v === null){
			return s;
		} 
		s.arr.push(v);
		s.sum += v;
		return s;
	} else {
		var N = s.arr.length;
		var avg = s.sum / N;
		var std = 0;
		for(var i=0;i<N;i++) {
			std += (s.arr[i]-avg)*(s.arr[i]-avg);
		}
		std = std/(N-1);
		return std;
	}
};

alasql.aggr.STDEV = function(v,s,stage){
	if(stage === 1 || stage === 2 ) {
		return alasql.aggr.VAR(v,s,stage);
	} else {
		return Math.sqrt(alasql.aggr.VAR(v,s,stage));
	}
};

// Standard deviation
// alasql.aggr.VARP = function(v,s,acc){
// 	if(typeof acc.arr == 'undefined') {
// 		acc.arr = [v];
// 		acc.sum = v;
// 	} else {
// 		acc.arr.push(v);
// 		acc.sum += v;
// 	}
// 	var N = acc.arr.length;
// 	var avg = acc.sum / N;
// 	var std = 0;
// 	for(var i=0;i<N;i++) {
// 		std += (acc.arr[i]-avg)*(acc.arr[i]-avg);
// 	}
// 	std = std/N;
// 	return std;
// };

alasql.aggr.VARP = function(v,s,stage){
	if(stage == 1) {
		return {arr:[v],sum:v};
	} else if(stage == 2) {
		s.arr.push(v);
		s.sum += v;
		return s;
	} else {
		var N = s.arr.length;
		var avg = s.sum / N;
		var std = 0;
		for(var i=0;i<N;i++) {
			std += (s.arr[i]-avg)*(s.arr[i]-avg);
		}
		std = std/N;
		return std;
	}
};

alasql.aggr.STD = alasql.aggr.STDDEV = alasql.aggr.STDEVP = function(v,s,stage){
	if(stage == 1 || stage == 2 ) {
		return alasql.aggr.VARP(v,s,stage);
	} else {
		return Math.sqrt(alasql.aggr.VARP(v,s,stage));
	}
};

// String functions
stdfn.REPLACE = function (target,pattern,replacement) {
    return (target||'').split(pattern).join(replacement);
};

// This array is required for fast GUID generation
var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }

stdfn.NEWID = stdfn.UUID = stdfn.GEN_RANDOM_UUID = function() {
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
      lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
};

