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
