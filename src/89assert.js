/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Assert = function (params) {
	return Object.assign(this, params);
};
yy.Source.prototype.toString = function () {
	var s = 'ASSERT';
	if (this.value) s += ' ' + JSON.stringify(this.value);
	return s;
};

// SOURCE FILE
yy.Assert.prototype.execute = function (databaseid) {
	if (!deepEqual(alasql.res, this.value)) {
		throw new Error(
			(this.message || 'Assert wrong') +
				': ' +
				JSON.stringify(alasql.res) +
				' == ' +
				JSON.stringify(this.value)
		);
	}
	return 1;
};
