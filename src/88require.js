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

/**
 Attach plug-in for Alasql
 */
yy.Require.prototype.execute = function (databaseid,params,cb) {
	var self = this;
	var res = 0;
	var ss = '';
//	console.log(this.paths);
	if(this.paths.length > 0) {
		this.paths.forEach(function(path){
			loadFile(path.value, !!cb, function(data){
				res++;
//				console.log(res,self.paths.length);
//				console.log(data);
				ss += data;
				if(res<self.paths.length) return;

//				console.log(ss);
				new Function("params,alasql",ss)(params,alasql);
				if(cb) res = cb(res);
			});
		});
	}
	if(this.paths.length == 0 && cb) res = cb(res);	
	return res;
};
