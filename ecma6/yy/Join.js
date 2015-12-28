/**
	Join class
	@class
*/
import {extend} from "./utils.js";

export function Join(params) { return extend(this, params); };

Join.prototype.toString = function() {
	var s = ' ';
	if(this.joinmode){
		s += this.joinmode+' ';
	}
	s += 'JOIN ' + this.table.toString();
	return s;
};
