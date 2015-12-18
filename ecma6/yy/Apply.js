/*
//
// CROSS AND OUTER APPLY for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//formerly 46apply.js
//TODO: yy.Apply

import {extend} from "../utils/object.js";

export function Apply(params) {
	return extend(this, params);
}

Apply.prototype.toString = function () {
	var s = this.applymode+' APPLY ('+this.select.toString()+')';

	if(this.as)
		s += ' AS '+this.as;

	return s;
};