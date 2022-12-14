/*
//
// Parser helper for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

var yy = (alasqlparser.yy = alasql.yy = {});

// Utility
/** @deprecated use `Object.assign` instead */
yy.extend = Object.assign;

// Option for case sensitive
yy.casesensitive = alasql.options.casesensitive;

// Base class for all yy classes
var Base = (yy.Base = function (params) {
	return Object.assign(this, params);
});

Base.prototype.toString = function () {};
Base.prototype.toType = function () {};
Base.prototype.toJS = function () {};

Base.prototype.compile = returnUndefined;
Base.prototype.exec = function () {};

Base.prototype.compile = returnUndefined;
Base.prototype.exec = function () {};
