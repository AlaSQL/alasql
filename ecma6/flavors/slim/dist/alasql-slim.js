/**
    Alasql utility functions
    @type {object}
 */


/**
    Convert NaN to undefined
    @function
    @param {string} s JavaScript string to be modified
    @return {string} Covered expression

    @example

    123         => 123
    undefined   => undefined
    NaN         => undefined

*/
function n2u(s) {
    return '(y='+s+',y===y?y:undefined)';
}

/**
    Return always true. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
    @function
    @return {boolean} Always true
*/
function returnTrue$1 () {return true;}

/**
    Escape quotes
    @function
    @param {string} s Source string
    @return {string} Escaped string
    @example

    Piter's => Piter\'s

*/
function escapeq(s) {
//    console.log(s);
    return s.replace(/\'/g,'\\\'');
};


// Fast hash function

 /**
   @function Hash string to integer number
   @param {string} str Source string
   @return {integer} hash number
 */

 function hash$1(str){
     var h = 0;

     if (0 === str.length){
         return h;
     }

     for (var i = 0; i < str.length; i++) {
         h = ((h<<5)-h)+str.charCodeAt(i);
         h = h & h;
    	}

     return h;
 };

/**
    Extend object a with properties of b
    @function
    @param {object} a
    @param {object} b
    @return {object}
*/
function extend (a,b){
    a = a || {};
    for(var key in b) {
        if(b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
};

function UniOp(params) { return extend(this, params); }
UniOp.prototype.toString = function() {
	if(this.op === '-'){
		return this.op+this.right.toString();
	}

	if(this.op === '+'){
		return this.op+this.right.toString();
	}

	if(this.op === '#'){
		return this.op+this.right.toString();
	}

	if(this.op === 'NOT'){
		return this.op+'('+this.right.toString()+')';
	}

	// Please avoid === here
	if(this.op == null){						// jshint ignore:line
		return '('+this.right.toString()+')';
	}

	// todo: implement default case
};

UniOp.prototype.findAggregator = function (query){
	if(this.right.findAggregator){
		this.right.findAggregator(query);
	}
};

UniOp.prototype.toType = function() {
	if(this.op === '-'){
		return 'number';
	}

	if(this.op === '+'){
		return 'number';
	}

	if(this.op === 'NOT'){
		return 'boolean';
	}

	// Todo: implement default case
};

UniOp.prototype.toJS = function(context, tableid, defcols) {
	if(this.op === '-'){
		return "(-("+this.right.toJS(context, tableid, defcols)+"))";
	}

	if(this.op === '+'){
		return "("+this.right.toJS(context, tableid, defcols)+")";
	}

	if(this.op === 'NOT'){
		return '!('+this.right.toJS(context, tableid, defcols)+')';
	}

	if(this.op === '#') {
		if(this.right instanceof yy.Column) {
			return "(alasql.databases[alasql.useid].objects[\'"+this.right.columnid+"\'])";
		} else {
			return "(alasql.databases[alasql.useid].objects["
				+this.right.toJS(context, tableid, defcols)+"])";
		}
	}

	// Please avoid === here
	if(this.op == null){ 		// jshint ignore:line
		return '('+this.right.toJS(context, tableid, defcols)+')';
	}

	// Todo: implement default case.
};

function StringValue(params) { return extend(this, params); }
StringValue.prototype.toString = function() {
	return "'"+this.value.toString()+"'";
}

StringValue.prototype.toType = function() {
	return 'string';
}

StringValue.prototype.toJS = function() {
//	console.log("'"+doubleqq(this.value)+"'");
//	return "'"+doubleqq(this.value)+"'";
	return "'"+escapeq(this.value)+"'";

}

function Expression(params) { return extend(this, params); };

/**
	Convert AST to string
	@this ExpressionStatement
	@return {string}
*/
Expression.prototype.toString = function() {
	var s = this.expression.toString();
	if(this.order) {
		s += ' '+this.order.toString();
	}
	if(this.nocase) {
		s += ' COLLATE NOCASE';
	}
	return s;
};

/**
	Find aggregator in AST subtree
	@this ExpressionStatement
	@param {object} query Query object
*/
Expression.prototype.findAggregator = function (query){
	if(this.expression.findAggregator) {
		this.expression.findAggregator(query);
	}
};

/**
	Convert AST to JavaScript expression
	@this ExpressionStatement
	@param {string} context Context string, e.g. 'p','g', or 'x'
	@param {string} tableid Default table name
	@param {object} defcols Default columns dictionary
	@return {string} JavaScript expression
*/

Expression.prototype.toJS = function(context, tableid, defcols) {
//	console.log('Expression',this);
	if(this.expression.reduced) {
		return 'true';
	}
	return this.expression.toJS(context, tableid, defcols);
};

/**
	Compile AST to JavaScript expression
	@this ExpressionStatement
	@param {string} context Context string, e.g. 'p','g', or 'x'
	@param {string} tableid Default table name
	@param {object} defcols Default columns dictionary
	@return {string} JavaScript expression
*/

Expression.prototype.compile = function(context, tableid, defcols){
//	console.log('Expression',this);
	if(this.reduced) {
		return returnTrue();
	}
	return new Function('p','var y;return '+this.toJS(context, tableid, defcols));
};

function Op(params) { return extend(this, params); };
Op.prototype.toString = function() {
	if(this.op === 'IN' || this.op === 'NOT IN') {
		return this.left.toString()+" "+this.op+" ("+this.right.toString()+")";
	}
	if(this.allsome) {
		return this.left.toString()+" "+this.op+" "+this.allsome+' ('+this.right.toString()+')';
	}
	if(this.op === '->' || this.op === '!') {
		var s = this.left.toString()+this.op;
//		console.log(this.right);

		if(typeof this.right !== 'string' && typeof this.right !== 'number' ){
			s += '(';
		}

		s += this.right.toString();

		if(typeof this.right !== 'string' && typeof this.right !== 'number' ){
			s += ')';
		}

		return s;
	}
	return 	this.left.toString() + " " + this.op + " " +
			(this.allsome ? this.allsome+' ' : '') +
			this.right.toString();
};

Op.prototype.findAggregator = function (query){
//	console.log(this.toString());
	if(this.left && this.left.findAggregator){
		this.left.findAggregator(query);
	}
	// Do not go in > ALL
	if(this.right && this.right.findAggregator && (!this.allsome)) {
		this.right.findAggregator(query);
	}
};

Op.prototype.toType = function(tableid) {
	if(['-','*','/','%','^'].indexOf(this.op) >-1){
		return 'number';
	}
	if(this.op === '+') {
		if(this.left.toType(tableid) === 'string' || this.right.toType(tableid) === 'string'){
			return 'string';
		}
		if(this.left.toType(tableid) === 'number' || this.right.toType(tableid) === 'number'){
			return 'number';
		}
	}

	if(['AND','OR','NOT','=','==','===', '!=','!==','!===','>','>=','<','<=', 'IN', 'NOT IN', 'LIKE', 'NOT LIKE', 'REGEXP'].indexOf(this.op) >-1 ){
		return 'boolean';
	}

	if(this.op === 'BETWEEN' || this.op === 'NOT BETWEEN' || this.op === 'IS NULL' || this.op === 'IS NOT NULL'){
		return 'boolean';
	}

	if(this.allsome){
		return 'boolean';
	}

	if(!this.op){
		return this.left.toType();
	}

	return 'unknown';
};

Op.prototype.toJS = function(context,tableid,defcols) {
//	console.log(this);
	var s;
	var op = this.op;
	var _this = this;
	var leftJS = function(){return _this.left.toJS(context,tableid, defcols)};
	var rightJS = function(){return _this.right.toJS(context,tableid, defcols)};

	if(this.op === '='){
		op = '===';
	} else if(this.op === '<>'){
		op = '!=';
	} else if(this.op === 'OR'){
		op = '||';
	}

	// Arrow operator
	if(this.op === '->') {
		// Expression to prevent error if object is empty (#344)
		var ljs = '('+leftJS()+'||{})';

		if(typeof this.right === "string") {
			return ljs +'["'+this.right+'"]';

		} else if(typeof this.right === "number") {
			return ljs+'['+this.right+']';

		} else if(this.right instanceof FuncValue) {
			var ss = [];
			if(!(!this.right.args || 0 === this.right.args.length)) {
				var ss = this.right.args.map(function(arg){
					return arg.toJS(context,tableid, defcols);
				});
			}
			return 	''
					+ ljs
					+ "['"
					+ 	this.right.funcid
					+ "']("
					+ 	ss.join(',')
					+ ')';
		} else {

			return 	''
					+ ljs
					+ '['
					+	rightJS()
					+ ']';
		}
	}

	if(this.op === '!') {
		if(typeof this.right === "string") {
			return 	''
					+ 'alasql.databases[alasql.useid].objects['
					+ 	leftJS()
					+ ']["'
					+	this.right
					+ '"]';
		}
		// TODO - add other cases
	}

	if(this.op === 'IS') {
		return 	''
				+ '('
				+	'(typeof ' + leftJS()  + "==='undefined')"
				+	" === "
				+	'(typeof ' + rightJS() + "==='undefined')"
				+ ')';
	}


	if(this.op === '==') {
		return 	''
				+ 'alasql.utils.deepEqual('
				+	leftJS()
				+ 	','
				+ 	rightJS()
				+ ')';
	}


	if(this.op === '===' || this.op === '!===') {
		return 	''
				+ '('
				+ 	( (this.op === '!===') ? '!' : '')
				+	'('
				+		'(' + leftJS() + ").valueOf()"
				+ 		'==='
				+ 		'(' + rightJS() + ").valueOf()"
				+ 	')'
				+ ')';

	}


	if(this.op === '!==') {
		return 	''
				+ '(!alasql.utils.deepEqual('
				+ 	leftJS()
				+ 	","
				+ 	rightJS()
				+ '))';
	}
	if(this.op === 'LIKE' || this.op === 'NOT LIKE') {
		var s = '('
				+ 	( (this.op === 'NOT LIKE') ? '!' : '')
				+ 	'alasql.utils.like(' + rightJS()+ "," + leftJS();
		if(this.escape) {
			s += ','+this.escape.toJS(context,tableid, defcols);
		}
		s += '))';
		return s;
	}
	if(this.op === 'REGEXP') {
		return 'alasql.stdfn.REGEXP_LIKE('
			+ leftJS()
			+ ','
			+ rightJS()
			+ ')';
	}

	if(this.op === 'BETWEEN' || this.op === 'NOT BETWEEN') {
		return 	''
				+ '('
				+ 	( (this.op === 'NOT BETWEEN') ? '!' : '')
				+ 	'('
				+ 		'('
				+ 			this.right1.toJS(context,tableid, defcols)
				+			'<='
				+			leftJS()
				+		') && ('
				+			leftJS()
				+			'<='
				+			this.right2.toJS(context,tableid, defcols)
				+		')'
				+ 	')'
				+ ')';

/*
		if(this.right instanceof Op && this.right.op == 'AND') {

			return '(('+this.right.left.toJS(context,tableid, defcols)+'<='+leftJS()+')&&'+
			'('+leftJS()+'<='+this.right.right.toJS(context,tableid, defcols)+'))';

		} else {
			throw new Error('Wrong BETWEEN operator without AND part');
		}
*/
	}



	if(this.op === 'IN') {
		if(this.right instanceof Select ) {
			s = '(';
//			s += 'this.query.queriesdata['+this.queriesidx+']';
//			s += 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,context))';
			s += 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx)+'](params,null,context))';
			s += '.indexOf(';
			s += leftJS()+')>-1)';
			return s;
		} else if(this.right instanceof Array ) {
//			if(this.right.length == 0) return 'false';
			s 	= '(['
				+ this.right.map(function(a){return a.toJS(context,tableid, defcols);}).join(',')
				+ '].indexOf('
				+ leftJS()
				+ ')>-1)';
//console.log(s);
			return s;
		} else {
			s = '('+rightJS()+'.indexOf('
			  	+ leftJS()+')>-1)';
//console.log('expression',350,s);
			return s;
//		} else {
//			throw new Error('Wrong IN operator without SELECT part');
		}
	}


	if(this.op === 'NOT IN') {
		if(this.right instanceof Select ) {
			s = '(';
				//this.query.queriesdata['+this.queriesidx+']
//			s += 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,p))';
			s += 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx)+'](params,null,p))';
			s +='.indexOf(';
			s += leftJS()+')<0)';
			return s;
		} else if(this.right instanceof Array ) {
//			if(this.right.length == 0) return 'true';
			s = '(['+this.right.map(function(a){return a.toJS(context,tableid, defcols);}).join(',')+'].indexOf(';
			s += leftJS()+')<0)';
			return s;
		} else {
			s = '('+rightJS()+'.indexOf(';
			s += leftJS()+')==-1)';
			return s;

//			throw new Error('Wrong NOT IN operator without SELECT part');
		}
	}

	if(this.allsome === 'ALL') {
		var s;
		if(this.right instanceof Select ) {
//			var s = 'this.query.queriesdata['+this.queriesidx+']';
		 	s = 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,p))';

			s +='.every(function(b){return (';
			s += leftJS()+')'+op+'b})';
			return s;
		} else if(this.right instanceof Array ) {
			s = '['+this.right.map(function(a){return a.toJS(context,tableid, defcols);}).join(',')+'].every(function(b){return (';
			s += leftJS()+')'+op+'b})';
			return s;
		} else {
			throw new Error('NOT IN operator without SELECT');
		}
	}

	if(this.allsome === 'SOME' || this.allsome === 'ANY') {
		var s;
		if(this.right instanceof Select ) {
//			var s = 'this.query.queriesdata['+this.queriesidx+']';
			s = 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,p))';
			s +='.some(function(b){return (';
			s += leftJS()+')'+op+'b})';
			return s;
		} else if(this.right instanceof Array ) {
			s = '['+this.right.map(function(a){return a.toJS(context,tableid, defcols);}).join(',')+'].some(function(b){return (';
			s += leftJS()+')'+op+'b})';
			return s;
		} else {
			throw new Error('SOME/ANY operator without SELECT');
		}
	}

// Special case for AND optimization (if reduced)
	if(this.op === 'AND') {
		if(this.left.reduced) {
			if(this.right.reduced) {
				return 'true';
			} else {
				return rightJS();
			}
		} else if(this.right.reduced) {
			return leftJS();
		}

		// Otherwise process as regular operation (see below)
		op = '&&';

	}

	if(this.op === '^') {
		return 	'Math.pow('
				+ leftJS()
				+ ','
				+ rightJS()
				+ ')';
	}




	// Change names
//	console.log(this);
	return 	''
			+ '('
			+ leftJS()
			+ op
			+ rightJS()
			+ ')';
}

function NumValue(params) { return extend(this, params); }
NumValue.prototype.toString = function() {
	return this.value.toString();
};

NumValue.prototype.toType = function() {
	return 'number';
};

NumValue.prototype.toJS = function() {
	return ""+this.value;
}

/* @formerly
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/


function Column(params) { return extend(this, params); }
Column.prototype.toString = function() {
	var s;
	if(this.columnid === +this.columnid) {
		s = '['+this.columnid+']';
	} else {
		s = this.columnid;
	}
	if(this.tableid) {
		if(+this.columnid === this.columnid) {
			s = this.tableid+s;
		} else {
			s = this.tableid+'.'+s;
		}
		if(this.databaseid) {
			s = this.databaseid+'.'+s;
		}
	}
//	if(this.alias) s += ' AS '+this.alias;
	return s;
};

Column.prototype.toJS = function(context, tableid, defcols) {
	var s = '';
	if(!this.tableid && tableid === '' && !defcols) {
		if(this.columnid !== '_') {
			s = context+'[\''+this.columnid+'\']';
		} else {
			if(context === 'g') {
				s = 'g[\'_\']';
			} else {
				s = context;
			}
		}
	} else {
		if(context === 'g') {
			// if(this.columnid == '_') {
			// } else {
				s = 'g[\''+this.nick+'\']';
			// }
		} else if(this.tableid) {
			if(this.columnid !== '_') {
				s = context+'[\''+(this.tableid) + '\'][\''+this.columnid+'\']';
			} else {
				if(context === 'g') {
					s = 'g[\'_\']';
				} else {
					s = context+'[\''+(this.tableid) + '\']';
				}
			}
		} else if(defcols) {
			var tbid = defcols[this.columnid];
			if(tbid === '-') {
				throw new Error('Cannot resolve column "'+this.columnid+'" because it exists in two source tables');
			} else if(tbid) {
				if(this.columnid !== '_') {
					s = context+'[\''+(tbid) + '\'][\''+this.columnid+'\']';
				} else {
					s = context+'[\''+(tbid) + '\']';
				}
			} else {
				if(this.columnid !== '_') {
					s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
				} else {
					s = context+'[\''+(this.tableid || tableid) + '\']';
				}
			}
		} else if(tableid === -1) {
//			if(this.columnid != '') {
				s = context+'[\''+this.columnid+'\']';
//			} else {
//				s = context;
//			}
		} else {
			if(this.columnid !== '_') {
				s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
			} else {
				s = context+'[\''+(this.tableid || tableid) + '\']';
			}
		}
	}
//	console.log(context,s);
//	console.trace(new Error());
	return s;
}

/*
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//formerly from 50expression.js

function ParamValue(params) { return extend(this, params); }
ParamValue.prototype.toString = function() {
	return '$'+this.param;
}
ParamValue.prototype.toJS = function() {
	if(typeof this.param === "string"){
		return "params['"+this.param+"']";
	}

	return "params["+this.param+"]";
}

/*
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//formerly from 50expression.js

function AggrValue(params){ return extend(this, params); }
AggrValue.prototype.toString = function() {
	var s = '';
	if(this.aggregatorid === 'REDUCE'){
		s += this.funcid+'(';
	} else{
		s += this.aggregatorid+'(';
	}

	if(this.distinct){
		s+= 'DISTINCT ';
	}

	if(this.expression){
		s += this.expression.toString();
	}

	s += ')';

	if(this.over){
		s += ' '+this.over.toString();
	}
//	console.log(this.over);
//	if(this.alias) s += ' AS '+this.alias;
	return s;
};

AggrValue.prototype.findAggregator = function (query){
//	console.log('aggregator found',this.toString());

//	var colas = this.as || this.toString();

	var colas = escapeq(this.toString())+':'+query.selectGroup.length;
//	console.log('findAgg',this);


/*	var found = false;
	for(var i=0;i<query.columns.length;i++) {
		// THis part should be intellectual
		if(query.columns[i].as == colas) {
			found = true;
			break;
		}
	}
*/
//	if(!query.selectColumns[colas]) {
//	}

	var found = false;

/*
	for(var i=0;i<query.selectGroup.length;i++){
		if(query.selectGroup[i].nick==colas) {
			colas = colas+':'+i;
			found = false;
			break;
		};
	};
*/
//	console.log("query.selectGroup",query.selectGroup,found);
	if(!found) {
		if(!this.nick) {
			this.nick = colas;
			var found = false;
			for(var i=0;i<query.removeKeys.length;i++){
				if(query.removeKeys[i]===colas) {
					found = true;
					break;
				}
			}
			if(!found){
				query.removeKeys.push(colas);
			}
		}
		query.selectGroup.push(this);
	}
//	console.log(query.selectGroup);


////	this.reduced = true;
	return;
};

AggrValue.prototype.toType = function() {
	if(['SUM','COUNT','AVG','MIN', 'MAX','AGGR','VAR','STDDEV'].indexOf(this.aggregatorid)>-1){
		return 'number';
	}

	if(['ARRAY'].indexOf(this.aggregatorid)>-1){
		return 'array';
	}

	if(['FIRST','LAST' ].indexOf(this.aggregatorid)>-1){
		return this.expression.toType();
	}

	// todo: implement default;
}


AggrValue.prototype.toJS = function(/*context, tableid, defcols*/) {
//	var s = 'alasql.functions.'+this.funcid+'(';
//	if(this.expression) s += this.expression.toJS(context, tableid);
//	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
//	return s;
//	var s = '';
//if(this.as) console.log(499,this.as);
//	var colas = this.as;
	var colas = this.nick;
	if(colas === undefined){
		colas = this.toString();
	}
	return 'g[\''+colas+'\']';
}

/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//formerly 424select.js

function compileSelectStar(query,alias) {
	// console.log(query.aliases[alias]);
//	console.log(query,alias);
	// console.log(query.aliases[alias].tableid);
//	console.log(42,631,alias);
//	console.log(query.aliases);
	var sp = '', ss=[];
//	if(!alias) {
//		sp += 'for(var k1 in p) var w=p[k1];for(var k2 in w){r[k2]=w[k2]};';
//	} else 	{

		// TODO move this out of this function
		query.ixsources = {};
		query.sources.forEach(function(source){
			query.ixsources[source.alias] = source;
		});

		// Fixed
		var columns;
		if(query.ixsources[alias]) {
			var columns = query.ixsources[alias].columns;
		}

//		if(columns.length == 0 && query.aliases[alias].tableid) {
//			var columns = alasql.databases[query.aliases[alias].databaseid].tables[query.aliases[alias].tableid].columns;
//		};



		// Check if this is a Table or other

		if(columns && columns.length > 0) {
			columns.forEach(function(tcol){
				ss.push('\''+tcol.columnid+'\':p[\''+alias+'\'][\''+tcol.columnid+'\']');
				query.selectColumns[escapeq(tcol.columnid)] = true;

//			console.log('ok',tcol);

				var coldef = {
					columnid:tcol.columnid,
					dbtypeid:tcol.dbtypeid,
					dbsize:tcol.dbsize,
					dbprecision:tcol.dbprecision,
					dbenum: tcol.dbenum
				};
				query.columns.push(coldef);
				query.xcolumns[coldef.columnid]=coldef;

			});
//console.log(999,columns);
		} else {
//					console.log(60,alias,columns);

			// if column not exists, then copy all
			sp += 'var w=p["'+alias+'"];for(var k in w){r[k]=w[k]};';
//console.log(777, sp);
			query.dirtyColumns = true;
		}
//	}
//console.log({s:ss.join(','),sp:sp});
	return {s:ss.join(','),sp:sp};
}


