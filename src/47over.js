/*
//
// CROSS AND OUTER APPLY for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Over = class Over {
	constructor(params) {
		Object.assign(this, params);
	}

	toString() {
		let s = 'OVER (';
		if (this.partition) {
			s += `PARTITION BY ${this.partition.toString()}`;
			if (this.order) s += ' ';
		}
		if (this.order) {
			s += `ORDER BY ${this.order.toString()}`;
		}
		s += ')';
		return s;
	}
};

yy.PositionalWindowFunc = class PositionalWindowFunc {
	constructor(params) {
		Object.assign(this, params);
	}

	toString() {
		let s = this.funcid + '(';
		if (this.args && this.args.length) {
			s += this.args.map(a => a.toString()).join(',');
		}
		s += ')';
		if (this.over) s += ' ' + this.over.toString();
		return s;
	}

	findAggregator(query) {
		const defaultArg = this.args && this.args[2];
		let defaultValue = null;
		if (defaultArg) {
			if (defaultArg.value != null) {
				defaultValue = defaultArg.value;
			} else if (defaultArg.op === '-' && defaultArg.right) {
				defaultValue = -defaultArg.right.value;
			}
		}

		query.windowfns.push({
			funcid: this.funcid,
			as: this.as,
			expressionColumnId: this.args && this.args[0] ? this.args[0].columnid : null,
			offset: this.args && this.args[1] ? this.args[1].value : 1,
			defaultValue: defaultValue,
			partitionColumns:
				this.over && this.over.partition
					? this.over.partition.map(p => p.columnid || p.toString())
					: [],
			orderColumns:
				this.over && this.over.order
					? this.over.order.map(o => ({
							columnid:
								o.expression && o.expression.columnid
									? o.expression.columnid
									: o.columnid || o.toString(),
							direction: o.direction || 'ASC',
						}))
					: [],
		});
	}

	toJS() {
		return 'undefined';
	}
};
