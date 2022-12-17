/*
//
// Parser helper for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Base class for all yy classes
class Base {
	constructor(params) {
		Object.assign(this, params);
	}
	toString() {}
	toType() {}
	toJS() {}
	exec() {}
	compile() {}
}

var yy = {
	// Utility
	/** @deprecated use `Object.assign` instead */
	extend: Object.assign,

	// Option for case sensitive
	casesensitive: alasql.options.casesensitive,
	Base,
};

alasqlparser.yy = alasql.yy = yy;
