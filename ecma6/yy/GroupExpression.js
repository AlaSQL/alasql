export function GroupExpression(params){ return yy.extend(this, params); }
GroupExpression.prototype.toString = function() {
	return this.type+'('+this.group.toString()+')';
}