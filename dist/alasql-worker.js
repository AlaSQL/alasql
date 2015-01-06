(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.alasql = factory();
    }
}(this, function () {

/**
 */
function alasql(sql,params,cb){
	alasql.worker.postMessage({sql:sql,params:params});
	alasql.worker.onmessage = function(event) {
//		console.log('ok');
		if(cb) cb(event.data);
	};
	alasql.worker.onerror = function(e){
		throw e;
	}
};

/**
  Start Alasql WebWorker
 */
alasql.work = function(path, paths,cb) {
//	var path = arguments[0]; 
	if(typeof path == "undefined") {
		throw new Error('Path to alasql.js is not specified');
	}
	alasql.worker = new Worker(path);

	if(arguments.length > 1) {
//		var paths = Array.prototype.slice.call(arguments);
//		paths.shift();
//		console.log(paths);
		var sql = 'REQUIRE ' + paths.map(function(p){
			return '"'+p+'"';
		}).join(",");
//		console.log(sql);
		alasql(sql,[],cb);
	}
};

return alasql;
}));
