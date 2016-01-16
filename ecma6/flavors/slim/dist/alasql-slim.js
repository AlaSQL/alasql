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

//formerly yy.CaseValue
function CaseValue(params) { return extend(this, params); };
CaseValue.prototype.toString = function() {
	var s = 'CASE ';
	if(this.expression) s += this.expression.toString();
	if(this.whens) {
		s += this.whens.map(function(w) { return ' WHEN '+
			w.when.toString() + ' THEN '+w.then.toString()}).join();
	}
	s += ' END';
	return s;
};

CaseValue.prototype.findAggregator = function (query){
//	console.log(this.toString());
	if(this.expression && this.expression.findAggregator) this.expression.findAggregator(query);
	if(this.whens && this.whens.length > 0) {
		this.whens.forEach(function(w) {
			if(w.when.findAggregator) w.when.findAggregator(query);
			if(w.then.findAggregator) w.then.findAggregator(query);
		});
	};
	if(this.elses && this.elses.findAggregator) this.elses.findAggregator(query);
};

CaseValue.prototype.toJS = function(context, tableid, defcols) {

	var s = '((function('+context+',params,alasql){var r;';
	if(this.expression) {
//			this.expression.toJS(context, tableid)
		s += 'v='+this.expression.toJS(context, tableid, defcols)+';';
		s += (this.whens||[]).map(function(w) { return ' if(v=='+w.when.toJS(context,tableid, defcols)
			+') {r='+w.then.toJS(context,tableid, defcols)+'}'; }).join(' else ');
		if(this.elses) s += ' else {r='+this.elses.toJS(context,tableid, defcols)+'}';
	} else {
		s += (this.whens||[]).map(function(w) { return ' if('+w.when.toJS(context,tableid, defcols)
			+') {r='+w.then.toJS(context,tableid, defcols)+'}'; }).join(' else ');
		if(this.elses) s += ' else {r='+this.elses.toJS(context,tableid,defcols)+'}';
	}
	// TODO remove bind from CASE
	s += ';return r;}).bind(this))('+context+',params,alasql)';

	return s;
};

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


/**
    SQL LIKE emulation
    @parameter {string} pattern Search pattern
    @parameter {string} value Searched value
    @parameter {string} escape Escape character (optional)
    @return {boolean} If value LIKE pattern ESCAPE escape
*/

function like(pattern,value,escape) {
    // Verify escape character
    if(!escape) escape = '';

    var i=0;
    var s = '^';

    while(i<pattern.length) {
      var c = pattern[i], c1 = '';
      if(i<pattern.length-1) c1 = pattern[i+1];

      if(c === escape) {
        s += '\\'+c1;
        i++;
      } else if(c==='[' && c1 === '^') {
        s += '[^';
        i++;
      } else if(c==='[' || c===']' ) {
        s += c;
      } else if(c==='%') {
        s += '.*';
      } else if(c === '_') {
        s += '.';
      } else if('/.*+?|(){}'.indexOf(c)>-1) {
        s += '\\'+c;
      } else {
        s += c;
      }
      i++;
    }

    s += '$';
//    if(value == undefined) return false;
//console.log(s,value,(value||'').search(RegExp(s))>-1);
    return (value||'').search(RegExp(s))>-1;
}

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

function OrderExpression(params){ return extend(this, params); }
OrderExpression.prototype.toString = Expression.prototype.toString;

function Join(params) { return extend(this, params); };

