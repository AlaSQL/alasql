/*
//
// HELP for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

yy.Load = function (params) { return yy.extend(this, params); }
yy.Load.prototype.toString = function() {
	var s = 'LOAD';
	if(this.url) s += ' '+this.url;
	return s;
}

// DROP TABLE
yy.Load.prototype.execute = function (databaseid) {
	console.log(this.url);
	loadFile(this.url, function(data){
//		console.log(data);
		alasql(data);
	}, function(xhr){
		throw xhr;
	});
	return 1;
};
