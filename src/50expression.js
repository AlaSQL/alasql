
yy.Expression = function(params) { return yy.extend(this, params); };
yy.Expression.prototype.toString = function() {
	return this.expression.toString();
};
yy.Expression.prototype.toJavaScript = function(context, tableid) {
	return this.expression.toJavaScript(context, tableid);
};
yy.Expression.prototype.compile = function(context, tableid){
	console.log('Expression',this);
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
	if(this.databaseid) s = this.databaseid+'.'+s;
	return s;
}


yy.Op = function (params) { return yy.extend(this, params); }
yy.Op.prototype.toString = function() {
	return this.left.toString()+this.op+this.right.toString();
}
yy.Op.prototype.toJavaScript = function(context,tableid) {
//	console.log(this);
	var op = this.op;
	if(this.op == '=') op = '===';
	else if(this.op == '<>') op = '!=';
	else if(this.op == 'AND') op = '&&';
	else if(this.op == 'OR') op = '||';
//	console.log(this);
	return '('+this.left.toJavaScript(context,tableid)+op+this.right.toJavaScript(context,tableid)+')';
}



yy.NumValue = function (params) { return yy.extend(this, params); }
yy.NumValue.prototype.toString = function() {
	return this.value.toString();
}
yy.NumValue.prototype.toJavaScript = function() {
	return ""+this.value;
}


yy.StringValue = function (params) { return yy.extend(this, params); }
yy.StringValue.prototype.toString = function() {
	return this.value.toString();
}
yy.StringValue.prototype.toJavaScript = function() {
	return "'"+this.value+"'";
}


yy.LogicValue = function (params) { return yy.extend(this, params); }
yy.LogicValue.prototype.toString = function() {
	return this.value?'TRUE':'FALSE';
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