Join.prototype.toString = function() {
	var s = ' ';
	if(this.joinmode){
		s += this.joinmode+' ';
	}
	s += 'JOIN ' + this.table.toString();
	return s;
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
			if(ord.expression instanceof NumValue) {
				ord.expression = self.columns[ord.expression.value-1];
//console.log(ord.expression);
				ord.expression = new Column({columnid:ord.expression.nick});
			};

			if(ord.expression instanceof Column) {
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

/**
@description Functions that are used in eval, kept here for research/legacy purposes
**/

alasql$1.utils = {
	like:like
}

function Apply(params) {
	return extend(this, params);
}

Apply.prototype.toString = function () {
	var s = this.applymode+' APPLY ('+this.select.toString()+')';

	if(this.as)
		s += ' AS '+this.as;

	return s;
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

		if(jn instanceof Apply) {
//			console.log('APPLY',jn.applymode);
			source = {
				alias: jn.as,
				applymode: jn.applymode,
				onmiddlefn: returnTrue$1,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue$1,
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
				onmiddlefn: returnTrue$1,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue$1,
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
				onmiddlefn: returnTrue$1,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue$1,
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
				onmiddlefn: returnTrue$1,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue$1
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
				onmiddlefn: returnTrue$1,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue$1
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
				onmiddlefn: returnTrue$1,
				srcwherefns: '',	// for optimization
				srcwherefn: returnTrue$1
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
			if(jn.on instanceof Op && jn.on.op == '=' && !jn.on.allsome) {
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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[8,297,298],$V1=[2,10],$V2=[1,7],$V3=[1,8],$V4=[1,9],$V5=[1,10],$V6=[1,11],$V7=[1,12],$V8=[1,13],$V9=[1,14],$Va=[1,15],$Vb=[1,16],$Vc=[1,17],$Vd=[1,18],$Ve=[1,19],$Vf=[1,20],$Vg=[1,21],$Vh=[1,22],$Vi=[1,23],$Vj=[1,24],$Vk=[1,25],$Vl=[1,26],$Vm=[1,27],$Vn=[1,29],$Vo=[1,30],$Vp=[1,31],$Vq=[1,32],$Vr=[1,33],$Vs=[1,34],$Vt=[1,36],$Vu=[1,37],$Vv=[1,38],$Vw=[1,39],$Vx=[1,40],$Vy=[1,41],$Vz=[1,42],$VA=[1,44],$VB=[1,45],$VC=[1,46],$VD=[1,49],$VE=[1,48],$VF=[1,52],$VG=[1,50],$VH=[8,62,77,82,99,109,141,147,148,162,177,209,222,224,297,298],$VI=[4,5,8,56,60,61,62,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,162,164,166,177,253,254,255,256,257,258,259,260,261,297,298],$VJ=[1,66],$VK=[1,67],$VL=[4,5,8,56,58,60,61,62,77,79,82,83,91,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,279,280,281,282,283,284,285,286,287,288,292,293,294,295,297,298],$VM=[4,5,8,61,62,77,82,91,99,109,111,112,117,121,123,124,131,133,135,141,147,148,158,159,160,162,177,209,222,224,241,242,243,244,246,253,254,255,256,257,258,259,260,261,263,264,265,266,267,269,270,281,297,298],$VN=[2,140],$VO=[1,72],$VP=[4,5,8,61,62,77,82,91,99,109,111,112,117,121,123,124,131,133,135,141,143,147,148,158,159,160,162,164,166,174,177,209,222,224,241,242,243,244,246,253,254,255,256,257,258,259,260,261,263,264,265,266,267,269,270,281,297,298],$VQ=[8,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,45,46,47,48,49,50,51,53,54,55,56,73,168,242,297,298],$VR=[8,62,77,82,99,109,141,147,148,162,209,222,224,297,298],$VS=[2,141],$VT=[1,83],$VU=[4,5,96],$VV=[1,95],$VW=[1,112],$VX=[1,94],$VY=[1,93],$VZ=[1,89],$V_=[1,90],$V$=[1,91],$V01=[1,92],$V11=[1,96],$V21=[1,97],$V31=[1,98],$V41=[1,99],$V51=[1,100],$V61=[1,101],$V71=[1,102],$V81=[1,103],$V91=[1,104],$Va1=[1,105],$Vb1=[1,106],$Vc1=[1,107],$Vd1=[1,108],$Ve1=[1,109],$Vf1=[1,110],$Vg1=[1,111],$Vh1=[1,113],$Vi1=[1,114],$Vj1=[1,115],$Vk1=[1,116],$Vl1=[1,117],$Vm1=[1,118],$Vn1=[1,119],$Vo1=[1,122],$Vp1=[1,123],$Vq1=[1,124],$Vr1=[1,125],$Vs1=[1,126],$Vt1=[1,127],$Vu1=[1,128],$Vv1=[1,129],$Vw1=[1,130],$Vx1=[1,131],$Vy1=[1,141],$Vz1=[1,142],$VA1=[1,132],$VB1=[1,133],$VC1=[1,134],$VD1=[1,135],$VE1=[1,136],$VF1=[1,137],$VG1=[1,138],$VH1=[1,139],$VI1=[1,140],$VJ1=[58,73,168],$VK1=[4,5,8,56,58,60,61,62,77,79,82,83,91,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,207,208,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,279,280,281,282,283,284,285,286,287,288,292,293,294,295,297,298],$VL1=[4,5,61,111,112,117,121,123,124,131,133,135,158,159,160,241,242,243,244,246,253,254,255,256,257,258,259,260,261,263,264,265,266,267,269,270,281],$VM1=[8,62,77,82,91,99,109,141,147,148,162,177,209,222,224,297,298],$VN1=[1,169],$VO1=[1,180],$VP1=[1,183],$VQ1=[1,178],$VR1=[1,186],$VS1=[1,167],$VT1=[1,190],$VU1=[1,187],$VV1=[1,175],$VW1=[1,174],$VX1=[1,177],$VY1=[1,179],$VZ1=[1,188],$V_1=[1,171],$V$1=[1,195],$V02=[1,193],$V12=[1,194],$V22=[1,181],$V32=[1,182],$V42=[1,184],$V52=[1,185],$V62=[1,191],$V72=[1,189],$V82=[1,192],$V92=[1,176],$Va2=[8,62,77,82,99,109,141,147,148,209,222,224,297,298],$Vb2=[1,210],$Vc2=[8,62,297,298],$Vd2=[1,216],$Ve2=[1,217],$Vf2=[1,218],$Vg2=[4,5,8,56,58,60,61,62,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,253,254,255,256,257,258,259,260,261,297,298],$Vh2=[1,259],$Vi2=[8,58,62,77,82,91,99,109,141,147,148,162,177,209,222,224,297,298],$Vj2=[1,288],$Vk2=[1,265],$Vl2=[1,273],$Vm2=[1,272],$Vn2=[1,279],$Vo2=[1,270],$Vp2=[1,274],$Vq2=[1,271],$Vr2=[1,275],$Vs2=[1,277],$Vt2=[1,289],$Vu2=[1,286],$Vv2=[1,287],$Vw2=[1,267],$Vx2=[1,269],$Vy2=[1,264],$Vz2=[1,266],$VA2=[1,268],$VB2=[1,276],$VC2=[1,278],$VD2=[1,280],$VE2=[1,281],$VF2=[1,282],$VG2=[1,283],$VH2=[1,284],$VI2=[1,290],$VJ2=[1,291],$VK2=[1,292],$VL2=[1,293],$VM2=[4,5,8,56,58,60,62,77,79,82,83,91,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,279,280,281,282,283,284,285,286,287,288,292,293,294,295,297,298],$VN2=[2,263],$VO2=[1,301],$VP2=[1,317],$VQ2=[8,62,99,109,141,147,148,209,222,224,297,298],$VR2=[1,338],$VS2=[1,332],$VT2=[4,5,8,58,60,62,77,82,99,109,141,147,148,162,185,187,199,200,201,202,203,204,205,206,207,208,209,222,224,297,298],$VU2=[8,58,62,77,82,99,109,141,147,148,162,177,209,222,224,297,298],$VV2=[1,342],$VW2=[4,5,56,60,61,62,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,164,166,253,254,255,256,257,258,259,260,261],$VX2=[4,5,56,58,60,61,62,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,164,166,253,254,255,256,257,258,259,260,261],$VY2=[2,449],$VZ2=[4,5,56,58,60,61,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,164,166,253,254,255,256,257,258,259,260,261],$V_2=[143,145,296],$V$2=[1,417],$V03=[1,437],$V13=[4,5,8,56,58,60,61,62,77,79,82,83,91,96,99,105,109,110,111,112,114,115,117,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,279,280,281,282,283,284,285,286,287,288,292,293,294,295,297,298],$V23=[2,340],$V33=[1,444],$V43=[273,275,277],$V53=[4,5,8,56,58,60,62,77,79,82,83,91,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,279,280,281,282,283,284,285,286,287,288,292,293,294,295,297,298],$V63=[8,62,99,141,147,148,209,222,224,297,298],$V73=[1,454],$V83=[1,458],$V93=[1,459],$Va3=[1,461],$Vb3=[1,462],$Vc3=[1,463],$Vd3=[1,464],$Ve3=[1,465],$Vf3=[1,466],$Vg3=[1,467],$Vh3=[1,468],$Vi3=[1,471],$Vj3=[8,58,62,77,82,99,109,141,147,148,185,187,199,200,201,202,203,204,205,206,209,222,224,297,298],$Vk3=[4,5,8,58,62,77,82,99,109,141,147,148,185,187,199,200,201,202,203,204,205,206,209,222,224,297,298],$Vl3=[1,488],$Vm3=[58,62],$Vn3=[1,509],$Vo3=[4,5,8,56,58,60,61,62,77,79,82,83,91,96,99,105,109,110,111,112,114,115,117,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,279,280,282,283,284,285,286,287,288,292,293,294,295,297,298],$Vp3=[4,5,8,56,58,60,61,62,77,79,82,83,91,96,99,105,109,110,111,112,114,115,117,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,280,282,283,284,285,286,287,288,292,293,294,295,297,298],$Vq3=[4,5,8,56,58,60,61,62,77,79,82,83,91,96,99,105,109,110,111,112,113,114,115,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,279,280,281,282,283,284,285,286,287,288,292,293,294,295,297,298],$Vr3=[4,5,8,56,58,60,61,62,77,79,82,83,91,99,105,109,110,111,112,114,115,117,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,279,282,283,284,285,286,287,288,292,293,295,297,298],$Vs3=[4,5,8,56,58,60,61,62,77,79,82,91,99,109,110,111,112,114,115,117,121,122,123,124,125,127,128,129,131,135,141,143,145,147,148,149,150,151,152,154,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,279,292,293,295,297,298],$Vt3=[2,261],$Vu3=[8,62,99,141,147,148,222,224,297,298],$Vv3=[8,62,77,82,99,109,141,147,148,185,187,199,200,201,202,203,204,205,206,209,222,224,297,298],$Vw3=[1,566],$Vx3=[1,568],$Vy3=[4,5,61,121,123,124,131,135,160,269],$Vz3=[1,592],$VA3=[8,58,62,141,147,148,222,224,297,298],$VB3=[2,302],$VC3=[1,612],$VD3=[8,62,141,147,148,222,224,297,298],$VE3=[8,62,77,82,99,109,141,147,148,185,187,199,200,201,202,203,204,205,206,207,208,209,222,224,297,298],$VF3=[4,5,8,62,77,82,99,109,141,147,148,185,187,199,200,201,202,203,204,205,206,207,208,209,222,224,297,298],$VG3=[8,62,141,147,148,297,298],$VH3=[1,671],$VI3=[1,672],$VJ3=[1,673],$VK3=[1,693],$VL3=[1,704],$VM3=[8,58,62,99,141,147,148,216,222,224,297,298],$VN3=[1,763],$VO3=[8,62,141,147,148,297,298,302];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"Literal":3,"LITERAL":4,"BRALITERAL":5,"main":6,"Statements":7,"EOF":8,"Statements_group0":9,"AStatement":10,"ExplainStatement":11,"EXPLAIN":12,"QUERY":13,"PLAN":14,"Statement":15,"AlterTable":16,"AttachDatabase":17,"Call":18,"CreateDatabase":19,"CreateIndex":20,"CreateGraph":21,"CreateTable":22,"CreateView":23,"CreateEdge":24,"CreateVertex":25,"Declare":26,"Delete":27,"DetachDatabase":28,"DropDatabase":29,"DropIndex":30,"DropTable":31,"DropView":32,"If":33,"Insert":34,"Merge":35,"RenameTable":36,"Select":37,"ShowCreateTable":38,"ShowColumns":39,"ShowDatabases":40,"ShowIndex":41,"ShowTables":42,"TruncateTable":43,"WithSelect":44,"BeginTransaction":45,"CommitTransaction":46,"RollbackTransaction":47,"EndTransaction":48,"UseDatabase":49,"Update":50,"Help":51,"JavaScript":52,"Break":53,"ExpressionStatement":54,"Query":55,"WITH":56,"WithTablesList":57,"COMMA":58,"WithTable":59,"AS":60,"LPAR":61,"RPAR":62,"SelectClause":63,"Select_option0":64,"IntoClause":65,"FromClause":66,"Select_option1":67,"WhereClause":68,"GroupClause":69,"OrderClause":70,"LimitClause":71,"UnionClause":72,"SEARCH":73,"Select_repetition0":74,"Select_option2":75,"PivotClause":76,"PIVOT":77,"Expression":78,"FOR":79,"PivotClause_option0":80,"PivotClause_option1":81,"UNPIVOT":82,"IN":83,"ColumnsList":84,"PivotClause_option2":85,"PivotClause2":86,"AsList":87,"AsLiteral":88,"AsPart":89,"RemoveClause":90,"REMOVE":91,"RemoveClause_option0":92,"RemoveColumnsList":93,"RemoveColumn":94,"Column":95,"LIKE":96,"StringValue":97,"SearchSelector":98,"ORDER":99,"BY":100,"OrderExpressionsList":101,"SearchSelector_option0":102,"ARROW":103,"CARET":104,"EQ":105,"SearchSelector_repetition_plus0":106,"SearchSelector_repetition_plus1":107,"SearchSelector_option1":108,"WHERE":109,"CLASS":110,"NUMBER":111,"STRING":112,"SLASH":113,"VERTEX":114,"EDGE":115,"EXCLAMATION":116,"SHARP":117,"MODULO":118,"GT":119,"LT":120,"DOLLAR":121,"DOT":122,"Json":123,"AT":124,"SET":125,"SetColumnsList":126,"TO":127,"VALUE":128,"ROW":129,"ExprList":130,"COLON":131,"PlusStar":132,"NOT":133,"SearchSelector_repetition2":134,"IF":135,"SearchSelector_repetition3":136,"Aggregator":137,"SearchSelector_repetition4":138,"SearchSelector_group0":139,"SearchSelector_repetition5":140,"UNION":141,"SearchSelectorList":142,"ALL":143,"SearchSelector_repetition6":144,"ANY":145,"SearchSelector_repetition7":146,"INTERSECT":147,"EXCEPT":148,"AND":149,"OR":150,"PATH":151,"RETURN":152,"ResultColumns":153,"REPEAT":154,"SearchSelector_repetition8":155,"SearchSelectorList_repetition0":156,"SearchSelectorList_repetition1":157,"PLUS":158,"STAR":159,"QUESTION":160,"SearchFrom":161,"FROM":162,"SelectModifier":163,"DISTINCT":164,"TopClause":165,"UNIQUE":166,"SelectClause_option0":167,"SELECT":168,"COLUMN":169,"MATRIX":170,"TEXTSTRING":171,"INDEX":172,"RECORDSET":173,"TOP":174,"NumValue":175,"TopClause_option0":176,"INTO":177,"Table":178,"FuncValue":179,"ParamValue":180,"VarValue":181,"FromTablesList":182,"JoinTablesList":183,"ApplyClause":184,"CROSS":185,"APPLY":186,"OUTER":187,"FromTable":188,"FromTable_option0":189,"FromTable_option1":190,"FromString":191,"JoinTable":192,"JoinMode":193,"JoinTableAs":194,"OnClause":195,"JoinTableAs_option0":196,"JoinTableAs_option1":197,"JoinModeMode":198,"NATURAL":199,"JOIN":200,"INNER":201,"LEFT":202,"RIGHT":203,"FULL":204,"SEMI":205,"ANTI":206,"ON":207,"USING":208,"GROUP":209,"GroupExpressionsList":210,"HavingClause":211,"GroupExpression":212,"GROUPING":213,"ROLLUP":214,"CUBE":215,"HAVING":216,"CORRESPONDING":217,"OrderExpression":218,"DIRECTION":219,"COLLATE":220,"NOCASE":221,"LIMIT":222,"OffsetClause":223,"OFFSET":224,"LimitClause_option0":225,"FETCH":226,"LimitClause_option1":227,"LimitClause_option2":228,"LimitClause_option3":229,"ResultColumn":230,"Star":231,"AggrValue":232,"Op":233,"LogicValue":234,"NullValue":235,"ExistsValue":236,"CaseValue":237,"CastClause":238,"NewClause":239,"Expression_group0":240,"CURRENT_TIMESTAMP":241,"JAVASCRIPT":242,"NEW":243,"CAST":244,"ColumnType":245,"CONVERT":246,"PrimitiveValue":247,"OverClause":248,"OVER":249,"OverPartitionClause":250,"OverOrderByClause":251,"PARTITION":252,"SUM":253,"COUNT":254,"MIN":255,"MAX":256,"AVG":257,"FIRST":258,"LAST":259,"AGGR":260,"ARRAY":261,"FuncValue_option0":262,"TRUE":263,"FALSE":264,"NSTRING":265,"NULL":266,"EXISTS":267,"ParamValue_group0":268,"BRAQUESTION":269,"CASE":270,"WhensList":271,"ElseClause":272,"END":273,"When":274,"WHEN":275,"THEN":276,"ELSE":277,"REGEXP":278,"ESCAPE":279,"NOT_LIKE":280,"MINUS":281,"GE":282,"LE":283,"EQEQ":284,"EQEQEQ":285,"NE":286,"NEEQEQ":287,"NEEQEQEQ":288,"CondOp":289,"AllSome":290,"ColFunc":291,"BETWEEN":292,"NOT_BETWEEN":293,"IS":294,"DOUBLECOLON":295,"SOME":296,"SEMICOLON":297,"GO":298,"PERCENT":299,"ROWS":300,"NEXT":301,"ONLY":302,"FuncValue_option0_group0":303,"$accept":0,"$end":1},
terminals_: {2:"error",4:"LITERAL",5:"BRALITERAL",8:"EOF",12:"EXPLAIN",13:"QUERY",14:"PLAN",16:"AlterTable",17:"AttachDatabase",18:"Call",19:"CreateDatabase",20:"CreateIndex",21:"CreateGraph",22:"CreateTable",23:"CreateView",24:"CreateEdge",25:"CreateVertex",26:"Declare",27:"Delete",28:"DetachDatabase",29:"DropDatabase",30:"DropIndex",31:"DropTable",32:"DropView",33:"If",34:"Insert",35:"Merge",36:"RenameTable",38:"ShowCreateTable",39:"ShowColumns",40:"ShowDatabases",41:"ShowIndex",42:"ShowTables",43:"TruncateTable",45:"BeginTransaction",46:"CommitTransaction",47:"RollbackTransaction",48:"EndTransaction",49:"UseDatabase",50:"Update",51:"Help",53:"Break",54:"ExpressionStatement",55:"Query",56:"WITH",58:"COMMA",60:"AS",61:"LPAR",62:"RPAR",73:"SEARCH",77:"PIVOT",79:"FOR",82:"UNPIVOT",83:"IN",84:"ColumnsList",91:"REMOVE",96:"LIKE",99:"ORDER",100:"BY",103:"ARROW",104:"CARET",105:"EQ",109:"WHERE",110:"CLASS",111:"NUMBER",112:"STRING",113:"SLASH",114:"VERTEX",115:"EDGE",116:"EXCLAMATION",117:"SHARP",118:"MODULO",119:"GT",120:"LT",121:"DOLLAR",122:"DOT",123:"Json",124:"AT",125:"SET",126:"SetColumnsList",127:"TO",128:"VALUE",129:"ROW",131:"COLON",133:"NOT",135:"IF",141:"UNION",143:"ALL",145:"ANY",147:"INTERSECT",148:"EXCEPT",149:"AND",150:"OR",151:"PATH",152:"RETURN",154:"REPEAT",158:"PLUS",159:"STAR",160:"QUESTION",162:"FROM",164:"DISTINCT",166:"UNIQUE",168:"SELECT",169:"COLUMN",170:"MATRIX",171:"TEXTSTRING",172:"INDEX",173:"RECORDSET",174:"TOP",177:"INTO",185:"CROSS",186:"APPLY",187:"OUTER",199:"NATURAL",200:"JOIN",201:"INNER",202:"LEFT",203:"RIGHT",204:"FULL",205:"SEMI",206:"ANTI",207:"ON",208:"USING",209:"GROUP",213:"GROUPING",214:"ROLLUP",215:"CUBE",216:"HAVING",217:"CORRESPONDING",219:"DIRECTION",220:"COLLATE",221:"NOCASE",222:"LIMIT",224:"OFFSET",226:"FETCH",241:"CURRENT_TIMESTAMP",242:"JAVASCRIPT",243:"NEW",244:"CAST",245:"ColumnType",246:"CONVERT",249:"OVER",252:"PARTITION",253:"SUM",254:"COUNT",255:"MIN",256:"MAX",257:"AVG",258:"FIRST",259:"LAST",260:"AGGR",261:"ARRAY",263:"TRUE",264:"FALSE",265:"NSTRING",266:"NULL",267:"EXISTS",269:"BRAQUESTION",270:"CASE",273:"END",275:"WHEN",276:"THEN",277:"ELSE",278:"REGEXP",279:"ESCAPE",280:"NOT_LIKE",281:"MINUS",282:"GE",283:"LE",284:"EQEQ",285:"EQEQEQ",286:"NE",287:"NEEQEQ",288:"NEEQEQEQ",292:"BETWEEN",293:"NOT_BETWEEN",294:"IS",295:"DOUBLECOLON",296:"SOME",297:"SEMICOLON",298:"GO",299:"PERCENT",300:"ROWS",301:"NEXT",302:"ONLY"},
productions_: [0,[3,1],[3,1],[6,2],[7,3],[7,1],[7,1],[11,2],[11,4],[10,1],[15,0],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[15,1],[44,3],[57,3],[57,1],[59,5],[37,10],[37,4],[76,8],[76,11],[86,4],[88,2],[88,1],[87,3],[87,1],[89,1],[89,3],[90,3],[93,3],[93,1],[94,1],[94,2],[98,1],[98,5],[98,5],[98,2],[98,1],[98,2],[98,2],[98,3],[98,4],[98,4],[98,4],[98,4],[98,1],[98,1],[98,1],[98,1],[98,1],[98,1],[98,2],[98,2],[98,2],[98,1],[98,1],[98,1],[98,2],[98,1],[98,2],[98,3],[98,4],[98,3],[98,1],[98,4],[98,2],[98,2],[98,4],[98,4],[98,4],[98,4],[98,4],[98,5],[98,4],[98,4],[98,4],[98,4],[98,4],[98,4],[98,4],[98,4],[98,6],[142,3],[142,1],[132,1],[132,1],[132,1],[161,2],[63,4],[63,4],[63,4],[63,3],[163,1],[163,2],[163,2],[163,2],[163,2],[163,2],[163,2],[163,2],[165,3],[165,4],[165,0],[65,0],[65,2],[65,2],[65,2],[65,2],[65,2],[66,2],[66,3],[66,5],[66,0],[184,6],[184,7],[184,6],[184,7],[182,1],[182,3],[188,4],[188,5],[188,3],[188,3],[188,2],[188,3],[188,1],[188,2],[188,3],[188,1],[188,1],[188,2],[188,3],[188,1],[188,2],[188,3],[188,1],[188,2],[188,3],[191,1],[178,3],[178,1],[183,2],[183,2],[183,1],[183,1],[192,3],[194,1],[194,2],[194,3],[194,3],[194,2],[194,3],[194,4],[194,5],[194,1],[194,2],[194,3],[194,1],[194,2],[194,3],[193,1],[193,2],[198,1],[198,2],[198,2],[198,3],[198,2],[198,3],[198,2],[198,3],[198,2],[198,2],[198,2],[195,2],[195,2],[195,0],[68,0],[68,2],[69,0],[69,4],[210,1],[210,3],[212,5],[212,4],[212,4],[212,1],[211,0],[211,2],[72,0],[72,2],[72,3],[72,2],[72,2],[72,3],[72,4],[72,3],[72,3],[70,0],[70,3],[101,1],[101,3],[218,1],[218,2],[218,3],[218,4],[71,0],[71,3],[71,8],[223,0],[223,2],[153,3],[153,1],[230,3],[230,2],[230,3],[230,2],[230,3],[230,2],[230,1],[231,5],[231,3],[231,1],[95,5],[95,3],[95,3],[95,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,3],[78,3],[78,3],[78,1],[78,1],[52,1],[239,2],[239,2],[238,6],[238,8],[238,6],[238,8],[247,1],[247,1],[247,1],[247,1],[247,1],[247,1],[247,1],[232,5],[232,6],[232,6],[248,0],[248,4],[248,4],[248,5],[250,3],[251,3],[137,1],[137,1],[137,1],[137,1],[137,1],[137,1],[137,1],[137,1],[137,1],[179,5],[179,3],[179,4],[130,1],[130,3],[175,1],[234,1],[234,1],[97,1],[97,1],[235,1],[181,2],[236,4],[180,2],[180,2],[180,1],[180,1],[237,5],[237,4],[271,2],[271,1],[274,4],[272,2],[272,0],[233,3],[233,3],[233,5],[233,3],[233,5],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,5],[233,3],[233,3],[233,3],[233,5],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,3],[233,6],[233,6],[233,3],[233,3],[233,2],[233,2],[233,2],[233,2],[233,3],[233,5],[233,6],[233,5],[233,6],[233,4],[233,5],[233,3],[233,4],[233,3],[233,4],[233,3],[233,3],[233,3],[233,3],[291,1],[291,1],[291,4],[289,1],[289,1],[289,1],[289,1],[289,1],[289,1],[290,1],[290,1],[290,1],[9,1],[9,1],[64,0],[64,1],[67,0],[67,1],[74,0],[74,2],[75,0],[75,1],[80,0],[80,1],[81,0],[81,1],[85,0],[85,1],[92,0],[92,1],[102,0],[102,1],[106,1],[106,2],[107,1],[107,2],[108,0],[108,1],[134,0],[134,2],[136,0],[136,2],[138,0],[138,2],[139,1],[139,1],[140,0],[140,2],[144,0],[144,2],[146,0],[146,2],[155,0],[155,2],[156,0],[156,2],[157,0],[157,2],[167,0],[167,1],[176,0],[176,1],[189,0],[189,1],[190,0],[190,1],[196,0],[196,1],[197,0],[197,1],[225,0],[225,1],[227,0],[227,1],[228,0],[228,1],[229,0],[229,1],[240,1],[240,1],[303,1],[303,1],[262,0],[262,1],[268,1],[268,1]],
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
case 5: case 6: case 53: case 63: case 68: case 121: case 155: case 181: case 182: case 218: case 237: case 249: case 320: case 337:
 this.$ = [$$[$0]]; 
break;
case 7:
 this.$ = $$[$0]; $$[$0].explain = true; 
break;
case 8:
 this.$ = $$[$0];  $$[$0].explain = true;
break;
case 9:

			this.$ = $$[$0];

			// TODO combine exists and queries
		    if(yy.exists) this.$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) this.$.queries = yy.queries;
			delete yy.queries;
		
break;
case 10: case 140: case 150: case 213: case 214: case 216: case 224: case 226: case 235: case 243: case 246: case 340:
 this.$ = undefined; 
break;
case 51:
 this.$ = new yy.WithSelect({withs: $$[$0-1], select:$$[$0]}); 
break;
case 52:
 $$[$0-2].push($$[$0]); this.$=$$[$0-2]; 
break;
case 54:
 this.$ = {name:$$[$0-4], select:$$[$0-1]}; 
break;
case 55:

			yy.extend(this.$,$$[$0-9]); yy.extend(this.$,$$[$0-8]); yy.extend(this.$,$$[$0-7]); yy.extend(this.$,$$[$0-6]);
		    yy.extend(this.$,$$[$0-5]); yy.extend(this.$,$$[$0-4]);yy.extend(this.$,$$[$0-3]);
		    yy.extend(this.$,$$[$0-2]); yy.extend(this.$,$$[$0-1]); yy.extend(this.$,$$[$0]);
		    this.$ = $$[$0-9];
/*		    if(yy.exists) this.$.exists = yy.exists;
		    delete yy.exists;
		    if(yy.queries) this.$.queries = yy.queries;
			delete yy.queries;
*/		
break;
case 56:

			this.$ = new yy.Search({selectors:$$[$0-2], from:$$[$0]});
			yy.extend(this.$,$$[$0-1]);
		
break;
case 57:
 this.$ = {pivot:{expr:$$[$0-5], columnid:$$[$0-3], inlist:$$[$0-1], as:$$[$0]}}; 
break;
case 58:
 this.$ = {unpivot:{tocolumnid:$$[$0-8], forcolumnid:$$[$0-6], inlist:$$[$0-3], as:$$[$0]}}; 
break;
case 59:
 this.$ = $$[$0-1]; 
break;
case 60: case 61: case 69: case 125: case 163: case 223: case 256: case 264: case 265: case 266: case 267: case 268: case 269: case 270: case 271: case 272: case 273: case 274: case 275: case 276: case 277: case 279: case 292: case 293: case 294: case 295: case 296: case 297: case 339: case 396: case 397: case 398: case 399: case 400: case 401:
 this.$ = $$[$0]; 
break;
case 62: case 67:
 this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 64:
 this.$ = {expr:$$[$0]}; 
break;
case 65:
 this.$ = {expr:$$[$0-2],as:$$[$0]}; 
break;
case 66:
 this.$ = {removecolumns:$$[$0]}; 
break;
case 70:
 this.$ = {like:$$[$0]}; 
break;
case 71: case 83:
 this.$ = {srchid:"PROP", args: [$$[$0]]}; 
break;
case 72:
 this.$ = {srchid:"ORDERBY", args: $$[$0-1]}; 
break;
case 73:

			var dir = $$[$0-1];
			if(!dir) dir = 'ASC';
			this.$ = {srchid:"ORDERBY", args: [{expression: new yy.Column({columnid:'_'}), direction:dir}]};
		
break;
case 74:
 this.$ = {srchid:"APROP", args: [$$[$0]]}; 
break;
case 75:
 this.$ = {selid:"ROOT"};
break;
case 76:
 this.$ = {srchid:"EQ", args: [$$[$0]]}; 
break;
case 77:
 this.$ = {srchid:"LIKE", args: [$$[$0]]}; 
break;
case 78: case 79:
 this.$ = {selid:"WITH", args: $$[$0-1]}; 
break;
case 80:
 this.$ = {srchid:$$[$0-3].toUpperCase(), args:$$[$0-1]}; 
break;
case 81:
 this.$ = {srchid:"WHERE", args:[$$[$0-1]]}; 
break;
case 82:
 this.$ = {srchid:"CLASS", args:[$$[$0-1]]}; 
break;
case 84:
 this.$ = {srchid:"NAME", args: [$$[$0].substr(1,$$[$0].length-2)]}; 
break;
case 85:
 this.$ = {srchid:"CHILD"}; 
break;
case 86:
 this.$ = {srchid:"VERTEX"}; 
break;
case 87:
 this.$ = {srchid:"EDGE"}; 
break;
case 88:
 this.$ = {srchid:"REF"}; 
break;
case 89:
 this.$ = {srchid:"SHARP", args:[$$[$0]]}; 
break;
case 90:
 this.$ = {srchid:"ATTR", args:((typeof $$[$0] == 'undefined')?undefined:[$$[$0]])}; 
break;
case 91:
 this.$ = {srchid:"ATTR"}; 
break;
case 92:
 this.$ = {srchid:"OUT"}; 
break;
case 93:
 this.$ = {srchid:"IN"}; 
break;
case 94:
 this.$ = {srchid:"CONTENT"}; 
break;
case 95:
 this.$ = {srchid:"PARENT"}; 
break;
case 96:
 this.$ = {srchid:"EX",args:[new yy.Json({value:$$[$0]})]}; 
break;
case 97:
 this.$ = {srchid:"AT", args:[$$[$0]]}; 
break;
case 98:
 this.$ = {srchid:"AS", args:[$$[$0]]}; 
break;
case 99:
 this.$ = {srchid:"SET", args:$$[$0-1]}; 
break;
case 100:
 this.$ = {selid:"TO", args:[$$[$0]]}; 
break;
case 101:
 this.$ = {srchid:"VALUE"}; 
break;
case 102:
 this.$ = {srchid:"ROW", args:$$[$0-1]}; 
break;
case 103:
 this.$ = {srchid:"CLASS", args:[$$[$0]]}; 
break;
case 104:
 this.$ = {selid:$$[$0],args:[$$[$0-1]] }; 
break;
case 105:
 this.$ = {selid:"NOT",args:$$[$0-1] }; 
break;
case 106:
 this.$ = {selid:"IF",args:$$[$0-1] }; 
break;
case 107:
 this.$ = {selid:$$[$0-3],args:$$[$0-1] }; 
break;
case 108:
 this.$ = {selid:'DISTINCT',args:$$[$0-1] }; 
break;
case 109:
 this.$ = {selid:'UNION',args:$$[$0-1] }; 
break;
case 110:
 this.$ = {selid:'UNIONALL',args:$$[$0-1] }; 
break;
case 111:
 this.$ = {selid:'ALL',args:[$$[$0-1]] }; 
break;
case 112:
 this.$ = {selid:'ANY',args:[$$[$0-1]] }; 
break;
case 113:
 this.$ = {selid:'INTERSECT',args:$$[$0-1] }; 
break;
case 114:
 this.$ = {selid:'EXCEPT',args:$$[$0-1] }; 
break;
case 115:
 this.$ = {selid:'AND',args:$$[$0-1] }; 
break;
case 116:
 this.$ = {selid:'OR',args:$$[$0-1] }; 
break;
case 117:
 this.$ = {selid:'PATH',args:[$$[$0-1]] }; 
break;
case 118:
 this.$ = {srchid:'RETURN',args:$$[$0-1] }; 
break;
case 119:
 this.$ = {selid:'REPEAT',sels:$$[$0-3], args:$$[$0-1] }; 
break;
case 120:
 this.$ = $$[$0-2]; this.$.push($$[$0]);
break;
case 122:
 this.$ = "PLUS"; 
break;
case 123:
 this.$ = "STAR"; 
break;
case 124:
 this.$ = "QUESTION"; 
break;
case 126:
 this.$ = new yy.Select({ columns:$$[$0], distinct: true }); yy.extend(this.$, $$[$0-3]); yy.extend(this.$, $$[$0-1]); 
break;
case 127:
 this.$ = new yy.Select({ columns:$$[$0], distinct: true }); yy.extend(this.$, $$[$0-3]);yy.extend(this.$, $$[$0-1]); 
break;
case 128:
 this.$ = new yy.Select({ columns:$$[$0], all:true }); yy.extend(this.$, $$[$0-3]);yy.extend(this.$, $$[$0-1]); 
break;
case 129:

			if(!$$[$0]) {
				this.$ = new yy.Select({columns:[new yy.Column({columnid:'_',})], modifier:'COLUMN'});
			} else {
				this.$ = new yy.Select({ columns:$$[$0] }); yy.extend(this.$, $$[$0-2]);yy.extend(this.$, $$[$0-1]);
			}
		
break;
case 130:
 if($$[$0]=='SELECT') this.$ = undefined; else this.$ = {modifier: $$[$0]};  
break;
case 131:
 this.$ = {modifier:'VALUE'}
break;
case 132:
 this.$ = {modifier:'ROW'}
break;
case 133:
 this.$ = {modifier:'COLUMN'}
break;
case 134:
 this.$ = {modifier:'MATRIX'}
break;
case 135:
 this.$ = {modifier:'TEXTSTRING'}
break;
case 136:
 this.$ = {modifier:'INDEX'}
break;
case 137:
 this.$ = {modifier:'RECORDSET'}
break;
case 138:
 this.$ = {top: $$[$0-1], percent:(typeof $$[$0] != 'undefined'?true:undefined)}; 
break;
case 139:
 this.$ = {top: $$[$0-1]}; 
break;
case 141: case 302:
this.$ = undefined; 
break;
case 142: case 143: case 144: case 145:
this.$ = {into: $$[$0]} 
break;
case 146:

			var s = $$[$0];
			s = s.substr(1,s.length-2);
			var x3 = s.substr(-3).toUpperCase();
			var x4 = s.substr(-4).toUpperCase();
			if(s[0] == '#') {
				this.$ = {into: new yy.FuncValue({funcid: 'HTML', args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			} else if(x3=='XLS' || x3 == 'CSV' || x3=='TAB') {
				this.$ = {into: new yy.FuncValue({funcid: x3, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			} else if(x4=='XLSX' || x4 == 'JSON') {
				this.$ = {into: new yy.FuncValue({funcid: x4, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]})};
			}
		
break;
case 147:
 this.$ = { from: $$[$0] }; 
break;
case 148:
 this.$ = { from: $$[$0-1], joins: $$[$0] }; 
break;
case 149:
 this.$ = { from: $$[$0-2], joins: $$[$0-1] }; 
break;
case 151:
 this.$ = new yy.Apply({select: $$[$0-2], applymode:'CROSS', as:$$[$0]}); 
break;
case 152:
 this.$ = new yy.Apply({select: $$[$0-3], applymode:'CROSS', as:$$[$0]}); 
break;
case 153:
 this.$ = new yy.Apply({select: $$[$0-2], applymode:'OUTER', as:$$[$0]}); 
break;
case 154:
 this.$ = new yy.Apply({select: $$[$0-3], applymode:'OUTER', as:$$[$0]}); 
break;
case 156: case 219:
 this.$ = $$[$0-2]; $$[$0-2].push($$[$0]); 
break;
case 157:
 this.$ = $$[$0-2]; this.$.as = $$[$0] 
break;
case 158:
 this.$ = $$[$0-3]; this.$.as = $$[$0] 
break;
case 159:
 this.$ = $$[$0-1]; this.$.as = 'default' 
break;
case 160:
 this.$ = new yy.Json({value:$$[$0-2]}); $$[$0-2].as = $$[$0] 
break;
case 161:
 this.$ = $$[$0-1]; $$[$0-1].as = $$[$0] 
break;
case 162:
 this.$ = $$[$0-2]; $$[$0-2].as = $$[$0] 
break;
case 164: case 168: case 171: case 174:
 this.$ = $$[$0-1]; $$[$0-1].as = $$[$0]; 
break;
case 165: case 169: case 172: case 175:
 this.$ = $$[$0-2]; $$[$0-2].as = $$[$0]; 
break;
case 166: case 167: case 170: case 173:
 this.$ = $$[$0]; $$[$0].as = 'default'; 
break;
case 176:

			var s = $$[$0];
			s = s.substr(1,s.length-2);
			var x3 = s.substr(-3).toUpperCase();
			var x4 = s.substr(-4).toUpperCase();
			var r;
			if(s[0] == '#') {
				r = new yy.FuncValue({funcid: 'HTML', args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]});
			} else if(x3=='XLS' || x3 == 'CSV' || x3=='TAB') {
				r = new yy.FuncValue({funcid: x3, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]});
			} else if(x4=='XLSX' || x4 == 'JSON') {
				r = new yy.FuncValue({funcid: x4, args:[new yy.StringValue({value: s}), new yy.Json({value:{headers:true}})]});
			} else {
				throw new Error('Unknown string in FROM clause');
			};
			this.$ = r;
		
break;
case 177:

			if($$[$0-2] == 'INFORMATION_SCHEMA') {
				this.$ = new yy.FuncValue({funcid: $$[$0-2], args:[new yy.StringValue({value:$$[$0]})]});
			} else {
				this.$ = new yy.Table({databaseid: $$[$0-2], tableid:$$[$0]});
			}
		
break;
case 178:
 this.$ = new yy.Table({tableid: $$[$0]});
break;
case 179: case 180:
 this.$ = $$[$0-1]; $$[$0-1].push($$[$0]); 
break;
case 183:
 this.$ = new yy.Join($$[$0-2]); yy.extend(this.$, $$[$0-1]); yy.extend(this.$, $$[$0]); 
break;
case 184:
 this.$ = {table: $$[$0]}; 
break;
case 185:
 this.$ = {table: $$[$0-1], as: $$[$0] } ; 
break;
case 186:
 this.$ = {table: $$[$0-2], as: $$[$0] } ; 
break;
case 187:
 this.$ = {json:new yy.Json({value:$$[$0-2],as:$$[$0]})}; 
break;
case 188:
 this.$ = {param: $$[$0-1], as: $$[$0] } ; 
break;
case 189:
 this.$ = {param: $$[$0-2], as: $$[$0] } ; 
break;
case 190:
 this.$ = {select: $$[$0-3], as: $$[$0]} ; 
break;
case 191:
 this.$ = {select: $$[$0-4], as: $$[$0] } ; 
break;
case 192:
 this.$ = {funcid:$$[$0], as:'default'}; 
break;
case 193:
 this.$ = {funcid:$$[$0-1], as: $$[$0]}; 
break;
case 194:
 this.$ = {funcid:$$[$0-2], as: $$[$0]}; 
break;
case 195:
 this.$ = {variable:$$[$0],as:'default'}; 
break;
case 196:
 this.$ = {variable:$$[$0-1],as:$$[$0]}; 
break;
case 197:
 this.$ = {variable:$$[$0-2],as:$$[$0]} 
break;
case 198:
 this.$ = { joinmode: $$[$0] } ; 
break;
case 199:
 this.$ = {joinmode: $$[$0-1], natural:true} ; 
break;
case 200: case 201:
 this.$ = "INNER"; 
break;
case 202: case 203:
 this.$ = "LEFT"; 
break;
case 204: case 205:
 this.$ = "RIGHT"; 
break;
case 206: case 207:
 this.$ = "OUTER"; 
break;
case 208:
 this.$ = "SEMI"; 
break;
case 209:
 this.$ = "ANTI"; 
break;
case 210:
 this.$ = "CROSS"; 
break;
case 211:
 this.$ = {on: $$[$0]}; 
break;
case 212:
 this.$ = {using: $$[$0]}; 
break;
case 215:
 this.$ = {where: new yy.Expression({expression:$$[$0]})}; 
break;
case 217:
 this.$ = {group:$$[$0-1]}; yy.extend(this.$,$$[$0]); 
break;
case 220:
 this.$ = new yy.GroupExpression({type:'GROUPING SETS', group: $$[$0-1]}); 
break;
case 221:
 this.$ = new yy.GroupExpression({type:'ROLLUP', group: $$[$0-1]}); 
break;
case 222:
 this.$ = new yy.GroupExpression({type:'CUBE', group: $$[$0-1]}); 
break;
case 225:
 this.$ = {having:$$[$0]}
break;
case 227:
 this.$ = {union: $$[$0]} ; 
break;
case 228:
 this.$ = {unionall: $$[$0]} ; 
break;
case 229:
 this.$ = {except: $$[$0]} ; 
break;
case 230:
 this.$ = {intersect: $$[$0]} ; 
break;
case 231:
 this.$ = {union: $$[$0], corresponding:true} ; 
break;
case 232:
 this.$ = {unionall: $$[$0], corresponding:true} ; 
break;
case 233:
 this.$ = {except: $$[$0], corresponding:true} ; 
break;
case 234:
 this.$ = {intersect: $$[$0], corresponding:true} ; 
break;
case 236:
 this.$ = {order:$$[$0]}
break;
case 238:
 this.$ = $$[$0-2]; $$[$0-2].push($$[$0])
break;
case 239:
 this.$ = new yy.Expression({expression: $$[$0], direction:'ASC'}) 
break;
case 240:
 this.$ = new yy.Expression({expression: $$[$0-1], direction:$$[$0].toUpperCase()}) 
break;
case 241:
 this.$ = new yy.Expression({expression: $$[$0-2], direction:'ASC', nocase:true}) 
break;
case 242:
 this.$ = new yy.Expression({expression: $$[$0-3], direction:$$[$0].toUpperCase(), nocase:true}) 
break;
case 244:
 this.$ = {limit:$$[$0-1]}; yy.extend(this.$, $$[$0]); 
break;
case 245:
 this.$ = {limit:$$[$0-2],offset:$$[$0-6]}; 
break;
case 247:
 this.$ = {offset:$$[$0]}; 
break;
case 248:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 250: case 252: case 254:
 $$[$0-2].as = $$[$0]; this.$ = $$[$0-2];
break;
case 251: case 253: case 255:
 $$[$0-1].as = $$[$0]; this.$ = $$[$0-1];
break;
case 257:
 this.$ = new yy.Column({columid: $$[$0], tableid: $$[$0-2], databaseid:$$[$0-4]}); 
break;
case 258:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2]}); 
break;
case 259:
 this.$ = new yy.Column({columnid:$$[$0]}); 
break;
case 260:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2], databaseid:$$[$0-4]});
break;
case 261: case 262:
 this.$ = new yy.Column({columnid: $$[$0], tableid: $$[$0-2]});
