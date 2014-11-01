//
// alasql.js
// "A la SQL" - Pure JavaScript SQL database
// Date: 01.11.2014
// Version: 0.0.6
// (ñ) 2014, Andrey Gershun
//

//  UMD header

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./alasqlparser'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('./alasqlparser').SQLParser);
    } else {
        root.alasql = factory(root.Parser);
    }
}(this, function (alasqlparser) {


	return alasqlparser;
}));