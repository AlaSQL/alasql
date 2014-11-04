//
// alasql.js
// Alasql - JavaScript SQL database
// Date: 03.11.2014
// Version: 0.0.6
// (ñ) 2014, Andrey Gershun
//

//  UMD header
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.alasql = factory();
    }
}(this, function () {

