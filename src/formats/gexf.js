alasql.from.GEXF = function (filename, opts, cb, idx, query) {
	var res;
	alasql('SEARCH FROM XML(' + filename + ')', [], function (data) {
		res = data;
		// console.log(res);
		if (cb) res = cb(res);
	});
	return res;
};