break;
case 263:
 this.$ = new yy.Column({columnid: $$[$0]});
break;
case 278:
 this.$ = new yy.Json({value:$$[$0]}); 
break;
case 280: case 281: case 282:

			if(!yy.queries) yy.queries = [];
			yy.queries.push($$[$0-1]);
			$$[$0-1].queriesidx = yy.queries.length;
			this.$ = $$[$0-1];
		
break;
case 283:
this.$ = $$[$0]
break;
case 284:
 this.$ = new yy.FuncValue({funcid:'CURRENT_TIMESTAMP'});
break;
case 285:
 this.$ = new yy.JavaScript({value:$$[$0].substr(2,$$[$0].length-4)}); 
break;
case 286:
 this.$ = new yy.FuncValue({funcid:$$[$0], newid:true}); 
break;
case 287:
 this.$ = $$[$0]; yy.extend(this.$,{newid:true}); 
break;
case 288:
 this.$ = new yy.Convert({expression:$$[$0-3]}) ; yy.extend(this.$,$$[$0-1]) ; 
break;
case 289:
 this.$ = new yy.Convert({expression:$$[$0-5], style:$$[$0-1]}) ; yy.extend(this.$,$$[$0-3]) ; 
break;
case 290:
 this.$ = new yy.Convert({expression:$$[$0-1]}) ; yy.extend(this.$,$$[$0-3]) ; 
