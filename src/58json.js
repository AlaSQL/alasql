/*
//
// JSON for Alasql.js
// Date: 19.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Json = function (params) { return yy.extend(this, params); }
yy.Json.prototype.toString = function() {
	var s = 'JSON('+JSON.stringify(this.value)+')';
	return s;
};

yy.Json.prototype.toJavaScript = function(context, tableid, defcols) {
	return JSON.stringify(this.value);
}
