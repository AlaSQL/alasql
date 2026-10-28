/*
//
// AlaSQL Workker
// Date: 13.04.2014
// (c) 2014-2015, Andrey Gershun
//
*/
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
    @function
    @param {string} sql SQL statement
    @param {object} params List of parameters
    @param {callback} cb Callback function
    @return {object} Query result
*/
function alasql(sql,params,cb){
    // Increase last request id
	var id = alasql.lastid++;
    // Save callback
	alasql.buffer[id] = cb;
    // Send a message to worker
	alasql.webworker.postMessage({id:id,sql:sql,params:params});
};
