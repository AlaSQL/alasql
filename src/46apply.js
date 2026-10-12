/*
//
// CROSS AND OUTER APPLY for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Apply = class Apply {
	constructor(params) {
		Object.assign(this, params);
	}

	toString() {
		let s = `${this.applymode} APPLY (${this.select.toString()})`;

		if (this.as) {
			s += ` AS ${this.as}`;
		}

		return s;
	}
};
