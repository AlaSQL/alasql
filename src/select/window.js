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

	yy.Over = class Over extends Node {
		// An aggregate in PARTITION BY or ORDER BY of a window belongs to the window
		collectAggregate() {
			return false;
		}

		toString() {
			let s = 'OVER (';
			if (this.partition) {
				s += `PARTITION BY ${this.partition.toString()}`;
				if (this.order) s += ' ';
			}
			if (this.order) {
				s += `ORDER BY ${this.order.toString()}`;
			}
			s += ')';
			return s;
		}
	};
	yy.Over.children = ['partition', 'order'];
}
