/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Source = function (params) {
	return Object.assign(this, params);
};
yy.Source.prototype.toString = function () {
	var s = 'SOURCE';
	if (this.url) s += " '" + this.url + " '";
	return s;
};

// SOURCE FILE
yy.Source.prototype.execute = function (databaseid, params, cb) {
	var res;
	loadFile(
		this.url,
		!!cb,
		function (data) {
			res = alasql(data);
			if (cb) res = cb(res);
			return res;
		},
		function (err) {
			throw err;
		}
	);
	return res;
};
