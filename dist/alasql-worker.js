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
	Main procedure
 */
function alasql(sql,params,cb){
	var id = alasql.lastid++;
	alasql.buffer[id] = cb;
	alasql.webworker.postMessage({id:id,sql:sql,params:params});
};

alasql.lastid = 0;
alasql.buffer = {};
/**
 Run webworker
 */
var path;
var sc = document.getElementsByTagName('script');
for(var i=0;i<sc.length;i++) {
	if (sc[i].src.substr(-16).toLowerCase() == 'alasql-worker.js') {
		path = sc[i].src.substr(0,sc[i].src.length-16)+'alasql.min.js';
		break;
	}
}

if(typeof path == "undefined") {
	throw new Error('Path to alasql.js is not specified');
};

alasql.webworker = new Worker(path);

alasql.webworker.onmessage = function(event) {
	var id = event.data.id;
	alasql.buffer[id](event.data.data);
	delete alasql.buffer[id];
};

alasql.webworker.onerror = function(e){
	throw e;
}

return alasql;
}));
