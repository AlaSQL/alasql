import {extend} from "../utils/object.js";
// Alasql Linq library

export function FromData(params) { return extend(this, params); };
FromData.prototype.toString = function() {
	if(this.data) return 'DATA('+((Math.random()*10e15)|0)+')';
	else return '?';
};
FromData.prototype.toJS = function(){
//	console.log('yy.FromData.prototype.toJS');
};