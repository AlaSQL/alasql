/*
//
// SET for Alasql.js
// Date: 01.12.2014
// (c) 2014, Andrey Gershun
//
*/

/* global alasql, yy */

yy.Merge = function (params) {
	return yy.extend(this, params);
};
yy.Merge.prototype.toString = function () {
	var s = 'MERGE ';
	s += this.into.tableid + ' ';
	if (this.into.as) s += 'AS ' + this.into.as + ' ';
	s += 'USING ' + this.using.tableid + ' ';
	if (this.using.as) s += 'AS ' + this.using.as + ' ';
	s += 'ON ' + this.on.toString() + ' ';
	this.matches.forEach(function (m) {
		s += 'WHEN ';
		if (!m.matched) s += 'NOT ';
		s += 'MATCHED ';
		if (m.bytarget) s += 'BY TARGET ';
		if (m.bysource) s += 'BY SOURCE ';
		if (m.expr) s += 'AND' + ' ' + m.expr.toString() + ' ';
		s += 'THEN ';
		if (m.action.delete) s += 'DELETE ';
		if (m.action.insert) {
			s += 'INSERT ';
			if (m.action.columns) s += '(' + m.action.columns.toString() + ') ';
			if (m.action.values) s += 'VALUES (' + m.action.values.toString() + ') ';
			if (m.action.defaultvalues) s += 'DEFAULT VALUES ';
		}
		if (m.action.update) {
			s += 'UPDATE ';
			s +=
				m.action.update
					.map(function (u) {
						return u.toString();
					})
					.join(',') + ' ';
		}
	});

	//	console.log(this);
	return s;
};

yy.Merge.prototype.execute = function (databaseid, params, cb) {
	var res = 1;

	if (cb) res = cb(res);
	return res;
};
