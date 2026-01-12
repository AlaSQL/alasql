/* global yy */

yy.Select.prototype.compileHaving = function (query) {
	if (this.having) {
		var s = this.having.toJS('g', -1);
		query.havingfns = s;
		//		console.log(s);
		return new Function('g,params,alasql', 'var y;return ' + s);
	}

	return function () {
		return true;
	};
};
