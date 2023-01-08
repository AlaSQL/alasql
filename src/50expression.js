/*
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

{
	const assign = Object.assign;

	class ExpressionStatement {
		/** @param {object} params Initial parameters */
		constructor(params) {
			assign(this, params);
		}

		/**
			Convert AST to string
			@return {string}
		*/
		toString() {
			return this.expression.toString();
		}

		/**
			Execute statement
			@param {string} databaseid Database identificatro
			@param {object} params Statement parameters
			@param {statement-callback} cb Callback
			@return {object} Result value
		*/
		execute(databaseid, params, cb) {
			if (this.expression) {
				//		console.log(this.expression.toJS('','', null));
				//      console.log(this.expression.toJS('({})','', null));
				alasql.precompile(this, databaseid, params); // Precompile queries
				var exprfn = new Function(
					'params,alasql,p',
					'var y;return ' + this.expression.toJS('({})', '', null)
				).bind(this);
				var res = exprfn(params, alasql);
				if (cb) {
					res = cb(res);
				}
				return res;
			}
		}
	}

	class Expression {
		constructor(params) {
			assign(this, params);
		}

		/**
			Convert AST to string
			@return {string}
		*/
		toString() {
			var s = this.expression.toString();
			if (this.order) {
				s += ' ' + this.order.toString();
			}
			if (this.nocase) {
				s += ' COLLATE NOCASE';
			}
			if (this.direction) {
				s += ' ' + this.direction;
			}
			return s;
		}

		/**
			Find aggregator in AST subtree
			@param {object} query Query object
		*/
		findAggregator(query) {
			if (this.expression.findAggregator) {
				this.expression.findAggregator(query);
			}
		}

		/**
			Convert AST to JavaScript expression
			@param {string} context Context string, e.g. 'p','g', or 'x'
			@param {string} tableid Default table name
			@param {object} defcols Default columns dictionary
			@return {string} JavaScript expression
		*/
		toJS(context, tableid, defcols) {
			//	console.log('Expression',this);
			if (this.expression.reduced) {
				return 'true';
			}
			return this.expression.toJS(context, tableid, defcols);
		}

		/**
			Compile AST to JavaScript expression
			@param {string} context Context string, e.g. 'p','g', or 'x'
			@param {string} tableid Default table name
			@param {object} defcols Default columns dictionary
			@return {string} JavaScript expression
		*/
		compile(context, tableid, defcols) {
			//	console.log('Expression',this);
			if (this.reduced) {
				return returnTrue();
			}
			return new Function('p', 'var y;return ' + this.toJS(context, tableid, defcols));
		}
	}

	class JavaScript {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			var s = '``' + this.value + '``';
			return s;
		}

		toJS() {
			return '(' + this.value + ')';
		}

		execute(databaseid, params, cb) {
			var res = 1;
			var expr = new Function('params,alasql,p', this.value);
			expr(params, alasql);
			if (cb) {
				res = cb(res);
			}
			return res;
		}
	}

	class Literal {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			var s = this.value;
			if (this.value1) {
				s = this.value1 + '.' + s;
			}
			//	else s = tableid+'.'+s;
			return s;
		}
	}

	class Join {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			var s = ' ';
			if (this.joinmode) {
				s += this.joinmode + ' ';
			}
			s += 'JOIN ' + this.table.toString();
			return s;
		}
	}

	class Table {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			var s = this.tableid;
			//	if(this.joinmode)
			if (this.databaseid) {
				s = this.databaseid + '.' + s;
			}
			return s;
		}
	}

	class View {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			var s = this.viewid;
			//	if(this.joinmode)
			if (this.databaseid) {
				s = this.databaseid + '.' + s;
			}
			return s;
		}
	}

	class Op {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			if (this.op === 'IN' || this.op === 'NOT IN') {
				return this.left.toString() + ' ' + this.op + ' (' + this.right.toString() + ')';
			}
			if (this.allsome) {
				return (
					this.left.toString() +
					' ' +
					this.op +
					' ' +
					this.allsome +
					' (' +
					this.right.toString() +
					')'
				);
			}
			if (this.op === '->' || this.op === '!') {
				var s = this.left.toString() + this.op;
				//		console.log(this.right);
				if (typeof this.right !== 'string' && typeof this.right !== 'number') {
					s += '(';
				}

				s += this.right.toString();

				if (typeof this.right !== 'string' && typeof this.right !== 'number') {
					s += ')';
				}

				return s;
			}
			if (this.op === 'BETWEEN' || this.op === 'NOT BETWEEN') {
				var s =
					this.left.toString() +
					' ' +
					this.op +
					' ' +
					this.right1.toString() +
					' AND ' +
					this.right2.toString();

				return s;
			}

			return (
				this.left.toString() +
				' ' +
				this.op +
				' ' +
				(this.allsome ? this.allsome + ' ' : '') +
				this.right.toString()
			);
		}

		findAggregator(query) {
			if (this.left && this.left.findAggregator) {
				this.left.findAggregator(query);
			}
			// Do not go in > ALL
			if (this.right && this.right.findAggregator && !this.allsome) {
				this.right.findAggregator(query);
			}
		}

		toType(tableid) {
			if (['-', '*', '/', '%', '^'].indexOf(this.op) > -1) {
				return 'number';
			}

			if (['||'].indexOf(this.op) > -1) {
				return 'string';
			}

			if (this.op === '+') {
				if (this.left.toType(tableid) === 'string' || this.right.toType(tableid) === 'string') {
					return 'string';
				}
				if (this.left.toType(tableid) === 'number' || this.right.toType(tableid) === 'number') {
					return 'number';
				}
			}

			if (
				[
					'AND',
					'OR',
					'NOT',
					'=',
					'==',
					'===',
					'!=',
					'!==',
					'!===',
					'>',
					'>=',
					'<',
					'<=',
					'IN',
					'NOT IN',
					'LIKE',
					'NOT LIKE',
					'REGEXP',
					'GLOB',
				].indexOf(this.op) > -1
			) {
				return 'boolean';
			}

			if (
				this.op === 'BETWEEN' ||
				this.op === 'NOT BETWEEN' ||
				this.op === 'IS NULL' ||
				this.op === 'IS NOT NULL'
			) {
				return 'boolean';
			}

			if (this.allsome) {
				return 'boolean';
			}

			if (!this.op) {
				return this.left.toType();
			}

			return 'unknown';
		}

		toJS(context, tableid, defcols) {
			//	console.log(this);
			var s;
			var refs = [];
			var op = this.op;
			var _this = this;
			//var leftJS = function(){return _this.left.toJS(context,tableid, defcols)};
			//var rightJS = function(){return _this.right.toJS(context,tableid, defcols)};
			var accessedLeft = false,
				accessedRight = false;
			var ref = function (expr) {
				if (expr.toJS) {
					expr = expr.toJS(context, tableid, defcols);
				}
				var i = refs.push(expr) - 1;
				return 'y[' + i + ']';
			};
			var leftJS = function () {
				return ref(_this.left);
			};
			var rightJS = function () {
				return ref(_this.right);
			};

			if (this.op === '=') {
				op = '===';
			} else if (this.op === '<>') {
				op = '!=';
			} else if (this.op === 'OR') {
				op = '||';
			}

			// Arrow operator
			if (this.op === '->') {
				// Expression to prevent error if object is empty (#344)
				var ljs = '(' + leftJS() + '||{})';

				if (typeof this.right === 'string') {
					s = ljs + '["' + this.right + '"]';
				} else if (typeof this.right === 'number') {
					s = ljs + '[' + this.right + ']';
				} else if (this.right instanceof yy.FuncValue) {
					var ss = [];
					if (!(!this.right.args || 0 === this.right.args.length)) {
						var ss = this.right.args.map(ref);
					}
					s = '' + ljs + '[' + JSON.stringify(this.right.funcid) + '](' + ss.join(',') + ')';
				} else {
					s = '' + ljs + '[' + rightJS() + ']';
				}
			}

			if (this.op === '!') {
				if (typeof this.right === 'string') {
					s = '' + 'alasql.databases[alasql.useid].objects[' + leftJS() + ']["' + this.right + '"]';
				}
				// TODO - add other cases
			}

			if (this.op === 'IS') {
				const leftOperand = leftJS();
				const rightOperand = rightJS();
				if (
					this.right instanceof yy.NullValue ||
					(this.right.op === 'NOT' && this.right.right instanceof yy.NullValue)
				) {
					s = `(
					(${leftOperand}==null)   // Cant be ===
					===
					(${rightOperand}==null)  // Cant be ===
				)`;
				} else {
					s = `(
					(${leftOperand} == ${rightOperand})
					||
					(
						${leftOperand}  < 0
						&&
						true == ${rightOperand}
					)
				)`;
				}
			}

			if (this.op === '==') {
				s = '' + 'alasql.utils.deepEqual(' + leftJS() + ',' + rightJS() + ')';
			}

			if (this.op === '===' || this.op === '!===') {
				s =
					'' +
					'(' +
					(this.op === '!===' ? '!' : '') +
					'(' +
					'(' +
					leftJS() +
					').valueOf()' +
					'===' +
					'(' +
					rightJS() +
					').valueOf()' +
					')' +
					')';
			}

			if (this.op === '!==') {
				s = '' + '(!alasql.utils.deepEqual(' + leftJS() + ',' + rightJS() + '))';
			}
			if (this.op === '||') {
				s = '' + "(''+(" + leftJS() + "||'')+(" + rightJS() + '||""))';
			}
			if (this.op === 'LIKE' || this.op === 'NOT LIKE') {
				var s =
					'(' +
					(this.op === 'NOT LIKE' ? '!' : '') +
					'alasql.utils.like(' +
					rightJS() +
					',' +
					leftJS();
				if (this.escape) {
					s += ',' + ref(this.escape);
				}
				s += '))';
			}
			if (this.op === 'REGEXP') {
				s = 'alasql.stdfn.REGEXP_LIKE(' + leftJS() + ',' + rightJS() + ')';
			}
			if (this.op === 'GLOB') {
				s = 'alasql.utils.glob(' + leftJS() + ',' + rightJS() + ')';
			}

			if (this.op === 'BETWEEN' || this.op === 'NOT BETWEEN') {
				var left = leftJS();
				s =
					'' +
					'(' +
					(this.op === 'NOT BETWEEN' ? '!' : '') +
					'(' +
					'(' +
					ref(this.right1) +
					'<=' +
					left +
					') && (' +
					left +
					'<=' +
					ref(this.right2) +
					')' +
					')' +
					')';
			}

			if (this.op === 'IN') {
				if (this.right instanceof yy.Select) {
					s = '(';
					//			s += 'this.query.queriesdata['+this.queriesidx+']';
					//			s += 'alasql.utils.flatArray(this.query.queriesfn['+(this.queriesidx)+'](params,null,context))';
					s +=
						'alasql.utils.flatArray(this.queriesfn[' +
						this.queriesidx +
						'](params,null,' +
						context +
						'))';
					s += '.indexOf(';
					s += 'alasql.utils.getValueOf(' + leftJS() + '))>-1)';
				} else if (Array.isArray(this.right)) {
					//			if(this.right.length == 0) return 'false';
					s =
						'([' +
						this.right.map(ref).join(',') +
						'].indexOf(alasql.utils.getValueOf(' +
						leftJS() +
						'))>-1)';
					//console.log(s);
				} else {
					s = '(' + rightJS() + '.indexOf(' + leftJS() + ')>-1)';
					//console.log('expression',350,s);
					//		} else {
					//			throw new Error('Wrong IN operator without SELECT part');
				}
			}

			if (this.op === 'NOT IN') {
				if (this.right instanceof yy.Select) {
					s = '(';
					s += 'alasql.utils.flatArray(this.queriesfn[' + this.queriesidx + '](params,null,p))';
					s += '.indexOf(';
					s += 'alasql.utils.getValueOf(' + leftJS() + '))<0)';
				} else if (Array.isArray(this.right)) {
					s = '([' + this.right.map(ref).join(',') + '].indexOf(';
					s += 'alasql.utils.getValueOf(' + leftJS() + '))<0)';
				} else {
					s = '(' + rightJS() + '.indexOf(';
					s += leftJS() + ')==-1)';

					//			throw new Error('Wrong NOT IN operator without SELECT part');
				}
			}

			if (this.allsome === 'ALL') {
				var s;
				if (this.right instanceof yy.Select) {
					s =
						'alasql.utils.flatArray(this.query.queriesfn[' + this.queriesidx + '](params,null,p))';

					s += '.every(function(b){return (';
					s += leftJS() + ')' + op + 'b})';
				} else if (Array.isArray(this.right)) {
					s =
						'' +
						(this.right.length == 1
							? ref(this.right[0])
							: '[' + this.right.map(ref).join(',') + ']');
					s += '.every(function(b){return (';
					s += leftJS() + ')' + op + 'b})';
				} else {
					throw new Error('NOT IN operator without SELECT');
				}
			}

			if (this.allsome === 'SOME' || this.allsome === 'ANY') {
				var s;
				if (this.right instanceof yy.Select) {
					s =
						'alasql.utils.flatArray(this.query.queriesfn[' + this.queriesidx + '](params,null,p))';
					s += '.some(function(b){return (';
					s += leftJS() + ')' + op + 'b})';
				} else if (Array.isArray(this.right)) {
					s =
						'' +
						(this.right.length == 1
							? ref(this.right[0])
							: '[' + this.right.map(ref).join(',') + ']');
					s += '.some(function(b){return (';
					s += leftJS() + ')' + op + 'b})';
				} else {
					throw new Error('SOME/ANY operator without SELECT');
				}
			}

			// Special case for AND optimization (if reduced)
			if (this.op === 'AND') {
				if (this.left.reduced) {
					if (this.right.reduced) {
						return 'true';
					} else {
						s = rightJS();
					}
				} else if (this.right.reduced) {
					s = leftJS();
				}

				// Otherwise process as regular operation (see below)
				op = '&&';
			}

			// if(this.op === '^') {
			// 	// return 	'Math.pow('
			// 	// 		+ leftJS()
			// 	// 		+ ','
			// 	// 		+ rightJS()
			// 	// 		+ ')';
			// }
			var expr = s || '(' + leftJS() + op + rightJS() + ')';

			var declareRefs = 'y=[(' + refs.join('), (') + ')]';
			if (op === '&&' || op === '||' || op === 'IS' || op === 'IS NULL' || op === 'IS NOT NULL') {
				return '(' + declareRefs + ', ' + expr + ')';
			}

			return (
				'(' + declareRefs + ', ' + 'y.some(function(e){return e == null}) ? void 0 : ' + expr + ')'
			);
		}
	}

	class VarValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return '@' + this.variable;
		}

		toType() {
			return 'unknown';
		}

		toJS() {
			return "alasql.vars['" + this.variable + "']";
		}
	}

	class NumValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return this.value.toString();
		}

		toType() {
			return 'number';
		}

		toJS() {
			return '' + this.value;
		}
	}

	class StringValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return "'" + this.value.toString() + "'";
		}

		toType() {
			return 'string';
		}

		toJS() {
			return "'" + escapeq(this.value) + "'";
		}
	}

	class DomainValueValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return 'VALUE';
		}

		toType() {
			return 'object';
		}

		toJS(context, tableid, defcols) {
			//	console.log("'"+doubleqq(this.value)+"'");
			//	return "'"+doubleqq(this.value)+"'";
			return context;
		}
	}

	class ArrayValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return 'ARRAY[]';
		}

		toType() {
			return 'object';
		}

		toJS(context, tableid, defcols) {
			return (
				'[(' +
				this.value
					.map(function (el) {
						return el.toJS(context, tableid, defcols);
					})
					.join('), (') +
				')]'
			);
		}
	}

	class LogicValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return this.value ? 'TRUE' : 'FALSE';
		}

		toType() {
			return 'boolean';
		}

		toJS() {
			return this.value ? 'true' : 'false';
		}
	}

	class NullValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return 'NULL';
		}

		toJS() {
			return 'undefined';
		}
	}

	class ParamValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return '$' + this.param;
		}

		toJS() {
			if (typeof this.param === 'string') {
				return "params['" + this.param + "']";
			}

			return 'params[' + this.param + ']';
		}
	}

	class UniOp {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			var s;
			const {op, right} = this;
			const res = right.toString();

			if (op === '~') {
				s = op + res;
			}
			if (op === '-') {
				s = op + res;
			}
			if (op === '+') {
				s = op + res;
			}
			if (op === '#') {
				s = op + res;
			}
			if (op === 'NOT') {
				s = op + '(' + res + ')';
			}
			if (op === null) {
				s = '(' + res + ')';
			}
			if (!s) {
				s = '(' + res + ')';
			}
			return s;
		}

		findAggregator(query) {
			if (this.right.findAggregator) {
				this.right.findAggregator(query);
			}
		}

		toType() {
			if (this.op === '-') {
				return 'number';
			}

			if (this.op === '+') {
				return 'number';
			}

			if (this.op === 'NOT') {
				return 'boolean';
			}

			// Todo: implement default case
		}

		toJS(context, tableid, defcols) {
			if (this.op === '~') {
				return '(~(' + this.right.toJS(context, tableid, defcols) + '))';
			}

			if (this.op === '-') {
				return '(-(' + this.right.toJS(context, tableid, defcols) + '))';
			}

			if (this.op === '+') {
				return '(' + this.right.toJS(context, tableid, defcols) + ')';
			}

			if (this.op === 'NOT') {
				return '!(' + this.right.toJS(context, tableid, defcols) + ')';
			}

			if (this.op === '#') {
				if (this.right instanceof Column) {
					return "(alasql.databases[alasql.useid].objects['" + this.right.columnid + "'])";
				} else {
					return (
						'(alasql.databases[alasql.useid].objects[' +
						this.right.toJS(context, tableid, defcols) +
						'])'
					);
				}
			}

			// Please avoid === here
			if (this.op == null) {
				// jshint ignore:line
				return '(' + this.right.toJS(context, tableid, defcols) + ')';
			}

			// Todo: implement default case.
		}
	}

	/*/*
// yy.Star = class {
// 	constructor (params) { return assign(this, params); }
// 	toString () {
// 		var s = this.fieldid;
// 		if (this.tableid) {
// 			s = this.tableid + '.' + s;
// 			if (this.databaseid) {
// 				s = this.databaseid + '.' + s;
// 			}
// 		}
// 		if (this.alias)
// 			s += ' AS ' + this.alias;
// 		return s;
// 	}
// }
*/

	class Column {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			var s;
			if (this.columnid == +this.columnid) {
				s = '[' + this.columnid + ']';
			} else {
				s = this.columnid;
			}
			if (this.tableid) {
				if (+this.columnid === this.columnid) {
					s = this.tableid + s;
				} else {
					s = this.tableid + '.' + s;
				}
				if (this.databaseid) {
					s = this.databaseid + '.' + s;
				}
			}
			return s;
		}

		toJS(context, tableid, defcols) {
			var s = '';
			if (!this.tableid && tableid === '' && !defcols) {
				if (this.columnid !== '_') {
					s = context + "['" + this.columnid + "']";
				} else {
					if (context === 'g') {
						s = "g['_']";
					} else {
						s = context;
					}
				}
			} else {
				if (context === 'g') {
					s = "g['" + this.nick + "']";
				} else if (this.tableid) {
					if (this.columnid !== '_') {
						s = context + "['" + this.tableid + "']['" + this.columnid + "']";
					} else {
						if (context === 'g') {
							s = "g['_']";
						} else {
							s = context + "['" + this.tableid + "']";
						}
					}
				} else if (defcols) {
					var tbid = defcols[this.columnid];
					if (tbid === '-') {
						throw new Error(
							'Cannot resolve column "' + this.columnid + '" because it exists in two source tables'
						);
					} else if (tbid) {
						if (this.columnid !== '_') {
							s = context + "['" + tbid + "']['" + this.columnid + "']";
						} else {
							s = context + "['" + tbid + "']";
						}
						//			console.log(836,tbid,s);
					} else {
						if (this.columnid !== '_') {
							s = context + "['" + (this.tableid || tableid) + "']['" + this.columnid + "']";
						} else {
							s = context + "['" + (this.tableid || tableid) + "']";
						}
					}
				} else if (tableid === -1) {
					s = context + "['" + this.columnid + "']";
				} else {
					if (this.columnid !== '_') {
						s = context + "['" + (this.tableid || tableid) + "']['" + this.columnid + "']";
					} else {
						s = context + "['" + (this.tableid || tableid) + "']";
					}
				}
			}
			return s;
		}
	}

	class AggrValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			var s = '';
			if (this.aggregatorid === 'REDUCE') {
				s += this.funcid.replace(re_invalidFnNameChars, '') + '(';
			} else {
				s += this.aggregatorid + '(';
			}

			if (this.distinct) {
				s += 'DISTINCT ';
			}

			if (this.expression) {
				s += this.expression.toString();
			}

			s += ')';

			if (this.over) {
				s += ' ' + this.over.toString();
			}
			return s;
		}

		findAggregator(query) {
			var colas = escapeq(this.toString()) + ':' + query.selectGroup.length;
			var found = false;
			if (!found) {
				if (!this.nick) {
					this.nick = colas;
					var found = false;
					for (var i = 0; i < query.removeKeys.length; i++) {
						if (query.removeKeys[i] === colas) {
							found = true;
							break;
						}
					}
					if (!found) {
						query.removeKeys.push(colas);
					}
				}
				query.selectGroup.push(this);
			}
			return;
		}

		toType() {
			if (
				['SUM', 'COUNT', 'AVG', 'MIN', 'MAX', 'AGGR', 'VAR', 'STDDEV', 'TOTAL'].indexOf(
					this.aggregatorid
				) > -1
			) {
				return 'number';
			}

			if (['ARRAY'].indexOf(this.aggregatorid) > -1) {
				return 'array';
			}

			if (['FIRST', 'LAST'].indexOf(this.aggregatorid) > -1) {
				return this.expression.toType();
			}

			return this.expression.toType();
		}

		toJS() {
			var colas = this.nick;
			if (colas === undefined) {
				colas = this.toString();
			}
			return "g['" + colas + "']";
		}
	}

	class OrderExpression {
		constructor(params) {
			assign(this, params);
		}
	}

	OrderExpression.prototype.toString = Expression.prototype.toString;

	class GroupExpression {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			return this.type + '(' + this.group.toString() + ')';
		}
	}

	assign(yy, {
		AggrValue,
		ArrayValue,
		Column,
		DomainValueValue,
		Expression,
		ExpressionStatement,
		GroupExpression,
		JavaScript,
		Join,
		Literal,
		LogicValue,
		NullValue,
		NumValue,
		Op,
		OrderExpression,
		ParamValue,
		StringValue,
		Table,
		UniOp,
		VarValue,
		View,
	});
}
