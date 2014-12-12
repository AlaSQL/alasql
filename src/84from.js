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
	//console.log('cb',cb);
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
	if(!opts) opts = {};
	opts.separator = '\t';
	return alasql.from.CSV(filename, opts, cb, idx, query);
};

alasql.from.CSV = function(filename, opts, cb, idx, query) {
	var opt = {
		separator: ','
	};
	alasql.utils.extend(opt, opts);
	var res;
	alasql.utils.loadFile(filename,!!cb,function(data){
		res = data.split(/\r?\n/);
		if(opt.headers) {
			if(query && query.sources && query.sources[idx]) {
				var hh = [];
				if(typeof opt.headers == 'boolean') {
					hh = res[0].split(opt.separator);

				} else if(opt.headers instanceof Array) {
					hh = opt.headers;
				}
				var columns = query.sources[idx].columns = [];
				hh.forEach(function(h){
					columns.push({columnid:h});
				});
				for(var i=1, ilen=res.length; i<ilen;i++) {
					var a = res[i].split(opt.separator);
					var b = {};
					hh.forEach(function(h,j){
						b[h] = a[j];
					});
					res[i] = b;
				}
			}	
		} else {
			for(var i=0, ilen=res.length; i<ilen;i++) {
				res[i] = res[i].split(opt.separator);
			}
		}
		if(cb) res = cb(res, idx, query);
	});
	return res;
};
