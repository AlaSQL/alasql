yy.Select.prototype.compileHaving = function(query) {
	if(this.having) {
		s = this.having.toJavaScript('p',-1);
		query.havingfns = s;
//		console.log(s);
		return new Function('p,params,alasql','return '+s);
	} else return function(){return true};
};
