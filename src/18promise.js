
//
// Promises for AlaSQL
//
//nodejs now has Promises
if(typeof utils.global.Promise === "object") {
	var Promise = utils.global.Promise;
} else if(utils.isNode){
	var Promise = require('es6-promise').Promise;
} else {
	throw new Error('Please include a Promise library');
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