(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.alasql = factory();
    }
}(this, function () {

function alasql(sql,params,cb){
	alasql.worker.postMessage({sql:sql,params:params});
	alasql.worker.onmessage = function(event) {
//		console.log('ok');
		cb(event.data);
	};
	alasql.worker.onerror = function(e){
		throw e;
	}
};

return alasql;
}));
