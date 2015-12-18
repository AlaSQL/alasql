export function VarValue(params) { return yy.extend(this, params); }
VarValue.prototype.toString = function() {
	return '@'+this.variable;
};

VarValue.prototype.toType = function() {
	return 'unknown';
};

VarValue.prototype.toJS = function() {
	return "alasql.vars['"+this.variable+"']";
}