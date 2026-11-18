/*
//
// UNION for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// SELECT UNION statement

yy.Union = class Union {
	constructor(params) {
		Object.assign(this, params);
	}

	toString() {
		return 'UNION';
	}

	compile(tableid) {
		return null;
	}
};