break;
case 291:
 this.$ = new yy.Convert({expression:$$[$0-3], style:$$[$0-1]}) ; yy.extend(this.$,$$[$0-5]) ; 
break;
case 298:
 this.$ = new yy.FuncValue({funcid:'CURRENT_TIMESTAMP'}); 
break;
case 299:

		  if($$[$0-2].length > 1 && ($$[$0-4].toUpperCase() == 'MAX' || $$[$0-4].toUpperCase() == 'MIN')) {
		  	this.$ = new yy.FuncValue({funcid:$$[$0-4],args:$$[$0-2]});
		  } else {
			this.$ = new yy.AggrValue({aggregatorid: $$[$0-4].toUpperCase(), expression: $$[$0-2].pop(), over:$$[$0]});
		  }
		
break;
case 300:
 this.$ = new yy.AggrValue({aggregatorid: $$[$0-5].toUpperCase(), expression: $$[$0-2], distinct:true, over:$$[$0]}); 
break;
case 301:
 this.$ = new yy.AggrValue({aggregatorid: $$[$0-5].toUpperCase(), expression: $$[$0-2],
		 over:$$[$0]}); 
break;
case 303: case 304:
 this.$ = new yy.Over(); yy.extend(this.$,$$[$0-1]); 
break;
case 305:
 this.$ = new yy.Over(); yy.extend(this.$,$$[$0-2]); yy.extend(this.$,$$[$0-1]);
break;
case 306:
 this.$ = {partition:$$[$0]}; 
break;
case 307:
 this.$ = {order:$$[$0]}; 
break;
case 308:
 this.$ = "SUM"; 
break;
case 309:
 this.$ = "COUNT"; 
break;
case 310:
 this.$ = "MIN"; 
break;
case 311:
 this.$ = "MAX"; 
break;
case 312:
 this.$ = "AVG"; 
break;
case 313:
 this.$ = "FIRST"; 
break;
case 314:
 this.$ = "LAST"; 
break;
case 315:
 this.$ = "AGGR"; 
break;
case 316:
 this.$ = "ARRAY"; 
break;
case 317:

			var funcid = $$[$0-4];
			var exprlist = $$[$0-1];
			if(exprlist.length > 1 && (funcid.toUpperCase() == 'MIN' || funcid.toUpperCase() == 'MAX')) {
					this.$ = new yy.FuncValue({funcid: funcid, args: exprlist});
			} else if(alasql.aggr[$$[$0-4]]) {
		    	this.$ = new yy.AggrValue({aggregatorid: 'REDUCE',
                      funcid: funcid, expression: exprlist.pop(),distinct:($$[$0-2]=='DISTINCT') });
		    } else {
			    this.$ = new yy.FuncValue({funcid: funcid, args: exprlist});
			};
		
break;
case 318:
 this.$ = new yy.FuncValue({ funcid: $$[$0-2] }) 
break;
case 319:
 this.$ = new yy.FuncValue({ funcid: 'IIF', args:$$[$0-1] }) 
break;
case 321:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2] 
break;
case 322:
 this.$ = new yy.NumValue({value:+$$[$0]}); 
break;
case 323:
 this.$ = new yy.LogicValue({value:true}); 
break;
case 324:
 this.$ = new yy.LogicValue({value:false}); 
