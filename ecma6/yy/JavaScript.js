/**
	JavaScript class
	@class
*/
import {extend} from "../utils/object.js";

export function JavaScript(params) { return extend(this, params); };
JavaScript.prototype.toString = function() {
	var s = '``'+this.value+'``';
	return s;
};

JavaScript.prototype.toJS = function( /* context, tableid, defcols*/ ) {
//	console.log('Expression',this);
	return '('+this.value+')';
};
JavaScript.prototype.execute = function (databaseid, params, cb) {
	var res = 1;
	var expr =  new Function("params,alasql,p",this.value);
	expr(params,alasql);
	if(cb){
		res = cb(res);
	}
	return res;
};