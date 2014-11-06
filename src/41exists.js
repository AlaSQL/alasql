yy.ExistsValue = function(params) { return yy.extend(this, params); }
yy.ExistsValue.prototype.toString = function() {
	return 'EXISTS('+this.value.toString()+')';
};

yy.ExistsValue.prototype.toJavaScript = function() {
	return 'this.existsfn['+this.existsnum+'](params,null,p).length';
};

yy.Select.prototype.compileWhereExists = function(query) {
	if(!this.exists) return;
	query.existsfn = this.exists.map(function(ex) {
		return ex.compile(query.database);
	});
//	console.log(query.existsfn);
};