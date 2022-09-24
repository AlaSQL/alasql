/*
//
// CROSS AND OUTER APPLY for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Over = function (params) {
	return yy.extend(this, params);
};
yy.Over.prototype.toString = function () {
	var s = 'OVER (';
	if (this.partition) {
		s += 'PARTITION BY ' + this.partition.toString();
		if (this.order) s += ' ';
	}
	if (this.order) {
		s += 'ORDER BY ' + this.order.toString();
	}
	s += ')';
	return s;
};
