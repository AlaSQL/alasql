import {Expression} from "./Expression.js";
import {extend} from "./utils.js";
export function OrderExpression(params){ return extend(this, params); }
OrderExpression.prototype.toString = Expression.prototype.toString;