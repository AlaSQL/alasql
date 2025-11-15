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

	const toTypeNumberOps = new Set(['-', '*', '/', '%', '^']);
	const toTypeStringOps = new Set(['||']);
	const toTypeBoolOps = new Set([
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
		'BETWEEN',
		'NOT BETWEEN',
		'IS NULL',
		'IS NOT NULL',
	]);
	class Op {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			const leftStr = this.left.toString();
			let s;

			if (this.op === 'IN' || this.op === 'NOT IN') {
				return `${leftStr} ${this.op} (${this.right.toString()})`;
			}

			if (this.allsome) {
				return `${leftStr} ${this.op} ${this.allsome} (${this.right.toString()})`;
			}

			if (this.op === '->' || this.op === '!') {
				s = `${leftStr}${this.op}`;
				if (typeof this.right !== 'string' && typeof this.right !== 'number')
					return s + `(${this.right.toString()})`;
				return s + this.right.toString();
			}

			if (this.op === 'BETWEEN' || this.op === 'NOT BETWEEN') {
				return `${leftStr} ${this.op} ${this.right1.toString()} AND ${this.right2.toString()}`;
			}

			return `${leftStr} ${this.op} ${this.allsome ? this.allsome + ' ' : ''}${this.right.toString()}`;
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
			if (toTypeNumberOps.has(this.op)) return 'number';

			if (toTypeStringOps.has(this.op)) return 'string';

			if (this.op === '+') {
				const leftType = this.left.toType(tableid);
				const rightType = this.right.toType(tableid);

				if (leftType === 'string' || rightType === 'string') {
					return 'string';
				}
				if (leftType === 'number' || rightType === 'number') {
					return 'number';
				}
			}

			if (toTypeBoolOps.has(this.op) || this.allsome) return 'boolean';

			if (!this.op) return this.left.toType(tableid);

			return 'unknown';
		}

		toJS(context, tableid, defcols) {
			var s;
			let refs = [];
			let op = this.op;
			let _this = this;
			let ref = function (expr) {
				if (expr.toJS) {
					expr = expr.toJS(context, tableid, defcols);
				}
				let i = refs.push(expr) - 1;
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
			} else if (this.op === '->') {
				// Expression to prevent error if object is empty (#344)
				const ljs = `(${leftJS()} || {})`;

				if (typeof this.right === 'string') {
					s = `${ljs}["${escapeq(this.right)}"]`;
				} else if (typeof this.right === 'number') {
					s = `${ljs}[${this.right}]`;
				} else if (this.right instanceof yy.FuncValue) {
					let ss = [];
					if (this.right.args && this.right.args.length > 0) {
						ss = this.right.args.map(ref);
					}
					s = `${ljs}[${JSON.stringify(this.right.funcid)}](${ss.join(',')})`;
				} else {
					s = `${ljs}[${rightJS()}]`;
				}
			} else if (this.op === '!') {
				if (typeof this.right === 'string') {
					s = `alasql.databases[alasql.useid].objects[${leftJS()}]["${this.right}"]`;
				}
				// TODO - add other cases
			} else if (this.op === 'IS') {
				const leftOperand = leftJS();
				const rightOperand = rightJS();
				if (
					this.right instanceof yy.NullValue ||
					(this.right.op === 'NOT' && this.right.right instanceof yy.NullValue)
				) {
					s = `((${leftOperand} == null) === (${rightOperand} == null))`; // == null can't be ===
				} else {
					s = `((${leftOperand} == ${rightOperand}) || (${leftOperand} < 0 && true == ${rightOperand}))`;
				}
			} else if (this.op === '==') {
				s = `alasql.utils.deepEqual(${leftJS()}, ${rightJS()})`;
			} else if (this.op === '===' || this.op === '!===') {
				s = `(${this.op === '!===' ? '!' : ''}((${leftJS()}).valueOf() === (${rightJS()}).valueOf()))`;
			} else if (this.op === '!==') {
				s = `(!alasql.utils.deepEqual(${leftJS()}, ${rightJS()}))`;
			} else if (this.op === '||') {
				s = `(''+(${leftJS()} || '') + (${rightJS()} || ''))`;
			} else if (this.op === 'LIKE' || this.op === 'NOT LIKE') {
				s = `(${this.op === 'NOT LIKE' ? '!' : ''}alasql.utils.like(${rightJS()}, ${leftJS()}${this.escape ? `, ${ref(this.escape)}` : ''}))`;
			} else if (this.op === 'REGEXP') {
				s = `alasql.stdfn.REGEXP_LIKE(${leftJS()}, ${rightJS()})`;
			} else if (this.op === 'GLOB') {
				s = `alasql.utils.glob(${leftJS()}, ${rightJS()})`;
			} else if (this.op === 'BETWEEN' || this.op === 'NOT BETWEEN') {
				const left = leftJS();
				s = `(${this.op === 'NOT BETWEEN' ? '!' : ''}((${ref(this.right1)} <= ${left}) && (${left} <= ${ref(this.right2)})))`;
			} else if (this.op === 'IN') {
				if (this.right instanceof yy.Select) {
					s = `alasql.utils.flatArray(this.queriesfn[${this.queriesidx}](params, null, ${context})).indexOf(alasql.utils.getValueOf(${leftJS()})) > -1`;
				} else if (Array.isArray(this.right)) {
					if (!alasql.options.cache || this.right.some(value => value instanceof yy.ParamValue)) {
						// Leverage JS Set for faster lookups than arrays
						s = `(new Set([${this.right.map(ref).join(',')}]).has(alasql.utils.getValueOf(${leftJS()})))`;
					} else {
						// Use a cache to avoid re-creating the Set on every identical query
						alasql.sets = alasql.sets || {};
						const allValues = this.right.map(value => value.value);
						const allValuesStr = allValues.join(',');
						alasql.sets[allValuesStr] = alasql.sets[allValuesStr] || new Set(allValues);
						s = `alasql.sets["${allValuesStr}"].has(alasql.utils.getValueOf(${leftJS()}))`;
					}
				} else {
					s = `(${rightJS()}.indexOf(${leftJS()}) > -1)`;
				}
			} else if (this.op === 'NOT IN') {
				if (this.right instanceof yy.Select) {
					s = `alasql.utils.flatArray(this.queriesfn[${this.queriesidx}](params, null, p)).indexOf(alasql.utils.getValueOf(${leftJS()})) < 0`;
				} else if (Array.isArray(this.right)) {
					if (!alasql.options.cache || this.right.some(value => value instanceof yy.ParamValue)) {
						// Leverage JS Set for faster lookups than arrays
						s = `(!(new Set([${this.right.map(ref).join(',')}]).has(alasql.utils.getValueOf(${leftJS()}))))`;
					} else {
						// Use a cache to avoid re-creating the Set on every identical query
						alasql.sets = alasql.sets || {};
						const allValues = this.right.map(value => value.value);
						const allValuesStr = allValues.join(',');
						alasql.sets[allValuesStr] = alasql.sets[allValuesStr] || new Set(allValues);
						s = `!alasql.sets["${allValuesStr}"].has(alasql.utils.getValueOf(${leftJS()}))`;
					}
				} else {
					s = `(${rightJS()}.indexOf(${leftJS()}) === -1)`;
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

			var expr = s || '(' + leftJS() + op + rightJS() + ')';

			var declareRefs = 'y=[(' + refs.join('), (') + ')]';
			if (op === '&&' || op === '||' || op === 'IS' || op === 'IS NULL' || op === 'IS NOT NULL') {
				return '(' + declareRefs + ', ' + expr + ')';
			}

			return `(${declareRefs}, y.some(e => e == null) ? void 0 : ${expr})`;
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
			return "alasql.vars['" + escapeq(this.variable) + "']";
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

	const toJsOpMapping = {
		'~': '~',
		'-': '-',
		'+': '+',
		NOT: '!',
	};

	class UniOp {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			const {op, right} = this;
			const res = right.toString();

			switch (op) {
				case '~':
				case '-':
				case '+':
				case '#':
					return op + res;
				case 'NOT':
					return op + '(' + res + ')';
				default:
					return '(' + res + ')';
			}
		}

		findAggregator(query) {
			if (this.right.findAggregator) {
				this.right.findAggregator(query);
			}
		}

		toType() {
			switch (this.op) {
				case '-':
				case '+':
					return 'number';
				case 'NOT':
					return 'boolean';
				default:
					return 'string';
			}
		}

		toJS(context, tableid, defcols) {
			if (this.right instanceof Column && this.op === '#') {
				return `(alasql.databases[alasql.useid].objects['${this.right.columnid}'])`;
			}

			const rightJS = this.right.toJS(context, tableid, defcols);

			if (toJsOpMapping.hasOwnProperty(this.op)) {
				return `(${toJsOpMapping[this.op]}(${rightJS}))`;
			}

			if (this.op == null) {
				return `(${rightJS})`;
			}

			throw new Error(`Unsupported operator: ${this.op}`);
		}
	}

	class Column {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			let s = this.columnid;

			if (this.columnid == +this.columnid) {
				s = '[' + this.columnid + ']';
			}

			if (this.tableid) {
				s = this.tableid + (this.columnid === +this.columnid ? '' : '.') + s;

				if (this.databaseid) {
					s = this.databaseid + '.' + s;
				}
			}

			return s;
		}

		toJS(context, tableid, defcols) {
			if (!this.tableid && tableid === '' && !defcols) {
				return this.columnid !== '_'
					? `${context}['${this.columnid}']`
					: context === 'g'
						? "g['_']"
						: context;
			}

			if (context === 'g') {
				return `g['${this.nick}']`;
			}

			if (this.tableid) {
				return this.columnid !== '_'
					? `${context}['${this.tableid}']['${this.columnid}']`
					: context === 'g'
						? "g['_']"
						: `${context}['${this.tableid}']`;
			}

			if (defcols) {
				const tbid = defcols[this.columnid];
				if (tbid === '-') {
					throw new Error(
						`Cannot resolve column "${this.columnid}" because it exists in two source tables`
					);
				} else if (tbid) {
					return this.columnid !== '_'
						? `${context}['${tbid}']['${this.columnid}']`
						: `${context}['${tbid}']`;
				} else {
					return this.columnid !== '_'
						? `${context}['${this.tableid || tableid}']['${this.columnid}']`
						: `${context}['${this.tableid || tableid}']`;
				}
			}

			if (tableid === -1) {
				return `${context}['${this.columnid}']`;
			}

			return this.columnid !== '_'
				? `${context}['${this.tableid || tableid}']['${this.columnid}']`
				: `${context}['${this.tableid || tableid}']`;
		}
	}

	class AggrValue {
		constructor(params) {
			assign(this, params);
		}

		toString() {
			const funcName =
				this.aggregatorid === 'REDUCE'
					? this.funcid.replace(re_invalidFnNameChars, '')
					: this.aggregatorid;
			const distinctPart = this.distinct ? 'DISTINCT ' : '';
			const expressionPart = this.expression ? this.expression.toString() : '';
			const overPart = this.over ? ` ${this.over.toString()}` : '';

			return `${funcName}(${distinctPart}${expressionPart})${overPart}`;
		}

		findAggregator(query) {
			const colas = escapeq(this.toString()) + ':' + query.selectGroup.length;

			if (!this.nick) {
				this.nick = colas;

				if (!query.removeKeys.includes(colas)) {
					query.removeKeys.push(colas);
				}
			}

			query.selectGroup.push(this);
		}

		toType() {
			if (
				['SUM', 'COUNT', 'AVG', 'MIN', 'MAX', 'AGGR', 'VAR', 'STDDEV', 'TOTAL'].includes(
					this.aggregatorid
				)
			) {
				return 'number';
			}

			if (this.aggregatorid === 'ARRAY') {
				return 'array';
			}

			return this.expression.toType();
		}

		toJS() {
			var colas = this.nick;
			if (colas === undefined) {
				colas = escapeq(this.toString());
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
