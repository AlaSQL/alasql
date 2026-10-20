/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.SetVariable = function (params) {
	return Object.assign(this, params);
};
yy.SetVariable.prototype.toString = function () {
	var s = 'SET ';
	if (typeof this.value != 'undefined')
		s += this.variable.toUpperCase() + ' ' + (this.value ? 'ON' : 'OFF');
	if (this.expression) s += this.method + this.variable + ' = ' + this.expression.toString();
	return s;
};

yy.SetVariable.prototype.execute = function (databaseid, params, cb) {
	if (typeof this.value !== 'undefined') {
		let val = this.value;
		if (val === 'ON') val = true;
		else if (val === 'OFF') val = false;
		alasql.options[this.variable] = val;
	} else if (this.expression) {
		if (this.exists) {
			this.existsfn = this.exists.map(ex => {
				let nq = ex.compile(databaseid);
				if (nq.query && !nq.query.modifier) nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}
		if (this.queries) {
			this.queriesfn = this.queries.map(q => {
				let nq = q.compile(databaseid);
				if (nq.query && !nq.query.modifier) nq.query.modifier = 'RECORDSET';
				return nq;
			});
		}

		let res = new Function(
			'params, alasql',
			'return ' + this.expression.toJS('({})', '', null)
		).bind(this)(params, alasql);

		if (alasql.declares[this.variable]) {
			res = alasql.stdfn.CONVERT(res, alasql.declares[this.variable]);
		}

		if (this.props && this.props.length > 0) {
			let fs;
			if (this.method === '@') {
				fs = `alasql.vars['${this.variable}']`;
			} else {
				fs = `params['${this.variable}']`;
			}
			this.props.forEach(prop => {
				if (typeof prop === 'string') {
					fs += `['${prop}']`;
				} else if (typeof prop === 'number') {
					fs += `[${prop}]`;
				} else {
					// Assuming prop.toJS() is a method that converts prop to a JavaScript expression.
					fs += `[${prop.toJS()}]`;
				}
			});

			new Function('value, params, alasql', `${fs} = value`)(res, params, alasql);
		} else {
			if (this.method === '@') {
				alasql.vars[this.variable] = res;
			} else {
				params[this.variable] = res;
			}
		}
	}

	let result = 1;
	if (cb) result = cb(result);
	return result;
};
