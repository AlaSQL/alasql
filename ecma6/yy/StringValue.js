import {extend,escapeq} from "./utils.js";


export function StringValue(params) { return extend(this, params); }
StringValue.prototype.toString = function() {
	return "'"+this.value.toString()+"'";
}

StringValue.prototype.toType = function() {
	return 'string';
}

StringValue.prototype.toJS = function() {
//	console.log("'"+doubleqq(this.value)+"'");
//	return "'"+doubleqq(this.value)+"'";
	return "'"+escapeq(this.value)+"'";

}