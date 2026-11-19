import {Node} from '../expression/node.js';

export default function install(alasql) {
	var yy = alasql.yy;
	/*
//
// CROSS AND OUTER APPLY for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

	yy.Apply = class Apply extends Node {
		toString() {
			let s = `${this.applymode} APPLY (${this.select.toString()})`;

			if (this.as) {
				s += ` AS ${this.as}`;
			}

			return s;
		}
	};
	yy.Apply.children = ['select'];
	yy.Apply.fields = ['applymode', 'as'];
}
