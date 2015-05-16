// Plugin sample

var yy = alasql.yy;

yy.Echo = function (params) { return yy.extend(this, params); }
yy.Echo.prototype.toString = function() {
	var s =  K('TEST')+' '+this.expr.toString();
	return s;
}

yy.Echo.prototype.execute = function (databaseid, params, cb) {
//	var self = this;
//	console.log(this.expr.toJavaScript());
	var fn = new Function('params, alasql','return '+this.expr.toJavaScript());
	var res = fn(params, alasql);
	if(cb) res = cb(res);
	return res;
}