function compileSelect1(query) {
	var self = this;
	query.columns = [];
	query.xcolumns = {};
	query.selectColumns = {};
	query.dirtyColumns = false;
	var s = 'var r={';
	var sp = '';
	var ss = [];

//console.log(42,87,this.columns);

	this.columns.forEach(function(col){
//console.log(col);
		if(col instanceof Column) {
			if(col.columnid === '*') {
				if(col.func) {
					sp += 'r=params[\''+col.param+'\'](p[\''+query.sources[0].alias+'\'],p,params,alasql);';
				} else if(col.tableid) {
					//Copy all
					var ret = compileSelectStar(query, col.tableid);
					if(ret.s){
						ss = ss.concat(ret.s);
					}
					sp += ret.sp;

				} else {
//					console.log('aliases', query.aliases);
					for(var alias in query.aliases) {
						var ret = compileSelectStar(query, alias); //query.aliases[alias].tableid);
						if(ret.s){
							ss = ss.concat(ret.s);
						}
						sp += ret.sp;
					}
					// TODO Remove these lines
					// In case of no information
					// sp += 'for(var k1 in p){var w=p[k1];'+
					// 			'for(k2 in w) {r[k2]=w[k2]}}'
				}
			} else {
				// If field, otherwise - expression
				var tbid = col.tableid;
//				console.log(query.sources);
				var dbid = col.databaseid || query.sources[0].databaseid || query.database.databaseid;
				if(!tbid) tbid = query.defcols[col.columnid];
				if(!tbid) tbid = query.defaultTableid;
				if(col.columnid !== '_') {
					ss.push('\''+escapeq(col.as || col.columnid)+'\':p[\''+(tbid)+'\'][\''+col.columnid+'\']');
				} else {
					ss.push('\''+escapeq(col.as || col.columnid)+'\':p[\''+(tbid)+'\']');
				}
				query.selectColumns[escapeq(col.as || col.columnid)] = true;

				if(query.aliases[tbid] && query.aliases[tbid].type === 'table') {

					if(!alasql.databases[dbid].tables[query.aliases[tbid].tableid]) {
//						console.log(query.database,tbid,query.aliases[tbid].tableid);
						throw new Error('Table \''+(tbid)+'\' does not exists in database');
					}
					var columns = alasql.databases[dbid].tables[query.aliases[tbid].tableid].columns;
					var xcolumns = alasql.databases[dbid].tables[query.aliases[tbid].tableid].xcolumns;
//console.log(xcolumns, col,123);
//					console.log(0);
					if(xcolumns && columns.length > 0) {
//						console.log(1);
						var tcol = xcolumns[col.columnid];
						var coldef = {
							columnid:col.as || col.columnid,
							dbtypeid:tcol.dbtypeid,
							dbsize:tcol.dbsize,
							dbpecision:tcol.dbprecision,
							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
					} else {
						var coldef = {
							columnid:col.as || col.columnid,
//							dbtypeid:tcol.dbtypeid,
//							dbsize:tcol.dbsize,
//							dbpecision:tcol.dbprecision,
//							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;

						query.dirtyColumns = true;
					}
				} else {
						var coldef = {
							columnid:col.as || col.columnid,
//							dbtypeid:tcol.dbtypeid,
//							dbsize:tcol.dbsize,
//							dbpecision:tcol.dbprecision,
//							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
					// This is a subquery?
					// throw new Error('There is now such table \''+col.tableid+'\'');
				}

			}
		} else if(col instanceof AggrValue) {
			if(!self.group) {
//				self.group=[new yy.Column({columnid:'q',as:'q'	})];
				self.group = [''];
			}
			if(!col.as){
				col.as = escapeq(col.toString());
			}

			if(
					col.aggregatorid === 'SUM'
				|| 	col.aggregatorid === 'MAX'
				||  col.aggregatorid === 'MIN'
				||	col.aggregatorid === 'FIRST'
				||	col.aggregatorid === 'LAST'
				||	col.aggregatorid === 'AVG'
				|| 	col.aggregatorid === 'ARRAY'
				|| 	col.aggregatorid === 'REDUCE'
			){
				ss.push("'"+escapeq(col.as)+"':"+n2u(col.expression.toJS("p",query.defaultTableid,query.defcols)))

			}else if(col.aggregatorid === 'COUNT') {
				ss.push("'"+escapeq(col.as)+"':1");
				// Nothing
			}
			// todo: confirm that no default action must be implemented


			query.selectColumns[col.aggregatorid+'('+escapeq(col.expression.toString())+')'] = thtd;


						var coldef = {
							columnid:col.as || col.columnid || col.toString(),
//							dbtypeid:tcol.dbtypeid,
//							dbsize:tcol.dbsize,
//							dbpecision:tcol.dbprecision,
//							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;

//			else if (col.aggregatorid == 'MAX') {
//				ss.push((col.as || col.columnid)+':'+col.toJS("p.",query.defaultTableid))
//			} else if (col.aggregatorid == 'MIN') {
//				ss.push((col.as || col.columnid)+':'+col.toJS("p.",query.defaultTableid))
//			}
		} else {
//			console.log(203,col.as,col.columnid,col.toString());
			ss.push('\''+escapeq(col.as || col.columnid || col.toString())+'\':'+n2u(col.toJS("p",query.defaultTableid,query.defcols)));
//			ss.push('\''+escapeq(col.toString())+'\':'+col.toJS("p",query.defaultTableid));
			//if(col instanceof yy.Expression) {
			query.selectColumns[escapeq(col.as || col.columnid || col.toString())] = true;

						var coldef = {
							columnid:col.as || col.columnid || col.toString(),
//							dbtypeid:tcol.dbtypeid,
//							dbsize:tcol.dbsize,
//							dbpecision:tcol.dbprecision,
//							dbenum: tcol.dbenum,
						};
//						console.log(2);
						query.columns.push(coldef);
						query.xcolumns[coldef.columnid]=coldef;
		}
	});
	s += ss.join(',')+'};'+sp;
	return s;
//console.log(42,753,query.xcolumns, query.selectColumns);
}
//yy.Select.prototype.compileSelect2
function compileSelect2(query) {

	var s = query.selectfns;
//	console.log(s);
	return new Function('p,params,alasql','var y;'+s+'return r');
};

//yy.Select.prototype.compileSelectGroup0
function compileSelectGroup0(query) {
	var self = this;
	self.columns.forEach(function(col,idx){
		if(!(col instanceof Column && col.columnid === '*')){

			var colas;
			//  = col.as;
			if(col instanceof Column) {
				colas = escapeq(col.columnid);
			} else {
				colas = escapeq(col.toString());
			}
			for(var i=0;i<idx;i++) {
				if(colas === self.columns[i].nick) {
					colas = self.columns[i].nick+':'+idx;
					break;
				}
			}
			// }
			col.nick = colas;
			if(
				col.funcid
				&& (col.funcid.toUpperCase() === 'ROWNUM'|| col.funcid.toUpperCase() === 'ROW_NUMBER')) {
				query.rownums.push(col.as);
			}
//				console.log("colas:",colas);
			// }
		}
	});

	this.columns.forEach(function(col){
		if(col.findAggregator){
			col.findAggregator(query);
		}
	});

	if(this.having) {
		if(this.having.findAggregator){
			this.having.findAggregator(query);
		}
	}

};
//yy.Select.prototype.compileSelectGroup1
function compileSelectGroup1(query) {
	var self = this;
	var s = 'var r = {};';

	self.columns.forEach(function(col){
//		console.log(col);
		if(col instanceof Column && col.columnid === '*') {
//			s += 'for(var k in g){r[k]=g[k]};';
			s += 'for(var k in this.query.groupColumns){r[k]=g[this.query.groupColumns[k]]};';
//			console.log(query);
		} else {
			// var colas = col.as;
			var colas = col.as;
			if(colas === undefined) {
			 	if(col instanceof Column){
			 		colas = escapeq(col.columnid);
			 	} else {
			 		colas = col.nick;
			 	}
			}
			query.groupColumns[colas]=col.nick;

			s += 'r[\''+colas+'\']=';

 			s += n2u(col.toJS('g',''))+';';

			for(var i=0;i<query.removeKeys.length;i++) {
				// THis part should be intellectual
				if(query.removeKeys[i] === colas) {
					query.removeKeys.splice(i,1);
					break;
				}
			}
		}
	});
	// return new Function('g,params,alasql',s+'return r');
	return s;
}
//yy.Select.prototype.compileSelectGroup2
function compileSelectGroup2(query) {
	var s = query.selectgfns;
//	console.log('selectg:',s);
	return new Function('g,params,alasql','var y;'+s+'return r');
};

// SELECY * REMOVE [COLUMNS] col-list, LIKE ''
// yy.Select.prototype.compileRemoveColumns
function compileRemoveColumns(query) {
	var self = this;
	if(typeof this.removecolumns !== 'undefined') {
		query.removeKeys = query.removeKeys.concat(
			this.removecolumns.filter(function (column) {
				return (typeof column.like === 'undefined');
			}).map(function(column){return column.columnid}));

//console.log(query.removeKeys,this.removecolumns);
		query.removeLikeKeys = this.removecolumns.filter(function (column) {
				return (typeof column.like !== 'undefined');
			}).map(function(column){
//				return new RegExp((column.like.value||'').replace(/\%/g,'.*').replace(/\?|_/g,'.'),'g');
				return column.like.value;
			});
	}
};

//formerly 426orderby.js
//yy.Select.prototype.compileOrder
function compileOrder(query) {
	var self = this;
	if(this.order) {
//			console.log(990, this.order);
		if(this.order && this.order.length == 1 && this.order[0].expression
			 && typeof this.order[0].expression == "function") {
//			console.log(991, this.order[0]);
			var func = this.order[0].expression;
//			console.log(994, func);
			return function(a,b){
				var ra = func(a),rb = func(b);
				if(ra>rb) return 1;
				if(ra==rb) return 0;
				return -1;
			}
		};

		var s = '';
		var sk = '';
		this.order.forEach(function(ord,idx){
			// console.log(ord instanceof yy.Expression);
			// console.log(ord.toJS('a',''));
			// console.log(ord.expression instanceof yy.Column);

			// Date conversion
			var dg = '';
//console.log(ord.expression, ord.expression instanceof yy.NumValue);
			if(ord.expression instanceof yy.NumValue) {
				ord.expression = self.columns[ord.expression.value-1];
//console.log(ord.expression);
				ord.expression = new yy.Column({columnid:ord.expression.nick});
			};

			if(ord.expression instanceof yy.Column) {
				var columnid = ord.expression.columnid;
				if(query.xcolumns[columnid]) {
					var dbtypeid = query.xcolumns[columnid].dbtypeid;
					if( dbtypeid == 'DATE' || dbtypeid == 'DATETIME') dg = '.valueOf()';
					// TODO Add other types mapping
				} else {
					if(alasql.options.valueof) dg = '.valueOf()'; // TODO Check
				}
				// COLLATE NOCASE
				if(ord.nocase) dg += '.toUpperCase()';

				s += 'if((a[\''+columnid+"']||'')"+dg+(ord.direction == 'ASC'?'>':'<')+'(b[\''+columnid+"']||'')"+dg+')return 1;';
				s += 'if((a[\''+columnid+"']||'')"+dg+'==(b[\''+columnid+"']||'')"+dg+'){';

			} else {
				dg = '.valueOf()';
				// COLLATE NOCASE
				if(ord.nocase) dg += '.toUpperCase()';
				s += 'if(('+ord.toJS('a','')+"||'')"+dg+(ord.direction == 'ASC'?'>(':'<(')+ord.toJS('b','')+"||'')"+dg+')return 1;';
				s += 'if(('+ord.toJS('a','')+"||'')"+dg+'==('+ord.toJS('b','')+"||'')"+dg+'){';
			}

//			if(columnid == '_') {
//				s += 'if(a'+dg+(ord.direction == 'ASC'?'>':'<')+'b'+dg+')return 1;';
//				s += 'if(a'+dg+'==b'+dg+'){';
//			} else {
			// TODO Add date comparision
				// s += 'if(a[\''+columnid+"']"+dg+(ord.direction == 'ASC'?'>':'<')+'b[\''+columnid+"']"+dg+')return 1;';
				// s += 'if(a[\''+columnid+"']"+dg+'==b[\''+columnid+"']"+dg+'){';
//			}
			sk += '}';
		});
		s += 'return 0;';
		s += sk+'return -1';
		query.orderfns = s;
//console.log('ORDERBY',s);
		return new Function('a,b','var y;'+s);
	};
};

//formerly 23table.js
// Table class
function Table$1(params){

	// Columns
	this.columns = [];
	this.xcolumns = {};
	// Data array
	this.data = [];

	this.inddefs = {};
	this.indices = {};

	this.uniqs = {};
	this.uniqdefs = {};

	extend(this,params);
};

Table$1.prototype.indexColumns = function() {
	var self = this;
	self.xcolumns = {};
	self.columns.forEach(function(col){
		self.xcolumns[col.columnid] = col;
	});
}

/**
	AlaSQL - Main Alasql class
 	@function
 	@param {string|function|object} sql - SQL-statement or data object for fuent interface
 	@param {object} params - SQL parameters
 	@param {function} cb - callback function
 	@param {object} scope - Scope for nested queries
 	@return {any} - Result data object

	@example
 Standard sync call:
    alasql('CREATE TABLE one');
 Query:
 	var res = alasql('SELECT * FROM one');
 Call with parameters:
 	var res = alasql('SELECT * FROM ?',[data]);
 Standard async call with callback function:
 	alasql('SELECT * FROM ?',[data],function(res){
		console.log(data);
 	});
 Call with scope for subquery (to pass common values):
    var scope = {one:{a:2,b;20}}
    alasql('SELECT * FROM ? two WHERE two.a = one.a',[data],null,scope);
 Call for fluent interface with data object:
    alasql(data).Where(function(x){return x.a == 10}).exec();
 Call for fluent interface without data object:
    alasql().From(data).Where(function(x){return x.a == 10}).exec();
 */

function alasql$1(sql, params, cb, scope) {
	if(typeof importScripts !== 'function' && alasql$1.webworker) {
		var id = alasql$1.lastid++;
		alasql$1.buffer[id] = cb;
		alasql$1.webworker.postMessage({id:id,sql:sql,params:params});
	} else {
		if(arguments.length === 0) {
			// Without arguments - Fluent interface
			return new Select$1({
				columns:[new Column({columnid:'*'})],
				from: [new ParamValue({param:0})]
			});
		} else if (arguments.length === 1 && typeof sql === "object" && sql instanceof Array) {
			// One argument data object - fluent interface
				var select = new Select$1({
					columns:[new Column({columnid:'*'})],
					from: [new ParamValue({param:0})]
				});
				select.preparams = [sql];
				return select;
		} else {
			// Standard interface
			// alasql('#sql');
			if(typeof sql === 'string' && sql[0]==='#' && typeof document === "object") {
				sql = document.querySelector(sql).textContent;
			} else if(typeof sql === 'object' && sql instanceof HTMElement) {
				sql = sql.textContent;
			} else if(typeof sql === 'function') {
				// to run multiline functions
				sql = sql.toString().slice(14,-3);
			}
			// Run SQL
			return alasql$1.exec(sql, params, cb, scope);
		}
	}
};

alasql$1.version = "0.2.1";
alasql$1.debug = undefined;

//
// Prepare subqueries and exists
//
//TODO: alasql.precompile

function precompile(statement,databaseid,params){
//	console.log(statement);
	if(!statement) return;
	statement.params = params;
	if(statement.queries) {
//console.log(52,statement.queries[0]);
		statement.queriesfn = statement.queries.map(function(q) {
			var nq = q.compile(databaseid || statement.database.databaseid);
//			console.log(nq);
//			 nq.query.modifier = undefined;
//			 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
		 nq.query.modifier = 'RECORDSET';
			 return nq;

		});
	}
	if(statement.exists) {
//console.log(62,statement.exists);
		statement.existsfn = statement.exists.map(function(ex) {
			var nq = ex.compile(databaseid || statement.database.databaseid);
//			console.log(nq.query.modifier);
//			 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
//			 if(!nq.query.modifier) nq.query.modifier = 'ARRAY';
		 nq.query.modifier = 'RECORDSET';
			 return nq;

		});
	};
}

/**
 	Alasql options object
 */
//formerly alasql.options
//TODO: alasql.options
var options = {};
options.errorlog = false; // Log or throw error
options.valueof = false; // Use valueof in orderfn
options.dropifnotexists = false; // DROP database in any case
options.datetimeformat = 'sql'; // How to handle DATE and DATETIME types
								// Another value is 'javascript'
options.casesensitive = true; // Table and column names are case sensitive and converted to lower-case
options.logtarget = 'output'; // target for log. Values: 'console', 'output', 'id' of html tag
options.logprompt = true; // Print SQL at log

// Default modifier
// values: RECORDSET, VALUE, ROW, COLUMN, MATRIX, TEXTSTRING, INDEX
options.modifier = undefined;
// How many rows to lookup to define columns
options.columnlookup = 10;
// Create vertex if not found
options.autovertex = true;

// Use dbo as current database (for partial T-SQL comaptibility)
options.usedbo = true;

// AUTOCOMMIT ON | OFF
options.autocommit = true;

// Use cache
options.cache = true;

// Compatibility flags
options.tsql = true;
options.mysql = true;
options.postgres = true;
options.oracle = true;
options.sqlite = true;
options.orientdb = true;

// for SET NOCOUNT OFF
options.nocount = false;

// Check for NaN and convert it to undefined
options.nan = false;

/**
-------------------
Comment utils
-------------------
**/

/**
 	Strip all comments.
 	@function
 	@param {string} str
 	@return {string}
 	Based om the https://github.com/lehni/uncomment.js/blob/master/uncomment.js
 	I just replaced JavaScript's '//' to SQL's '--' and remove other stuff

 	@todo Fixed [aaa/*bbb] for column names
 	@todo Bug if -- comments in the last line
	@todo Check if it possible to model it with Jison parser
	@todo Remove unused code
 */

 //formerly 16comments.js

function uncomment(str) {
	// Add some padding so we can always look ahead and behind by two chars
	str = ('__' + str + '__').split('');
	var quote = false,
		quoteSign,
		blockComment = false,
		lineComment = false;

	for (var i = 0, l = str.length; i < l; i++) {
		var unescaped = str[i - 1] !== '\\' || str[i - 2] === '\\';

		if (quote) {
			if (str[i] === quoteSign && unescaped){
				quote = false;
			}
		} else if (blockComment) {
			// Is the block comment closing?
			if (str[i] === '*' && str[i + 1] === '/') {
				// if (!preserveComment)
					str[i] = str[i + 1] = '';
				blockComment /* = preserveComment*/ = false;
				// Increase by 1 to skip closing '/', as it would be mistaken
				// for a regexp otherwise
				i++;
			} else { //if (!preserveComment) {
				str[i] = '';
			}
		} else if (lineComment) {
			// One-line comments end with the line-break
			if (str[i + 1] === '\n' || str[i + 1] === '\r'){
				lineComment = false;
			}
			str[i] = '';
		} else {
			if (str[i] === '"' || str[i] === "'") {
				quote = true;
				quoteSign = str[i];
			} else if (str[i] === '[' && str[i-1] !== "@") {
				quote = true;
				quoteSign = ']';
			// } else if (str[i] === '-' &&  str[i + 1] === '-') {
			// 	str[i] = '';
			// 	lineComment = true;
			} else if (str[i] === '/' && str[i + 1] === '*') {
					// Do not filter out conditional comments /*@ ... */
					// and comments marked as protected /*! ... */
//					preserveComment = /[@!]/.test(str[i + 2]);
//					if (!preserveComment)
					str[i] = '';
					blockComment = true;

			}
		}
	}
	// Remove padding again.
	str = str.join('').slice(2, -2);
	return str;
};

alasql$1.Table = Table$1;


alasql$1.precompile = precompile;

alasql$1.options = options;
/**
	Database class for Alasql.js
*/


// Initial parameters

/**
	Jison parser
*/

/**
 	Jison parser
 	@param {string} sql SQL statement
 	@return {object} AST (Abstract Syntax Tree)

 	@todo Create class AST
 	@todo Add other parsers

 	@example
 	alasql.parse = function(sql) {
		// My own parser here
 	}
 */
alasql$1.parse = function(sql) {
	return alasql$1.parser.parse(uncomment(sql));
};

/**
 	List of engines of external databases
 	@type {object}
 	@todo Create collection type
 */
alasql$1.engines = {};

/**
 	List of databases
 	@type {object}
 */
alasql$1.databases = {};

/**
	Number of databases
	@type {number}
*/
alasql$1.databasenum = 0;



//alasql.options.worker = false;
// Variables
alasql$1.vars = {};
alasql$1.declares = {};


alasql$1.prompthistory = [];

alasql$1.plugins = {}; // If plugin already loaded

alasql$1.from = {}; // FROM functions
alasql$1.into = {}; // INTO functions

alasql$1.fn = {};
alasql$1.aggr = {};

alasql$1.busy = 0;

// Cache
alasql$1.MAXSQLCACHESIZE = 10000;
alasql$1.DEFAULTDATABASEID = 'alasql';

/* WebWorker */
alasql$1.lastid = 0;
alasql$1.buffer = {};

/**
  Select current database
  @param {string} databaseid Selected database identificator
 */
alasql$1.use = function (databaseid) {
	if(!databaseid){
		databaseid = alasql$1.DEFAULTDATABASEID;
	}
	if(alasql$1.useid === databaseid){
		return;
	}
	alasql$1.useid = databaseid;
	var db = alasql$1.databases[alasql$1.useid];
	alasql$1.tables = db.tables;
//	alasql.fn = db.fn;
	db.resetSqlCache();
	if(alasql$1.options.usedbo) {
	    alasql$1.databases.dbo = db; // Operator???
	}

};

/**
 Run single SQL statement on current database
 */
alasql$1.exec = function (sql, params, cb, scope) {
	delete alasql$1.error;
	params = params || {};
	if(alasql$1.options.errorlog){
		try {
			return alasql$1.dexec(alasql$1.useid, sql, params, cb, scope);
		} catch(err){
			alasql$1.error = err;
			if(cb){
				cb(null,alasql$1.error);
			}
		}
	} else {
		return alasql$1.dexec(alasql$1.useid, sql, params, cb, scope);
	}
};

/**
 Run SQL statement on specific database
 */
alasql$1.dexec = function (databaseid, sql, params, cb, scope) {
	var db = alasql$1.databases[databaseid];
//	if(db.databaseid != databaseid) console.trace('got!');
//	console.log(3,db.databaseid,databaseid);

	var hh;
	// Create hash
	if(alasql$1.options.cache) {
		hh = hash$1(sql);
		var statement = db.sqlCache[hh];
		// If database structure was not changed sinse lat time return cache
		if(statement && db.dbversion === statement.dbversion) {
			return statement(params, cb);
		}
	}

	// Create AST
	var ast = alasql$1.parse(sql);
	if(!ast.statements){
		return;
	}
	if(0 === ast.statements.length){
		return 0;
	}
	else if(1 === ast.statements.length) {
		if(ast.statements[0].compile) {

			// Compile and Execute
			var statement = ast.statements[0].compile(databaseid);
			if(!statement){
				return;
			}
			statement.sql = sql;
			statement.dbversion = db.dbversion;

			if(alasql$1.options.cache) {
				// Secure sqlCache size
				if (db.sqlCacheSize > alasql$1.MAXSQLCACHESIZE) {
					db.resetSqlCache();
				}
				db.sqlCacheSize++;
				db.sqlCache[hh] = statement;
			}
			var res = alasql$1.res = statement(params, cb, scope);
			return res;

		} else {
//			console.log(ast.statements[0]);
			alasql$1.precompile(ast.statements[0],alasql$1.useid,params);
			var res = alasql$1.res = ast.statements[0].execute(databaseid, params, cb, scope);
			return res;
		}
	} else {
		// Multiple statements
		if(cb) {
			alasql$1.adrun(databaseid, ast, params, cb, scope);
		} else {
			return alasql$1.drun(databaseid, ast, params, cb, scope);
		}
	}
};

/**
  Run multiple statements and return array of results sync
 */
alasql$1.drun = function (databaseid, ast, params, cb, scope) {
	var useid = alasql$1.useid;

	if(useid !== databaseid){
		alasql$1.use(databaseid);
	}

	var res = [];
	for (var i=0, ilen=ast.statements.length; i<ilen; i++) {
		if(ast.statements[i]) {
			if(ast.statements[i].compile) {
				var statement = ast.statements[i].compile(alasql$1.useid);
				res.push(alasql$1.res = statement(params,null,scope));
			} else {
				alasql$1.precompile(ast.statements[i],alasql$1.useid,params);
				res.push(alasql$1.res = ast.statements[i].execute(alasql$1.useid, params));
			}
		}
	}
	if(useid !== databaseid){
		alasql$1.use(useid);
	}

	if(cb){
		cb(res);
	}

	alasql$1.res = res;

	return res;
};

/**
  Run multiple statements and return array of results async
 */
alasql$1.adrun = function (databaseid, ast, params, cb, scope) {
//	alasql.busy++;
	var useid = alasql$1.useid;
	if(useid !== databaseid) {
		alasql$1.use(databaseid);
	}
	var res = [];



	function adrunone(data) {
		if(data !== undefined){
			res.push(data);
		}
		var astatement = ast.statements.shift();
		if(!astatement) {
			if(useid !== databaseid){
				alasql$1.use(useid);
			}
			cb(res);
//			alasql.busy--;
//			if(alasql.busy<0) alasql.busy = 0;
		} else {
			if(astatement.compile) {
				var statement = astatement.compile(alasql$1.useid);
				statement(params, adrunone, scope);
			} else {
				alasql$1.precompile(ast.statements[0],alasql$1.useid,params);
				astatement.execute(alasql$1.useid, params, adrunone);
			}
		}
	}

	adrunone(); /** @todo Check, why data is empty here */
};



/**
 Compile statement to JavaScript function
 @param {string} sql SQL statement
 @param {string} databaseid Database identificator
 @return {functions} Compiled statement functions
*/
alasql$1.compile= function(sql, databaseid) {

	databaseid = databaseid || alasql$1.useid;

	var ast = alasql$1.parse(sql); // Create AST

	if(1 === ast.statements.length) {
		var statement = ast.statements[0].compile(databaseid)
		statement.promise = function(params){
		    return new Promise(function(resolve, reject){
		        statement(params, function(data,err) {
		             if(err) {
		                 reject(err);
		             } else {
		                 resolve(data);
		             }
		        });
		    });
		};

		return statement;

	} else {
		throw new Error('Cannot compile, because number of statements in SQL is not equal to 1');
	}
};

/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// SELECT Compile functions
// formerly 421join.js
// /yy.Select.prototype.compileJoins
// Compile JOIN caluese
function compileJoins(query) {
//	console.log(this);
//	debugger;
	var self = this;

	this.joins.forEach(function(jn){

		// Test CROSS-JOIN
		if(jn.joinmode == "CROSS") {
			if(jn.using || jn.on) {
				throw new Error('CROSS JOIN cannot have USING or ON clauses');
			} else {
				jn.joinmode == "INNER";
			}
		}

		var source;
		var tq;

		if(jn instanceof yy.Apply) {
//			console.log('APPLY',jn.applymode);
			source = {
				alias: jn.as,
				applymode: jn.applymode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue,
				columns: [] // TODO check this
			};
			source.applyselect = jn.select.compile(query.database.databaseid);
			source.columns = source.applyselect.query.columns;

			source.datafn = function(query,params,cb,idx, alasql) {
				var res;
				if(cb) res = cb(res,idx,query);
				return res;
			}

			query.sources.push(source);
		} else {

		if(jn.table) {
			tq = jn.table;
			source = {
				alias: jn.as||tq.tableid,
				databaseid: tq.databaseid || query.database.databaseid,
				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue,
				columns: []
			};
			//

//			console.log(source.databaseid, source.tableid);
			if(!alasql$1.databases[source.databaseid].tables[source.tableid]) {
				throw new Error('Table \''+source.tableid+
				'\' is not exists in database \''+source.databaseid)+'\'';
			};

			source.columns = alasql$1.databases[source.databaseid].tables[source.tableid].columns;

			// source.data = query.database.tables[source.tableid].data;
			if(alasql$1.options.autocommit && alasql$1.databases[source.databaseid].engineid) {
//				console.log(997,alasql.databases[source.databaseid].engineid);
				source.datafn = function(query,params, cb, idx, alasql) {
//					console.log(777,arguments);
					return alasql.engines[alasql.databases[source.databaseid].engineid].fromTable(
						source.databaseid, source.tableid, cb, idx,query);
				}
			} else if(alasql$1.databases[source.databaseid].tables[source.tableid].view){
				source.datafn = function(query,params,cb,idx, alasql) {
					var res = alasql.databases[source.databaseid].tables[source.tableid].select(params);
					if(cb) res = cb(res,idx,query);
					return res;
				}
			} else {
				source.datafn = function(query,params,cb, idx, alasql) {
					var res = alasql.databases[source.databaseid].tables[source.tableid].data;
					if(cb) res = cb(res,idx,query);
					return res;
				}
			};

//		var alias = jn.as || tq.tableid;
//		if(tq) {
			query.aliases[source.alias] = {tableid: tq.tableid, databaseid: tq.databaseid || query.database.databaseid};
//		}


		} else if(jn.select) {
			var tq = jn.select;
			source = {
				alias: jn.as,
//				databaseid: jn.databaseid || query.database.databaseid,
//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue,
				columns: []
			};

			source.subquery = tq.compile(query.database.databaseid);
			if(typeof source.subquery.query.modifier == 'undefined') {
				source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			}
			source.columns = source.subquery.query.columns;

//			if(jn instanceof yy.Apply) {
				source.datafn = function(query, params, cb, idx, alasql) {
//					return cb(null,idx,alasql);
					return source.subquery(query.params, null, cb, idx).data;
				}
			// } else {
			// 	source.datafn = function(query, params, cb, idx, alasql) {
			// 		return source.subquery(query.params, null, cb, idx);
			// 	}
			// }
			query.aliases[source.alias] = {type:'subquery'};
		} else if(jn.param) {
			source = {
				alias: jn.as,
//				databaseid: jn.databaseid || query.database.databaseid,
//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;
			var jnparam = jn.param.param;
//			console.log(jn, jnparam);
			var ps = "var res=alasql.prepareFromData(params['"+jnparam+"']";
			if(jn.array) ps += ",true";
			ps += ");if(cb)res=cb(res, idx, query);return res";

			source.datafn = new Function('query,params,cb,idx, alasql',ps);
			query.aliases[source.alias] = {type:'paramvalue'};
		} else if(jn.variable) {
			source = {
				alias: jn.as,
//				databaseid: jn.databaseid || query.database.databaseid,
//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;
//			var jnparam = jn.param.param;
//			console.log(jn, jnparam);
			var ps = "var res=alasql.prepareFromData(alasql.vars['"+jn.variable+"']";
			if(jn.array) ps += ",true";
			ps += ");if(cb)res=cb(res, idx, query);return res";

			source.datafn = new Function('query,params,cb,idx, alasql',ps);
			query.aliases[source.alias] = {type:'varvalue'};
		} else if(jn.funcid) {
			source = {
				alias: jn.as,
//				databaseid: jn.databaseid || query.database.databaseid,
//				tableid: tq.tableid,
				joinmode: jn.joinmode,
				onmiddlefn: returnTrue,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue
			};
			// source.data = ;

/*
			var jnparam = jn.param.param;
			source.datafn = new Function('query,params,cb,idx',
				"var res=alasql.prepareFromData(params['"+jnparam+"']);if(cb)res=cb(res, idx, query);return res");
*/

			var s = "var res=alasql.from['"+js.funcid.toUpperCase()+"'](";
			// if(tq.args && tq.args.length>0) {
			// 	s += tq.args.map(function(arg){
			// 		return arg.toJS();
			// 	}).concat('cb,idx,query').join(',');
			// }
			// if(tq.args && tq.args.length>0) {
			// 	s += tq.args.map(function(arg){
			// 		return arg.toJS();
			// 	}).concat().join(',');
			// }
			if(jn.args && jn.args.length>0) {
				if(jn.args[0]) {
					s += jn.args[0].toJS('query.oldscope')+',';
				} else {
					s += 'null,';
				};
				if(jn.args[1]) {
					s += jn.args[1].toJS('query.oldscope')+',';
				} else {
					s += 'null,';
				};
			} else {
				s += 'null,null,'
			}
			s += 'cb,idx,query';
			s += ');/*if(cb)res=cb(res,idx,query);*/return res';
//	console.log(s);
			source.datafn = new Function('query, params, cb, idx, alasql',s);

			query.aliases[source.alias] = {type:'funcvalue'};
		}
/*
		} else if(tq instanceof yy.Select) {
			query.aliases[alias] = {type:'subquery'};
		} else if(tq instanceof yy.ParamValue) {
			query.aliases[alias] = {type:'paramvalue'};
		} else if(tq instanceof yy.FuncValue) {
			query.aliases[alias] = {type:'paramvalue'};
		} else {
			throw new Error('Wrong table at FROM');
		}
*/
		var alias = source.alias;

		// Test NATURAL-JOIN
		if(jn.natural) {
			if(jn.using || jn.on) {
				throw new Error('NATURAL JOIN cannot have USING or ON clauses');
			} else {
//				source.joinmode == "INNER";
				if(query.sources.length > 0) {
					var prevSource = query.sources[query.sources.length-1];
					var prevTable = alasql$1.databases[prevSource.databaseid].tables[prevSource.tableid];
					var table = alasql$1.databases[source.databaseid].tables[source.tableid];

					if(prevTable && table) {
						var c1 = prevTable.columns.map(function(col){return col.columnid});
						var c2 = table.columns.map(function(col){return col.columnid});
						jn.using = arrayIntersect(c1,c2).map(function(colid){return {columnid:colid}});
//						console.log(jn.using);
					} else {
						throw new Error('In this version of Alasql NATURAL JOIN '+
							'works for tables with predefined columns only');
					};
				}
			}
		}







		if(jn.using) {
			var prevSource = query.sources[query.sources.length-1];
//			console.log(query.sources[0],prevSource,source);
			source.onleftfns = jn.using.map(function(col){
//				console.log(141,colid);
				return "p['"+(prevSource.alias||prevSource.tableid)+"']['"+col.columnid+"']";
			}).join('+"`"+');



			source.onleftfn = new Function('p,params,alasql','var y;return '+source.onleftfns);

			source.onrightfns = jn.using.map(function(col){
				return "p['"+(source.alias||source.tableid)+"']['"+col.columnid+"']";
			}).join('+"`"+');
			source.onrightfn = new Function('p,params,alasql','var y;return '+source.onrightfns);
			source.optimization = 'ix';
//			console.log(151,source.onleftfns, source.onrightfns);
//			console.log(source);
		} else if(jn.on) {
//console.log(jn.on);
			if(jn.on instanceof yy.Op && jn.on.op == '=' && !jn.on.allsome) {
//				console.log('ix optimization', jn.on.toJS('p',query.defaultTableid) );
				source.optimization = 'ix';
			// 	source.onleftfns = jn.on.left.toJS('p',query.defaultTableid);
			// 	source.onleftfn = new Function('p', 'return '+source.onleftfns);
			// 	source.onrightfns = jn.on.right.toJS('p',query.defaultTableid);
			// 	source.onrightfn = new Function('p', 'return '+source.onrightfns);

				var lefts = '';
				var rights = '';
				var middles = '';
				var middlef = false;
				// Test right and left sides
				var ls = jn.on.left.toJS('p',query.defaultTableid,query.defcols);
				var rs = jn.on.right.toJS('p',query.defaultTableid,query.defcols);

				if((ls.indexOf("p['"+alias+"']")>-1) && !(rs.indexOf("p['"+alias+"']")>-1)){
					if((ls.match(/p\[\'.*?\'\]/g)||[]).every(function(s){
						return s == "p['"+alias+"']"})) { rights = ls; }
						else { middlef = true };

				} else 	if(!(ls.indexOf("p['"+alias+"']")>-1) && (rs.indexOf("p['"+alias+"']")>-1)){
					if((rs.match(/p\[\'.*?\'\]/g)||[]).every(function(s){
						return s == "p['"+alias+"']"})) { lefts = ls; }
						else { middlef = true };
				} else {
					middlef = true;
				}

//				console.log(alias, 1,lefts, rights, middlef);

				if((rs.indexOf("p['"+alias+"']")>-1) && !(ls.indexOf("p['"+alias+"']")>-1)){
					if((rs.match(/p\[\'.*?\'\]/g)||[]).every(function(s){
						return s == "p['"+alias+"']"})) { rights = rs; }
						else { middlef = true };
				} else if(!(rs.indexOf("p['"+alias+"']")>-1) && (ls.indexOf("p['"+alias+"']")>-1)){
					if((ls.match(/p\[\'.*?\'\]/g)||[]).every(function(s){
						return s == "p['"+alias+"']"})) { lefts = rs; }
						else { middlef = true };
				} else {
					middlef = true;
				}

//				console.log(alias, 2,lefts, rights, middlef);

				if(middlef) {
//					middles = jn.on.toJS('p',query.defaultTableid);
//				} else {
					rights = '';
					lefts = '';
					middles = jn.on.toJS('p',query.defaultTableid,query.defcols);
					source.optimization = 'no';
					// What to here?
				}

				source.onleftfns = lefts;
				source.onrightfns = rights;
				source.onmiddlefns = middles || 'true';
//			console.log(source.onleftfns, '-',source.onrightfns, '-',source.onmiddlefns);

				source.onleftfn = new Function('p,params,alasql', 'var y;return '+source.onleftfns);
				source.onrightfn = new Function('p,params,alasql', 'var y;return '+source.onrightfns);
				source.onmiddlefn = new Function('p,params,alasql', 'var y;return '+source.onmiddlefns);

//			} else if(jn.on instanceof yy.Op && jn.on.op == 'AND') {
//				console.log('join on and ',jn);

			} else {
//				console.log('no optimization');
				source.optimization = 'no';
//				source.onleftfn = returnTrue;
//				source.onleftfns = "true";
				source.onmiddlefns = jn.on.toJS('p',query.defaultTableid,query.defcols);
				source.onmiddlefn = new Function('p,params,alasql','var y;return '+jn.on.toJS('p',query.defaultTableid,query.defcols));
			};
//			console.log(source.onleftfns, source.onrightfns, source.onmiddlefns);

			// Optimization function
		};
		query.sources.push(source);
		};
	});
//	console.log('sources',query.sources);
}

/*
//
// Functions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//TODO import alasql

function FuncValue$1(params){ return extend(this, params); }

FuncValue$1.prototype.toString = function() {
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
	if(this.as) s += ' AS '+this.as.toString();
//	if(this.alias) s += ' AS '+this.alias;
	return s;
}



FuncValue$1.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	alasql.precompile(this,databaseid,params); // Precompile queries
//	console.log(34,this.toJS('','',null));
	var expr =  new Function('params,alasql','var y;return '+this.toJS('','',null));
	expr(params,alasql);
	if(cb) res = cb(res);
	return res;
}


FuncValue$1.prototype.findAggregator = function(query) {
	if(this.args && this.args.length > 0) {
		this.args.forEach(function(arg){
			if(arg.findAggregator) arg.findAggregator(query);
		});
	}
};

FuncValue$1.prototype.toJS = function(context, tableid, defcols) {
	var s = '';
    var funcid = this.funcid;
	// IF this is standard compile functions
	if(alasql.fn[funcid]) {
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
	} else if(alasql.stdlib[funcid.toUpperCase()]) {
		if(this.args && this.args.length > 0) {
			s += alasql.stdlib[funcid.toUpperCase()].apply(this, this.args.map(function(arg) {return arg.toJS(context, tableid)}));
		} else {
			s += alasql.stdlib[funcid.toUpperCase()]();
		}
	} else if(alasql.stdfn[funcid.toUpperCase()]) {
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
		// Aggregator
	}
//console.log('userfn:',s,this);

//	if(this.alias) s += ' AS '+this.alias;
	return s;
}

function GroupExpression(params){ return yy.extend(this, params); }
GroupExpression.prototype.toString = function() {
	return this.type+'('+this.group.toString()+')';
}

/*
//
// ROLLUP(), CUBE(), GROUPING SETS() for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/**
 Calculate ROLLUP() combination
 */

 //formely 43rollup.js

function rollup(a,query) {
	var rr = [];
	var mask = 0;
	var glen = a.length;
	for(var g=0;g<glen+1;g++) {
		var ss = [];
		for(var i=0;i<glen;i++) {
		 	if(a[i] instanceof yy.Column) {
				a[i].nick = escapeq(a[i].columnid);

		 		query.groupColumns[escapeq(a[i].columnid)] = a[i].nick;
				var aaa = a[i].nick+'\t'
					+a[i].toJS('p',query.sources[0].alias,query.defcols);
		 	} else {
		 		query.groupColumns[escapeq(a[i].toString())] = escapeq(a[i].toString());
				var aaa = escapeq(a[i].toString())+'\t'
					+a[i].toJS('p',query.sources[0].alias,query.defcols);
			}

			if(mask&(1<<i)) ss.push(aaa);
		}
		rr.push(ss);
		mask = (mask<<1)+1;
	};
	return rr;
};

/**
 Calculate CUBE()
 */
function cube(a,query) {
	var rr = [];
	var glen = a.length;
	for(var g=0;g<(1<<glen);g++) {
		var ss = [];
		for(var i=0;i<glen;i++) {
			if(g&(1<<i)) //ss.push(a[i]);
				//ss = cartes(ss,decartes(a[i]));

//				var aaa = a[i].toString()+'\t'
//					+a[i].toJS('p',query.sources[0].alias,query.defcols);

				ss = ss.concat(decartes(a[i],query));
				//
		}
		rr.push(ss);
	}
	return rr;
}

/**
 GROUPING SETS()
 */
function groupingsets(a,query) {
	return a.reduce(function(acc,d){
		acc = acc.concat(decartes(d,query));
		return acc;
	}, []);
}

/**
 Cartesian production
 */
function cartes(a1,a2){
	var rrr =[];
	for(var i1=0;i1<a1.length;i1++) {
		for(var i2=0;i2<a2.length;i2++) {
			rrr.push(a1[i1].concat(a2[i2]));
		}
	};
	return rrr;
}

/**
 Prepare groups function
 */
function decartes(gv,query) {
//	console.log(gv);
	if(gv instanceof Array) {
		var res = [[]];
		for(var t=0; t<gv.length; t++) {
			if(gv[t] instanceof Column) {
			//	console.log('+++',gv[t].columnid,gv[t]);
				gv[t].nick = escapeq(gv[t].columnid);
			 	query.groupColumns[gv[t].nick] = gv[t].nick;
		 		res = res.map(function(r){return r.concat(gv[t].nick+'\t'+gv[t].toJS('p',query.sources[0].alias,query.defcols))});
//		 		res = res.map(function(r){return r.concat(gv[t].columnid)});
			} else if(gv[t] instanceof FuncValue$1) {
				query.groupColumns[escapeq(gv[t].toString())] = escapeq(gv[t].toString());
		 		res = res.map(function(r){return r.concat(escapeq(gv[t].toString())+'\t'+gv[t].toJS('p',query.sources[0].alias,query.defcols))});
		 		// to be defined
			} else if(gv[t] instanceof GroupExpression) {
				if(gv[t].type == 'ROLLUP') res = cartes(res,rollup(gv[t].group,query));
				else if(gv[t].type == 'CUBE') res = cartes(res,cube(gv[t].group,query));
				else if(gv[t].type == 'GROUPING SETS') res = cartes(res,groupingsets(gv[t].group,query));
				else throw new Error('Unknown grouping function');
			} else if(gv[t] === '') {
//				console.log('+++');
				res = [['1\t1']];
			} else {
//				if(gv[t])
//				console.log('>'+gv[t]+'<',gv[t]=='',typeof gv[t]);
//				console.log(gv[t].toString());
//console.log('+++');
		 		res = res.map(function(r){
 					query.groupColumns[escapeq(gv[t].toString())] = escapeq(gv[t].toString());
		 			return r.concat(escapeq(gv[t].toString())
		 				+'\t'
		 				+gv[t].toJS('p',query.sources[0].alias,query.defcols))
		 		});
//				res = res.concat(gv[t]);
			};

			// switch(gv[t].t) {
			// 	case 'plain':
			// 		res = res.map(function(r){return r.concat(gv[t].p)});

			// 	break;
			// 	case 'rollup': res = cartes(res,rollup(gv[t].p)); break;
			// 	case 'cube': res = cartes(res,cube(gv[t].p)); break;
			// 	case 'groupingsets': res = cartes(res,groupingsets(gv[t].p)); break;
			// 	default: res = res.concat(gv[t]);
			// }
		};
		return res;
	} else if(gv instanceof FuncValue$1) {
//		console.log(gv);
		query.groupColumns[escapeq(gv.toString())] = escapeq(gv.toString());
		return [gv.toString()+'\t'+gv.toJS('p',query.sources[0].alias,query.defcols)];
	} else if(gv instanceof yy.Column) {
			gv.nick = escapeq(gv.columnid);
		 	query.groupColumns[gv.nick] = gv.nick;
			return [gv.nick+'\t'+gv.toJS('p',query.sources[0].alias,query.defcols)]; // Is this ever happened?
		// } else if(gv instanceof yy.Expression) {
		// 	return [gv.columnid]; // Is this ever happened?
	} else {
		query.groupColumns[escapeq(gv.toString())] = escapeq(gv.toString());
		return [escapeq(gv.toString())+'\t'+gv.toJS('p',query.sources[0].alias,query.defcols)];
//			throw new Error('Single argument in the group without array');
	};


		// switch(gv.t) {
		// 	case 'plain': return gv.p; break;
		// 	case 'rollup': return rollup(gv.p); break;
		// 	case 'cube': return cube(gv.p); break;
		// 	case 'groupingsets':  return groupingsets(gv.p); break;
		// 	default: return [gv];//return decartes(gv.p);
		// }
		// return gv;
};

/***
  @description Array Utils
***/
/**
    Union arrays
    @function
    @param {array} a
    @param {array} b
    @return {array}
*/
function arrayUnion(a,b) {
    var r = b.slice(0);
    a.forEach(function(i){
                            if (r.indexOf(i) < 0){
                                r.push(i);
                            }
                        });
    return r;
}

/**
 Array Difference
 */
function arrayDiff(a,b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};

/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

/**
 Compile group of statements
 */
 //formerly 423groupby.js
 //yy.Select.prototype.compileGroup
function compileGroup(query) {
//	console.log(this.group);
	if(query.sources.length > 0) {
		var tableid = query.sources[0].alias;
	} else {
		// If SELECT contains group aggregators without source tables
		var tableid = '';
	}
	var defcols = query.defcols;
//	console.log(16,tableid, defcols);

//	console.log(query.sources[0].alias,query.defcols);
	var allgroup = [[]];
	if(this.group) {
		allgroup = decartes(this.group,query);
	}
//	console.log(23,allgroup);

//	console.log(allgroup);
	// Prepare groups
	//var allgroup = [['a'], ['a','b'], ['a', 'b', 'c']];

	// Union all arrays to get a maximum
	var allgroups = [];
	allgroup.forEach(function(a){
		allgroups = arrayUnion(allgroups, a);
	});

	query.allgroups = allgroups;

//console.log(42,294, this.group);
//console.log(allgroups);
//		console.log(42,364,query.selectColumns)

/*
if(false) {
	allgroups.forEach(function(col2){
//		console.log(42,365,colid, query.selectColumns[colid])
		if(query.selectColumns[colid]) {
//			console.log(colid,'ok');
		} else {
//			if(colid.indexOf())
//			console.log(colid,'bad');
			var tmpid = 'default';
			if(query.sources.length > 0) tmpid = query.sources[0].alias;
//			console.log(new yy.Column({columnid:colid}).toJS('p',query.sources[0].alias));
//			query.selectfns += 'r[\''+colid+'\']=p[\''+tmpid+'\'][\''+colid+'\'];';
//console.log(374, colid);
			if(Object.keys(query.selectColumns).length != 0) query.removeKeys.push(colid);
			query.selectfns += 'r[\''+escapeq(colid)+'\']='+(new yy.Column({columnid:colid}).toJS('p',tmpid))+';';
		}
	});
};
*/
	// Create negative array

	var s = '';
//	s+= query.selectfns;

	allgroup.forEach(function(agroup) {
//console.log(agroup);

		// Start of group function
		s += 'var acc,g=this.xgroups[';

	//	var gcols = this.group.map(function(col){return col.columnid}); // Group fields with r
		// Array with group columns from record
		var rg = agroup.map(function(col2){
			var columnid = col2.split('\t')[0];
			var coljs = col2.split('\t')[1];
			// Check, if aggregator exists but GROUP BY is not exists
			if(columnid === ''){
				return '1'; // Create fictive groupping column for fictive GROUP BY
			}
//			else return "r['"+columnid+"']";
			return coljs;
		});

		if(rg.length === 0){
			rg = ["''"];
		}

	//	console.log('rg',rg);

		s += rg.join('+"`"+');
		s += '];if(!g) {this.groups.push((g=this.xgroups[';
		s += rg.join('+"`"+');
		s += '] = {';
//		s += ']=r';
		s += agroup.map(function(col2){
			var columnid = col2.split('\t')[0];
			var coljs = col2.split('\t')[1];

			if(columnid === ''){
				return '';
			}

			return "'"+columnid+"':"+coljs+",";
		}).join('');

		var neggroup = arrayDiff(allgroups,agroup);

//		console.log(neggroup);

		s += neggroup.map(function(col2){
			var columnid = col2.split('\t')[0];
		//	var coljs = col2.split('\t')[1]
			return "'"+columnid+"':null,";
		}).join('');

		var aft = '';
//		s += self.columns.map(function(col){
//console.log('query.selectGroup',query.selectGroup);
		s += query.selectGroup.map(function(col){
//console.log(idx, col.toString(), col.as);
			var colexp = col.expression.toJS("p",tableid,defcols);
			var colas = col.nick;
			// if(typeof colas == 'undefined') {
			// 	if(col instanceof yy.Column) colas = col.columnid;
			// 	else colas = col.toString();
			// };
			if (col instanceof AggrValue) {
				if(col.distinct) {
					aft += ',g[\'$$_VALUES_'+colas+'\']={},g[\'$$_VALUES_'+colas+'\']['+colexp+']=true';
				}
				if (col.aggregatorid === 'SUM'
//					|| col.aggregatorid == 'AVG'
//				) { return "'"+col.as+'\':r[\''+col.as+'\'],'; }//f.field.arguments[0].toJS();
				){
					return "'"+colas+'\':('+colexp+')||0,'; //f.field.arguments[0].toJS();

				} else if (
							col.aggregatorid === 'MIN'
							|| col.aggregatorid === 'MAX'
							|| col.aggregatorid === 'FIRST'
							|| col.aggregatorid === 'LAST'
		//					|| col.aggregatorid == 'AVG'
//							) { return "'"+col.as+'\':r[\''+col.as+'\'],'; }//f.field.arguments[0].toJS();
				){
					return "'"+colas+'\':'+colexp+','; //f.field.arguments[0].toJS();

				} else if(col.aggregatorid === 'ARRAY') {
				 	return "'"+colas+'\':['+colexp+'],';

				} else if(col.aggregatorid === 'COUNT') {
					if(col.expression.columnid === '*') {
						return "'"+colas+'\':1,';
					} else {
//						return "'"+colas+'\':(typeof '+colexp+' != "undefined")?1:0,';
//					} else {
						return "'"+colas+'\':(typeof '+colexp+' != "undefined")?1:0,';
					}

//				else if(col.aggregatorid == 'MIN') { return "'"+col.as+'\':r[\''+col.as+'\'],'; }
//				else if(col.aggregatorid == 'MAX') { return "'"+col.as+'\':r[\''+col.as+'\'],'; }
				} else if(col.aggregatorid === 'AVG') {
					query.removeKeys.push('_SUM_'+colas);
					query.removeKeys.push('_COUNT_'+colas);

					return	''
							+ "'" + colas + '\':' + colexp + ',\'_SUM_'
							+ colas+'\':(' + colexp + ')||0,\'_COUNT_'
							+ colas + '\':(typeof '
							+ colexp+' != "undefined")?1:0,';
				} else if(col.aggregatorid === 'AGGR') {
					aft += ',g[\''+colas+'\']='+col.expression.toJS('g',-1);
					return '';
				} else if(col.aggregatorid === 'REDUCE') {
					query.removeKeys.push('_REDUCE_'+colas);
					return "'"+colas+'\':alasql.aggr[\''+col.funcid+'\']('+colexp+',undefined,(acc={})),'
					+'\'__REDUCE__'+colas+'\':acc,';
				}
				return '';
			}

			return '';

		}).join('');





		// columnid:r.columnid
	//	var srg = [];//rg.map(function(fn){ return (fn+':'+fn); });

	//	var srg = this.group.map(function(col){
	//		if(col == '') return '';
	//		else return col.columnid+':'+col.toJS('r','');
	//	});

	// Initializw aggregators

	/*
		this.columns.forEach(function(col){
	//		console.log(f);
	//			if(f.constructor.name == 'LiteralValue') return '';


			if (col instanceof yy.AggrValue) {
				if (col.aggregatorid == 'SUM') { srg.push("'"+col.as+'\':0'); }//f.field.arguments[0].toJS();
				else if(col.aggregatorid == 'COUNT') {srg.push( "'"+col.as+'\':0'); }
				else if(col.aggregatorid == 'MIN') { srg.push( "'"+col.as+'\':Infinity'); }
				else if(col.aggregatorid == 'MAX') { srg.push( "'"+col.as+'\':-Infinity'); }
	//			else if(col.aggregatorid == 'AVG') { srg.push(col.as+':0'); }
	//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJS('rec','')+';'; //f.field.arguments[0].toJS();
			};

		});

	*/

	/*****************/

	//	s += srg.join(',');

		// var ss = [];
		// gff.forEach(function(fn){
		// 	ss.push(fn+':rec.'+fn);
		// });
		// s += ss.join(',');
	//	s += '});};';

		s += '}'+aft+',g));} else {';
	//	console.log(s, this.columns);



	// var neggroup = arrayDiff(allgroups,agroup);

	// console.log(agroup,neggroup);

	// s += neggroup.map(function(columnid){
	// 	return "g['"+columnid+"']=null;";
	// }).join('');

	// console.log(s);


	//console.log(query.selectfn);
//		s += self.columns.map(function(col){
		s += query.selectGroup.map(function(col){
			var colas = col.nick;
			// if(typeof colas == 'undefined') {
			// 	if(col instanceof yy.Column) colas = col.columnid;
			// 	else colas = col.toString();
			// }
			var colexp = col.expression.toJS("p",tableid,defcols);

			if (col instanceof AggrValue) {
				var pre = '', post = '';
				if(col.distinct) {
			 		var pre = 'if(typeof '+colexp+'!="undefined" && (!g[\'$$_VALUES_'+colas+'\']['+colexp+'])) \
				 		 {';
				 	var post = 'g[\'$$_VALUES_'+colas+'\']['+colexp+']=true;}';
				}
				if (col.aggregatorid === 'SUM') {
					return pre+'g[\''+colas+'\']+=('+colexp+'||0);'+post; //f.field.arguments[0].toJS();
				} else if(col.aggregatorid === 'COUNT') {
//					console.log(221,col.expression.columnid == '*');
					if(col.expression.columnid === '*'){
						return pre+'g[\''+colas+'\']++;'+post;
					} else {
						return pre+'if(typeof '+colexp+'!="undefined") g[\''+colas+'\']++;'+post;
					}

				} else if(col.aggregatorid === 'ARRAY') {
					return pre+'g[\''+colas+'\'].push('+colexp+');'+post;

				} else if(col.aggregatorid === 'MIN') {
					return pre+'g[\''+colas+'\']=Math.min(g[\''+colas+'\'],'+colexp+');'+post;

				} else if(col.aggregatorid === 'MAX') {
					return pre+'g[\''+colas+'\']=Math.max(g[\''+colas+'\'],'+colexp+');'+post;

				} else if(col.aggregatorid === 'FIRST') {
					return '';

				} else if(col.aggregatorid === 'LAST') {
					return pre+'g[\''+colas+'\']='+colexp+';'+post;

				} else if(col.aggregatorid === 'AVG') {
						return 	''
								+ pre+'g[\'_SUM_'+colas+'\']+=(y='+colexp+')||0;'
								+ 'g[\'_COUNT_'+colas+'\']+=(typeof y!="undefined")?1:0;'
								+ 'g[\''+colas+'\']=g[\'_SUM_'+colas+'\']/g[\'_COUNT_'+colas+'\'];'
								+ post;
//					 }
	//			else if(col.aggregatorid == 'AVG') { srg.push(colas+':0'); }
				} else if(col.aggregatorid === 'AGGR') {
					return 	''
							+ pre+'g[\''+colas+'\']='
					     	+ col.expression.toJS('g',-1)+';'
					     	+ post;

				} else if(col.aggregatorid === 'REDUCE') {
					return 	''
							+ pre+'g[\''+colas+'\']=alasql.aggr.'
							+ col.funcid+'('+colexp+',g[\''+colas+'\'],g[\'__REDUCE__'+colas+'\']);'
							+ post;
				}

				return '';
			}

			return '';
		}).join('');


	//	s += selectFields.map(function(f){
	//			console.log(f);
	//			if(f.constructor.name == 'LiteralValue') return '';
	//			if (f.field instanceof SQLParser.nodes.FunctionValue
	//				&& (f.field.name.toUpperCase() == 'SUM' || f.field.name.toUpperCase() == 'COUNT')) {
	//				return 'group.'+f.name.value+'=+(+group.'+f.name.value+'||0)+'+f.field.arguments[0].toJS('rec','')+';'; //f.field.arguments[0].toJS();
	//				return 'group.'+f.name.value+'+='+f.field.arguments[0].toJS('rec','')+';'; //f.field.arguments[0].toJS();
	//				return 'group.'+f.name.value+'+=rec.'+f.name.value+';'; //f.field.arguments[0].toJS();
	//			};
	//			return '';
	//		}).join('');

		//s += '	group.amt += rec.emplid;';
		//s += 'group.count++;';
		s += '}';

	});

//		console.log('groupfn',s);
	return new Function('p,params,alasql',s);

}

//yy.Select.prototype.compileHaving
//formerly 425having.js

function compileHaving(query) {
	if(this.having) {
		s = this.having.toJS('g',-1);
		query.havingfns = s;
//		console.log(s);
		return new Function('g,params,alasql','var y;return '+s);
	} else return function(){return true};
};

//import {doSearch} from "./func.js";

/**
	Search class
	@class
	@example
	SEARCH SUM(/a) FROM ? -- search over parameter object
*/



function Search(params) { return yy.extend(this, params); }

Search.prototype.toString = function () {
	var s = 'SEARCH' + ' ';
	if (this.selectors){
		s += this.selectors.toString();
	}
	if (this.from){
		s += 'FROM' + ' ' + this.from.toString();
	}
//console.log(s);
	return s;
};

Search.prototype.toJS = function(context) {
//		console.log('yy.CreateVertex.toJS');
	var s = 'this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')';
	// var s = '';
	return s;
};

Search.prototype.compile = function(databaseid) {
	var dbid = databaseid;
	var self = this;

	var statement = function(params,cb){
				// console.log(31,self);
				// console.log(32,arguments);
		var res;
		doSearch.bind(self)(dbid,params,function(data){
			// console.log(35,data);
			res = modify(statement.query,data);
			// console.log(37,data);
			if(cb){
				res = cb(res);
			}
		});
			// console.log(39,res);
//		if(cb) res = cb(res);
		return res;
	};
	statement.query = {};
	return statement;
};

function VarValue$1(params) { return yy.extend(this, params); }
VarValue$1.prototype.toString = function() {
	return '@'+this.variable;
};

VarValue$1.prototype.toType = function() {
	return 'unknown';
};

VarValue$1.prototype.toJS = function() {
	return "alasql.vars['"+this.variable+"']";
}

// Alasql Linq library

function FromData(params) { return extend(this, params); };
FromData.prototype.toString = function() {
	if(this.data) return 'DATA('+((Math.random()*10e15)|0)+')';
	else return '?';
};
FromData.prototype.toJS = function(){
//	console.log('yy.FromData.prototype.toJS');
};

//formerly alasql.utils.JSONtoString
//formerly 58json.js
function JSONtoString(obj) {
	var s = '';
	if(typeof obj == "string") s = '"'+obj+'"';
	else if(typeof obj == "number") s = obj;
	else if(typeof obj == "boolean") s = obj;
	else if(typeof obj == "object") {
		if(obj instanceof Array) {
			s += '['+obj.map(function(b){
				return JSONtoString(b);
			}).join(',')+']';
		} else if(!obj.toJS || obj instanceof yy.Json) {
			// to prevent recursion
			s = '{';
			var ss = [];
			for(var k in obj) {
				var s1 = '';
				if(typeof k == "string") s1 += '"'+k+'"';
				else if(typeof k == "number") s1 += k;
				else if(typeof k == "boolean") s1 += k;
				else {
					throw new Error('THis is not ES6... no expressions on left side yet');
				}
				s1 += ':'+JSONtoString(obj[k]);
				ss.push(s1);
			};
			s += ss.join(',')+'}';
		} else if(obj.toString)	{
			s = obj.toString();
		} else {
			throw new Error('1Can not show JSON object '+JSON.stringify(obj));
		}
	} else {
		throw new Error('2Can not show JSON object '+JSON.stringify(obj));
	}

	return s;
}

function JSONtoJS(obj, context, tableid, defcols) {
	var s = '';
	if(typeof obj == "string") s = '"'+obj+'"';
	else if(typeof obj == "number") s = '('+obj+')';
	else if(typeof obj == "boolean") s = obj;
	else if(typeof obj == "object") {
		if(obj instanceof Array) {
			s += '['+obj.map(function(b){
				return JSONtoJS(b, context, tableid, defcols);
			}).join(',')+']';
		} else if(!obj.toJS || obj instanceof yy.Json) {
			// to prevent recursion
			s = '{';
			var ss = [];
			for(var k in obj) {
				var s1 = '';
				if(typeof k == "string") s1 += '"'+k+'"';
				else if(typeof k == "number") s1 += k;
				else if(typeof k == "boolean") s1 += k;
				else {
					throw new Error('THis is not ES6... no expressions on left side yet');
				}
				s1 += ':'+JSONtoJS(obj[k], context, tableid, defcols);
				ss.push(s1);
			};
			s += ss.join(',')+'}';
		} else if(obj.toJS)	{
			s = obj.toJS(context, tableid, defcols);
		} else {
			throw new Error('1Can not parse JSON object '+JSON.stringify(obj));
		}
	} else {
		throw new Error('2Can not parse JSON object '+JSON.stringify(obj));
	}

	return s;
}

//formerly 58json.js and yy.Json
function Json(params) { return yy.extend(this, params); }
Json.prototype.toString = function() {
	var s = ''; // '@'
	s += JSONtoString(this.value);
	s += '';
	return s;
};

Json.prototype.toJS = function(context, tableid, defcols) {
	// TODO reod
	return JSONtoJS(this.value,context, tableid, defcols);
}

/*
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//formerly from 50expression.js

/**
	Table class
	@class
*/

function Table$2(params) { return extend(this, params); };
Table$2.prototype.toString = function() {
	var s = this.tableid;
//	if(this.joinmode)
	if(this.databaseid){
		s = this.databaseid+'.'+s;
	}
	return s;
};

/*
//
// Select compiler part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//yy.Select.prototype.compileFrom
function compileFrom(query) {
//	console.log(1);
	var self = this;
	query.sources = [];
//	var tableid = this.from[0].tableid;
//	var as = '';
//	if(self.from[0].as) as = this.from[0].as;
//console.log(this);
	query.aliases = {};
	if(!self.from) return;

//console.log(self.from);

	self.from.forEach(function(tq){
		//console.log(tq);
//console.log(tq,tq.toJS());

		var alias = tq.as || tq.tableid;
//		console.log(alias);
		if(tq instanceof Table$2) {
//			console.log(tq, tq.databaseid, query);
			query.aliases[alias] = {tableid: tq.tableid, databaseid: tq.databaseid || query.database.databaseid, type:'table'};
		} else if(tq instanceof Select$1) {
			query.aliases[alias] = {type:'subquery'};
		} else if(tq instanceof Search) {
			query.aliases[alias] = {type:'subsearch'};
		} else if(tq instanceof ParamValue) {
			query.aliases[alias] = {type:'paramvalue'};
		} else if(tq instanceof FuncValue$1) {
			query.aliases[alias] = {type:'funcvalue'};
		} else if(tq instanceof VarValue$1) {
			query.aliases[alias] = {type:'varvalue'};
		} else if(tq instanceof FromData) {
			query.aliases[alias] = {type:'fromdata'};
		} else if(tq instanceof Json) {
			query.aliases[alias] = {type:'json'};
		} else {
			throw new Error('Wrong table at FROM');
		}

		var source = {
			alias: alias,
			databaseid: tq.databaseid || query.database.databaseid,
			tableid: tq.tableid,
			joinmode: 'INNER',
			onmiddlefn: returnTrue$1,
			srcwherefns: '',	// for optimization
			srcwherefn: returnTrue$1,
//			columns: []
		};

		if(tq instanceof Table$2) {
			// Get columns from table
			source.columns = alasql$1.databases[source.databaseid].tables[source.tableid].columns;
//			console.log('test',alasql.options.autocommit);
//				console.log(997,alasql.databases[source.databaseid].engineid);
// console.log(0,source.databaseid);
// console.log(1,alasql.databases[source.databaseid]);
// console.log(2,alasql.databases[source.databaseid].tables[source.tableid].view);
			if(alasql$1.options.autocommit && alasql$1.databases[source.databaseid].engineid) {
//				console.log(997,alasql.databases[source.databaseid].engineid);
// TODO -- make view for external engine
				source.datafn = function(query,params,cb,idx, alasql) {
					return alasql.engines[alasql.databases[source.databaseid].engineid].fromTable(
						source.databaseid, source.tableid,cb,idx,query);
				}
			} else if(alasql$1.databases[source.databaseid].tables[source.tableid].view){
				source.datafn = function(query,params,cb,idx, alasql) {
					var res = alasql.databases[source.databaseid].tables[source.tableid].select(params);
					if(cb) res = cb(res,idx,query);
					return res;
				}
			} else {
//				console.log('here');
//				console.log(420,72,alasql.databases[source.databaseid].tables[source.tableid]);
				source.datafn = function(query,params,cb,idx, alasql) {
				// if(!query) console.log('query');
				// if(!query.database) console.log('query');
				// if(!query.database.tables) console.log('query');
				// if(!source.tableid) console.log('query');
				// if(!query.database.tables[source.tableid]) console.log(query);
				// if(!query.database.tables[source.tableid].data) console.log('query');
					var res = alasql.databases[source.databaseid].tables[source.tableid].data;
//				console.log(500,res);
					if(cb) res = cb(res,idx,query);
//				console.log(600,res);
					return res;
//				return alasql.databases[source.databaseid].tables[source.tableid].data;
				};
			}
		} else if(tq instanceof Select$1) {

			source.subquery = tq.compile(query.database.databaseid);
			if(typeof source.subquery.query.modifier == 'undefined') {
				source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			}
			source.columns = source.subquery.query.columns;
//			console.log(101,source.columns);
//			tq.columns;

			source.datafn = function(query, params, cb, idx, alasql) {
//				return source.subquery(query.params, cb, idx, query);
				var res;
				source.subquery(query.params, function(data){
					res = data.data;
					if(cb) res = cb(res,idx,query);
					return res;
//					return data.data;
				});
//					console.log(515,res);
				return res;
			}

		} else if(tq instanceof Search) {

			 source.subsearch = tq;
			 source.columns = [];
			 //.compile(query.database.databaseid);
			// if(typeof source.subquery.query.modifier == 'undefined') {
			// 	source.subquery.query.modifier = 'RECORDSET'; // Subqueries always return recordsets
			// }
			// source.columns = source.subquery.query.columns;
//			console.log(101,source.columns);
//			tq.columns;

			source.datafn = function(query, params, cb, idx, alasql) {
//				return source.subquery(query.params, cb, idx, query);
				var res;
				source.subsearch.execute(query.database.databaseid,query.params,function(data){
					res = data;
					if(cb) res = cb(res,idx,query);
					return res;
//					return data.data;
				});
//					console.log(515,res);
				return res;
			}
		} else if(tq instanceof ParamValue) {

			var ps = "var res = alasql.prepareFromData(params['"+tq.param+"']";
//				console.log(tq);
			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);

		} else if(tq instanceof Json) {
			var ps = "var res = alasql.prepareFromData("+tq.toJS();
//				console.log(tq);
			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);
		} else if(tq instanceof VarValue$1) {
			var ps = "var res = alasql.prepareFromData(alasql.vars['"+tq.variable+"']";
//				console.log(tq);
			if(tq.array) ps+=",true";
			ps += ");if(cb)res=cb(res,idx,query);return res"
			source.datafn = new Function('query,params,cb,idx,alasql',ps);
		} else if(tq instanceof FuncValue$1) {
			var s = "var res=alasql.from['"+tq.funcid.toUpperCase()+"'](";
			// if(tq.args && tq.args.length>0) {
			// 	s += tq.args.map(function(arg){
			// 		return arg.toJS();
			// 	}).concat('cb,idx,query').join(',');
			// }
			// if(tq.args && tq.args.length>0) {
			// 	s += tq.args.map(function(arg){
			// 		return arg.toJS();
			// 	}).concat().join(',');
			// }
			if(tq.args && tq.args.length>0) {
				if(tq.args[0]) {
					s += tq.args[0].toJS('query.oldscope')+',';
				} else {
					s += 'null,';
				};
				if(tq.args[1]) {
					s += tq.args[1].toJS('query.oldscope')+',';
				} else {
					s += 'null,';
				};
			} else {
				s += 'null,null,'
			}
			s += 'cb,idx,query';
			s += ');/*if(cb)res=cb(res,idx,query);*/return res';
//	console.log(s);
			source.datafn = new Function('query, params, cb, idx, alasql',s);

		} else if(tq instanceof FromData) {
				source.datafn = function(query,params,cb,idx, alasql) {
					var res = tq.data;
					if(cb) res = cb(res,idx,query);
					return res;
				}
		} else {
			throw new Error('Wrong table at FROM');
		}
//		source.data = alasql.databases[source.databaseid].tables[source.tableid].data;
		query.sources.push(source);

	});
	// TODO Add joins
	query.defaultTableid = query.sources[0].alias;
//console.log(query.defaultTableid);
};

alasql$1.prepareFromData = function(data,array) {
//console.log(177,data,array);
	var res = data;
	if(typeof data == "string") {
		res = data.split(/\r?\n/);
		if(array) {
			for(var i=0, ilen=res.length; i<ilen;i++) {
				res[i] = [res[i]];
			}
		}
	} else if(array) {
		res = [];
		for(var i=0, ilen=data.length; i<ilen;i++) {
			res.push([data[i]]);
		}
//		console.log(res);
	} else if(typeof data == 'object' && !(data instanceof Array)) {
//	} else if(typeof data == 'object' && !(typeof data.length == 'undefined')) {
		if(typeof Mongo != 'undefined' && typeof Mongo.Collection != 'undefined'
			&& data instanceof Mongo.Collection) {
			res = data.find().fetch();
		} else {
			res = [];
			for(var key in data) {
				if(data.hasOwnProperty(key)) res.push([key,data[key]]);
			};
		}

//		console.log(res);
	};
//	console.log(typeof data);
	return res;
};

function compileDefCols(query, databaseid) {
//	console.log('defcols');
	var defcols = {};
	if(this.from) {
		this.from.forEach(function(fr){
			if(fr instanceof Table$2) {
				var alias = fr.as || fr.tableid;
//				console.log(alasql.databases[fr.databaseid || databaseid]);
//				console.log(alasql.databases[fr.databaseid || databaseid].tables, fr.tableid);
//console.log(alasql.databases[fr.databaseid || databaseid].tables, fr.tableid);
//console.log(alasql.databases);
				var table = alasql$1.databases[fr.databaseid || databaseid].tables[fr.tableid];
//console.log(table);
				if(table.columns) {
					table.columns.forEach(function(col){
						if(defcols[col.columnid]) {
							defcols[col.columnid] = '-'; // Ambigous
						} else {
							defcols[col.columnid] = alias;
						}
					});
				}
			} else if(fr instanceof Select$1) {

			} else if(fr instanceof Search) {

			} else if(fr instanceof ParamValue) {

			} else if(fr instanceof VarValue$1) {

			} else if(fr instanceof FuncValue$1) {

			} else if(fr instanceof FromData) {

			} else if(fr instanceof Json) {

			} else {
//				console.log(fr);
				throw new Error('Unknown type of FROM clause');
			};
		});
	};

	if(this.joins) {
		this.joins.forEach(function(jn){
//			console.log(jn);
			if(jn.table) {
				var alias = jn.table.tableid;
				if(jn.as) alias = jn.as;
				var alias = jn.as || jn.table.tableid;
				var table = alasql$1.databases[jn.table.databaseid || databaseid].tables[jn.table.tableid];
//				console.log(jn.table.tableid, jn.table.databaseid);
				if(table.columns) {
					table.columns.forEach(function(col){
						if(defcols[col.columnid]) {
							defcols[col.columnid] = '-'; // Ambigous
						} else {
							defcols[col.columnid] = alias;
						}
					});
				}
			} else if(jn.select) {

			} else if(jn.param) {

			} else if(jn.func) {

			} else {
				throw new Error('Unknown type of FROM clause');
			};
		});
	};
	// for(var k in defcols) {
	// 	if(defcols[k] == '-') defcols[k] = undefined;
	// }
//	console.log(defcols);
	return defcols;
}

// Pivot functions
/**
	Compile Pivot functions
	@param {object} query Source query
	@return {function} Pivoting functions
*/
//formerly 427pivot.js
//yy.Select.prototype.compilePivot
 function compilePivot(query) {
	/** @type {string} Main pivoting column */
	var columnid = this.pivot.columnid;


	return function(data){
		/** @type {object} Collection of grouped records */
		var gx = {};
		/** @type {array} Array of grouped records */
		var gr = [];

		/** For each row in data array */
		for(var i=0,ilen=data.length;i<ilen;i++) {
			var r = data[i];
			var q = g[r[columnid]];  // Take
			if(q === undefined) {
				q = g[r[columnid]] = clone(r);
				delete q[columnid];
				gr.push(q);
			};
			if(r[columnid]) {
				gfn(r,q,query.params,alasql);
			}
			q[r[columnid]] = arrfn(r);

		}
	};






if(false) {}
};

function Apply(params) {
	return extend(this, params);
}

Apply.prototype.toString = function () {
	var s = this.applymode+' APPLY ('+this.select.toString()+')';

	if(this.as)
		s += ' AS '+this.as;

	return s;
};

// Table class
//formerly 25queryclass.js
//TODO: handle the global alasql.Query
/**
 @class Query Main query class
 */
function Query(params){
	this.alasql = alasql$1;
//	console.log(12,alasql);
	// Columns
	this.columns = [];
	this.xcolumns = {};
	this.selectGroup = [];
	this.groupColumns = {};
	// Data array
	extend(this,params);
};

//
// Join all lines over sources
//

function doJoin (query, scope, h) {
//	console.log('doJoin', arguments);
//	console.log(query.sources.length);
	// Check, if this is a last join?
	if(h>=query.sources.length) {
//console.log(query.wherefns);
		// Then apply where and select
//		console.log(query);
		if(query.wherefn(scope,query.params, alasql$1)) {

//			console.log("scope",scope.schools);

//			var res = query.selectfn(scope, query.params, alasql);
//			console.log("last",res);
			// If there is a GROUP BY then pipe to groupping function
			if(query.groupfn) {
				query.groupfn(scope, query.params, alasql$1)
			} else {
//				query.qwerty = 999;
//console.log(query.qwerty, query.queriesfn && query.queriesfn.length,2);
				query.data.push(query.selectfn(scope, query.params, alasql$1));
			}
		}
	} else if(query.sources[h].applyselect) {
//		console.log('APPLY',scope);
//			console.log('scope1',scope);
//				console.log(scope);
		var source = query.sources[h];
		source.applyselect(query.params, function(data){
			if(data.length > 0) {
	//			console.log('APPLY CB');
				for(var i=0;i<data.length;i++) {
					scope[source.alias] = data[i];
					doJoin(query, scope, h+1);
				};
			} else {
//				console.log(source.applymode);
				if (source.applymode == 'OUTER') {
					scope[source.alias] = {};
					doJoin(query, scope, h+1);
				}
			}
		},scope);

//		console.log(data);
	} else {

// STEP 1

		var source = query.sources[h];
		var nextsource = query.sources[h+1];

//		if(source.joinmode == "LEFT" || source.joinmode == "INNER" || source.joinmode == "RIGHT"
//			|| source.joinmode == "OUTER" || source.joinmode == "SEMI") {
		if(true) {//source.joinmode != "ANTI") {

			// if(nextsource && nextsource.joinmode == "RIGHT") {
			// 	if(!nextsource.rightdata) {
			// 		console.log("ok");
			// 		nextsource.rightdata = new Array(nextsource.data.length);
			// 		console.log(nextsource.data.length, nextsource.rightdata);
			// 	}
			// }

			var tableid = source.alias || source.tableid;
			var pass = false; // For LEFT JOIN
			var data = source.data;
			var opt = false;

			// Reduce data for looping if there is optimization hint
			if(!source.getfn || (source.getfn && !source.dontcache)) {
				if(source.joinmode != "RIGHT" && source.joinmode != "OUTER" && source.joinmode != "ANTI" && source.optimization == 'ix') {
					data = source.ix[ source.onleftfn(scope, query.params, alasql$1) ] || [];
					opt = true;
//					console.log(source.onleftfns);
//					console.log(source.ix);
//	console.log(source.onleftfn(scope, query.params, alasql));
//					console.log(opt, data, data.length);
				}
			}

			// Main cycle
			var i = 0;
			if(typeof data == 'undefined') {
				throw new Error('Data source number '+h+' in undefined')
			}
			var ilen=data.length;
			var dataw;
//			console.log(h,opt,source.data,i,source.dontcache);
			while((dataw = data[i]) || (!opt && (source.getfn && (dataw = source.getfn(i)))) || (i<ilen) ) {
				if(!opt && source.getfn && !source.dontcache) data[i] = dataw;
//console.log(h, i, dataw);
				scope[tableid] = dataw;
				// Reduce with ON and USING clause
				if(!source.onleftfn || (source.onleftfn(scope, query.params, alasql$1) == source.onrightfn(scope, query.params, alasql$1))) {
					// For all non-standard JOINs like a-b=0
					if(source.onmiddlefn(scope, query.params, alasql$1)) {
						// Recursively call new join
//						if(source.joinmode == "LEFT" || source.joinmode == "INNER" || source.joinmode == "OUTER" || source.joinmode == "RIGHT" ) {
						if(source.joinmode != "SEMI" && source.joinmode != "ANTI") {
//							console.log(scope);
							doJoin(query, scope, h+1);
						}

						// if(source.data[i].f = 200) debugger;

//						if(source.joinmode == "RIGHT" || source.joinmode == "ANTI" || source.joinmode == "OUTER") {
						if(source.joinmode != "LEFT" && source.joinmode != "INNER") {
							dataw._rightjoin = true;
						}

						// for LEFT JOIN
						pass = true;
					}
				};
				i++;
			};


			// Additional join for LEFT JOINS
			if((source.joinmode == 'LEFT' || source.joinmode == 'OUTER' || source.joinmode == 'SEMI' ) && !pass) {
			// Clear the scope after the loop
				scope[tableid] = {};
				doJoin(query,scope,h+1);
			}


		}

		// When there is no records
//		if(data.length == 0 && query.groupfn) {
//			scope[tableid] = undefined;
//			doJoin(query,scope,h+1);
//		}

// STEP 2

		if(h+1 < query.sources.length) {

			if(nextsource.joinmode == "OUTER" || nextsource.joinmode == "RIGHT"
				|| nextsource.joinmode == "ANTI") {


				scope[source.alias] = {};

				var j = 0;
				var jlen = nextsource.data.length;
				var dataw;

				while((dataw = nextsource.data[j]) || (nextsource.getfn && (dataw = nextsource.getfn(j))) || (j<jlen)) {
					if(nextsource.getfn && !nextsource.dontcache) nextsource.data[j] = dataw;

					if(!dataw._rightjoin) {
						scope[nextsource.alias] = dataw;
						doJoin(query, scope, h+2);
					} else {
						//dataw._rightjoin = undefined;
						delete dataw._rightjoin;
					}
					j++;
				}
//				console.table(nextsource.data);
//				debugger;

			};
		};


		scope[tableid] = undefined;


	}

};

// Main query procedure
function queryfn(query,oldscope,cb, A,B) {

//	console.log(query.queriesfn);

	var ms;
	query.sourceslen = query.sources.length;
	var slen = query.sourceslen;
	query.query = query; // TODO Remove to prevent memory leaks
	query.A = A;
	query.B = B;
//	console.log(arguments);
	query.cb = cb;
	query.oldscope = oldscope;

	// Run all subqueries before main statement
	if(query.queriesfn) {
		query.sourceslen += query.queriesfn.length;
		slen += query.queriesfn.length;

		query.queriesdata = [];

//		console.log(8);
		query.queriesfn.forEach(function(q,idx){
//			if(query.explain) ms = Date.now();
//console.log(18,idx);
//			var res = flatArray(q(query.params,null,queryfn2,(-idx-1),query));

//			var res = flatArray(queryfn(q.query,null,queryfn2,(-idx-1),query));
//			console.log(A,B);
// console.log(q);
			q.query.params = query.params;
//			query.queriesdata[idx] =

	if(false) {} else {
			queryfn2([],(-idx-1),query);
	}

//			console.log(27,q);


//			query.explaination.push({explid: query.explid++, description:'Query '+idx,ms:Date.now()-ms});
//			query.queriesdata[idx] = res;
//			return res;
		});
//		console.log(9,query.queriesdata.length);
//		console.log(query.queriesdata[0]);
	}

	var scope;
	if(!oldscope) scope = {};
	else scope = cloneDeep(oldscope);
	query.scope = scope;

	// First - refresh data sources

	var result;
	query.sources.forEach(function(source, idx){
//		source.data = query.database.tables[source.tableid].data;
//		console.log(666,idx);
		source.query = query;
		var rs = source.datafn(query, query.params, queryfn2, idx, alasql$1);
//		console.log(333,rs);
		if(typeof rs !== undefined) {
			// TODO - this is a hack: check if result is array - check all cases and
			// make it more logical
			if((query.intofn || query.intoallfn) && rs instanceof Array) rs = rs.length;
			result = rs;
		}
//
// Ugly hack to use in query.wherefn and source.srcwherefns functions
// constructions like this.queriesdata['test'].
// I can elimite it with source.srcwherefn.bind(this)()
// but it may be slow.
//
		source.queriesdata = query.queriesdata;
	});
	if(0 === slen)
		result = queryfn3(query);

	return result;
}

function queryfn2(data,idx,query) {
//console.log(56,arguments);
//		console.log(78,data, idx,query);
//console.trace();

	if(idx>=0) {
		var source = query.sources[idx];
		source.data = data;
		if(typeof source.data == 'function') {
			source.getfn = source.data;
			source.dontcache = source.getfn.dontcache;

	//			var prevsource = query.sources[h-1];
			if(source.joinmode == 'OUTER' || source.joinmode == 'RIGHT' || source.joinmode == 'ANTI') {
				source.dontcache = false;
			}
			source.data = {};
		}
	} else {
		// subqueries
//		console.log("queriesdata",data, flatArray(data));
		query.queriesdata[-idx-1] = flatArray(data);
//		console.log(98,query.queriesdata);
//		console.log(79,query.queriesdata);
	}

	query.sourceslen--;
	if(query.sourceslen>0) return;

	return queryfn3(query);
}

function queryfn3(query) {
//console.log(55,query);


	var scope = query.scope;
	// Preindexation of data sources
//	if(!oldscope) {
		preIndex(query);
//	}

	// query.sources.forEach(function(source) {
	// 		console.log(source.data);
	// });

	// Prepare variables
	query.data = [];
	query.xgroups = {};
	query.groups = [];

	// Level of Joins
	var h = 0;


	// Start walking over data
//console.log(142,'1111');
	doJoin(query, scope, h);
//console.log(144,'2222',query.modifier);

//console.log(85,query.data[0]);

	// If groupping, then filter groups with HAVING function
//			console.log(query.havingfns);
	if(query.groupfn) {
		query.data = [];
		if(0 === query.groups.length) {
			var g = {};
			if(query.selectGroup.length>0) {
//				console.log(query.selectGroup);
				query.selectGroup.forEach(function(sg){
					if(sg.aggregatorid == "COUNT" || sg.aggregatorid == "SUM") {
						g[sg.nick] = 0;
					} else {
						g[sg.nick] = undefined;
					}
				});
			}
			query.groups = [g];
//			console.log();
		}
		// 	console.log('EMPTY',query.groups);
		// 	debugger;
		// if(false && (query.groups.length == 1) && (Object.keys(query.groups[0]).length == 0)) {
		// 	console.log('EMPTY',query.groups);
		// } else {
			for(var i=0,ilen=query.groups.length;i<ilen;i++) {
	//			console.log(query.groups[i]);
				g = query.groups[i];
				if((!query.havingfn) || query.havingfn(g,query.params,alasql$1)) {
	//				console.log(g);
					var d = query.selectgfn(g,query.params,alasql$1);
					query.data.push(d);
				}
			};
		// }

//			query.groups = query.groups.filter();
	}
	// Remove distinct values
	doDistinct(query);

	// UNION / UNION ALL
	if(query.unionallfn) {
// TODO Simplify this part of program
		var ud, nd;
		if(query.corresponding) {
			if(!query.unionallfn.query.modifier) query.unionallfn.query.modifier = undefined;
			ud = query.unionallfn(query.params);
		} else {
			if(!query.unionallfn.query.modifier) query.unionallfn.query.modifier = 'RECORDSET';
			nd = query.unionallfn(query.params);
			ud = [];
			ilen=nd.data.length
			for(var i=0;i<ilen;i++) {
				var r = {};
				for(var j=0,jlen=Math.min(query.columns.length,nd.columns.length);j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}
		query.data = query.data.concat(ud);
	} else if(query.unionfn) {

		if(query.corresponding) {
			if(!query.unionfn.query.modifier) query.unionfn.query.modifier = 'ARRAY';
			ud = query.unionfn(query.params);
		} else {
			if(!query.unionfn.query.modifier) query.unionfn.query.modifier = 'RECORDSET';
			nd = query.unionfn(query.params);
			ud = [];
			ilen=nd.data.length
			for(var i=0;i<ilen;i++) {
				r = {};
				jlen=Math.min(query.columns.length,nd.columns.length);
				for(var j=0;j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}

		query.data = arrayUnionDeep(query.data, ud);

	} else if(query.exceptfn) {
		if(query.corresponding) {
			if(!query.exceptfn.query.modifier) query.exceptfn.query.modifier = 'ARRAY';
			var ud = query.exceptfn(query.params);
		} else {
			if(!query.exceptfn.query.modifier) query.exceptfn.query.modifier = 'RECORDSET';
			var nd = query.exceptfn(query.params);
			var ud = [];
			for(var i=0,ilen=nd.data.length;i<ilen;i++) {
				var r = {};
				for(var j=0,jlen=Math.min(query.columns.length,nd.columns.length);j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}



		query.data = arrayExceptDeep(query.data, ud);
	} else if(query.intersectfn) {
		if(query.corresponding) {
			if(!query.intersectfn.query.modifier)
				query.intersectfn.query.modifier = undefined;
			ud = query.intersectfn(query.params);
		} else {
			if(!query.intersectfn.query.modifier)
				query.intersectfn.query.modifier = 'RECORDSET';
			nd = query.intersectfn(query.params);
			ud = [];
			ilen=nd.data.length;
			for(i=0;i<ilen;i++) {
				r = {};
				jlen=Math.min(query.columns.length,nd.columns.length);
				for(j=0;j<jlen;j++) {
					r[query.columns[j].columnid] = nd.data[i][nd.columns[j].columnid];
				}
				ud.push(r);
			}
		}


		query.data = arrayIntersectDeep(query.data, ud);
	}

	// Ordering
	if(query.orderfn) {
		if(query.explain) var ms = Date.now();
		query.data = query.data.sort(query.orderfn);
		if(query.explain) {
			query.explaination.push({explid: query.explid++, description:'QUERY BY',ms:Date.now()-ms});
		}
	}

	// Reduce to limit and offset
	doLimit(query);

	// Remove Angular.js artifacts and other unnecessary columns
	// Issue #25

//	console.log('removeKeys:',query.removeKeys);

    // TODO: Check what artefacts rest from Angular.js
    if(typeof angular != "undefined") {
    	query.removeKeys.push('$$hashKey');
    }


	if(query.removeKeys.length > 0) {
	    var removeKeys = query.removeKeys;


	    // Remove from data
		jlen = removeKeys.length;
		if(jlen > 0) {
			ilen=query.data.length;
			for(i=0;i<ilen;i++) {
				for(j=0; j<jlen;j++) {
					delete query.data[i][removeKeys[j]];
				}
			}
		}

	    // Remove from columns list
		if(query.columns.length > 0) {
			query.columns = query.columns.filter(function(column){
				var found = false;
				removeKeys.forEach(function(key){
					if(column.columnid == key) found = true;
				});
				return !found;
			});
		}

	}

	if(typeof query.removeLikeKeys != 'undefined' && query.removeLikeKeys.length > 0) {

	    var removeLikeKeys = query.removeLikeKeys;

		// Remove unused columns
		// SELECT * REMOVE COLUMNS LIKE "%b"
		for(var i=0,ilen=query.data.length;i<ilen;i++) {
			r = query.data[i];
			for(var k in r) {
				for(j=0;j<query.removeLikeKeys.length;j++) {
					if(alasql$1.utils.like(query.removeLikeKeys[j],k)) {
//					if(k.match(query.removeLikeKeys[j])) {
						delete r[k];
					}
				}
			}
		}

		if(query.columns.length > 0) {
			query.columns = query.columns.filter(function(column){
				var found = false;
				removeLikeKeys.forEach(function(key){
//					if(column.columnid.match(key)) found = true;
					if(alasql$1.utils.like(key,column.columnid)) {
						found = true;
					}
				});
				return !found;
			});
		}

	}
//	console.log(query.intoallfns);

	// if(query.explain) {
	// 	if(query.cb) query.cb(query.explaination,query.A, query.B);
	// 	return query.explaination;
	// } else
//console.log(190,query.intofns);
	if(query.intoallfn) {
//		console.log(161);
//		var res = query.intoallfn(query.columns,query.cb,query.A, query.B, alasql);
		var res = query.intoallfn(query.columns,query.cb,query.params,query.alasql);
//		console.log(1163,res);
//		if(query.cb) res = query.cb(res,query.A, query.B);
//		console.log(1165,res);
//		debugger;
		return res;
	} else if(query.intofn) {
		ilen=query.data.length;
		for(i=0;i<ilen;i++){
			query.intofn(query.data[i],i,query.params,query.alasql);
		}
//		console.log(query.intofn);
		if(query.cb)
			query.cb(query.data.length,query.A, query.B);
		return query.data.length;
	} else {
//		console.log(111,query.cb,query.data);
		res = query.data;
		if(query.cb)
			res = query.cb(query.data,query.A, query.B);
//		console.log(777,res)
		return res;
	}

}

// Limiting
function doLimit (query) {
//	console.log(query.limit, query.offset)
	if(query.limit) {
		var offset = 0;
		if(query.offset) offset = ((query.offset|0)-1)||0;
		var limit;
		if(query.percent) {
			limit = ((query.data.length*query.limit/100)| 0)+offset;
		} else {
			limit = (query.limit|0) + offset;
		}
		query.data = query.data.slice(offset,limit);
	}
}

// Distinct
function doDistinct (query) {
	if(query.distinct) {
		var uniq = {};
		// TODO: Speedup, because Object.keys is slow
		// TODO: Problem with DISTINCT on objects
		for(var i=0,ilen=query.data.length;i<ilen;i++) {
			var uix = Object.keys(query.data[i]).map(function(k){return query.data[i][k];}).join('`');
			uniq[uix] = query.data[i];
		}
		query.data = [];
		for(var key in uniq) query.data.push(uniq[key]);
	}
}


// Optimization: preliminary indexation of joins
preIndex = function(query) {
//	console.log(query);
	// Loop over all sources
	// Todo: make this loop smaller and more graspable
	for(var k=0, klen = query.sources.length;k<klen;k++) {
		var source = query.sources[k];
		delete source.ix;
		// If there is indexation rule
//console.log('preIndex', source);
//console.log(source);
		if(k > 0 && source.optimization == 'ix' && source.onleftfn && source.onrightfn) {
			// If there is no table.indices - create it
			if(source.databaseid && alasql$1.databases[source.databaseid].tables[source.tableid]) {
				if(!alasql$1.databases[source.databaseid].tables[source.tableid].indices) query.database.tables[source.tableid].indices = {};
					// Check if index already exists
				var ixx = alasql$1.databases[source.databaseid].tables[source.tableid].indices[hash(source.onrightfns+'`'+source.srcwherefns)];
				if( !alasql$1.databases[source.databaseid].tables[source.tableid].dirty && ixx) {
					source.ix = ixx;
				}
			}

			if(!source.ix) {
				source.ix = {};
				// Walking over source data
				var scope = {};
				var i = 0;
				var ilen = source.data.length;
				var dataw;
//				while(source.getfn i<ilen) {

				while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
					if(source.getfn && !source.dontcache) source.data[i] = dataw;
//					scope[tableid] = dataw;

//				for(var i=0, ilen=source.data.length; i<ilen; i++) {
					// Prepare scope for indexation
					scope[source.alias || source.tableid] = dataw;

					// Check if it apply to where function
					if(source.srcwherefn(scope, query.params, alasql$1)) {
						// Create index entry for each address
						var addr = source.onrightfn(scope, query.params, alasql$1);
						var group = source.ix [addr];
						if(!group) {
							group = source.ix [addr] = [];
						}
						group.push(dataw);
					}
					i++;
				}

				if(source.databaseid && alasql$1.databases[source.databaseid].tables[source.tableid]){
					// Save index to original table
					alasql$1.databases[source.databaseid].tables[source.tableid].indices[hash(source.onrightfns+'`'+source.srcwherefns)] = source.ix;
				}
			}
//console.log(38,274,source.ix);

			// Optimization for WHERE column = expression
		} else if (source.wxleftfn) {
				if(!alasql$1.databases[source.databaseid].engineid) {
					// Check if index exists
					ixx = alasql$1.databases[source.databaseid].tables[source.tableid].indices[hash(source.wxleftfns+'`')];
				}
				if( !alasql$1.databases[source.databaseid].tables[source.tableid].dirty && ixx) {
					// Use old index if exists
					source.ix = ixx;
					// Reduce data (apply filter)
					source.data = source.ix[source.wxrightfn(null, query.params, alasql$1)];
				} else {
					// Create new index
					source.ix = {};
					// Prepare scope
					scope = {};
					// Walking on each source line
					i = 0;
					ilen = source.data.length;
					dataw;
	//				while(source.getfn i<ilen) {

					while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
						if(source.getfn && !source.dontcache)
							source.data[i] = dataw;
	//					for(var i=0, ilen=source.data.length; i<ilen; i++) {
						scope[source.alias || source.tableid] = source.data[i];
						// Create index entry
						addr = source.wxleftfn(scope, query.params, alasql$1);
						group = source.ix[addr];
						if(!group) {
							group = source.ix[addr] = [];
						}
						group.push(source.data[i]);
						i++;
					}
	//					query.database.tables[source.tableid].indices[hash(source.wxleftfns+'`'+source.onwherefns)] = source.ix;
					if(!alasql$1.databases[source.databaseid].engineid) {
						alasql$1.databases[source.databaseid].tables[source.tableid].indices[hash(source.wxleftfns+'`')] = source.ix;
					}
				}
				// Apply where filter to reduces rows
				if(source.srcwherefns) {
					if(source.data) {
						scope = {};
						source.data = source.data.filter(function(r) {
							scope[source.alias] = r;
							return source.srcwherefn(scope, query.params, alasql$1);
						});
					} else {
						source.data = [];
					}
				}
//			}
		// If there is no any optimization than apply srcwhere filter
		} else if(source.srcwherefns && !source.dontcache) {
			if(source.data) {
				var scope = {};
				// TODO!!!!! Data as Function

				source.data = source.data.filter(function(r) {
					scope[source.alias] = r;
//					console.log(288,source);
					return source.srcwherefn(scope, query.params, alasql$1);
				});

				scope = {};
				i = 0;
				ilen = source.data.length;
				//var dataw;
				var res = [];
//				while(source.getfn i<ilen) {

				while((dataw = source.data[i]) || (source.getfn && (dataw = source.getfn(i))) || (i<ilen)) {
					if(source.getfn && !source.dontcache) source.data[i] = dataw;
					scope[source.alias] = dataw;
					if(source.srcwherefn(scope, query.params, alasql$1)) res.push(dataw);
					i++;
				}
				source.data = res;

			} else {
				source.data = [];
			}
		}
		// Change this to another place (this is a wrong)
		if(source.databaseid && alasql$1.databases[source.databaseid].tables[source.tableid]) {
			//query.database.tables[source.tableid].dirty = false;
		} else {
			// this is a subquery?
		}
	}
};

//import {compilePivot} from "./compilePivot.js";
/*
//
// Select run-time part for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

 //formerly 40select.js

//
// Main part of SELECT procedure
//

function Select$1(params) { return extend(this, params); }


Select$1.prototype.compileGroup = compileGroup,
Select$1.prototype.compilePivot = compilePivot,
Select$1.prototype.compileDefCols = compileDefCols,
Select$1.prototype.compileFrom = compileFrom,
Select$1.prototype.compileHaving = compileHaving,
Select$1.prototype.compileGroup = compileGroup,
Select$1.prototype.compileJoins = compileJoins,
Select$1.prototype.compileOrder = compileOrder,
Select$1.prototype.compileSelectStar = compileSelectStar,
Select$1.prototype.compileSelectGroup0 = compileSelectGroup0,
Select$1.prototype.compileSelectGroup1 = compileSelectGroup1,
Select$1.prototype.compileRemoveColumns = compileRemoveColumns,
Select$1.prototype.compileSelectGroup2 = compileSelectGroup2,
Select$1.prototype.compileSelect1 = compileSelect1,
Select$1.prototype.compileSelect2 = compileSelect2;

Select$1.prototype.toString = function() {
	var s = '';
	if(this.explain){
		s+= 'EXPLAIN ';
	}
	s += 'SELECT ';
	if(this.modifier){
		s += this.modifier+' ';
	}
	if(this.top) {
		s += 'TOP '+this.top.value+' ';
		if(this.percent){
			s += 'PERCENT ';
		}
	}
	s += this.columns.map(function(col){
		var s = col.toString();
//		console.log(col);
		if(typeof col.as !== "undefined"){
			s += ' AS '+col.as;
		}
		return s;
	}).join(', ');

	if(this.from) {
		s += 	' FROM '
				+ this.from.map(function(f){
									//			console.log(f);
												var ss = f.toString();
												if(f.as){
													ss += ' AS '+f.as;
												}
												return ss;
											}).join(',');
										}

	if(this.joins) {
		s += this.joins.map(function(jn){
			var ss = ' ';
			if(jn.joinmode){
				ss += jn.joinmode+' ';
			}

			if(jn.table){
				ss += 'JOIN '+jn.table.toString();
			} else if(jn instanceof Apply){
				ss += jn.toString();
			} else {
				throw new Error('Wrong type in JOIN mode');
			}

			if(jn.using){
				ss += ' USING '+jn.using.toString();
			}

			if(jn.on){
				ss += ' ON '+jn.on.toString();
			}
			return ss;
 		});
	}

	if(this.where){
		s += ' WHERE '+this.where.toString();
	}
	if(this.group && this.group.length>0) {
		s += ' GROUP BY ' + this.group.map(function(grp){
															return grp.toString();
														}).join(', ');
	}

	if(this.having){
		s += ' HAVING '+this.having.toString();
	}

	if(this.order && this.order.length>0) {
		s += ' ORDER BY '+this.order.map(function(ord){
														return  ord.toString();
													}).join(', ');
	}

	if(this.limit){
		s += ' LIMIT '+this.limit.value;
	}

	if(this.offset){
		s += ' OFFSET '+this.offset.value;
	}

	if(this.union){
		s += ' UNION '
			+ (this.corresponding ? 'CORRESPONDING ' : '')
			+ this.union.toString();
	}

	if(this.unionall){
		s += ' UNION ALL '
			+ (this.corresponding ? 'CORRESPONDING ' : '')
			+ this.unionall.toString();
	}

	if(this.except){
		s += ' EXCEPT '
			+ (this.corresponding ? 'CORRESPONDING ' : '')
			+ this.except.toString();
	}

	if(this.intersect){
		s += ' INTERSECT '
			+ (this.corresponding ? 'CORRESPONDING ' : '')
			+ this.intersect.toString();
	}

	return s;
};

/**
 Select statement in expression
 */
Select$1.prototype.toJS = function(context) {
//	console.log('Expression',this);
//	if(this.expression.reduced) return 'true';
//	return this.expression.toJS(context, tableid, defcols);
// console.log('Select.toJS', 81, this.queriesidx);
//	var s = 'this.queriesdata['+(this.queriesidx-1)+'][0]';

	var s = 'alasql.utils.flatArray(this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+'))[0]';


//	var s = '(ee=alasql.utils.flatArray(this.queriesfn['+(this.queriesidx-1)+'](this.params,null,'+context+')),console.log(999,ee),ee[0])';

	return s;
};




/**
	Modify res according modifier
	@function
	@param {object} query Query object
	@param res {object|number|string|boolean} res Data to be converted
*/
function modify$1(query, res) { // jshint ignore:line
//	console.log(arguments);

	/* If source is a primitive value then return it */
	if(		typeof res === 'undefined'
		|| 	typeof res === 'number'
		|| 	typeof res === 'string'
		|| 	typeof res == 'boolean'
	){
		return res;
	}

	var modifier = query.modifier || alasql$1.options.modifier;
	var columns = query.columns;
	if(typeof columns === 'undefined' || columns.length == 0) {
		// Try to create columns
		if(res.length > 0) {
			var allcol = {};
			for(var i=0;i<Math.min(res.length,alasql$1.options.columnlookup||10);i++) {
				for(var key in res[i]) {
					allcol[key] = true;
				}
			}

			columns = Object.keys(allcol).map(function(columnid){
				return {columnid:columnid};
			});
		} else {
			// Cannot recognize columns
			columns = [];
		}
	}

//	console.log(columns);

	if(modifier === 'VALUE') {
//		console.log(222,res);
		if(res.length > 0) {
			var key;
			if(columns && columns.length > 0){
				key = columns[0].columnid;
			} else {
				key = Object.keys(res[0])[0];
			}
			res = res[0][key];
		} else {
			res = undefined;
		}
	} else if(modifier === 'ROW') {
		if(res.length > 0) {
			var key;
			var a = [];
			for(var key in res[0]) {
				a.push(res[0][key]);
			}
			res = a;
		} else {
			res = undefined;
		}
	} else if(modifier === 'COLUMN') {
		var ar = [];
		if(res.length > 0) {
			var key;
			if(columns && columns.length > 0){
				key = columns[0].columnid;
			} else {
				key = Object.keys(res[0])[0];
			}

			for(var i=0, ilen=res.length; i<ilen; i++){
				ar.push(res[i][key]);
			}
		}
		res = ar;
	} else if(modifier === 'MATRIX') {
		// Returns square matrix of rows
		var ar = [];
		for(var i=0;i<res.length;i++) {
			var a = [];
			var r = res[i];
			for(var j=0;j<columns.length;j++) {
				a.push(r[columns[j].columnid]);
			}
			ar.push(a);
		}
		res = ar;

	}else if(modifier === 'INDEX') {
		var ar = {};
		var key,val;
		if(columns && columns.length > 0) {
			key = columns[0].columnid;
			val = columns[1].columnid;
		} else {
			var okeys = Object.keys(res[0]);
			key = okeys[0];
			val = okeys[1];
		}
		for(var i=0, ilen=res.length; i<ilen; i++){
			ar[res[i][key]] = res[i][val];
		}
		res = ar;
//		res = arrayOfArrays(res);
	}else if(modifier === 'RECORDSET') {
		res = new alasql$1.Recordset({data:res, columns:columns});
//		res = arrayOfArrays(res);
	}else if(modifier === 'TEXTSTRING') {
		var key;
		if(columns && columns.length > 0){
			key = columns[0].columnid;
		} else{
			key = Object.keys(res[0])[0];
		}

		for(var i=0, ilen=res.length; i<ilen; i++){
			res[i] = res[i][key];
		}
		res = res.join('\n');
//		res = arrayOfArrays(res);
	}
	return res;
}



// Select.prototype.exec = function(databaseid) {
// 	throw new Error('Select statement should be precompiled');

// };
Select$1.prototype.execute = function (databaseid, params, cb) {
	return this.compile(databaseid)(params,cb);
//	throw new Error('Insert statement is should be compiled')
}


/**
	formerly 422where.js
**/

Select$1.prototype.compileWhere = function(query) {
	if(this.where) {
		if(typeof this.where == "function") {
			return this.where;
		} else {
			s = this.where.toJS('p',query.defaultTableid,query.defcols);
			query.wherefns = s;
//		console.log(s);
			return new Function('p,params,alasql','var y;return '+s);
		}
	} else return function(){return true};
};



Select$1.prototype.compileWhereJoins = function(query) {
	return;

	// TODO Fix Where optimization
	//console.log(query);

	optimizeWhereJoin(query, this.where.expression);

	//for sources compile wherefs
	query.sources.forEach(function(source) {
		if(source.srcwherefns) {
			source.srcwherefn = new Function('p,params,alasql','var y;return '+source.srcwherefns);
		};
		if(source.wxleftfns) {
			source.wxleftfn = new Function('p,params,alasql','var y;return '+source.wxleftfns);
		};
		if(source.wxrightfns) {
			source.wxrightfn = new Function('p,params,alasql','var y;return '+source.wxrightfns);
		};
//		console.log(source.alias, source.wherefns)
//		console.log(source);
	});
};

function optimizeWhereJoin (query, ast) {
	if(!ast) return false;
	if(!(ast instanceof yy.Op)) return;
	if(ast.op != '=' && ast.op != 'AND') return;
	if(ast.allsome) return;

	var s = ast.toJS('p',query.defaultTableid,query.defcols);
	var fsrc = [];
	query.sources.forEach(function(source,idx) {
		// Optimization allowed only for tables only
		if(source.tableid) {
			// This is a good place to remove all unnecessary optimizations
			if(s.indexOf('p[\''+source.alias+'\']')>-1) fsrc.push(source);
		};
	});
//console.log(fsrc.length);
//	if(fsrc.length < query.sources.length) return;
//	console.log(ast);
//	console.log(s);
//	console.log(fsrc.length);
	if(fsrc.length == 0) {
//		console.log('no optimization, can remove this part of ast');
		return;
	} else if (fsrc.length == 1) {

		if(!(s.match(/p\[\'.*?\'\]/g)||[])
			.every(function(s){
						return s == "p['"+fsrc[0].alias+"']"})) {
			return;
			// This is means, that we have column from parent query
			// So we return without optimization
		}

		var src = fsrc[0]; // optmiization source
		src.srcwherefns = src.srcwherefns ? src.srcwherefns+'&&'+s : s;

		if((ast instanceof yy.Op) && (ast.op == '=' && !ast.allsome)) {
			if(ast.left instanceof yy.Column) {
				var ls = ast.left.toJS('p',query.defaultTableid,query.defcols);
				var rs = ast.right.toJS('p',query.defaultTableid,query.defcols);
				if(rs.indexOf('p[\''+fsrc[0].alias+'\']') == -1) {
					fsrc[0].wxleftfns = ls;
					fsrc[0].wxrightfns = rs;
				}
			} if(ast.right instanceof yy.Column) {
				var ls = ast.left.toJS('p',query.defaultTableid,query.defcols);
				var rs = ast.right.toJS('p',query.defaultTableid,query.defcols);
				if(ls.indexOf('p[\''+fsrc[0].alias+'\']') == -1) {
					fsrc[0].wxleftfns = rs;
					fsrc[0].wxrightfns = ls;
				}
			}
		}
		ast.reduced = true;  // To do not duplicate wherefn and srcwherefn
		return;
	} else {
		if(ast.op = 'AND') {
			optimizeWhereJoin(query,ast.left);
			optimizeWhereJoin(query,ast.right);
		}
	}

};


//Compile stuff

Select$1.prototype.compileWhereExists = function(query) {
	if(!this.exists) return;
	query.existsfn = this.exists.map(function(ex) {
		var nq = ex.compile(query.database.databaseid);
//		console.log(nq);
//		 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
		 nq.query.modifier = 'RECORDSET';
		 return nq;
	});
};

Select$1.prototype.compileQueries = function(query) {
	if(!this.queries) return;
	query.queriesfn = this.queries.map(function(q) {
		 var nq = q.compile(query.database.databaseid);
//		console.log(nq);
//	if(!nq.query) nq.query = {};
		 nq.query.modifier = 'RECORDSET';
//		 if(!nq.query.modifier) nq.query.modifier = 'RECORDSET';
		 return nq;
	});
};

// Compile SELECT statement
Select$1.prototype.compile = function(databaseid) {
	var db = alasql$1.databases[databaseid];
	// Create variable for query
	var query = new Query();

	// Array with columns to be removed
    query.removeKeys = [];

	query.explain = this.explain; // Explain
	query.explaination = [];
	query.explid = 1;
//console.log(this.modifier);
	query.modifier = this.modifier;

	query.database = db;
	// 0. Precompile whereexists
	this.compileWhereExists(query);

	// 0. Precompile queries for IN, NOT IN, ANY and ALL operators
	this.compileQueries(query);

	query.defcols = this.compileDefCols(query, databaseid);

	// 1. Compile FROM clause
	query.fromfn = this.compileFrom(query);

	// 2. Compile JOIN clauses
	if(this.joins){
		this.compileJoins(query);
	}

	// todo?: 3. Compile SELECT clause

	// For ROWNUM()
	query.rownums = [];

	this.compileSelectGroup0(query);

	if(this.group || query.selectGroup.length>0) {
		query.selectgfns = this.compileSelectGroup1(query);
	} else {
		query.selectfns = this.compileSelect1(query);
	}

	// Remove columns clause
	this.compileRemoveColumns(query);

	// 5. Optimize WHERE and JOINS
	if(this.where){
		this.compileWhereJoins(query);
	}

	// 4. Compile WHERE clause
	query.wherefn = this.compileWhere(query);


	// 6. Compile GROUP BY
	if(this.group || query.selectGroup.length>0){
		query.groupfn = this.compileGroup(query);
	}

	// 6. Compile HAVING
	if(this.having){
		query.havingfn = this.compileHaving(query);
	}


	if(this.group || query.selectGroup.length>0) {
		query.selectgfn = this.compileSelectGroup2(query);
	} else {
		query.selectfn = this.compileSelect2(query);
	}


	// 7. Compile DISTINCT, LIMIT and OFFSET
	query.distinct = this.distinct;

	// 8. Compile ORDER BY clause
	if(this.order){
		query.orderfn = this.compileOrder(query);
	}

	// 9. Compile PIVOT clause
	if(this.pivot) query.pivotfn = this.compilePivot(query);
	if(this.unpivot) query.pivotfn = this.compileUnpivot(query);

	// 10. Compile TOP/LIMIT/OFFSET/FETCH cleuse
	if(this.top) {
		query.limit = this.top.value;
	} else if(this.limit) {
		query.limit = this.limit.value;
		if(this.offset) {
			query.offset = this.offset.value;
		}
	}

	query.percent = this.percent;

	// 9. Compile ordering function for UNION and UNIONALL
	query.corresponding = this.corresponding; // If CORRESPONDING flag exists
	if(this.union) {
		query.unionfn = this.union.compile(databaseid);
		if(this.union.order) {
			query.orderfn = this.union.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.unionall) {
		query.unionallfn = this.unionall.compile(databaseid);
		if(this.unionall.order) {
			query.orderfn = this.unionall.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.except) {
		query.exceptfn = this.except.compile(databaseid);
		if(this.except.order) {
			query.orderfn = this.except.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	} else if(this.intersect) {
		query.intersectfn = this.intersect.compile(databaseid);
		if(this.intersect.order) {
			query.intersectfn = this.intersect.compileOrder(query);
		} else {
			query.orderfn = null;
		}
	}

	// SELECT INTO
	if(this.into) {
		if(this.into instanceof Table) {
			//
			// Save into the table in database
			//
			if(alasql$1.options.autocommit && alasql$1.databases[this.into.databaseid||databaseid].engineid) {
				// For external database when AUTOCOMMIT is ONs
				query.intoallfns = 'return alasql.engines["'+alasql$1.databases[this.into.databaseid||databaseid].engineid+'"]'+
					'.intoTable("'+(this.into.databaseid||databaseid)+'","'+this.into.tableid+'",this.data, columns, cb);';
			} else {
				// Into AlaSQL tables
				query.intofns =
				'alasql.databases[\''+(this.into.databaseid||databaseid)+'\'].tables'+
				'[\''+this.into.tableid+'\'].data.push(r);';
			}
		} else if(this.into instanceof VarValue) {
			//
			// Save into local variable
			// SELECT * INTO @VAR1 FROM ?
			//
			query.intoallfns = 'alasql.vars["'+this.into.variable+'"]=this.data;res=this.data.length;if(cb)res=cb(res);return res;';
		} else if (this.into instanceof FuncValue$1) {
			//
			// If this is INTO() function, then call it
			// with one or two parameters
			//
			var qs = 'return alasql.into[\''+this.into.funcid.toUpperCase()+'\'](';
			if(this.into.args && this.into.args.length>0 ) {
				qs += this.into.args[0].toJS()+',';
				if(this.into.args.length > 1) {
					qs += this.into.args[1].toJS()+',';
				} else {
					qs += 'undefined,';
				}
			} else {
				qs += 'undefined, undefined,'
			}
			query.intoallfns = qs+'this.data,columns,cb)';
//console.log('999');


		} else if (this.into instanceof ParamValue) {
			//
			// Save data into parameters array
			// like alasql('SELECT * INTO ? FROM ?',[outdata,srcdata]);
			//
			query.intofns = "params['"+this.into.param+"'].push(r)";
		}

		if(query.intofns) {
			// Create intofn function
			query.intofn = new Function("r,i,params,alasql",'var y;'+query.intofns);
		} else if(query.intoallfns) {
			// Create intoallfn function
			query.intoallfn = new Function("columns,cb,params,alasql",'var y;'+query.intoallfns);
		}

	}
//console.log(query);

	// Now, compile all togeather into one function with query object in scope
	var statement = function(params, cb, oldscope) {
		query.params = params;
		var res1 = queryfn(query,oldscope,function(res){

//console.log(res[0].schoolid);
//console.log(184,res);
			if(query.rownums.length>0) {
				for(var i=0,ilen=res.length;i<ilen;i++) {
					for(var j=0,jlen=query.rownums.length;j<jlen;j++) {
						res[i][query.rownums[j]] = i+1;
					}
				}
			}

			var res2 = modify$1(query, res);


			if(cb){
				cb(res2);
			}
//console.log(8888,res2);
			return res2;

		});
//console.log(9999,res1);

//		if(typeof res1 != 'undefined') res1 =  modify(query,res1);

		return res1;

	};

//	statement.dbversion = ;
//	console.log(statement.query);
//console.log(202,statement);
	statement.query = query;
	return statement;
};

/*
//
// Statements class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/
//formerly 30statements.js, yy.Statements

// Statements container
function Statements(params) { return extend(this, params); };

Statements.prototype.toString = function () {
	return this.statements.map(function(st){return st.toString()}).join('; ');
};

// Compile array of statements into single statement
Statements.prototype.compile = function(db) {
	var statements = this.statements.map(function(st){
		return st.compile(db)
	});
	if(statements.length === 1) {
		return statements[0];
	} else {
		return function(params, cb){
			var res = statements.map(function(st){ return st(params); });
			if(cb){
				cb(res);
			}
			return res;
		}
	}
};

var yy$2 = {extend:extend};
    /* parser generated by jison 0.4.15 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[8,9],$V1=[2,7],$V2=[1,8],$V3=[8,9,41,47,70,71,81,82,83,84,90],$V4=[4,5,46,94,97,106,108,111,112,113,114,115,116,117,119,120,121,122,123,124,125,126,127,137,155],$V5=[2,24],$V6=[1,17],$V7=[4,5,26,29,30,36,46,94,97,106,108,111,112,113,114,115,116,117,119,120,121,122,123,124,125,126,127,137,155],$V8=[8,9,47,70,71,81,82,83,84,90],$V9=[1,28],$Va=[1,29],$Vb=[1,53],$Vc=[1,55],$Vd=[1,54],$Ve=[1,65],$Vf=[1,66],$Vg=[1,67],$Vh=[1,68],$Vi=[1,69],$Vj=[1,70],$Vk=[1,71],$Vl=[1,72],$Vm=[1,73],$Vn=[1,56],$Vo=[1,57],$Vp=[1,58],$Vq=[1,59],$Vr=[1,63],$Vs=[1,60],$Vt=[1,61],$Vu=[1,62],$Vv=[1,64],$Vw=[1,52],$Vx=[1,51],$Vy=[8,9,47,71,81,82,83,84,90],$Vz=[1,79],$VA=[4,5,8,9,41,45,47,48,53,57,58,59,60,61,62,63,64,65,66,68,70,71,81,82,83,84,90],$VB=[1,84],$VC=[4,5,8,9,38,41,45,46,47,48,50,53,57,58,59,60,61,62,63,64,65,66,68,70,71,80,81,82,83,84,87,88,90,94,97,121,130,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,153,154,155,156,157,158],$VD=[8,9,38,41,47,70,71,81,82,83,84,90],$VE=[1,88],$VF=[8,9,38,41,45,47,70,71,81,82,83,84,90],$VG=[1,96],$VH=[1,93],$VI=[1,94],$VJ=[1,95],$VK=[1,97],$VL=[1,98],$VM=[1,99],$VN=[1,100],$VO=[1,101],$VP=[1,102],$VQ=[1,103],$VR=[1,104],$VS=[1,105],$VT=[1,106],$VU=[1,107],$VV=[1,108],$VW=[1,109],$VX=[1,111],$VY=[1,112],$VZ=[1,114],$V_=[1,113],$V$=[1,115],$V01=[1,116],$V11=[4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,97,121,130,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,153,154,155,156,157,158],$V21=[1,128],$V31=[8,9,47,81,82,83,84,90],$V41=[8,9,45,47,70,71,81,82,83,84,90],$V51=[2,62],$V61=[1,139],$V71=[1,140],$V81=[1,141],$V91=[1,143],$Va1=[1,142],$Vb1=[1,144],$Vc1=[1,145],$Vd1=[1,146],$Ve1=[1,147],$Vf1=[8,9,45,47,53,57,58,59,60,61,62,63,64,65,70,71,81,82,83,84,90],$Vg1=[30,159,160],$Vh1=[4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,121,130,132,133,134,135,136,137,141,142,143,144,145,146,147,148,149,150,153,154,155,156,157,158],$Vi1=[2,169],$Vj1=[1,201],$Vk1=[130,132,134],$Vl1=[8,9,47,81,82,83,90],$Vm1=[8,9,47,53,57,58,59,60,61,62,63,64,65,70,71,81,82,83,84,90],$Vn1=[1,220],$Vo1=[4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,66,68,70,71,80,81,82,83,84,87,88,90,94,97,121,130,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,153,154,155,156,157,158],$Vp1=[45,47],$Vq1=[4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,97,121,130,132,133,134,135,136,137,138,139,141,142,143,144,145,146,147,148,149,150,153,154,155,156,157,158],$Vr1=[4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,121,130,132,133,134,141,142,143,144,145,146,147,148,149,150,153,154,157,158],$Vs1=[4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,121,130,132,133,134,154,157,158],$Vt1=[8,9,47,81,82,83],$Vu1=[1,240],$Vv1=[1,241],$Vw1=[1,242],$Vx1=[8,9,47],$Vy1=[1,274],$Vz1=[8,9,45,47,80,81,82,83,84,90],$VA1=[8,9,47,53,57,58,59,60,61,62,63,64,65,66,68,70,71,81,82,83,84,90],$VB1=[8,9,45,47,81,82,83,90];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Literal":3,"LITERAL":4,"BRALITERAL":5,"main":6,"Statements":7,"EOF":8,"SEMICOLON":9,"Statement":10,"ExplainStatement":11,"Select":12,"WithSelectClause":13,"WITH":14,"WithTables":15,"RECURSIVE":16,"SelectClause":17,"IntoClause":18,"FromClause":19,"WhereClause":20,"GroupClause":21,"OrderClause":22,"LimitClause":23,"UnionClause":24,"SelectModifier":25,"DISTINCT":26,"TopClause":27,"ResultColumns":28,"UNIQUE":29,"ALL":30,"SELECT":31,"VALUE":32,"ROW":33,"COLUMN":34,"MATRIX":35,"TOP":36,"NumValue":37,"INTO":38,"Table":39,"FuncValue":40,"FROM":41,"FromTablesList":42,"FromTable":43,"JoinTablesList":44,"COMMA":45,"LPAR":46,"RPAR":47,"AS":48,"ParamValue":49,"DOT":50,"JoinTable":51,"JoinMode":52,"JOIN":53,"JoinTableAs":54,"OnClause":55,"JoinModeMode":56,"NATURAL":57,"INNER":58,"LEFT":59,"OUTER":60,"RIGHT":61,"FULL":62,"SEMI":63,"ANTI":64,"CROSS":65,"ON":66,"Expression":67,"USING":68,"ColumnsList":69,"WHERE":70,"GROUP":71,"BY":72,"GroupExpressionsList":73,"HavingClause":74,"GroupExpression":75,"GROUPING":76,"SETS":77,"ROLLUP":78,"CUBE":79,"HAVING":80,"UNION":81,"EXCEPT":82,"INTERSECT":83,"ORDER":84,"OrderExpressionsList":85,"OrderExpression":86,"DIRECTION":87,"COLLATE":88,"NOCASE":89,"LIMIT":90,"OffsetClause":91,"OFFSET":92,"ResultColumn":93,"NUMBER":94,"StringValue":95,"Star":96,"STAR":97,"Column":98,"AggrValue":99,"Op":100,"LogicValue":101,"NullValue":102,"ExistsValue":103,"CaseValue":104,"CastClause":105,"CAST":106,"ColumnType":107,"CONVERT":108,"PrimitiveValue":109,"Aggregator":110,"SUM":111,"COUNT":112,"MIN":113,"MAX":114,"AVG":115,"FIRST":116,"LAST":117,"ExprList":118,"TRUE":119,"FALSE":120,"STRING":121,"NULL":122,"EXISTS":123,"DOLLAR":124,"COLON":125,"QUESTION":126,"CASE":127,"WhensList":128,"ElseClause":129,"END":130,"When":131,"WHEN":132,"THEN":133,"ELSE":134,"LIKE":135,"PLUS":136,"MINUS":137,"SLASH":138,"PERCENT":139,"ARROW":140,"GT":141,"GE":142,"LT":143,"LE":144,"EQ":145,"EQEQ":146,"EQEQEQ":147,"NE":148,"NEEQEQ":149,"NEEQEQEQ":150,"CondOp":151,"AllSome":152,"AND":153,"OR":154,"NOT":155,"IN":156,"BETWEEN":157,"NOT_BETWEEN":158,"SOME":159,"ANY":160,"ValuesListsList":161,"ValuesList":162,"AT":163,"Json":164,"Value":165,"DateValue":166,"AsClause":167,"$accept":0,"$end":1},
terminals_: {2:"error",4:"LITERAL",5:"BRALITERAL",8:"EOF",9:"SEMICOLON",11:"ExplainStatement",14:"WITH",16:"RECURSIVE",26:"DISTINCT",29:"UNIQUE",30:"ALL",31:"SELECT",32:"VALUE",33:"ROW",34:"COLUMN",35:"MATRIX",36:"TOP",38:"INTO",41:"FROM",45:"COMMA",46:"LPAR",47:"RPAR",48:"AS",50:"DOT",53:"JOIN",57:"NATURAL",58:"INNER",59:"LEFT",60:"OUTER",61:"RIGHT",62:"FULL",63:"SEMI",64:"ANTI",65:"CROSS",66:"ON",68:"USING",69:"ColumnsList",70:"WHERE",71:"GROUP",72:"BY",76:"GROUPING",77:"SETS",78:"ROLLUP",79:"CUBE",80:"HAVING",81:"UNION",82:"EXCEPT",83:"INTERSECT",84:"ORDER",87:"DIRECTION",88:"COLLATE",89:"NOCASE",90:"LIMIT",92:"OFFSET",94:"NUMBER",97:"STAR",106:"CAST",107:"ColumnType",108:"CONVERT",111:"SUM",112:"COUNT",113:"MIN",114:"MAX",115:"AVG",116:"FIRST",117:"LAST",119:"TRUE",120:"FALSE",121:"STRING",122:"NULL",123:"EXISTS",124:"DOLLAR",125:"COLON",126:"QUESTION",127:"CASE",130:"END",132:"WHEN",133:"THEN",134:"ELSE",135:"LIKE",136:"PLUS",137:"MINUS",138:"SLASH",139:"PERCENT",140:"ARROW",141:"GT",142:"GE",143:"LT",144:"LE",145:"EQ",146:"EQEQ",147:"EQEQEQ",148:"NE",149:"NEEQEQ",150:"NEEQEQEQ",153:"AND",154:"OR",155:"NOT",156:"IN",157:"BETWEEN",158:"NOT_BETWEEN",159:"SOME",160:"ANY",163:"AT",164:"Json",166:"DateValue"},
productions_: [0,[3,1],[3,1],[6,2],[7,3],[7,1],[7,1],[10,0],[10,1],[13,3],[13,4],[13,1],[15,0],[12,8],[17,4],[17,4],[17,4],[17,3],[25,1],[25,2],[25,2],[25,2],[25,2],[27,2],[27,0],[18,0],[18,2],[18,2],[19,2],[19,3],[19,0],[42,1],[42,3],[43,4],[43,5],[43,3],[43,2],[43,3],[43,1],[43,2],[43,3],[43,1],[43,1],[43,2],[43,3],[39,3],[39,1],[44,2],[44,1],[51,4],[54,1],[54,2],[54,3],[54,2],[54,3],[54,4],[54,5],[54,1],[54,2],[54,3],[52,1],[52,2],[56,0],[56,1],[56,1],[56,2],[56,1],[56,2],[56,1],[56,2],[56,1],[56,1],[56,1],[55,2],[55,2],[55,0],[20,0],[20,2],[21,0],[21,4],[73,1],[73,3],[75,5],[75,4],[75,4],[75,1],[74,0],[74,2],[24,0],[24,2],[24,3],[24,2],[24,2],[22,0],[22,3],[85,1],[85,3],[86,1],[86,2],[86,3],[86,4],[23,0],[23,3],[91,0],[91,2],[28,3],[28,1],[93,3],[93,2],[93,3],[93,2],[93,3],[93,2],[93,1],[96,5],[96,3],[96,1],[98,5],[98,3],[98,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[67,1],[105,6],[105,6],[105,8],[109,1],[109,1],[109,1],[109,1],[109,1],[109,1],[99,4],[110,1],[110,1],[110,1],[110,1],[110,1],[110,1],[110,1],[40,4],[40,3],[118,1],[118,3],[37,1],[101,1],[101,1],[95,1],[102,1],[103,4],[49,2],[49,2],[49,1],[104,5],[104,4],[128,2],[128,1],[131,4],[129,2],[129,0],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,5],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,3],[100,6],[100,6],[100,3],[100,3],[100,2],[100,2],[100,3],[100,5],[100,6],[100,5],[100,6],[100,3],[100,3],[151,1],[151,1],[151,1],[151,1],[151,1],[151,1],[152,1],[152,1],[152,1],[161,3],[161,2],[161,1],[161,5],[161,4],[161,3],[162,1],[162,3],[165,1],[165,1],[165,1],[165,1],[165,1],[165,1],[167,0],[167,2]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:

			if (yy.casesensitive) this.$ = $$[$0];
			else this.$ = $$[$0].toLowerCase();
		
break;
case 2:
 this.$ = doubleq($$[$0].substr(1,$$[$0].length-2)); 
break;
case 3:
 return new yy.Statements({statements:$$[$0-1]}); 
break;
case 4:
 this.$ = $$[$0-2]; if($$[$0]) $$[$0-2].push($$[$0]); 
break;
case 5: case 6: case 31: case 48: case 80: case 95: case 106: case 152: case 166: case 213: case 214: case 218:
 this.$ = [$$[$0]]; 
break;
case 7: case 24: case 30: case 75: case 76: case 78: case 86: case 88: case 93: case 101: case 103:
 this.$ = null; 
break;
case 9: case 10: case 38: case 85: case 113: case 120: case 121: case 122: case 123: case 124: case 125: case 126: case 127: case 128: case 129: case 130: case 131: case 132: case 136: case 137: case 138: case 139: case 140: case 141: case 168: case 203: case 204: case 205: case 206: case 207: case 208:
 this.$ = $$[$0]; 
break;
case 11:
 this.$ = $$[$0];
break;
case 13:
   yy.extend(this.$,$$[$0-7]); yy.extend(this.$,$$[$0-6]); yy.extend(this.$,$$[$0-5]); yy.extend(this.$,$$[$0-4]); 
		    yy.extend(this.$,$$[$0-3]); yy.extend(this.$,$$[$0-2]);yy.extend(this.$,$$[$0-1]); 
		    yy.extend(this.$,$$[$0]); 
		    this.$ = $$[$0-7];
		    if(yy.exists) this.$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) this.$.queries = yy.queries;
			delete yy.queries;
		
break;
case 14:
 this.$ = new yy.Select({ columns:$$[$0], distinct: true }); yy,extend(this.$, $$[$0-3]); yy.extend(this.$, $$[$0-1]); 
break;
case 15:
 this.$ = new yy.Select({ columns:$$[$0], distinct: true }); yy,extend(this.$, $$[$0-3]);yy.extend(this.$, $$[$0-1]); 
break;
case 16:
 this.$ = new yy.Select({ columns:$$[$0], all:true }); yy,extend(this.$, $$[$0-3]);yy.extend(this.$, $$[$0-1]); 
break;
case 17:
 this.$ = new yy.Select({ columns:$$[$0] }); yy,extend(this.$, $$[$0-2]);yy.extend(this.$, $$[$0-1]); 
break;
case 18:
 this.$ = null
break;
case 19:
 this.$ = {modifier:'VALUE'}
break;
case 20:
 this.$ = {modifier:'ROW'}
break;
case 21:
 this.$ = {modifier:'COLUMN'}
break;
case 22:
 this.$ = {modifier:'MATRIX'}
break;
case 23:
 this.$ = {top: $$[$0]}; 
break;
case 25:
this.$ = null
break;
case 26: case 27:
this.$ = {into: $$[$0]} 
break;
case 28:
 this.$ = { from: $$[$0] }; 
break;
case 29:
 this.$ = { from: [$$[$0-1]], joins: $$[$0] }; 
break;
case 32: case 81:
 this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 33:
 this.$ = $$[$0-2]; this.$.as = $$[$0] 
break;
case 34:
 this.$ = $$[$0-3]; this.$.as = $$[$0] 
break;
case 35:
 this.$ = $$[$0-1]; this.$.as = 'default' 
break;
case 36:
 this.$ = $$[$0-1]; $$[$0-1].as = $$[$0] 
break;
case 37:
 this.$ = $$[$0-2]; $$[$0-2].as = $$[$0] 
break;
case 39: case 43:
 this.$ = $$[$0-1]; $$[$0-1].as = $$[$0]; 
break;
case 40: case 44:
 this.$ = $$[$0-2]; $$[$0-2].as = $$[$0]; 
break;
case 41: case 42:
 this.$ = $$[$0]; $$[$0].as = 'default'; 
break;
case 45:
 this.$ = new yy.Table({databaseid: $$[$0-2], tableid:$$[$0]});
break;
case 46:
 this.$ = new yy.Table({tableid: $$[$0]});
break;
case 47:
 this.$ = $$[$0-1]; $$[$0-1].push($$[$0]); 
break;
case 49:
 this.$ = new yy.Join($$[$0-3]); yy.extend(this.$, $$[$0-1]); yy.extend(this.$, $$[$0]); 
break;
case 50:
 this.$ = {table: $$[$0]}; 
break;
case 51:
 this.$ = {table: $$[$0-1], as: $$[$0] } ; 
break;
case 52:
 this.$ = {table: $$[$0-2], as: $$[$0] } ; 
break;
case 53:
 this.$ = {param: $$[$0-1], as: $$[$0] } ; 
break;
case 54:
 this.$ = {param: $$[$0-2], as: $$[$0] } ; 
break;
case 55:
 this.$ = {select: $$[$0-3], as: $$[$0]} ; 
break;
case 56:
 this.$ = {select: $$[$0-4], as: $$[$0] } ; 
break;
case 57:
 this.$ = {func:$$[$0], as:'default'}; 
break;
case 58:
 this.$ = {func:$$[$0-1], as: $$[$0]}; 
break;
case 59:
 this.$ = {func:$$[$0-2], as: $$[$0]}; 
break;
case 60:
 this.$ = { joinmode: $$[$0] } ; 
break;
case 61:
 this.$ = {joinmode: $$[$0-1], natural:true} ; 
break;
case 62: case 63:
 this.$ = "INNER"; 
break;
case 64: case 65:
 this.$ = "LEFT"; 
break;
case 66: case 67:
 this.$ = "RIGHT"; 
break;
case 68: case 69:
 this.$ = "OUTER"; 
break;
case 70:
 this.$ = "SEMI"; 
break;
case 71:
 this.$ = "ANTI"; 
break;
case 72:
 this.$ = "CROSS"; 
break;
case 73:
 this.$ = {on: $$[$0]}; 
break;
case 74:
 this.$ = {using: $$[$0]}; 
break;
case 77:
 this.$ = {where: new yy.Expression({expression:$$[$0]})}; 
break;
case 79:
 this.$ = {group:$$[$0-1]}; yy.extend(this.$,$$[$0]); 
break;
case 82:
 this.$ = new yy.GroupExpression({type:'GROUPING SETS', group: $$[$0-1]}); 
break;
case 83:
 this.$ = new yy.GroupExpression({type:'ROLLUP', group: $$[$0-1]}); 
break;
case 84:
 this.$ = new yy.GroupExpression({type:'CUBE', group: $$[$0-1]}); 
break;
case 87:
 this.$ = {having:$$[$0]}
break;
case 89:
 this.$ = {union: $$[$0]} ; 
break;
case 90:
 this.$ = {unionall: $$[$0]} ; 
break;
case 91:
 this.$ = {except: $$[$0]} ; 
break;
case 92:
 this.$ = {intersect: $$[$0]} ; 
break;
case 94:
 this.$ = {order:$$[$0]}
break;
case 96:
 this.$ = $$[$0-2]; $$[$0-2].push($$[$0])
break;
case 97:
 this.$ = new yy.OrderExpression({expression: $$[$0], direction:'ASC'}) 
break;
case 98:
 this.$ = new yy.OrderExpression({expression: $$[$0-1], direction:$$[$0].toUpperCase()}) 
break;
case 99:
 this.$ = new yy.OrderExpression({expression: $$[$0-2], direction:'ASC', nocase:true}) 
break;
case 100:
 this.$ = new yy.OrderExpression({expression: $$[$0-3], direction:$$[$0].toUpperCase(), nocase:true}) 
break;
case 102:
 this.$ = {limit:$$[$0-1]}; yy.extend(this.$, $$[$0])
break;
case 104:
 this.$ = {offset:$$[$0]}
break;
case 105:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 107: case 109: case 111:
 $$[$0-2].as = $$[$0]; this.$ = $$[$0-2];
break;
case 108: case 110: case 112:
 $$[$0-1].as = $$[$0]; this.$ = $$[$0-1];
break;
case 114:
 this.$ = new yy.Column({columid: $$[$0], tableid: $$[$0-2], databaseid:$$[$0-4]}); 
break;
case 115:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2]}); 
break;
case 116:
 this.$ = new yy.Column({columnid:$$[$0]}); 
break;
case 117:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2], databaseid:$$[$0-4]});
break;
case 118:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2]});
break;
case 119:
 this.$ = new yy.Column({columnid: $$[$0]});
break;
case 133:
 this.$ = new yy.Cast({expression:$$[$0-3]}) ; yy.extend(this.$,$$[$0-1]) ; 
break;
case 134:
 this.$ = new yy.Cast({expression:$$[$0-1]}) ; yy.extend(this.$,$$[$0-3]) ; 
break;
case 135:
 this.$ = new yy.Cast({expression:$$[$0-3], style:$$[$0-1]}) ; yy.extend(this.$,$$[$0-5]) ; 
break;
case 142:
 this.$ = new yy.AggrValue({aggregatorid: $$[$0-3].toUpperCase(), expression: $$[$0-1]}); 
break;
case 143:
 this.$ = "SUM"; 
break;
case 144:
 this.$ = "COUNT"; 
break;
case 145:
 this.$ = "MIN"; 
break;
case 146:
 this.$ = "MAX"; 
break;
case 147:
 this.$ = "AVG"; 
break;
case 148:
 this.$ = "FIRST"; 
break;
case 149:
 this.$ = "LAST"; 
break;
case 150:
 this.$ = new yy.FuncValue({funcid: $$[$0-3], args: $$[$0-1]}); 
break;
case 151:
 this.$ = new yy.FuncValue({ funcid: $$[$0-2] }) 
break;
case 153:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2] 
break;
case 154:
 this.$ = new yy.NumValue({value:$$[$0]}); 
break;
case 155:
 this.$ = new yy.LogicValue({value:true}); 
break;
case 156:
 this.$ = new yy.LogicValue({value:false}); 
break;
case 157:
 this.$ = new yy.StringValue({value: $$[$0].substr(1,$$[$0].length-2).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); 
break;
case 158:
 this.$ = new yy.NullValue({value:null}); 
break;
case 159:

			if(!yy.exists) yy.exists = [];
			this.$ = new yy.ExistsValue({value:$$[$0-1], existsidx:yy.exists.length});
			yy.exists.push($$[$0-1]);
		
break;
case 160: case 161:
 this.$ = new yy.ParamValue({param: $$[$0]}); 
break;
case 162:

			if(typeof yy.question == 'undefined') yy.question = 0;
			this.$ = new yy.ParamValue({param: yy.question++});
		
break;
case 163:
 this.$ = new yy.CaseValue({expression:$$[$0-3], whens: $$[$0-2], elses: $$[$0-1]}); 
break;
case 164:
 this.$ = new yy.CaseValue({whens: $$[$0-2], elses: $$[$0-1]}); 
break;
case 165:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 167:
 this.$ = {when: $$[$0-2], then: $$[$0] }; 
break;
case 169:
this.$ = null; 
break;
case 170:
 this.$ = new yy.Op({left:$$[$0-2], op:'LIKE', right:$$[$0]}); 
break;
case 171:
 this.$ = new yy.Op({left:$$[$0-2], op:'+', right:$$[$0]}); 
break;
case 172:
 this.$ = new yy.Op({left:$$[$0-2], op:'-', right:$$[$0]}); 
break;
case 173:
 this.$ = new yy.Op({left:$$[$0-2], op:'*', right:$$[$0]}); 
break;
case 174:
 this.$ = new yy.Op({left:$$[$0-2], op:'/', right:$$[$0]}); 
break;
case 175:
 this.$ = new yy.Op({left:$$[$0-2], op:'%', right:$$[$0]}); 
break;
case 176: case 177: case 179:
 this.$ = new yy.Op({left:$$[$0-2], op:'->' , right:$$[$0]}); 
break;
case 178:
 this.$ = new yy.Op({left:$$[$0-4], op:'->' , right:$$[$0-1]}); 
break;
case 180:
 this.$ = new yy.Op({left:$$[$0-2], op:'>' , right:$$[$0]}); 
break;
case 181:
 this.$ = new yy.Op({left:$$[$0-2], op:'>=' , right:$$[$0]}); 
break;
case 182:
 this.$ = new yy.Op({left:$$[$0-2], op:'<' , right:$$[$0]}); 
break;
case 183:
 this.$ = new yy.Op({left:$$[$0-2], op:'<=' , right:$$[$0]}); 
break;
case 184:
 this.$ = new yy.Op({left:$$[$0-2], op:'=' , right:$$[$0]}); 
break;
case 185:
 this.$ = new yy.Op({left:$$[$0-2], op:'==' , right:$$[$0]}); 
break;
case 186:
 this.$ = new yy.Op({left:$$[$0-2], op:'===' , right:$$[$0]}); 
break;
case 187:
 this.$ = new yy.Op({left:$$[$0-2], op:'!=' , right:$$[$0]}); 
break;
case 188:
 this.$ = new yy.Op({left:$$[$0-2], op:'!==' , right:$$[$0]}); 
break;
case 189:
 this.$ = new yy.Op({left:$$[$0-2], op:'!===' , right:$$[$0]}); 
break;
case 190:

			if(!yy.queries) yy.queries = [];
			this.$ = new yy.Op({left:$$[$0-5], op:$$[$0-4] , allsome:$$[$0-3], right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);
		
break;
case 191:

			this.$ = new yy.Op({left:$$[$0-5], op:$$[$0-4] , allsome:$$[$0-3], right:$$[$0-1]});
		
break;
case 192:
 this.$ = new yy.Op({left:$$[$0-2], op:'AND' , right:$$[$0]}); 
break;
case 193:
 this.$ = new yy.Op({left:$$[$0-2], op:'OR' , right:$$[$0]}); 
break;
case 194:
 this.$ = new yy.UniOp({op:'NOT' , right:$$[$0]}); 
break;
case 195:
 this.$ = new yy.UniOp({op:'-' , right:$$[$0]}); 
break;
case 196:
 this.$ = new yy.UniOp({right: $$[$0-1]}); 
break;
case 197:

			if(!yy.queries) yy.queries = [];
			this.$ = new yy.Op({left: $$[$0-4], op:'IN', right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);
		
break;
case 198:

			if(!yy.queries) yy.queries = [];
			this.$ = new yy.Op({left: $$[$0-5], op:'NOT IN', right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);
		
break;
case 199:
 this.$ = new yy.Op({left: $$[$0-4], op:'IN', right:$$[$0-1]}); 
break;
case 200:
 this.$ = new yy.Op({left: $$[$0-5], op:'NOT IN', right:$$[$0-1]}); 
break;
case 201:
 this.$ = new yy.Op({left:$$[$0-2], op:'BETWEEN', right:$$[$0] }); 
break;
case 202:
 this.$ = new yy.Op({left:$$[$0-2], op:'NOT BETWEEN', right:$$[$0] }); 
break;
case 209:
 this.$ = 'ALL'; 
break;
case 210:
 this.$ = 'SOME'; 
break;
case 211:
 this.$ = 'ANY'; 
break;
case 212:
 this.$ = [$$[$0-1]]; 
break;
case 215:
this.$ = $$[$0-4]; $$[$0-4].push($$[$0-1])
break;
case 216:
this.$ = $$[$0-3]; $$[$0-3].push($$[$0])
break;
case 217: case 219:
this.$ = $$[$0-2]; $$[$0-2].push($$[$0])
break;
case 226:
this.$ = null;
break;
case 227:
 this.$ = $$[$0-1]; 
break;
}
},
table: [o($V0,$V1,{6:1,7:2,10:3,12:5,17:6,25:7,11:[1,4],31:$V2}),{1:[3]},{8:[1,9],9:[1,10]},o($V0,[2,5]),o($V0,[2,6]),o($V0,[2,8]),o($V3,[2,25],{18:11,38:[1,12]}),o($V4,$V5,{27:16,26:[1,13],29:[1,14],30:[1,15],36:$V6}),o($V7,[2,18],{32:[1,18],33:[1,19],34:[1,20],35:[1,21]}),{1:[2,3]},o($V0,$V1,{12:5,17:6,25:7,10:22,31:$V2}),o($V8,[2,30],{19:23,41:[1,24]}),{3:27,4:$V9,5:$Va,39:25,40:26},o($V4,$V5,{27:30,36:$V6}),o($V4,$V5,{27:31,36:$V6}),o($V4,$V5,{27:32,36:$V6}),{3:50,4:$V9,5:$Va,28:33,37:41,40:37,46:$Vb,49:45,67:35,93:34,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{37:74,94:$Vc},o($V7,[2,19]),o($V7,[2,20]),o($V7,[2,21]),o($V7,[2,22]),o($V0,[2,4]),o($Vy,[2,76],{20:75,70:[1,76]}),{3:27,4:$V9,5:$Va,39:80,40:82,42:77,43:78,46:$Vz,49:81,124:$Vs,125:$Vt,126:$Vu},o($V3,[2,26]),o($V3,[2,27]),o($VA,[2,46],{46:$VB,50:[1,83]}),o($VC,[2,1]),o($VC,[2,2]),{3:50,4:$V9,5:$Va,28:85,37:41,40:37,46:$Vb,49:45,67:35,93:34,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,28:86,37:41,40:37,46:$Vb,49:45,67:35,93:34,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,28:87,37:41,40:37,46:$Vb,49:45,67:35,93:34,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($VD,[2,17],{45:$VE}),o($VF,[2,106]),o($VF,[2,113],{3:90,95:92,151:110,4:$V9,5:$Va,48:[1,89],94:[1,91],97:$VG,121:$Vp,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),o($V11,[2,120]),o($V11,[2,121]),o($V11,[2,122]),o($V11,[2,123]),o($V11,[2,124]),o($V11,[2,125]),o($V11,[2,126]),o($V11,[2,127]),o($V11,[2,128]),o($V11,[2,129]),o($V11,[2,130]),o($V11,[2,131]),o($V11,[2,132]),{46:[1,117]},o($V11,[2,119],{46:$VB,50:[1,118]}),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:119,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:120,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:121,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($V11,[2,116]),o([4,5,8,9,38,41,45,46,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,92,94,97,106,108,111,112,113,114,115,116,117,119,120,121,122,123,124,125,126,127,130,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,153,154,155,156,157,158],[2,154]),o($V11,[2,155]),o($V11,[2,156]),o($V11,[2,157]),o($V11,[2,158]),{3:122,4:$V9,5:$Va},{3:123,4:$V9,5:$Va},o($V11,[2,162]),{46:[1,124]},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:125,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,128:126,131:127,132:$V21,137:$Vw,155:$Vx},{46:[1,129]},{46:[1,130]},{46:[2,143]},{46:[2,144]},{46:[2,145]},{46:[2,146]},{46:[2,147]},{46:[2,148]},{46:[2,149]},o($V4,[2,23]),o($V31,[2,78],{21:131,71:[1,132]}),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:133,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($V8,[2,28],{45:[1,134]}),o($V41,[2,31],{44:135,51:136,52:137,56:138,53:$V51,57:$V61,58:$V71,59:$V81,60:$V91,61:$Va1,62:$Vb1,63:$Vc1,64:$Vd1,65:$Ve1}),{12:148,17:6,25:7,31:$V2},o($Vf1,[2,38],{3:149,4:$V9,5:$Va,48:[1,150]}),o($Vf1,[2,41],{3:151,4:$V9,5:$Va,48:[1,152]}),o($Vf1,[2,42],{3:153,4:$V9,5:$Va,48:[1,154]}),{3:155,4:$V9,5:$Va},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,47:[1,157],49:45,67:158,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,118:156,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($VD,[2,14],{45:$VE}),o($VD,[2,15],{45:$VE}),o($VD,[2,16],{45:$VE}),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:35,93:159,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:160,4:$V9,5:$Va,94:[1,161],95:162,121:$Vp},o($VF,[2,108]),o($VF,[2,110]),o($VF,[2,112]),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:163,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:164,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:165,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:166,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:167,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:168,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:169,4:$V9,5:$Va,37:170,40:172,46:[1,171],94:$Vc},o($Vg1,[2,203],{99:36,40:37,100:38,98:39,96:40,37:41,101:42,95:43,102:44,49:45,103:46,104:47,105:48,110:49,3:50,67:173,4:$V9,5:$Va,46:$Vb,94:$Vc,97:$Vd,106:$Ve,108:$Vf,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx}),o($Vg1,[2,204],{99:36,40:37,100:38,98:39,96:40,37:41,101:42,95:43,102:44,49:45,103:46,104:47,105:48,110:49,3:50,67:174,4:$V9,5:$Va,46:$Vb,94:$Vc,97:$Vd,106:$Ve,108:$Vf,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx}),o($Vg1,[2,205],{99:36,40:37,100:38,98:39,96:40,37:41,101:42,95:43,102:44,49:45,103:46,104:47,105:48,110:49,3:50,67:175,4:$V9,5:$Va,46:$Vb,94:$Vc,97:$Vd,106:$Ve,108:$Vf,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx}),o($Vg1,[2,206],{99:36,40:37,100:38,98:39,96:40,37:41,101:42,95:43,102:44,49:45,103:46,104:47,105:48,110:49,3:50,67:176,4:$V9,5:$Va,46:$Vb,94:$Vc,97:$Vd,106:$Ve,108:$Vf,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx}),o($Vg1,[2,207],{99:36,40:37,100:38,98:39,96:40,37:41,101:42,95:43,102:44,49:45,103:46,104:47,105:48,110:49,3:50,67:177,4:$V9,5:$Va,46:$Vb,94:$Vc,97:$Vd,106:$Ve,108:$Vf,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx}),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:178,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:179,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($Vg1,[2,208],{99:36,40:37,100:38,98:39,96:40,37:41,101:42,95:43,102:44,49:45,103:46,104:47,105:48,110:49,3:50,67:180,4:$V9,5:$Va,46:$Vb,94:$Vc,97:$Vd,106:$Ve,108:$Vf,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx}),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:181,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:182,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{30:[1,184],152:183,159:[1,185],160:[1,186]},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:187,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:188,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{46:[1,189]},{156:[1,190]},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:191,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:192,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:193,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:194,4:$V9,5:$Va,97:[1,195]},o([4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,121,130,132,133,134,141,142,143,144,145,146,147,148,149,150,153,154,155,156,157,158],[2,194],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM}),o($Vh1,[2,195],{151:110,97:$VG,138:$VK,139:$VL,140:$VM}),{47:[1,196],97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,151:110,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01},o($V11,[2,160]),o($V11,[2,161]),{12:197,17:6,25:7,31:$V2},{97:$VG,128:198,131:127,132:$V21,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,151:110,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01},{129:199,130:$Vi1,131:200,132:$V21,134:$Vj1},o($Vk1,[2,166]),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:202,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:203,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{107:[1,204]},o($Vl1,[2,93],{22:205,84:[1,206]}),{72:[1,207]},o($Vy,[2,77],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),{3:27,4:$V9,5:$Va,39:80,40:82,43:208,46:$Vz,49:81,124:$Vs,125:$Vt,126:$Vu},o($V8,[2,29],{52:137,56:138,51:209,53:$V51,57:$V61,58:$V71,59:$V81,60:$V91,61:$Va1,62:$Vb1,63:$Vc1,64:$Vd1,65:$Ve1}),o($Vm1,[2,48]),{53:[1,210]},{53:[2,60]},{53:$V51,56:211,58:$V71,59:$V81,60:$V91,61:$Va1,62:$Vb1,63:$Vc1,64:$Vd1,65:$Ve1},{53:[2,63]},{53:[2,64],60:[1,212]},{53:[2,66],60:[1,213]},{53:[2,68]},{60:[1,214]},{53:[2,70]},{53:[2,71]},{53:[2,72]},{47:[1,215]},o($Vf1,[2,36]),{3:216,4:$V9,5:$Va},o($Vf1,[2,39]),{3:217,4:$V9,5:$Va},o($Vf1,[2,43]),{3:218,4:$V9,5:$Va},o($VA,[2,45]),{45:$Vn1,47:[1,219]},o($Vo1,[2,151]),o($Vp1,[2,152],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),o($VF,[2,105]),o($VF,[2,107]),o($VF,[2,109]),o($VF,[2,111]),o([4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,121,130,132,133,134,135,141,142,143,144,145,146,147,148,149,150,153,154,155,156,157,158],[2,170],{151:110,97:$VG,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM}),o($Vh1,[2,171],{151:110,97:$VG,138:$VK,139:$VL,140:$VM}),o($Vh1,[2,172],{151:110,97:$VG,138:$VK,139:$VL,140:$VM}),o($Vq1,[2,173],{151:110,140:$VM}),o($Vq1,[2,174],{151:110,140:$VM}),o($Vq1,[2,175],{151:110,140:$VM}),o($V11,[2,176],{46:$VB}),o($V11,[2,177]),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:221,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($V11,[2,179]),o($Vr1,[2,180],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,181],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,182],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,183],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,184],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,185],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,186],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,187],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,188],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),o($Vr1,[2,189],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,155:$VZ,156:$V_}),{46:[1,222]},{46:[2,209]},{46:[2,210]},{46:[2,211]},o([4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,121,130,132,133,134,153,154,157,158],[2,192],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,155:$VZ,156:$V_}),o([4,5,8,9,38,41,45,47,48,53,57,58,59,60,61,62,63,64,65,70,71,80,81,82,83,84,87,88,90,94,121,130,132,133,134,154],[2,193],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,155:$VZ,156:$V_,157:$V$,158:$V01}),{3:50,4:$V9,5:$Va,12:223,17:6,25:7,31:$V2,37:41,40:37,46:$Vb,49:45,67:158,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,118:224,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{46:[1,225]},o($Vs1,[2,201],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,155:$VZ,156:$V_}),o($Vs1,[2,202],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,155:$VZ,156:$V_}),{47:[1,226],97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,151:110,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01},o($V11,[2,118],{50:[1,227]}),o($V11,[2,115]),o($V11,[2,196]),{47:[1,228]},{129:229,130:$Vi1,131:200,132:$V21,134:$Vj1},{130:[1,230]},o($Vk1,[2,165]),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:231,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{97:$VG,133:[1,232],135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,151:110,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01},{48:[1,233],97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,151:110,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01},{45:[1,234]},o($Vt1,[2,101],{23:235,90:[1,236]}),{72:[1,237]},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:243,73:238,75:239,76:$Vu1,78:$Vv1,79:$Vw1,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($V41,[2,32]),o($Vm1,[2,47]),{3:27,4:$V9,5:$Va,39:245,40:248,46:[1,247],49:246,54:244,124:$Vs,125:$Vt,126:$Vu},{53:[2,61]},{53:[2,65]},{53:[2,67]},{53:[2,69]},o($Vf1,[2,35],{3:249,4:$V9,5:$Va,48:[1,250]}),o($Vf1,[2,37]),o($Vf1,[2,40]),o($Vf1,[2,44]),o($Vo1,[2,150]),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:251,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{47:[1,252],97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,151:110,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01},{3:50,4:$V9,5:$Va,12:253,17:6,25:7,31:$V2,37:41,40:37,46:$Vb,49:45,67:158,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,118:254,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{47:[1,255]},{45:$Vn1,47:[1,256]},{3:50,4:$V9,5:$Va,12:257,17:6,25:7,31:$V2,37:41,40:37,46:$Vb,49:45,67:158,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,118:258,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($V11,[2,142]),{3:259,4:$V9,5:$Va,97:[1,260]},o($V11,[2,159]),{130:[1,261]},o($V11,[2,164]),{97:$VG,130:[2,168],135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,151:110,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:262,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{107:[1,263]},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:264,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($Vx1,[2,88],{24:265,81:[1,266],82:[1,267],83:[1,268]}),{37:269,94:$Vc},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:272,85:270,86:271,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($V31,[2,86],{74:273,45:$Vy1,80:[1,275]}),o($Vz1,[2,80]),{77:[1,276]},{46:[1,277]},{46:[1,278]},o($Vz1,[2,85],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),o($Vm1,[2,75],{55:279,66:[1,280],68:[1,281]}),o($VA1,[2,50],{3:282,4:$V9,5:$Va,48:[1,283]}),{3:284,4:$V9,5:$Va,48:[1,285]},{12:286,17:6,25:7,31:$V2},o($VA1,[2,57],{3:287,4:$V9,5:$Va,48:[1,288]}),o($Vf1,[2,33]),{3:289,4:$V9,5:$Va},o($Vp1,[2,153],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),o($V11,[2,178]),{47:[1,290]},{45:$Vn1,47:[1,291]},o($V11,[2,197]),o($V11,[2,199]),{47:[1,292]},{45:$Vn1,47:[1,293]},o($V11,[2,117]),o($V11,[2,114]),o($V11,[2,163]),o($Vk1,[2,167],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),{47:[1,294]},{45:[1,296],47:[1,295],97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,151:110,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01},o($Vx1,[2,13]),{12:297,17:6,25:7,30:[1,298],31:$V2},{12:299,17:6,25:7,31:$V2},{12:300,17:6,25:7,31:$V2},o($Vt1,[2,103],{91:301,92:[1,302]}),o($Vl1,[2,94],{45:[1,303]}),o($VB1,[2,95]),o($VB1,[2,97],{151:110,87:[1,304],88:[1,305],97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),o($V31,[2,79]),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:243,75:306,76:$Vu1,78:$Vv1,79:$Vw1,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:307,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{46:[1,308]},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:243,73:309,75:239,76:$Vu1,78:$Vv1,79:$Vw1,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:243,73:310,75:239,76:$Vu1,78:$Vv1,79:$Vw1,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($Vm1,[2,49]),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:311,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{69:[1,312]},o($VA1,[2,51]),{3:313,4:$V9,5:$Va},o($VA1,[2,53]),{3:314,4:$V9,5:$Va},{47:[1,315]},o($VA1,[2,58]),{3:316,4:$V9,5:$Va},o($Vf1,[2,34]),o($V11,[2,190]),o($V11,[2,191]),o($V11,[2,198]),o($V11,[2,200]),o($V11,[2,133]),o($V11,[2,134]),{94:[1,317]},o($Vx1,[2,89]),{12:318,17:6,25:7,31:$V2},o($Vx1,[2,91]),o($Vx1,[2,92]),o($Vt1,[2,102]),{37:319,94:$Vc},{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:272,86:320,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},o($VB1,[2,98]),{89:[1,321]},o($Vz1,[2,81]),o($V31,[2,87],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),{3:50,4:$V9,5:$Va,37:41,40:37,46:$Vb,49:45,67:243,73:322,75:239,76:$Vu1,78:$Vv1,79:$Vw1,94:$Vc,95:43,96:40,97:$Vd,98:39,99:36,100:38,101:42,102:44,103:46,104:47,105:48,106:$Ve,108:$Vf,110:49,111:$Vg,112:$Vh,113:$Vi,114:$Vj,115:$Vk,116:$Vl,117:$Vm,119:$Vn,120:$Vo,121:$Vp,122:$Vq,123:$Vr,124:$Vs,125:$Vt,126:$Vu,127:$Vv,137:$Vw,155:$Vx},{45:$Vy1,47:[1,323]},{45:$Vy1,47:[1,324]},o($Vm1,[2,73],{151:110,97:$VG,135:$VH,136:$VI,137:$VJ,138:$VK,139:$VL,140:$VM,141:$VN,142:$VO,143:$VP,144:$VQ,145:$VR,146:$VS,147:$VT,148:$VU,149:$VV,150:$VW,153:$VX,154:$VY,155:$VZ,156:$V_,157:$V$,158:$V01}),o($Vm1,[2,74]),o($VA1,[2,52]),o($VA1,[2,54]),{3:325,4:$V9,5:$Va,48:[1,326]},o($VA1,[2,59]),{47:[1,327]},o($Vx1,[2,90]),o($Vt1,[2,104]),o($VB1,[2,96]),o($VB1,[2,99],{87:[1,328]}),{45:$Vy1,47:[1,329]},o($Vz1,[2,83]),o($Vz1,[2,84]),o($VA1,[2,55]),{3:330,4:$V9,5:$Va},o($V11,[2,135]),o($VB1,[2,100]),o($Vz1,[2,82]),o($VA1,[2,56])],
defaultActions: {9:[2,3],67:[2,143],68:[2,144],69:[2,145],70:[2,146],71:[2,147],72:[2,148],73:[2,149],138:[2,60],140:[2,63],143:[2,68],145:[2,70],146:[2,71],147:[2,72],184:[2,209],185:[2,210],186:[2,211],211:[2,61],212:[2,65],213:[2,67],214:[2,69]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        function lex() {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 'ATLBRA'
break;
case 1:return 5
break;
case 2:return 5
break;
case 3:return 121
break;
case 4:return 121
break;
case 5:return /* skip comments */
break;
case 6:return /* return 'COMMENT' */
break;
case 7:/* skip whitespace */
break;
case 8:return 154
break;
case 9:return 153
break;
case 10:return 'ABSOLUTE'
break;
case 11:return 'ADD'
break;
case 12:return 30
break;
case 13:return 'ALTER'
break;
case 14:return 153
break;
case 15:return 64
break;
case 16:return 160
break;
case 17:return 48
break;
case 18:return 'ASSERT'
break;
case 19:return 87
break;
case 20:return 115
break;
case 21:return 'BEGIN'
break;
case 22:return 157
break;
case 23:return 158
break;
case 24:return 72
break;
case 25:return 127
break;
case 26:return 106
break;
case 27:return 'CHARSET'
break;
case 28:return 88
break;
case 29:return "CONVERT"
break;
case 30:return "COUNT"
break;
case 31:return "CROSS"
break;
case 32:return 'DEFAULT'
break;
case 33:return 'DELETE'
break;
case 34:return 87
break;
case 35:return 26
break;
case 36:return 'ENGINE'
break;
case 37:return 'ENUM'
break;
case 38:return 134
break;
case 39:return 82
break;
case 40:return 123
break;
case 41:return 'EXPLAIN'
break;
case 42:return 120
break;
case 43:return 116
break;
case 44:return 'FOREIGN'
break;
case 45:return 41
break;
case 46:return 71
break;
case 47:return 76
break;
case 48:return 80
break;
case 49:return 'HELP'
break;
case 50:return 'IF'
break;
case 51:return 'IDENTITY'
break;
case 52:return 156
break;
case 53:return 'INDEX'
break;
case 54:return 58
break;
case 55:return 'INSERT'
break;
case 56:return 83
break;
case 57:return 38
break;
case 58:return 53
break;
case 59:return 'KEY'
break;
case 60:return 117
break;
case 61:return 59
break;
case 62:return 135
break;
case 63:return 90
break;
case 64:return 'SOURCE'
break;
case 65:return 35
break;
case 66:return "MAX"
break;
case 67:return "MIN"
break;
case 68:return "EXCEPT"
break;
case 69:return 89
break;
case 70:return 155
break;
case 71:return 122
break;
case 72:return 'OFF'
break;
case 73:return 66
break;
case 74:return 92
break;
case 75:return 'OPEN'
break;
case 76:return 154
break;
case 77:return 84
break;
case 78:return 60
break;
case 79:return 61
break;
case 80:return 33
break;
case 81:return 31
break;
case 82:return 'SET'
break;
case 83:return 77
break;
case 84:return 159
break;
case 85:return "SUM"
break;
case 86:return 133
break;
case 87:return 'TO'
break;
case 88:return 36
break;
case 89:return 119
break;
case 90:return 81
break;
case 91:return 29
break;
case 92:return 'UPDATE'
break;
case 93:return 'USE'
break;
case 94:return 68
break;
case 95:return 32
break;
case 96:return 'VALUES'
break;
case 97:return 132
break;
case 98:return 70
break;
case 99:return 94
break;
case 100:return 140
break;
case 101:return 136
break;
case 102:return 137
break;
case 103:return 97
break;
case 104:return 138
break;
case 105:return 139
break;
case 106:return 150
break;
case 107:return 147
break;
case 108:return 149
break;
case 109:return 146
break;
case 110:return 142
break;
case 111:return 141
break;
case 112:return 144
break;
case 113:return 148
break;
case 114:return 143
break;
case 115:return 145
break;
case 116:return 148
break;
case 117:return 46
break;
case 118:return 47
break;
case 119:return 163
break;
case 120:return 'LCUR'
break;
case 121:return 'RCUR'
break;
case 122:return 'RBRA'
break;
case 123:return 50
break;
case 124:return 45
break;
case 125:return 125
break;
case 126:return 9
break;
case 127:return 124
break;
case 128:return 126
break;
case 129:return 4
break;
case 130:return 8
break;
case 131:return 'INVALID'
break;
}
},
rules: [/^(?:@\[)/i,/^(?:\[([^\]])*?\])/i,/^(?:`([^\]])*?`)/i,/^(?:(['](\\.|[^']|\\')*?['])+)/i,/^(?:(["](\\.|[^"]|\\")*?["])+)/i,/^(?:\/\*(.*?)\*\/)/i,/^(?:--(.*?)($|\r\n|\r|\n))/i,/^(?:\s+)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:ABSOLUTE\b)/i,/^(?:ADD\b)/i,/^(?:ALL\b)/i,/^(?:ALTER\b)/i,/^(?:AND\b)/i,/^(?:ANTI\b)/i,/^(?:ANY\b)/i,/^(?:AS\b)/i,/^(?:ASSERT\b)/i,/^(?:ASC\b)/i,/^(?:AVG\b)/i,/^(?:BEGIN\b)/i,/^(?:BETWEEN\b)/i,/^(?:NOT BETWEEN\b)/i,/^(?:BY\b)/i,/^(?:CASE\b)/i,/^(?:CAST\b)/i,/^(?:CHARSET\b)/i,/^(?:COLLATE\b)/i,/^(?:CONVERT\b)/i,/^(?:COUNT\b)/i,/^(?:CROSS\b)/i,/^(?:DEFAULT\b)/i,/^(?:DELETE\b)/i,/^(?:DESC\b)/i,/^(?:DISTINCT\b)/i,/^(?:ENGINE\b)/i,/^(?:ENUM\b)/i,/^(?:ELSE\b)/i,/^(?:EXCEPT\b)/i,/^(?:EXISTS\b)/i,/^(?:EXPLAIN\b)/i,/^(?:FALSE\b)/i,/^(?:FIRST\b)/i,/^(?:FOREIGN\b)/i,/^(?:FROM\b)/i,/^(?:GROUP\b)/i,/^(?:GROUPING\b)/i,/^(?:HAVING\b)/i,/^(?:HELP\b)/i,/^(?:IF\b)/i,/^(?:IDENTITY\b)/i,/^(?:IN\b)/i,/^(?:INDEX\b)/i,/^(?:INNER\b)/i,/^(?:INSERT\b)/i,/^(?:INTERSECT\b)/i,/^(?:INTO\b)/i,/^(?:JOIN\b)/i,/^(?:KEY\b)/i,/^(?:LAST\b)/i,/^(?:LEFT\b)/i,/^(?:LIKE\b)/i,/^(?:LIMIT\b)/i,/^(?:SOURCE\b)/i,/^(?:MATRIX\b)/i,/^(?:MAX\b)/i,/^(?:MIN\b)/i,/^(?:MINUS\b)/i,/^(?:NOCASE\b)/i,/^(?:NOT\b)/i,/^(?:NULL\b)/i,/^(?:OFF\b)/i,/^(?:ON\b)/i,/^(?:OFFSET\b)/i,/^(?:OPEN\b)/i,/^(?:OR\b)/i,/^(?:ORDER\b)/i,/^(?:OUTER\b)/i,/^(?:RIGHT\b)/i,/^(?:ROW\b)/i,/^(?:SELECT\b)/i,/^(?:SET\b)/i,/^(?:SETS\b)/i,/^(?:SOME\b)/i,/^(?:SUM\b)/i,/^(?:THEN\b)/i,/^(?:TO\b)/i,/^(?:TOP\b)/i,/^(?:TRUE\b)/i,/^(?:UNION\b)/i,/^(?:UNIQUE\b)/i,/^(?:UPDATE\b)/i,/^(?:USE\b)/i,/^(?:USING\b)/i,/^(?:VALUE\b)/i,/^(?:VALUES\b)/i,/^(?:WHEN\b)/i,/^(?:WHERE\b)/i,/^(?:(\d*[.])?\d+)/i,/^(?:->)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:!===)/i,/^(?:===)/i,/^(?:!==)/i,/^(?:==)/i,/^(?:>=)/i,/^(?:>)/i,/^(?:<=)/i,/^(?:<>)/i,/^(?:<)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:\()/i,/^(?:\))/i,/^(?:@)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\])/i,/^(?:\.)/i,/^(?:,)/i,/^(?::)/i,/^(?:;)/i,/^(?:\$)/i,/^(?:\?)/i,/^(?:[a-zA-Z_][a-zA-Z_0-9]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}

/*
//
// Transactio class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/


//formerly 21transaction.js, alasql.Transaction

// Transaction class (for WebSQL compatibility)

/**
 Transaction class
 @class Transaction
 */

function Transaction(databaseid) {
	this.transactionid = Date.now();
	this.databaseid = databaseid;
	this.commited = false;
	this.dbversion = alasql.databases[databaseid].dbversion;
//	this.bank = cloneDeep(alasql.databases[databaseid]);
	this.bank = JSON.stringify(alasql.databases[databaseid]);
	// TODO CLone Tables with insertfns
//	console.log(this);
	return this;
};

// Main class


// Commit

/**
 Commit transaction
 */
Transaction.prototype.commit = function() {
	this.commited = true;
	alasql.databases[this.databaseid].dbversion = Date.now();
	delete this.bank;
};

// Rollback
/**
 Rollback transaction
 */
Transaction.prototype.rollback = function() {
	if(!this.commited) {
		alasql.databases[this.databaseid] = JSON.parse(this.bank);
		// alasql.databases[this.databaseid].tables = this.bank;
		// alasql.databases[this.databaseid].dbversion = this.dbversion;
		delete this.bank;
	} else {
		throw new Error('Transaction already commited');
	}
};

// Transactions stub

/**
 Execute SQL statement
 @param {string} sql SQL statement
 @param {object} params Parameters
 @param {function} cb Callback function
 @return result
 */
Transaction.prototype.exec = function(sql, params, cb) {
//	console.log(this.databaseid);
	return alasql.dexec(this.databaseid,sql,params,cb);
};

Transaction.prototype.executeSQL = Transaction.prototype.exec;

/*
//
// Database class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Main Database class
//formerly 20database.js and alasql.Datasbase

/**
    @class Database
 */

function Database(databaseid) {
	var self = this;
//		self = function(a){console.log('OK',a);}
//		self.prototype = this;

	if(self === alasql$1) {
		if(databaseid) {
//			if(alasql.databases[databaseid]) {
				self = alasql$1.databases[databaseid];
//			} else {
				alasql$1.databases[databaseid] = self;
//			}
			if(!self) {
				throw new Error('Database "'+databaseid+'" not found');
			}
		} else {
			// Create new database (or get alasql?)
			self = alasql$1.databases.alasql;
			// For SQL Server examples, USE tempdb
			if(alasql$1.options.tsql){
				alasql$1.databases.tempdb = alasql$1.databases.alasql;
			}
//			self = new Database(databaseid); // to call without new
		}
	}
	if(!databaseid) {
		databaseid = "db"+(alasql$1.databasenum++); // Random name
	}
	self.databaseid = databaseid;
	alasql$1.databases[databaseid] = self;
	self.tables = {};
	self.views = {};

	// Objects storage
	self.objects = {};
	self.counter = 0;

	self.indices = {};
//	self.fn = {};
	self.resetSqlCache();
	self.dbversion = 0;
	return self;
};


/**
    Reset SQL statements cache
 */

Database.prototype.resetSqlCache = function () {
	this.sqlCache = {}; // Cache for compiled SQL statements
	this.sqlCacheSize = 0;
}


// // Main SQL function

/**
    Run SQL statement on database
    @param {string} sql SQL statement
    @param [object] params Parameters
    @param {function} cb callback
 */

Database.prototype.exec = function(sql, params, cb) {
	return alasql$1.dexec(this.databaseid, sql, params, cb);
};

Database.prototype.transaction = function(cb) {
	var tx = new Transaction(this.databaseid);
	var res = cb(tx);
	return res;
};

var yy$1 = {
  extend:extend,
  Statements:Statements,
  Select:Select$1,
  AggrValue:AggrValue,
  ParamValue:ParamValue,
  Column:Column,
  NumValue:NumValue,
  Op:Op,
  Expression:Expression,
  StringValue:StringValue,
  UniOp:UniOp
};



parser.yy = yy$1;
alasql$1.yy = yy$1;
alasql$1.parser = parser;
alasql$1.Database = Database;

// Create default database
new alasql$1.Database("alasql");

// Set default database
alasql$1.use("alasql");

module.exports =  alasql$1;