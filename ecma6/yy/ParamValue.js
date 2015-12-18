import {extend} from "../utils/object.js";

/*
//
// Expressions for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

//formerly from 50expression.js

export function ParamValue(params) { return extend(this, params); }
ParamValue.prototype.toString = function() {
	return '$'+this.param;
}
ParamValue.prototype.toJS = function() {
	if(typeof this.param === "string"){
		return "params['"+this.param+"']";
	}

	return "params["+this.param+"]";
}