/*
//
// FROM functions Alasql.js
// Date: 11.12.2014
// (c) 2014, Andrey Gershun
//
*/



// Read JSON file

alasql.from.JSON = function(filename, opts, cb, idx, query) {
	var res;
	alasql.utils.loadFile(filename,!!cb,function(data){
		res = JSON.parse(data);	
		if(cb) res = cb(res, idx, query);
	});
	return res;
};

alasql.from.TXT = function(filename, opts, cb, idx, query) {
	var res;
	alasql.utils.loadFile(filename,!!cb,function(data){
		res = data.split(/\r?\n/);
		for(var i=0, ilen=res.length; i<ilen;i++) {
			res[i] = [res[i]];
		}
		if(cb) res = cb(res, idx, query);
	});
	return res;
};

alasql.from.TAB = function(filename, opts, cb, idx, query) {
	var res;
	alasql.utils.loadFile(filename,!!cb,function(data){
		res = data.split(/\r?\n/);
		for(var i=0, ilen=res.length; i<ilen;i++) {
			res[i] = res[i].split('\t');
		}
		if(cb) res = cb(res, idx, query);
	});
	return res;
};

alasql.from.CSV = function(filename, opts, cb, idx, query) {
	var opt = {
		separator: ','
	};
	alasql.utils.extend(opt, opts);
	var res;
	alasql.utils.loadFile(filename,!!cb,function(data){
		res = data.split(/\r?\n/);
		for(var i=0, ilen=res.length; i<ilen;i++) {
			res[i] = res[i].split(opt.separator);
		}
		if(cb) res = cb(res, idx, query);
	});
	return res;
};
