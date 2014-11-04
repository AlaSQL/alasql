// SELECT UNION statement

yy.Union = function (params) { return yy.extend(this, params); }
yy.Union.prototype.toString = function () {
	return "UNION";
};

yy.Union.prototype.compile = function (tableid) {
	return null;
};