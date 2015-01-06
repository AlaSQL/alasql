/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Require = function (params) { return yy.extend(this, params); }
yy.Require.prototype.toString = function() {
	var s = K('REQUIRE');
	if(this.paths && this.paths.length > 0) {
		s += this.paths.map(function(path){
			return path.toString()
		}).join(',');
	}
	return s;
}

// SOURCE FILE
yy.Require.prototype.execute = function (databaseid,params,cb) {
//	console.log(this.url);
	var res = 0;
	var ss = '';
	if(this.paths.length > 0) {
		if(typeof importScripts == 'function') {

		} else if(typeof exports == 'objects') {
			this.paths.forEach(function(path){
				require(path);
			});
		} else {

		}
		// this.paths.forEach(function(path){
		// 	loadFile(path, !!cb, function(data){
		// 		ss += ';'+data;
		// 		res++;
		// 		if(res < this.paths.length) return;
		// 		console.log('REQUIRE:',ss);
		// 		if(cb) res = cb(res);
		// 	}, function(err){
		// 		throw err;
		// 	});
		// });
	}
	return res;
};
