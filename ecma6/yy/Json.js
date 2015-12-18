/*
//
// JSON for Alasql.js
// Date: 19.11.2014
// (c) 2014, Andrey Gershun
//
*/
import {extend} from "../utils/object.js";
import {JSONtoString,JSONtoJS} from "../utils/json.js";

//formerly 58json.js and yy.Json
export function Json(params) { return yy.extend(this, params); }
Json.prototype.toString = function() {
	var s = ''; // '@'
	s += JSONtoString(this.value);
	s += '';
	return s;
};

Json.prototype.toJS = function(context, tableid, defcols) {
	// TODO reod
	return JSONtoJS(this.value,context, tableid, defcols);
}


