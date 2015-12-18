/**
	Literal class
	@class
	@example
	MyVar, [My vairable], `MySQL variable`
*/
import {extend} from "../utils/object.js";
export function Literal(params) { return yy.extend(this, params); };
Literal.prototype.toString = function() {
	var s = this.value;
	if(this.value1){
		s = this.value1+'.'+s;
	}
//	else s = tableid+'.'+s;
	return s;
};