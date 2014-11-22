/*
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.ExpressionStatement = function(params) { return yy.extend(this, params); };
yy.ExpressionStatement.prototype.toString = function() {
	return this.expression.toString();
};

yy.ExpressionStatement.prototype.execute = function (databaseid, params) {
	if(this.expression) {
		var expr =  new Function("params",'return '+this.expression.toJavaScript('',''));
		return expr(params);
	}
}

yy.Expression = function(params) { return yy.extend(this, params); };
yy.Expression.prototype.toString = function() {
	return this.expression.toString();
};
yy.Expression.prototype.toJavaScript = function(context, tableid) {
//	console.log('Expression',this);
	if(this.expression.reduced) return 'true';
	return this.expression.toJavaScript(context, tableid);
};
yy.Expression.prototype.compile = function(context, tableid){
//	console.log('Expression',this);
	if(this.reduced) return returnTrue();
	return new Function('p','return '+this.toJavaScript(context, tableid));
};




yy.Literal = function (params) { return yy.extend(this, params); }
yy.Literal.prototype.toString = function() {
	var s = this.value;
	if(this.value1) s = this.value1+'.'+s; 
//	else s = tableid+'.'+s;
	return s;
}


yy.Join = function (params) { return yy.extend(this, params); }
yy.Join.prototype.toString = function() {
	return 'JOIN'+this.table.toString();
}
//yy.Join.prototype.toJavaScript = function(context, tableid) {
//	return 'JOIN'+this.table.toString();
//}


yy.Table = function (params) { return yy.extend(this, params); }
yy.Table.prototype.toString = function() {
	var s = this.tableid;
//	if(this.joinmode)
	if(this.databaseid) s = this.databaseid+'.'+s;
	return s;
};


yy.View = function (params) { return yy.extend(this, params); }
yy.View.prototype.toString = function() {
	var s = this.viewid;
//	if(this.joinmode)
	if(this.databaseid) s = this.databaseid+'.'+s;
	return s;
};


yy.Op = function (params) { return yy.extend(this, params); }
yy.Op.prototype.toString = function() {
	if(this.op == 'IN' || this.op == 'NOT IN') {
		return this.left.toString()+" "+this.op+" ("+this.right.toString()+")";
	}
	if(this.allsome) {
		return this.left.toString()+" "+this.op+" "+this.allsome+' ('+this.right.toString()+')';
	}
	return this.left.toString()+" "+this.op+" "+(this.allsome?this.allsome+' ':'')+this.right.toString();
};

yy.Op.prototype.toType = function(tableid) {
	if(['-','*','/','%'].indexOf(this.op) >-1) return 'number';
	if(this.op == '+') {
		if(this.left.toType(tableid) == 'string' || this.right.toType(tableid) == 'string') return 'string';
		if(this.left.toType(tableid) == 'number' || this.right.toType(tableid) == 'number') return 'number';
	};
	if(['AND','OR','NOT','=','!=','>','>=','<','<=', 'IN', 'NOT IN', 'LIKE'].indexOf(this.op) >-1 ) return 'boolean';
	if(this.op == 'BETWEEN' || this.op == 'NOT BETWEEN') return 'boolean';
	if(this.allsome) return 'boolean';
	if(!this.op) return this.left.toType();

	return 'unknown';
};

yy.Op.prototype.toJavaScript = function(context,tableid) {
//	console.log(this);
	var op = this.op;
	if(this.op == '=') op = '===';
	else if(this.op == '<>') op = '!=';
	else if(this.op == 'OR') op = '||';

	if(this.op == 'LIKE') {
		var s = '('+this.left.toJavaScript(context,tableid)+')'+
		".match(new RegExp(("+this.right.toJavaScript(context,tableid)+").replace(/\\\%/g,'.*'),'g'))"
//		console.log(s);
		return s;
	};

	if(this.op == 'BETWEEN') {
		if(this.right instanceof yy.Op && this.right.op == 'AND') {
			return '(('+this.right.left.toJavaScript(context,tableid)+'<='+this.left.toJavaScript(context,tableid)+')&&'+
			'('+this.left.toJavaScript(context,tableid)+'<='+this.right.right.toJavaScript(context,tableid)+'))';		
		} else {
			throw new Error('Wrong BETWEEM operator without AND part');
		}
	};

	if(this.op == 'NOT BETWEEN') {
		if(this.right instanceof yy.Op && this.right.op == 'AND') {
			return '!(('+this.right.left.toJavaScript(context,tableid)+'<='+this.left.toJavaScript(context,tableid)+')&&'+
			'('+this.left.toJavaScript(context,tableid)+'<='+this.right.right.toJavaScript(context,tableid)+'))';		
		} else {
			throw new Error('Wrong NOT BETWEEM operator without AND part');
		}
	};

	if(this.op == 'IN') {
		if(this.right instanceof yy.Select ) {
			var s = '(this.queriesdata['+this.queriesidx+'].indexOf(';
			s += this.left.toJavaScript(context,tableid)+')>-1)';
			return s;
		} else if(this.right instanceof Array ) {
			var s = '(['+this.right.map(function(a){return a.toJavaScript(context,tableid)}).join(',')+'].indexOf(';
			s += this.left.toJavaScript(context,tableid)+')>-1)';
			return s;
		} else {
			throw new Error('Wrong IN operator without SELECT part');
		}
	};


	if(this.op == 'NOT IN') {
		if(this.right instanceof yy.Select ) {
			var s = '(this.queriesdata['+this.queriesidx+'].indexOf(';
			s += this.left.toJavaScript(context,tableid)+')<0)';
			return s;
		} else if(this.right instanceof Array ) {
			var s = '(['+this.right.map(function(a){return a.toJavaScript(context,tableid)}).join(',')+'].indexOf(';
			s += this.left.toJavaScript(context,tableid)+')<0)';
			return s;
		} else {
			throw new Error('Wrong NOT IN operator without SELECT part');
		}
	};

	if(this.allsome == 'ALL') {
		if(this.right instanceof yy.Select ) {
			var s = 'this.queriesdata['+this.queriesidx+'].every(function(b){return (';
			s += this.left.toJavaScript(context,tableid)+')'+op+'b})';
			return s;
		} else if(this.right instanceof Array ) {
			var s = '['+this.right.map(function(a){return a.toJavaScript(context,tableid)}).join(',')+'].every(function(b){return (';
			s += this.left.toJavaScript(context,tableid)+')'+op+'b})';
			return s;
		} else {
			throw new Error('Wrong NOT IN operator without SELECT part');
		}		
	};

	if(this.allsome == 'SOME' || this.allsome == 'ANY') {
		if(this.right instanceof yy.Select ) {
			var s = 'this.queriesdata['+this.queriesidx+'].some(function(b){return (';
			s += this.left.toJavaScript(context,tableid)+')'+op+'b})';
			return s;
		} else if(this.right instanceof Array ) {
			var s = '['+this.right.map(function(a){return a.toJavaScript(context,tableid)}).join(',')+'].some(function(b){return (';
			s += this.left.toJavaScript(context,tableid)+')'+op+'b})';
			return s;
		} else {
			throw new Error('Wrong NOT IN operator without SELECT part');
		}		
	};

// Special case for AND optimization (if reduced)
	if(this.op == 'AND') {
		if(this.left.reduced) {
			if(this.right.reduced) {
				return 'true';
			} else {
				return this.right.toJavaScript(context,tableid);
			}
		} else if(this.right.reduced) {
			return this.left.toJavaScript(context,tableid);
		}			

		// Otherwise process as regular operation (see below)
		op = '&&';

	}


	// Change names
//	console.log(this);
	return '('+this.left.toJavaScript(context,tableid)+op+this.right.toJavaScript(context,tableid)+')';
};




yy.NumValue = function (params) { return yy.extend(this, params); }
yy.NumValue.prototype.toString = function() {
	return this.value.toString();
};

yy.NumValue.prototype.toType = function() {
	return 'number';
};

yy.NumValue.prototype.toJavaScript = function() {
	return ""+this.value;
}


yy.StringValue = function (params) { return yy.extend(this, params); }
yy.StringValue.prototype.toString = function() {
	return "'"+this.value.toString()+"'";
}

yy.StringValue.prototype.toType = function() {
	return 'string';
}

yy.StringValue.prototype.toJavaScript = function() {
//	console.log("'"+doubleqq(this.value)+"'");
//	return "'"+doubleqq(this.value)+"'";
	return "'"+escapeq(this.value)+"'";

}


yy.LogicValue = function (params) { return yy.extend(this, params); }
yy.LogicValue.prototype.toString = function() {
	return this.value?'TRUE':'FALSE';
}

yy.LogicValue.prototype.toType = function() {
	return 'boolean';
}

yy.LogicValue.prototype.toJavaScript = function() {
	return this.value?'true':'false';
}

yy.NullValue = function (params) { return yy.extend(this, params); }
yy.NullValue.prototype.toString = function() {
	return 'NULL';
}
yy.NullValue.prototype.toJavaScript = function() {
	return 'null';
}

yy.ParamValue = function (params) { return yy.extend(this, params); }
yy.ParamValue.prototype.toString = function() {
	return '$'+this.param;
}
yy.ParamValue.prototype.toJavaScript = function() {
	if(typeof this.param == "string") return "params[\'"+this.param+"\']";
	else return "params["+this.param+"]";
}



yy.UniOp = function (params) { return yy.extend(this, params); }
yy.UniOp.prototype.toString = function() {
	if(this.op == '-') return this.op+this.right.toString();
	if(this.op == 'NOT') return this.op+'('+this.right.toString()+')';
	else if(this.op == null) return '('+this.right.toString()+')';
};

yy.UniOp.prototype.toType = function(tableid) {
	if(this.op == '-') return 'number';
	if(this.op == 'NOT') return 'boolean';
};

yy.UniOp.prototype.toJavaScript = function(context, tableid) {
	if(this.op == '-') return "-"+this.right.toJavaScript(context, tableid);
	if(this.op == 'NOT') return '!('+this.right.toJavaScript(context, tableid)+')';
	else if(this.op == null) return '('+this.right.toJavaScript(context, tableid)+')';
};



// yy.Star = function (params) { return yy.extend(this, params); }
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

yy.Column = function(params) { return yy.extend(this, params); }
yy.Column.prototype.toString = function() {
	var s;
	if(this.columnid == +this.columnid) {
		s = '['+this.columnid+']';
	} else {
		s = this.columnid;
	}
	if(this.tableid) {
		if(+this.columnid == this.columnid) {
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

yy.Column.prototype.toJavaScript = function(context, tableid) {
//	var s = this.value;
// 	var s = this.columnid;
// 	if(this.tableid) {
// 		s = this.tableid+'.'+s;
// //		if(this.databaseid) {
// //			s = this.databaseid+'.'+s;
// //		}
// 	} else {
// 		s = tableid+'.'+s;
// 	}
//console.log('yy.Column',this, tableid);
	var s = '';
	if(tableid == '') {
		s = context+'[\''+this.columnid+'\']';
	} else {
		s = context+'[\''+(this.tableid || tableid) + '\'][\''+this.columnid+'\']';
	}
//	console.log(context,s);
//	console.trace(new Error());
	return s;
}




yy.AggrValue = function(params){ return yy.extend(this, params); }
yy.AggrValue.prototype.toString = function() {
	var s = this.aggregatorid+'(';
	if(this.expression) s += this.expression.toString();
	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
	return s;
};

yy.AggrValue.prototype.toType = function() {
	if(['SUM','COUNT','AVG','MIN', 'MAX'].indexOf(this.aggregatorid)>-1) return 'number';
	if(['FIRST','LAST' ].indexOf(this.aggregatorid)>-1) return this.expression.toType();
}
yy.AggrValue.prototype.toJavaScript = function(context, tableid) {
//	var s = 'alasql.functions.'+this.funcid+'(';
//	if(this.expression) s += this.expression.toJavaScript(context, tableid);
//	s += ')';
//	if(this.alias) s += ' AS '+this.alias;
//	return s;
	return '';
}


yy.OrderExpression = function(params){ return yy.extend(this, params); }
yy.OrderExpression.prototype.toString = function() {
	var s = this.expression.toString();
	if(this.order) s += ' '+this.order.toString();
	return s;
}

yy.GroupExpression = function(params){ return yy.extend(this, params); }
yy.GroupExpression.prototype.toString = function() {
	return this.type+'('+this.group.toString()+')';
}


yy.ColumnDef = function (params) { return yy.extend(this, params); }
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
