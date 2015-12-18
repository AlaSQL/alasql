export function ExistsValue(params) { return yy.extend(this, params); }
ExistsValue.prototype.toString = function() {
	return 'EXISTS('+this.value.toString()+')';
};

ExistsValue.prototype.toType = function() {
	return 'boolean';
};

ExistsValue.prototype.toJS = function(context,tableid,defcols) {
//	return 'ww=this.existsfn['+this.existsidx+'](params,null,p),console.log(ww),ww.length';

	return 'this.existsfn['+this.existsidx+'](params,null,'+context+').data.length';
};