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
	Main procedure for worker
 */
function alasql(sql,params,cb){
	var id = alasql.lastid++;
	alasql.buffer[id] = cb;
	alasql.webworker.postMessage({id:id,sql:sql,params:params});
};


if (typeof importScripts === 'function') {
	// Nothing
} else if(typeof exports != 'object') {

alasql.worker = function(path, paths, cb) {
//	var path;
	if(typeof path == "undefined" || path === true) {
		var sc = document.getElementsByTagName('script');
		for(var i=0;i<sc.length;i++) {
			if (sc[i].src.substr(-16).toLowerCase() == 'alasql-worker.js') {
				path = sc[i].src.substr(0,sc[i].src.length-16)+'alasql.min.js';
				break;
			}
		}
	}
	if(typeof path == "undefined") {
		throw new Error('Path to alasql.js is not specified');
	} else if(path !== false) {
		alasql.lastid = 0;
		alasql.buffer = {};

		var js = "importScripts('";
			js += path;
			js+="');\
		self.onmessage = function(event) {\
		alasql(event.data.sql,event.data.params, function(data){\
		postMessage({id:event.data.id, data:data});\
		});\
		}";

		var blob = new Blob([js], {"type": "text\/plain"});
		alasql.webworker = new Worker(URL.createObjectURL(blob));

		alasql.webworker.onmessage = function(event) {
			var id = event.data.id;
			alasql.buffer[id](event.data.data);
			delete alasql.buffer[id];
		};

		alasql.webworker.onerror = function(e){
			throw e;
		}

		if(arguments.length > 1) {
			var sql = 'REQUIRE ' + paths.map(function(p){
				return '"'+p+'"';
			}).join(",");
			alasql(sql,[],cb);
		}

	} else if(path === false) {
		delete alasql.webworker;
		return;
	} 
}

}



alasql.worker();

return alasql;
}));


//# sourceMappingURL=alasql-worker.js.map