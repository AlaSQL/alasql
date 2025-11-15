/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Declare = function (params) {
	return Object.assign(this, params);
};
yy.Declare.prototype.toString = function () {
	let s = 'DECLARE ';
	if (this.declares && this.declares.length > 0) {
		s += this.declares
			.map(declare => {
				let declareStr = `@${declare.variable} ${declare.dbtypeid}`;
				if (declare.dbsize) {
					declareStr += `(${declare.dbsize}`;
					if (declare.dbprecision) {
						declareStr += `,${declare.dbprecision}`;
					}
					declareStr += ')';
				}
				if (declare.expression) {
					declareStr += ` = ${declare.expression.toString()}`;
				}
				return declareStr;
			})
			.join(',');
	}
	return s;
};

yy.Declare.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	var that = this; // without this assigned to a variable, inside the forEach, the reference to `this` is lost. It is needed for the Function statement for binding
	if (that.declares && that.declares.length > 0) {
		that.declares.forEach(function (declare) {
			var dbtypeid = declare.dbtypeid;
			if (!alasql.fn[dbtypeid]) {
				dbtypeid = dbtypeid.toUpperCase();
			}
			alasql.declares[declare.variable] = {
				dbtypeid: dbtypeid,
				dbsize: declare.dbsize,
				dbprecision: declare.dbprecision,
			};

			// Set value
			if (declare.expression) {
				// console.log(7547654, declare.expression.toJS('', '', null));
				alasql.vars[declare.variable] = new Function(
					'params,alasql',
					'return ' + declare.expression.toJS('({})', '', null)
				).bind(that)(params, alasql);
				if (alasql.declares[declare.variable]) {
					alasql.vars[declare.variable] = alasql.stdfn.CONVERT(
						alasql.vars[declare.variable],
						alasql.declares[declare.variable]
					);
				}
			}
		});
	}
	if (cb) {
		res = cb(res);
	}
	return res;
};
