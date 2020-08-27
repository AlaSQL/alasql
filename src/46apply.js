/*
//
// CROSS AND OUTER APPLY for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Apply = function (params) {
	return yy.extend(this, params);
};

yy.Apply.prototype.toString = function () {
	var s = this.applymode + ' APPLY (' + this.select.toString() + ')';

	if (this.as) s += ' AS ' + this.as;

	return s;
};
