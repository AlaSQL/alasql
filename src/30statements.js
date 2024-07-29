/*
//
// Statements class for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Statements = class Statements {
	constructor(params) {
		Object.assign(this, params);
	}

	toString() {
		return this.statements.map(st => st.toString()).join('; ');
	}

	// Compile array of statements into single statement
	compile(db) {
		const statements = this.statements.map(st => st.compile(db));
		return statements.length === 1
			? statements[0]
			: (params, cb) => {
					const res = statements.map(st => st(params));
					if (cb) cb(res);
					return res;
				};
	}
};
