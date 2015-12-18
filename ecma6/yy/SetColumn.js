//formely from 74update.js
import {extend} from "../utils/object.js";

export function SetColumn(params) { return extend(this, params); }
SetColumn.prototype.toString = function() {
	return this.column.toString() + '='+this.expression.toString();
}