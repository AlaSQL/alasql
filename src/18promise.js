
//
// Promises for AlaSQL
//
//nodejs now has Promises
if(typeof utils.getGlobal().Promise === "object") {
	var Promise = utils.getGlobal().Promise;
} else if(typeof exports === 'object'){
	var Promise = require('es6-promise').Promise;
} else if(typeof window === 'object') {
	var Promise = utils.getGlobal().Promise;
}

//
// Only for browsers with Promise support
//
//if(typeof window !== 'undefined' && typeof window.Promise === 'function') {
alasql.promise = function(sql, params) {
    return new Promise(function(resolve, reject){
        alasql(sql, params, function(data,err) {
             if(err) {
                 reject(err);
             } else {
                 resolve(data);
             }
        });
    });
};
//}