//formerly from 50expression
import {extend} from "../utils/object.js";
export function NumValue(params) { return extend(this, params); }
NumValue.prototype.toString = function() {
	return this.value.toString();
};

NumValue.prototype.toType = function() {
	return 'number';
};

NumValue.prototype.toJS = function() {
	return ""+this.value;
}