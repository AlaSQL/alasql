/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.SetVariable = function (params) {
	return yy.extend(this, params);
};
yy.SetVariable.prototype.toString = function () {
	var s = 'SET ';
	if (typeof this.value != 'undefined')
		s += this.variable.toUpperCase() + ' ' + (this.value ? 'ON' : 'OFF');
	if (this.expression) s += this.method + this.variable + ' = ' + this.expression.toString();
	return s;
};

yy.SetVariable.prototype.execute = function (databaseid, params, cb) {
	//	console.log(this);
	if (typeof this.value != 'undefined') {
		var val = this.value;
		if (val == 'ON') val = true;
		else if (val == 'OFF') val = false;
		//		if(this.method == '@') {
		alasql.options[this.variable] = val;
		//		} else {
		//			params[this.variable] = val;
		//		}
	} else if (this.expression) {
		if (this.exists) {
			this.existsfn = this.exists.map(function (ex) {
				var nq = ex.compile(databaseid);
				if (nq.query && !nq.query.modifier) nq.query.modifier = 'RECORDSET';
				return nq;
				//				return ex.compile(databaseid);
				// TODO Include modifier
			});
		}
		if (this.queries) {
			this.queriesfn = this.queries.map(function (q) {
				var nq = q.compile(databaseid);
				if (nq.query && !nq.query.modifier) nq.query.modifier = 'RECORDSET';
				return nq;
				// TODO Include modifier
			});
		}

		// console.log(547654756, this.expression.toJS('', '', null));
		var res = new Function(
			'params,alasql',
			'return ' + this.expression.toJS('({})', '', null)
		).bind(this)(params, alasql);
		if (alasql.declares[this.variable]) {
			res = alasql.stdfn.CONVERT(res, alasql.declares[this.variable]);
		}
		if (this.props && this.props.length > 0) {
			if (this.method == '@') {
				var fs = "alasql.vars['" + this.variable + "']";
			} else {
				var fs = "params['" + this.variable + "']";
			}
			fs += this.props
				.map(function (prop) {
					if (typeof prop == 'string') {
						return "['" + prop + "']";
					} else if (typeof prop == 'number') {
						return '[' + prop + ']';
					} else {
						// console.log('prop:',prop, prop.toJS());
						return '[' + prop.toJS() + ']';
						//				} else {
						//					console.log(prop, typeof );
						//					throw new Error('Wrong SET property');
					}
				})
				.join();
			// console.log(65764765, fs);
			new Function('value,params,alasql', 'var y;' + fs + '=value')(res, params, alasql);
		} else {
			if (this.method == '@') {
				alasql.vars[this.variable] = res;
			} else {
				params[this.variable] = res;
			}
		}
	}
	var res = 1;
	if (cb) res = cb(res);
	return res;
};