break;
case 325:
 this.$ = new yy.StringValue({value: $$[$0].substr(1,$$[$0].length-2).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); 
break;
case 326:
 this.$ = new yy.StringValue({value: $$[$0].substr(2,$$[$0].length-3).replace(/(\\\')/g,"'").replace(/(\'\')/g,"'")}); 
break;
case 327:
 this.$ = new yy.NullValue({value:undefined}); 
break;
case 328:
 this.$ = new yy.VarValue({variable:$$[$0]}); 
break;
case 329:

			if(!yy.exists) yy.exists = [];
			this.$ = new yy.ExistsValue({value:$$[$0-1], existsidx:yy.exists.length});
			yy.exists.push($$[$0-1]);
		
break;
case 330: case 331:
 this.$ = new yy.ParamValue({param: $$[$0]}); 
break;
case 332:

			if(typeof yy.question == 'undefined') yy.question = 0;
			this.$ = new yy.ParamValue({param: yy.question++});
		
break;
case 333:

			if(typeof yy.question == 'undefined') yy.question = 0;
			this.$ = new yy.ParamValue({param: yy.question++, array:true});
		
break;
case 334:
 this.$ = new yy.CaseValue({expression:$$[$0-3], whens: $$[$0-2], elses: $$[$0-1]}); 
break;
case 335:
 this.$ = new yy.CaseValue({whens: $$[$0-2], elses: $$[$0-1]}); 
break;
case 336:
 this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 338:
 this.$ = {when: $$[$0-2], then: $$[$0] }; 
break;
case 341:
 this.$ = new yy.Op({left:$$[$0-2], op:'REGEXP', right:$$[$0]}); 
break;
case 342:
 this.$ = new yy.Op({left:$$[$0-2], op:'LIKE', right:$$[$0]}); 
break;
case 343:
 this.$ = new yy.Op({left:$$[$0-4], op:'LIKE', right:$$[$0-2], escape:$$[$0]}); 
break;
case 344:
 this.$ = new yy.Op({left:$$[$0-2], op:'NOT LIKE', right:$$[$0] }); 
break;
case 345:
 this.$ = new yy.Op({left:$$[$0-4], op:'NOT LIKE', right:$$[$0-2], escape:$$[$0] }); 
break;
case 346:
 this.$ = new yy.Op({left:$$[$0-2], op:'+', right:$$[$0]}); 
break;
case 347:
 this.$ = new yy.Op({left:$$[$0-2], op:'-', right:$$[$0]}); 
break;
case 348:
 this.$ = new yy.Op({left:$$[$0-2], op:'*', right:$$[$0]}); 
break;
case 349:
 this.$ = new yy.Op({left:$$[$0-2], op:'/', right:$$[$0]}); 
break;
case 350:
 this.$ = new yy.Op({left:$$[$0-2], op:'%', right:$$[$0]}); 
break;
case 351:
 this.$ = new yy.Op({left:$$[$0-2], op:'^', right:$$[$0]}); 
break;
case 352: case 353: case 355:
 this.$ = new yy.Op({left:$$[$0-2], op:'->' , right:$$[$0]}); 
break;
case 354:
 this.$ = new yy.Op({left:$$[$0-4], op:'->' , right:$$[$0-1]}); 
break;
case 356: case 357: case 359:
 this.$ = new yy.Op({left:$$[$0-2], op:'!' , right:$$[$0]}); 
break;
case 358:
 this.$ = new yy.Op({left:$$[$0-4], op:'!' , right:$$[$0-1]}); 
break;
case 360:
 this.$ = new yy.Op({left:$$[$0-2], op:'>' , right:$$[$0]}); 
break;
case 361:
 this.$ = new yy.Op({left:$$[$0-2], op:'>=' , right:$$[$0]}); 
break;
case 362:
 this.$ = new yy.Op({left:$$[$0-2], op:'<' , right:$$[$0]}); 
break;
case 363:
 this.$ = new yy.Op({left:$$[$0-2], op:'<=' , right:$$[$0]}); 
break;
case 364:
 this.$ = new yy.Op({left:$$[$0-2], op:'=' , right:$$[$0]}); 
break;
case 365:
 this.$ = new yy.Op({left:$$[$0-2], op:'==' , right:$$[$0]}); 
break;
case 366:
 this.$ = new yy.Op({left:$$[$0-2], op:'===' , right:$$[$0]}); 
break;
case 367:
 this.$ = new yy.Op({left:$$[$0-2], op:'!=' , right:$$[$0]}); 
break;
case 368:
 this.$ = new yy.Op({left:$$[$0-2], op:'!==' , right:$$[$0]}); 
break;
case 369:
 this.$ = new yy.Op({left:$$[$0-2], op:'!===' , right:$$[$0]}); 
break;
case 370:

			if(!yy.queries) yy.queries = [];
			this.$ = new yy.Op({left:$$[$0-5], op:$$[$0-4] , allsome:$$[$0-3], right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);
		
break;
case 371:

			this.$ = new yy.Op({left:$$[$0-5], op:$$[$0-4] , allsome:$$[$0-3], right:$$[$0-1]});
		
break;
case 372:

			if($$[$0-2].op == 'BETWEEN1') {

				if($$[$0-2].left.op == 'AND') {
					this.$ = new yy.Op({left:$$[$0-2].left.left,op:'AND',right:
						new yy.Op({left:$$[$0-2].left.right, op:'BETWEEN',
							right1:$$[$0-2].right, right2:$$[$0]})
					});
				} else {
					this.$ = new yy.Op({left:$$[$0-2].left, op:'BETWEEN',
						right1:$$[$0-2].right, right2:$$[$0]});
				}

			} else if($$[$0-2].op == 'NOT BETWEEN1') {
				if($$[$0-2].left.op == 'AND') {
					this.$ = new yy.Op({left:$$[$0-2].left.left,op:'AND',right:
						new yy.Op({left:$$[$0-2].left.right, op:'NOT BETWEEN',
							right1:$$[$0-2].right, right2:$$[$0]})
					});
				} else {
					this.$ = new yy.Op({left:$$[$0-2].left, op:'NOT BETWEEN',
						right1:$$[$0-2].right, right2:$$[$0]});
				}
			} else {
				this.$ = new yy.Op({left:$$[$0-2], op:'AND', right:$$[$0]});
			}


		
break;
case 373:
 this.$ = new yy.Op({left:$$[$0-2], op:'OR' , right:$$[$0]}); 
break;
case 374:
 this.$ = new yy.UniOp({op:'NOT' , right:$$[$0]}); 
break;
case 375:
 this.$ = new yy.UniOp({op:'-' , right:$$[$0]}); 
break;
case 376:
 this.$ = new yy.UniOp({op:'+' , right:$$[$0]}); 
break;
case 377:
 this.$ = new yy.UniOp({op:'#' , right:$$[$0]}); 
break;
case 378:
 this.$ = new yy.UniOp({right: $$[$0-1]}); 
break;
case 379:

			if(!yy.queries) yy.queries = [];
			this.$ = new yy.Op({left: $$[$0-4], op:'IN', right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);
		
break;
case 380:

			if(!yy.queries) yy.queries = [];
			this.$ = new yy.Op({left: $$[$0-5], op:'NOT IN', right:$$[$0-1], queriesidx: yy.queries.length});
			yy.queries.push($$[$0-1]);
		
break;
case 381:
 this.$ = new yy.Op({left: $$[$0-4], op:'IN', right:$$[$0-1]}); 
break;
case 382:
 this.$ = new yy.Op({left: $$[$0-5], op:'NOT IN', right:$$[$0-1]}); 
break;
case 383:
 this.$ = new yy.Op({left: $$[$0-3], op:'IN', right:[]}); 
break;
case 384:
 this.$ = new yy.Op({left: $$[$0-4], op:'NOT IN', right:[]}); 
break;
case 385: case 387:
 this.$ = new yy.Op({left: $$[$0-2], op:'IN', right:$$[$0]}); 
break;
case 386: case 388:
 this.$ = new yy.Op({left: $$[$0-3], op:'NOT IN', right:$$[$0]}); 
break;
case 389:

/*			var expr = $$[$0];
			if(expr.left && expr.left.op == 'AND') {
				this.$ = new yy.Op({left:new yy.Op({left:$$[$0-2], op:'BETWEEN', right:expr.left}), op:'AND', right:expr.right });
			} else {
*/
				this.$ = new yy.Op({left:$$[$0-2], op:'BETWEEN1', right:$$[$0] });
//			}
		
break;
case 390:

//			var expr = $$[$0];
//			if(expr.left && expr.left.op == 'AND') {
//				this.$ = new yy.Op({left:new yy.Op({left:$$[$0-2], op:'NOT BETWEEN', right:expr.left}), op:'AND', right:expr.right });
//			} else {
				this.$ = new yy.Op({left:$$[$0-2], op:'NOT BETWEEN1', right:$$[$0] });
//			}
		
break;
case 391:
 this.$ = new yy.Op({op:'IS' , left:$$[$0-2], right:$$[$0]}); 
break;
case 392:
 this.$ = new yy.Convert({expression:$$[$0-2]}) ; yy.extend(this.$,$$[$0]) ; 
break;
case 393: case 394:
 this.$ = $$[$0];
break;
case 395:
 this.$ = $$[$0-1];
break;
case 402:
 this.$ = 'ALL'; 
break;
case 403:
 this.$ = 'SOME'; 
break;
case 404:
 this.$ = 'ANY'; 
break;
case 411: case 431: case 433: case 435: case 439: case 441: case 443: case 445: case 447: case 449:
this.$ = [];
break;
case 412: case 426: case 428: case 432: case 434: case 436: case 440: case 442: case 444: case 446: case 448: case 450:
$$[$0-1].push($$[$0]);
break;
case 425: case 427:
this.$ = [$$[$0]];
break;
}
},
table: [o($V0,$V1,{6:1,7:2,10:3,11:4,15:5,37:28,44:35,52:43,63:47,163:51,12:[1,6],16:$V2,17:$V3,18:$V4,19:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj,34:$Vk,35:$Vl,36:$Vm,38:$Vn,39:$Vo,40:$Vp,41:$Vq,42:$Vr,43:$Vs,45:$Vt,46:$Vu,47:$Vv,48:$Vw,49:$Vx,50:$Vy,51:$Vz,53:$VA,54:$VB,55:$VC,56:$VD,73:$VE,168:$VF,242:$VG}),{1:[3]},{8:[1,53],9:54,297:[1,55],298:[1,56]},o($V0,[2,5]),o($V0,[2,6]),o($V0,[2,9]),o($V0,$V1,{15:5,37:28,44:35,52:43,63:47,163:51,10:57,13:[1,58],16:$V2,17:$V3,18:$V4,19:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj,34:$Vk,35:$Vl,36:$Vm,38:$Vn,39:$Vo,40:$Vp,41:$Vq,42:$Vr,43:$Vs,45:$Vt,46:$Vu,47:$Vv,48:$Vw,49:$Vx,50:$Vy,51:$Vz,53:$VA,54:$VB,55:$VC,56:$VD,73:$VE,168:$VF,242:$VG}),o($V0,[2,11]),o($V0,[2,12]),o($V0,[2,13]),o($V0,[2,14]),o($V0,[2,15]),o($V0,[2,16]),o($V0,[2,17]),o($V0,[2,18]),o($V0,[2,19]),o($V0,[2,20]),o($V0,[2,21]),o($V0,[2,22]),o($V0,[2,23]),o($V0,[2,24]),o($V0,[2,25]),o($V0,[2,26]),o($V0,[2,27]),o($V0,[2,28]),o($V0,[2,29]),o($V0,[2,30]),o($V0,[2,31]),o($V0,[2,32]),o($V0,[2,33]),o($V0,[2,34]),o($V0,[2,35]),o($V0,[2,36]),o($V0,[2,37]),o($V0,[2,38]),o($V0,[2,39]),o($V0,[2,40]),o($V0,[2,41]),o($V0,[2,42]),o($V0,[2,43]),o($V0,[2,44]),o($V0,[2,45]),o($V0,[2,46]),o($V0,[2,47]),o($V0,[2,48]),o($V0,[2,49]),o($V0,[2,50]),o($VH,[2,407],{64:59,90:60,91:[1,61]}),o($VI,[2,411],{74:62}),{3:65,4:$VJ,5:$VK,57:63,59:64},o($VL,[2,285]),o($VM,$VN,{165:71,143:[1,70],164:[1,68],166:[1,69],174:$VO}),o($VP,[2,130],{128:[1,73],129:[1,74],169:[1,75],170:[1,76],171:[1,77],172:[1,78],173:[1,79]}),{1:[2,3]},o($V0,$V1,{15:5,37:28,44:35,52:43,63:47,163:51,10:80,16:$V2,17:$V3,18:$V4,19:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj,34:$Vk,35:$Vl,36:$Vm,38:$Vn,39:$Vo,40:$Vp,41:$Vq,42:$Vr,43:$Vs,45:$Vt,46:$Vu,47:$Vv,48:$Vw,49:$Vx,50:$Vy,51:$Vz,53:$VA,54:$VB,55:$VC,56:$VD,73:$VE,168:$VF,242:$VG}),o($VQ,[2,405]),o($VQ,[2,406]),o($V0,[2,7]),{14:[1,81]},o($VR,$VS,{65:82,177:$VT}),o($VH,[2,408]),o($VU,[2,421],{92:84,169:[1,85]}),o([8,62,162,297,298],$VS,{65:86,98:87,3:88,137:120,139:121,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,96:$VY,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,177:$VT,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1}),{37:143,58:[1,144],63:47,73:$VE,163:51,168:$VF},o($VJ1,[2,53]),{60:[1,145]},o($VK1,[2,1]),o($VK1,[2,2]),o($VL1,$VN,{165:146,174:$VO}),o($VL1,$VN,{165:147,174:$VO}),o($VL1,$VN,{165:148,174:$VO}),o($VM1,[2,451],{167:149,153:150,230:151,78:152,232:153,179:154,233:155,95:156,231:157,175:158,234:159,97:160,235:161,180:162,181:163,236:164,237:165,238:166,239:168,52:170,137:172,3:173,4:$VJ,5:$VK,61:$VN1,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,158:$VX1,159:$VY1,160:$VZ1,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92}),{61:[1,197],111:$VO1,175:196},o($VP,[2,131]),o($VP,[2,132]),o($VP,[2,133]),o($VP,[2,134]),o($VP,[2,135]),o($VP,[2,136]),o($VP,[2,137]),o($V0,[2,4]),o($V0,$V1,{15:5,37:28,44:35,52:43,63:47,163:51,10:198,16:$V2,17:$V3,18:$V4,19:$V5,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:$Vd,28:$Ve,29:$Vf,30:$Vg,31:$Vh,32:$Vi,33:$Vj,34:$Vk,35:$Vl,36:$Vm,38:$Vn,39:$Vo,40:$Vp,41:$Vq,42:$Vr,43:$Vs,45:$Vt,46:$Vu,47:$Vv,48:$Vw,49:$Vx,50:$Vy,51:$Vz,53:$VA,54:$VB,55:$VC,56:$VD,73:$VE,168:$VF,242:$VG}),o($Va2,[2,150],{66:199,162:[1,200]}),{3:206,4:$VJ,5:$VK,112:[1,205],121:$VR1,124:$VT1,131:$VU1,135:$VW1,160:$VZ1,178:201,179:202,180:203,181:204,269:$V72},{3:211,4:$VJ,5:$VK,93:207,94:208,95:209,96:$Vb2},o($VU,[2,422]),o($Vc2,[2,413],{75:212,161:213,162:[1,214]}),o($VI,[2,412],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o([4,5,8,56,58,60,62,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,253,254,255,256,257,258,259,260,261,297,298],[2,71],{61:[1,219]}),{100:[1,220]},{3:221,4:$VJ,5:$VK},o($Vg2,[2,75]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:222,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:223,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,96:$VY,98:225,99:$VZ,103:$V_,104:$V$,105:$V01,106:224,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{61:[1,226]},{61:[1,227]},{61:[1,228]},o($Vg2,[2,83]),o($Vg2,[2,84]),o($Vg2,[2,85]),o($Vg2,[2,86]),o($Vg2,[2,87]),o($Vg2,[2,88]),{3:229,4:$VJ,5:$VK},{3:230,4:$VJ,5:$VK,113:[1,231]},o($Vg2,[2,92]),o($Vg2,[2,93]),o($Vg2,[2,94]),{122:[1,232]},o($Vg2,[2,96]),{3:233,4:$VJ,5:$VK},{124:[1,234]},{61:[1,235]},{124:[1,236]},o($Vg2,[2,101]),{61:[1,237]},{3:238,4:$VJ,5:$VK},{61:[1,239]},{61:[1,240]},{61:[1,241]},{61:[1,242]},{61:[1,243],143:[1,244]},{61:[1,245]},{61:[1,246]},{61:[1,247]},{61:[1,248]},{61:[1,249]},{61:[1,250]},{61:[1,251]},{61:[1,252]},{61:[1,253]},{61:[2,308]},{61:[2,309]},{61:[2,310]},{61:[2,311]},{61:[2,312]},{61:[2,313]},{61:[2,314]},{61:[2,315]},{61:[2,316]},{61:[2,437]},{61:[2,438]},o($V0,[2,51]),{3:65,4:$VJ,5:$VK,59:254},{61:[1,255]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:152,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,153:256,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,230:151,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:152,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,153:257,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,230:151,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:152,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,153:258,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,230:151,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VM1,[2,129]),o($VM1,[2,452],{58:$Vh2}),o($Vi2,[2,249]),o($Vi2,[2,256],{3:261,97:263,289:285,4:$VJ,5:$VK,60:[1,260],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,111:[1,262],112:$VP1,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,265:$V42,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),o($VL,[2,264]),o($VL,[2,265]),o($VL,[2,266]),o($VL,[2,267]),o($VL,[2,268]),o($VL,[2,269]),o($VL,[2,270]),o($VL,[2,271]),o($VL,[2,272]),o($VL,[2,273]),o($VL,[2,274]),o($VL,[2,275]),o($VL,[2,276]),o($VL,[2,277]),o($VL,[2,278]),o($VL,[2,279]),{3:173,4:$VJ,5:$VK,24:[1,299],25:[1,298],34:[1,295],37:294,52:170,61:$VN1,63:47,73:$VE,78:297,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,163:51,168:$VF,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,240:296,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VL,[2,283]),o($VL,[2,284]),{61:[1,300]},o($VM2,$VN2,{61:$VO2,122:[1,302]}),{61:[1,303]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:304,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:305,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:306,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:307,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VL,[2,259]),o([4,5,8,56,58,60,61,62,77,79,82,83,91,96,99,103,104,105,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,226,241,242,243,244,246,253,254,255,256,257,258,259,260,261,263,264,265,266,267,269,270,273,275,276,277,278,279,280,281,282,283,284,285,286,287,288,292,293,294,295,297,298,299,300,302],[2,322]),o($VL,[2,323]),o($VL,[2,324]),o($VL,[2,325]),o($VL,[2,326]),o($VL,[2,327]),{3:309,4:$VJ,5:$VK,111:[1,310],268:308},{3:311,4:$VJ,5:$VK},o($VL,[2,332]),o($VL,[2,333]),{3:312,4:$VJ,5:$VK},{61:[1,313]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:314,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,271:315,274:316,275:$VP2,281:$V92},{61:[1,318]},{61:[1,319]},{3:320,4:$VJ,5:$VK,135:$VW1,179:321},o($VM,[2,453],{176:322,299:[1,323]}),{111:$VO1,175:324},o($V0,[2,8]),o($VQ2,[2,409],{67:325,76:326,77:[1,327],82:[1,328]}),{3:206,4:$VJ,5:$VK,61:[1,330],112:$VR2,121:$VR1,123:$VS2,124:$VT1,131:$VU1,135:$VW1,160:$VZ1,178:333,179:335,180:334,181:336,182:329,188:331,191:337,269:$V72},o($VR,[2,142]),o($VR,[2,143]),o($VR,[2,144]),o($VR,[2,145]),o($VR,[2,146]),o($VT2,[2,178],{61:$VO2,122:[1,339]}),o($VH,[2,66],{58:[1,340]}),o($VU2,[2,68]),o($VU2,[2,69]),{97:341,112:$VP1,265:$V42},o($VU2,$VN2,{122:$VV2}),o($Vc2,[2,56]),o($Vc2,[2,414]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:343,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($Vg2,[2,104]),o($Vg2,[2,122]),o($Vg2,[2,123]),o($Vg2,[2,124]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,62:[2,429],78:346,95:156,97:160,108:344,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:345,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{61:[1,347]},o($Vg2,[2,74]),o([4,5,8,56,58,60,61,62,99,105,109,110,111,112,114,115,117,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,160,162,164,166,177,253,254,255,256,257,258,259,260,261,297,298],[2,76],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),o([4,5,8,56,58,60,61,62,96,99,105,109,110,111,112,114,115,117,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,160,162,164,166,177,253,254,255,256,257,258,259,260,261,297,298],[2,77],{289:285,83:$Vj2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,62:[1,348],96:$VY,98:349,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},o($VW2,[2,425],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,96:$VY,98:351,99:$VZ,103:$V_,104:$V$,105:$V01,107:350,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:352,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:353,4:$VJ,5:$VK},o($Vg2,[2,89]),o($Vg2,[2,90]),o($Vg2,[2,91]),o($Vg2,[2,95]),o($Vg2,[2,97]),{3:354,4:$VJ,5:$VK},{126:[1,355]},{3:356,4:$VJ,5:$VK},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:346,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:357,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($Vg2,[2,103]),o($VW2,[2,431],{134:358}),o($VW2,[2,433],{136:359}),o($VW2,[2,435],{138:360}),o($VW2,[2,439],{140:361}),o($VX2,$VY2,{142:362,157:363}),{61:[1,364]},o($VW2,[2,441],{144:365}),o($VW2,[2,443],{146:366}),o($VX2,$VY2,{157:363,142:367}),o($VX2,$VY2,{157:363,142:368}),o($VX2,$VY2,{157:363,142:369}),o($VX2,$VY2,{157:363,142:370}),{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,96:$VY,98:371,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:152,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,153:372,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,230:151,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VZ2,[2,445],{155:373}),o($VJ1,[2,52]),{37:374,63:47,73:$VE,163:51,168:$VF},o($VM1,[2,126],{58:$Vh2}),o($VM1,[2,127],{58:$Vh2}),o($VM1,[2,128],{58:$Vh2}),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:152,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,230:375,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:376,4:$VJ,5:$VK,97:378,111:[1,377],112:$VP1,265:$V42},o($Vi2,[2,251]),o($Vi2,[2,253]),o($Vi2,[2,255]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:379,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:380,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:381,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:382,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:383,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:384,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:385,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:386,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:387,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:388,4:$VJ,5:$VK,61:[1,390],111:$VO1,135:$VW1,175:389,179:391},{3:392,4:$VJ,5:$VK,61:[1,394],111:$VO1,135:$VW1,175:393,179:395},o($V_2,[2,396],{232:153,179:154,233:155,95:156,231:157,175:158,234:159,97:160,235:161,180:162,181:163,236:164,237:165,238:166,239:168,52:170,137:172,3:173,78:396,4:$VJ,5:$VK,61:$VN1,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,158:$VX1,159:$VY1,160:$VZ1,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92}),o($V_2,[2,397],{232:153,179:154,233:155,95:156,231:157,175:158,234:159,97:160,235:161,180:162,181:163,236:164,237:165,238:166,239:168,52:170,137:172,3:173,78:397,4:$VJ,5:$VK,61:$VN1,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,158:$VX1,159:$VY1,160:$VZ1,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92}),o($V_2,[2,398],{232:153,179:154,233:155,95:156,231:157,175:158,234:159,97:160,235:161,180:162,181:163,236:164,237:165,238:166,239:168,52:170,137:172,3:173,78:398,4:$VJ,5:$VK,61:$VN1,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,158:$VX1,159:$VY1,160:$VZ1,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92}),o($V_2,[2,399],{232:153,179:154,233:155,95:156,231:157,175:158,234:159,97:160,235:161,180:162,181:163,236:164,237:165,238:166,239:168,52:170,137:172,3:173,78:399,4:$VJ,5:$VK,61:$VN1,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,158:$VX1,159:$VY1,160:$VZ1,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92}),o($V_2,[2,400],{232:153,179:154,233:155,95:156,231:157,175:158,234:159,97:160,235:161,180:162,181:163,236:164,237:165,238:166,239:168,52:170,137:172,3:173,78:400,4:$VJ,5:$VK,61:$VN1,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,158:$VX1,159:$VY1,160:$VZ1,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92}),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:401,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:402,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($V_2,[2,401],{232:153,179:154,233:155,95:156,231:157,175:158,234:159,97:160,235:161,180:162,181:163,236:164,237:165,238:166,239:168,52:170,137:172,3:173,78:403,4:$VJ,5:$VK,61:$VN1,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,158:$VX1,159:$VY1,160:$VZ1,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92}),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:404,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:405,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{143:[1,407],145:[1,409],290:406,296:[1,408]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:410,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:411,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:418,4:$VJ,5:$VK,61:[1,412],95:415,124:$V$2,135:$VW1,179:416,181:414,291:413},{83:[1,419]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:420,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:421,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:422,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{245:[1,423]},{62:[1,424]},{62:[1,425]},{62:[1,426]},{62:[1,427],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{62:[2,471]},{62:[2,472]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:346,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:428,131:$VU1,133:$VV1,135:$VW1,137:172,143:[1,430],158:$VX1,159:$VY1,160:$VZ1,164:[1,429],175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VL1,[2,475],{262:431,303:433,62:[1,432],143:[1,435],164:[1,434]}),{3:436,4:$VJ,5:$VK,128:$V03,159:[1,438]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:346,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:439,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o([4,5,8,56,58,60,61,62,77,79,82,83,91,99,109,110,111,112,114,115,117,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,279,292,293,295,297,298],[2,374],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,294:$VK2}),o($V13,[2,375],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,159:$Vx2}),o($V13,[2,376],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,159:$Vx2}),o($VL,[2,377],{289:285}),o($VL,[2,330]),o($VL,[2,477]),o($VL,[2,478]),o($VL,[2,331]),o($VK1,[2,328]),{37:440,63:47,73:$VE,163:51,168:$VF},{83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,271:441,274:316,275:$VP2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{272:442,273:$V23,274:443,275:$VP2,277:$V33},o($V43,[2,337]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:445,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:446,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{245:[1,447]},o($V53,[2,286],{61:$VO2}),o($VL,[2,287]),o($VM,[2,138]),o($VM,[2,454]),{62:[1,448]},o($V63,[2,214],{68:449,109:[1,450]}),o($VQ2,[2,410]),{61:[1,451]},{61:[1,452]},o($Va2,[2,147],{183:453,192:455,184:456,193:457,198:460,58:$V73,185:$V83,187:$V93,199:$Va3,200:$Vb3,201:$Vc3,202:$Vd3,203:$Ve3,204:$Vf3,205:$Vg3,206:$Vh3}),{3:206,4:$VJ,5:$VK,37:470,61:$Vi3,63:47,73:$VE,112:$VR2,121:$VR1,123:$VS2,124:$VT1,131:$VU1,135:$VW1,160:$VZ1,163:51,168:$VF,178:333,179:335,180:334,181:336,182:469,188:331,191:337,269:$V72},o($Vj3,[2,155]),o($Vk3,[2,455],{189:472,60:[1,473]}),o($Vj3,[2,163],{3:474,4:$VJ,5:$VK,60:[1,475]}),o($Vj3,[2,166],{3:476,4:$VJ,5:$VK,60:[1,477]}),o($Vj3,[2,167],{3:478,4:$VJ,5:$VK,60:[1,479]}),o($Vj3,[2,170],{3:480,4:$VJ,5:$VK,60:[1,481]}),o($Vj3,[2,173],{3:482,4:$VJ,5:$VK,60:[1,483]}),o([4,5,8,58,60,62,77,82,99,109,141,147,148,185,187,199,200,201,202,203,204,205,206,209,222,224,297,298],[2,176]),{3:484,4:$VJ,5:$VK},{3:211,4:$VJ,5:$VK,94:485,95:209,96:$Vb2},o($VU2,[2,70]),{3:486,4:$VJ,5:$VK,128:$V03},o($Vc2,[2,125],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),{62:[1,487]},{58:$Vl3,62:[2,430]},o($Vm3,[2,320],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,62:[2,423],78:493,95:156,97:160,101:489,102:490,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,218:491,219:[1,492],231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($Vg2,[2,78]),o($VW2,[2,426],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,62:[1,494],96:$VY,98:495,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},o($VW2,[2,427],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),{62:[1,496],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{62:[1,497]},o($Vg2,[2,98]),{62:[1,498]},o($Vg2,[2,100]),{58:$Vl3,62:[1,499]},{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,62:[1,500],96:$VY,98:501,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,62:[1,502],96:$VY,98:503,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,62:[1,504],96:$VY,98:505,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,62:[1,506],96:$VY,98:507,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{58:$Vn3,62:[1,508]},o($Vm3,[2,121],{3:88,137:120,139:121,98:510,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,96:$VY,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1}),o($VX2,$VY2,{157:363,142:511}),{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,62:[1,512],96:$VY,98:513,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{3:88,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,62:[1,514],96:$VY,98:515,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{58:$Vn3,62:[1,516]},{58:$Vn3,62:[1,517]},{58:$Vn3,62:[1,518]},{58:$Vn3,62:[1,519]},{62:[1,520],132:215,158:$Vd2,159:$Ve2,160:$Vf2},{58:$Vh2,62:[1,521]},{3:88,4:$VJ,5:$VK,56:$VV,58:[1,522],60:$VW,61:$VX,96:$VY,98:523,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,137:120,139:121,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1},{62:[1,524]},o($Vi2,[2,248]),o($Vi2,[2,250]),o($Vi2,[2,252]),o($Vi2,[2,254]),o($Vo3,[2,341],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,281:$VA2}),o($Vp3,[2,342],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,279:[1,525],281:$VA2}),o($Vp3,[2,344],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,279:[1,526],281:$VA2}),o($V13,[2,346],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,159:$Vx2}),o($V13,[2,347],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,159:$Vx2}),o($Vq3,[2,348],{289:285,103:$Vl2,104:$Vm2,116:$Vp2}),o($Vq3,[2,349],{289:285,103:$Vl2,104:$Vm2,116:$Vp2}),o($Vq3,[2,350],{289:285,103:$Vl2,104:$Vm2,116:$Vp2}),o([4,5,8,56,58,60,61,62,77,79,82,83,91,96,99,104,105,109,110,111,112,113,114,115,117,118,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,158,159,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,278,279,280,281,282,283,284,285,286,287,288,292,293,294,295,297,298],[2,351],{289:285,103:$Vl2,116:$Vp2}),o($V53,[2,352],{61:$VO2}),o($VL,[2,353]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:527,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VL,[2,355]),o($V53,[2,356],{61:$VO2}),o($VL,[2,357]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:528,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VL,[2,359]),o($Vr3,[2,360],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,361],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,362],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,363],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,364],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,365],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,366],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,367],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,368],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),o($Vr3,[2,369],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,294:$VK2}),{61:[1,529]},{61:[2,402]},{61:[2,403]},{61:[2,404]},o($Vs3,[2,372],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,294:$VK2}),o([4,5,8,56,58,60,61,62,77,79,82,91,99,109,110,111,112,114,115,117,121,122,123,124,125,127,128,129,131,135,141,143,145,147,148,150,151,152,154,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,279,295,297,298],[2,373],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2}),{3:173,4:$VJ,5:$VK,37:530,52:170,61:$VN1,62:[1,532],63:47,73:$VE,78:346,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:531,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,163:51,168:$VF,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VL,[2,385]),o($VL,[2,387]),o($VL,[2,393]),o($VL,[2,394]),{3:312,4:$VJ,5:$VK,61:[1,533]},o($VM2,$VN2,{61:$VO2,122:$VV2}),{3:418,4:$VJ,5:$VK,61:[1,534],95:415,124:$V$2,135:$VW1,179:416,181:536,291:535},o($Vs3,[2,389],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,294:$VK2}),o($Vs3,[2,390],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,294:$VK2}),o([4,5,8,56,58,60,61,62,77,79,82,83,91,99,105,109,110,111,112,114,115,117,119,120,121,122,123,124,125,127,128,129,131,133,135,141,143,145,147,148,149,150,151,152,154,160,162,164,166,177,185,187,199,200,201,202,203,204,205,206,209,216,219,220,222,224,253,254,255,256,257,258,259,260,261,265,273,275,276,277,279,282,283,284,285,286,287,288,292,293,294,295,297,298],[2,391],{289:285,96:$Vk2,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2}),o($VL,[2,392]),o($VL,[2,280]),o($VL,[2,281]),o($VL,[2,282]),o($VL,[2,378]),{58:$Vl3,62:[1,537]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:538,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:539,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:346,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:540,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VK1,[2,318]),o($VL1,[2,476]),o($VL1,[2,473]),o($VL1,[2,474]),o($VL,$Vt3),o($VL,[2,262]),o($VL,[2,258]),{58:$Vl3,62:[1,542]},{62:[1,543]},{272:544,273:$V23,274:443,275:$VP2,277:$V33},{273:[1,545]},o($V43,[2,336]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:546,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,276:[1,547],278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{60:[1,548],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{58:[1,549]},o($VM,[2,139]),o($Vu3,[2,216],{69:550,209:[1,551]}),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:552,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:553,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:554,4:$VJ,5:$VK},o($Va2,[2,148],{193:457,198:460,192:555,184:556,185:$V83,187:$V93,199:$Va3,200:$Vb3,201:$Vc3,202:$Vd3,203:$Ve3,204:$Vf3,205:$Vg3,206:$Vh3}),{3:206,4:$VJ,5:$VK,61:$Vi3,112:$VR2,121:$VR1,123:$VS2,124:$VT1,131:$VU1,135:$VW1,160:$VZ1,178:333,179:335,180:334,181:336,188:557,191:337,269:$V72},o($Vv3,[2,181]),o($Vv3,[2,182]),{3:206,4:$VJ,5:$VK,61:[1,562],121:$VR1,123:[1,560],124:$VT1,131:$VU1,135:$VW1,160:$VZ1,178:559,179:563,180:561,181:564,194:558,269:$V72},{186:[1,565],200:$Vw3},{186:[1,567],200:$Vx3},o($Vy3,[2,198]),{185:[1,571],187:[1,570],198:569,200:$Vb3,201:$Vc3,202:$Vd3,203:$Ve3,204:$Vf3,205:$Vg3,206:$Vh3},o($Vy3,[2,200]),{200:[1,572]},{187:[1,574],200:[1,573]},{187:[1,576],200:[1,575]},{187:[1,577]},{200:[1,578]},{200:[1,579]},{58:$V73,183:580,184:456,185:$V83,187:$V93,192:455,193:457,198:460,199:$Va3,200:$Vb3,201:$Vc3,202:$Vd3,203:$Ve3,204:$Vf3,205:$Vg3,206:$Vh3},{62:[1,581]},{37:470,63:47,73:$VE,163:51,168:$VF},o($Vj3,[2,457],{190:582,3:583,4:$VJ,5:$VK}),o($Vk3,[2,456]),o($Vj3,[2,161]),{3:584,4:$VJ,5:$VK},o($Vj3,[2,164]),{3:585,4:$VJ,5:$VK},o($Vj3,[2,168]),{3:586,4:$VJ,5:$VK},o($Vj3,[2,171]),{3:587,4:$VJ,5:$VK},o($Vj3,[2,174]),{3:588,4:$VJ,5:$VK},o($VT2,[2,177]),o($VU2,[2,67]),o($VL,$Vt3),o($Vg2,[2,80]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:590,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{58:$Vz3,62:[1,591]},{62:[1,593]},o($VA3,[2,237]),{62:[2,424]},o($VA3,[2,239],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,219:[1,594],220:[1,595],278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),o($Vg2,[2,79]),o($VW2,[2,428],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($Vg2,[2,81]),o($Vg2,[2,82]),o($Vg2,[2,99]),o($Vg2,[2,102]),o($Vg2,[2,105]),o($VW2,[2,432],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($Vg2,[2,106]),o($VW2,[2,434],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($Vg2,[2,107]),o($VW2,[2,436],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($Vg2,[2,108]),o($VW2,[2,440],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($Vg2,[2,109]),o($VX2,[2,447],{156:596}),o($VX2,[2,450],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),{58:$Vn3,62:[1,597]},o($Vg2,[2,111]),o($VW2,[2,442],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($Vg2,[2,112]),o($VW2,[2,444],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($Vg2,[2,113]),o($Vg2,[2,114]),o($Vg2,[2,115]),o($Vg2,[2,116]),o($Vg2,[2,117]),o($Vg2,[2,118]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:346,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:598,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VZ2,[2,446],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($VJ1,[2,54]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:599,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:600,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{62:[1,601],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{62:[1,602],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{3:173,4:$VJ,5:$VK,37:603,52:170,61:$VN1,63:47,73:$VE,78:346,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:604,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,163:51,168:$VF,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{62:[1,605]},{58:$Vl3,62:[1,606]},o($VL,[2,383]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:607,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,37:608,52:170,61:$VN1,62:[1,610],63:47,73:$VE,78:346,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,130:609,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,163:51,168:$VF,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VL,[2,386]),o($VL,[2,388]),o($VL,$VB3,{248:611,249:$VC3}),{62:[1,613],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{62:[1,614],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{58:$Vl3,62:[1,615]},{3:616,4:$VJ,5:$VK,159:[1,617]},o($VK1,[2,319]),o($VL,[2,329]),{273:[1,618]},o($VL,[2,335]),{83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,273:[2,339],278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:619,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{245:[1,620]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:621,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VD3,[2,235],{70:622,99:[1,623]}),{100:[1,624]},o($V63,[2,215],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),{79:[1,625],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{79:[1,626]},o($Vv3,[2,179]),o($Vv3,[2,180]),o($Vj3,[2,156]),o($Vv3,[2,213],{195:627,207:[1,628],208:[1,629]}),o($VE3,[2,184],{3:630,4:$VJ,5:$VK,60:[1,631]}),o($VF3,[2,459],{196:632,60:[1,633]}),{3:634,4:$VJ,5:$VK,60:[1,635]},{37:636,63:47,73:$VE,163:51,168:$VF},o($VE3,[2,192],{3:637,4:$VJ,5:$VK,60:[1,638]}),o($VE3,[2,195],{3:639,4:$VJ,5:$VK,60:[1,640]}),{61:[1,641]},o($Vy3,[2,210]),{61:[1,642]},o($Vy3,[2,206]),o($Vy3,[2,199]),{200:$Vx3},{200:$Vw3},o($Vy3,[2,201]),o($Vy3,[2,202]),{200:[1,643]},o($Vy3,[2,204]),{200:[1,644]},{200:[1,645]},o($Vy3,[2,208]),o($Vy3,[2,209]),{62:[1,646],184:556,185:$V83,187:$V93,192:555,193:457,198:460,199:$Va3,200:$Vb3,201:$Vc3,202:$Vd3,203:$Ve3,204:$Vf3,205:$Vg3,206:$Vh3},o($Vj3,[2,159],{3:647,4:$VJ,5:$VK,60:[1,648]}),o($Vj3,[2,160]),o($Vj3,[2,458]),o($Vj3,[2,162]),o($Vj3,[2,165]),o($Vj3,[2,169]),o($Vj3,[2,172]),o($Vj3,[2,175]),{3:616,4:$VJ,5:$VK},o($Vm3,[2,321],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),o($Vg2,[2,72]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:493,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,218:649,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($Vg2,[2,73]),o($VA3,[2,240]),{221:[1,650]},o($Vm3,[2,120],{3:88,137:120,139:121,98:651,4:$VJ,5:$VK,56:$VV,60:$VW,61:$VX,96:$VY,99:$VZ,103:$V_,104:$V$,105:$V01,109:$V11,110:$V21,111:$V31,112:$V41,113:$V51,114:$V61,115:$V71,116:$V81,117:$V91,118:$Va1,119:$Vb1,120:$Vc1,121:$Vd1,122:$Ve1,123:$Vf1,124:$Vg1,125:$Vh1,127:$Vi1,128:$Vj1,129:$Vk1,131:$Vl1,133:$Vm1,135:$Vn1,141:$Vo1,143:$Vp1,145:$Vq1,147:$Vr1,148:$Vs1,149:$Vt1,150:$Vu1,151:$Vv1,152:$Vw1,154:$Vx1,164:$Vy1,166:$Vz1,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1}),o($Vg2,[2,110]),{58:$Vl3,62:[1,652]},o($Vo3,[2,343],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,281:$VA2}),o($Vo3,[2,345],{289:285,103:$Vl2,104:$Vm2,113:$Vo2,116:$Vp2,118:$Vq2,158:$Vw2,159:$Vx2,281:$VA2}),o($VL,[2,354]),o($VL,[2,358]),{62:[1,653]},{58:$Vl3,62:[1,654]},o($VL,[2,379]),o($VL,[2,381]),{62:[1,655],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},{62:[1,656]},{58:$Vl3,62:[1,657]},o($VL,[2,384]),o($VL,[2,299]),{61:[1,658]},o($VL,$VB3,{248:659,249:$VC3}),o($VL,$VB3,{248:660,249:$VC3}),o($VK1,[2,317]),o($VL,[2,260]),o($VL,[2,257]),o($VL,[2,334]),o($V43,[2,338],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),{58:[1,662],62:[1,661]},{58:[1,664],62:[1,663],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,289:285,292:$VI2,293:$VJ2,294:$VK2,295:$VL2},o($VG3,[2,243],{71:665,222:[1,666],224:[1,667]}),{100:[1,668]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:674,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,210:669,212:670,213:$VH3,214:$VI3,215:$VJ3,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:675,4:$VJ,5:$VK},{3:676,4:$VJ,5:$VK},o($Vv3,[2,183]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:677,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{84:[1,678]},o($VE3,[2,185]),{3:679,4:$VJ,5:$VK},o($VE3,[2,461],{197:680,3:681,4:$VJ,5:$VK}),o($VF3,[2,460]),o($VE3,[2,188]),{3:682,4:$VJ,5:$VK},{62:[1,683]},o($VE3,[2,193]),{3:684,4:$VJ,5:$VK},o($VE3,[2,196]),{3:685,4:$VJ,5:$VK},{37:686,63:47,73:$VE,163:51,168:$VF},{37:687,63:47,73:$VE,163:51,168:$VF},o($Vy3,[2,203]),o($Vy3,[2,205]),o($Vy3,[2,207]),o($Va2,[2,149]),o($Vj3,[2,157]),{3:688,4:$VJ,5:$VK},o($VA3,[2,238]),o($VA3,[2,241],{219:[1,689]}),o($VX2,[2,448],{132:215,158:$Vd2,159:$Ve2,160:$Vf2}),o($Vg2,[2,119]),o($VL,[2,370]),o($VL,[2,371]),o($VL,[2,395]),o($VL,[2,380]),o($VL,[2,382]),{99:$VK3,250:690,251:691,252:[1,692]},o($VL,[2,300]),o($VL,[2,301]),o($VL,[2,288]),{111:[1,694]},o($VL,[2,290]),{111:[1,695]},o($Vc2,[2,226],{72:696,141:[1,697],147:[1,699],148:[1,698]}),{111:$VO1,175:700},{111:$VO1,175:701},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:493,95:156,97:160,101:702,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,218:491,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($Vu3,[2,224],{211:703,58:$VL3,216:[1,705]}),o($VM3,[2,218]),{125:[1,706]},{61:[1,707]},{61:[1,708]},o($VM3,[2,223],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),{62:[2,415],80:709,83:[1,711],86:710},{83:[1,712]},o($Vv3,[2,211],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),o($Vv3,[2,212]),o($VE3,[2,186]),o($VE3,[2,187]),o($VE3,[2,462]),o($VE3,[2,189]),{3:713,4:$VJ,5:$VK,60:[1,714]},o($VE3,[2,194]),o($VE3,[2,197]),{62:[1,715]},{62:[1,716]},o($Vj3,[2,158]),o($VA3,[2,242]),{62:[1,717],99:$VK3,251:718},{62:[1,719]},{100:[1,720]},{100:[1,721]},{62:[1,722]},{62:[1,723]},o($Vc2,[2,55]),{37:724,63:47,73:$VE,143:[1,725],163:51,168:$VF,217:[1,726]},{37:727,63:47,73:$VE,163:51,168:$VF,217:[1,728]},{37:729,63:47,73:$VE,163:51,168:$VF,217:[1,730]},o($VG3,[2,246],{223:731,224:[1,732]}),{225:733,226:[2,463],300:[1,734]},o($VD3,[2,236],{58:$Vz3}),o($Vu3,[2,217]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:674,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,212:735,213:$VH3,214:$VI3,215:$VJ3,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:736,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{61:[1,737]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:674,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,210:738,212:670,213:$VH3,214:$VI3,215:$VJ3,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:674,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,210:739,212:670,213:$VH3,214:$VI3,215:$VJ3,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{62:[1,740]},{62:[2,416]},{61:[1,741]},{61:[1,742]},o($VE3,[2,190]),{3:743,4:$VJ,5:$VK},{3:744,4:$VJ,5:$VK,60:[1,745]},{3:746,4:$VJ,5:$VK,60:[1,747]},o($VL,[2,303]),{62:[1,748]},o($VL,[2,304]),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:674,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,210:749,212:670,213:$VH3,214:$VI3,215:$VJ3,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:493,95:156,97:160,101:750,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,218:491,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},o($VL,[2,289]),o($VL,[2,291]),o($Vc2,[2,227]),{37:751,63:47,73:$VE,163:51,168:$VF,217:[1,752]},{37:753,63:47,73:$VE,163:51,168:$VF},o($Vc2,[2,229]),{37:754,63:47,73:$VE,163:51,168:$VF},o($Vc2,[2,230]),{37:755,63:47,73:$VE,163:51,168:$VF},o($VG3,[2,244]),{111:$VO1,175:756},{226:[1,757]},{226:[2,464]},o($VM3,[2,219]),o($Vu3,[2,225],{289:285,83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:674,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,210:758,212:670,213:$VH3,214:$VI3,215:$VJ3,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{58:$VL3,62:[1,759]},{58:$VL3,62:[1,760]},o($VQ2,[2,417],{81:761,88:762,3:764,4:$VJ,5:$VK,60:$VN3}),{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:767,87:765,89:766,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{84:[1,768]},o($VE3,[2,191]),o($Vv3,[2,151]),{3:769,4:$VJ,5:$VK},o($Vv3,[2,153]),{3:770,4:$VJ,5:$VK},o($VL,[2,305]),o([62,99],[2,306],{58:$VL3}),{58:$Vz3,62:[2,307]},o($Vc2,[2,228]),{37:771,63:47,73:$VE,163:51,168:$VF},o($Vc2,[2,231]),o($Vc2,[2,233]),o($Vc2,[2,234]),o($VG3,[2,247]),{111:[2,465],227:772,301:[1,773]},{58:$VL3,62:[1,774]},o($VM3,[2,221]),o($VM3,[2,222]),o($VQ2,[2,57]),o($VQ2,[2,418]),{3:775,4:$VJ,5:$VK},o($VQ2,[2,61]),{58:[1,777],62:[1,776]},o($Vm3,[2,63]),o($Vm3,[2,64],{289:285,60:[1,778],83:$Vj2,96:$Vk2,103:$Vl2,104:$Vm2,105:$Vn2,113:$Vo2,116:$Vp2,118:$Vq2,119:$Vr2,120:$Vs2,133:$Vt2,149:$Vu2,150:$Vv2,158:$Vw2,159:$Vx2,278:$Vy2,280:$Vz2,281:$VA2,282:$VB2,283:$VC2,284:$VD2,285:$VE2,286:$VF2,287:$VG2,288:$VH2,292:$VI2,293:$VJ2,294:$VK2,295:$VL2}),{62:[1,779]},o($Vv3,[2,152]),o($Vv3,[2,154]),o($Vc2,[2,232]),{111:$VO1,175:780},{111:[2,466]},o($VM3,[2,220]),o($VQ2,[2,60]),{62:[2,59]},{3:173,4:$VJ,5:$VK,52:170,61:$VN1,78:767,89:781,95:156,97:160,111:$VO1,112:$VP1,117:$VQ1,121:$VR1,123:$VS1,124:$VT1,131:$VU1,133:$VV1,135:$VW1,137:172,158:$VX1,159:$VY1,160:$VZ1,175:158,179:154,180:162,181:163,231:157,232:153,233:155,234:159,235:161,236:164,237:165,238:166,239:168,241:$V_1,242:$VG,243:$V$1,244:$V02,246:$V12,253:$VA1,254:$VB1,255:$VC1,256:$VD1,257:$VE1,258:$VF1,259:$VG1,260:$VH1,261:$VI1,263:$V22,264:$V32,265:$V42,266:$V52,267:$V62,269:$V72,270:$V82,281:$V92},{3:782,4:$VJ,5:$VK},{62:[1,783]},o($VO3,[2,467],{228:784,300:[1,785]}),o($Vm3,[2,62]),o($Vm3,[2,65]),o($VQ2,[2,419],{3:764,85:786,88:787,4:$VJ,5:$VK,60:$VN3}),o($VG3,[2,469],{229:788,302:[1,789]}),o($VO3,[2,468]),o($VQ2,[2,58]),o($VQ2,[2,420]),o($VG3,[2,245]),o($VG3,[2,470])],
defaultActions: {53:[2,3],132:[2,308],133:[2,309],134:[2,310],135:[2,311],136:[2,312],137:[2,313],138:[2,314],139:[2,315],140:[2,316],141:[2,437],142:[2,438],298:[2,471],299:[2,472],407:[2,402],408:[2,403],409:[2,404],492:[2,424],710:[2,416],734:[2,464],773:[2,466],776:[2,59]},
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
case 0:return 242
break;
case 1:return 269
break;
case 2:return 'ATLBRA'
break;
case 3:return 5
break;
case 4:return 5
break;
case 5:return 265
break;
case 6:return 265
break;
case 7:return 112
break;
case 8:return 112
break;
case 9:return /* return COMMENT */
break;
case 10:/* skip whitespace */
break;
case 11:return 150
break;
case 12:return 149
break;
case 13:yy_.yytext = 'VALUE';return 168
break;
case 14:yy_.yytext = 'ROW';return 168
break;
case 15:yy_.yytext = 'COLUMN';return 168
break;
case 16:yy_.yytext = 'MATRIX';return 168
break;
case 17:yy_.yytext = 'INDEX';return 168
break;
case 18:yy_.yytext = 'RECORDSET';return 168
break;
case 19:yy_.yytext = 'TEXT';return 168
break;
case 20:yy_.yytext = 'SELECT';return 168
break;
case 21:return 149
break;
case 22:return 145
break;
case 23:return 186
break;
case 24:return 261
break;
case 25:return 60
break;
case 26:return 219
break;
case 27:return 257
break;
case 28:return 292
break;
case 29:return 'BREAK'
break;
case 30:return 293
break;
case 31:return 280
break;
case 32:return 100
break;
case 33:return 'CALL'
break;
case 34:return 270
break;
case 35:return 244
break;
case 36:return 169
break;
case 37:return 169
break;
case 38:return 246
break;
case 39:return 217
break;
case 40:return 254
break;
case 41:return 185
break;
case 42:return 215
break;
case 43:return 241
break;
case 44:return 'CURSOR'
break;
case 45:return 'DEFAULT'
break;
case 46:return 219
break;
case 47:return 164
break;
case 48:return 273
break;
case 49:return 277
break;
case 50:return 267
break;
case 51:return 258
break;
case 52:return 79
break;
case 53:return 162
break;
case 54:return 298
break;
case 55:return 209
break;
case 56:return 213
break;
case 57:return 216
break;
case 58:return 294
break;
case 59:return 83
break;
case 60:return 172
break;
case 61:return 201
break;
case 62:return 177
break;
case 63:return 200
break;
case 64:return 202
break;
case 65:return 96
break;
case 66:return 222
break;
case 67:return 256
break;
case 68:return 'MERGE'
break;
case 69:return 255
break;
case 70:return 199
break;
case 71:return 221
break;
case 72:return 'NO'
break;
case 73:return 133
break;
case 74:return 266
break;
case 75:return 207
break;
case 76:return 150
break;
case 77:return 99
break;
case 78:return 187
break;
case 79:return 249
break;
case 80:return 278
break;
case 81:return 'REPLACE'
break;
case 82:return 253
break;
case 83:return 276
break;
case 84:return 127
break;
case 85:return 174
break;
case 86:return 263
break;
case 87:return 141
break;
case 88:return 166
break;
case 89:return 82
break;
case 90:return 208
break;
case 91:return 128
break;
case 92:return 275
break;
case 93:return 109
break;
case 94:return 'WHILE'
break;
case 95:return 56
break;
case 96:return 111
break;
case 97:return 111
break;
case 98:return 103
break;
case 99:return 117
break;
case 100:return 158
break;
case 101:return 281
break;
case 102:return 159
break;
case 103:return 113
break;
case 104:return 118
break;
case 105:return 288
break;
case 106:return 285
break;
case 107:return 287
break;
case 108:return 284
break;
case 109:return 282
break;
case 110:return 119
break;
case 111:return 283
break;
case 112:return 286
break;
case 113:return 120
break;
case 114:return 105
break;
case 115:return 286
break;
case 116:return 61
break;
case 117:return 62
break;
case 118:return 124
break;
case 119:return 'LCUR'
break;
case 120:return 'RCUR'
break;
case 121:return 'RBRA'
break;
case 122:return 'COLONDASH'
break;
case 123:return 'QUESTIONDASH'
break;
case 124:return 122
break;
case 125:return 58
break;
case 126:return 295
break;
case 127:return 131
break;
case 128:return 297
break;
case 129:return 121
break;
case 130:return 160
break;
case 131:return 116
break;
case 132:return 104
break;
case 133:return 4
break;
case 134:return 8
break;
case 135:return 'INVALID'
break;
}
},
rules: [/^(?:``([^\`])+``)/i,/^(?:\[\?\])/i,/^(?:@\[)/i,/^(?:\[([^\]])*?\])/i,/^(?:`([^\`])*?`)/i,/^(?:N(['](\\.|[^']|\\')*?['])+)/i,/^(?:X(['](\\.|[^']|\\')*?['])+)/i,/^(?:(['](\\.|[^']|\\')*?['])+)/i,/^(?:(["](\\.|[^"]|\\")*?["])+)/i,/^(?:--(.*?)($|\r\n|\r|\n))/i,/^(?:\s+)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:VALUE\s+OF\s+SELECT\b)/i,/^(?:ROW\s+OF\s+SELECT\b)/i,/^(?:COLUMN\s+OF\s+SELECT\b)/i,/^(?:MATRIX\s+OF\s+SELECT\b)/i,/^(?:INDEX\s+OF\s+SELECT\b)/i,/^(?:RECORDSET\s+OF\s+SELECT\b)/i,/^(?:TEXT\s+OF\s+SELECT\b)/i,/^(?:SELECT\b)/i,/^(?:AND\b)/i,/^(?:ANY\b)/i,/^(?:APPLY\b)/i,/^(?:ARRAY\b)/i,/^(?:AS\b)/i,/^(?:ASC\b)/i,/^(?:AVG\b)/i,/^(?:BETWEEN\b)/i,/^(?:BREAK\b)/i,/^(?:NOT\s+BETWEEN\b)/i,/^(?:NOT\s+LIKE\b)/i,/^(?:BY\b)/i,/^(?:CALL\b)/i,/^(?:CASE\b)/i,/^(?:CAST\b)/i,/^(?:COLUMN\b)/i,/^(?:COLUMNS\b)/i,/^(?:CONVERT\b)/i,/^(?:CORRESPONDING\b)/i,/^(?:COUNT\b)/i,/^(?:CROSS\b)/i,/^(?:CUBE\b)/i,/^(?:CURRENT_TIMESTAMP\b)/i,/^(?:CURSOR\b)/i,/^(?:DEFAULT\b)/i,/^(?:DESC\b)/i,/^(?:DISTINCT\b)/i,/^(?:END\b)/i,/^(?:ELSE\b)/i,/^(?:EXISTS\b)/i,/^(?:FIRST\b)/i,/^(?:FOR\b)/i,/^(?:FROM\b)/i,/^(?:GO\b)/i,/^(?:GROUP\b)/i,/^(?:GROUPING\b)/i,/^(?:HAVING\b)/i,/^(?:IS\b)/i,/^(?:IN\b)/i,/^(?:INDEX\b)/i,/^(?:INNER\b)/i,/^(?:INTO\b)/i,/^(?:JOIN\b)/i,/^(?:LEFT\b)/i,/^(?:LIKE\b)/i,/^(?:LIMIT\b)/i,/^(?:MAX\b)/i,/^(?:MERGE\b)/i,/^(?:MIN\b)/i,/^(?:NATURAL\b)/i,/^(?:NOCASE\b)/i,/^(?:NO\b)/i,/^(?:NOT\b)/i,/^(?:NULL\b)/i,/^(?:ON\b)/i,/^(?:OR\b)/i,/^(?:ORDER\b)/i,/^(?:OUTER\b)/i,/^(?:OVER\b)/i,/^(?:REGEXP\b)/i,/^(?:REPLACE\b)/i,/^(?:SUM\b)/i,/^(?:THEN\b)/i,/^(?:TO\b)/i,/^(?:TOP\b)/i,/^(?:TRUE\b)/i,/^(?:UNION\b)/i,/^(?:UNIQUE\b)/i,/^(?:UNPIVOT\b)/i,/^(?:USING\b)/i,/^(?:VALUE(S)?)/i,/^(?:WHEN\b)/i,/^(?:WHERE\b)/i,/^(?:WHILE\b)/i,/^(?:WITH\b)/i,/^(?:(\d*[.])?\d+[eE]\d+)/i,/^(?:(\d*[.])?\d+)/i,/^(?:->)/i,/^(?:#)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:!===)/i,/^(?:===)/i,/^(?:!==)/i,/^(?:==)/i,/^(?:>=)/i,/^(?:>)/i,/^(?:<=)/i,/^(?:<>)/i,/^(?:<)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:\()/i,/^(?:\))/i,/^(?:@)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\])/i,/^(?::-)/i,/^(?:\?-)/i,/^(?:\.)/i,/^(?:,)/i,/^(?:::)/i,/^(?::)/i,/^(?:;)/i,/^(?:\$)/i,/^(?:\?)/i,/^(?:!)/i,/^(?:\^)/i,/^(?:[a-zA-Z_][a-zA-Z_0-9]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135],"inclusive":true}}
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
  UniOp:UniOp,
  Join:Join,
  OrderExpression:OrderExpression,
  CaseValue:CaseValue
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