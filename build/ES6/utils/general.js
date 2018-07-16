const utils = {};
/**
    Convert NaN to undefined
    @function
    @param {string} s JavaScript string to be modified
    @return {string} Covered expression

    @example

    123         => 123
    undefined   => undefined
    NaN         => undefined

*/
utils.n2u = function (s) {
    return '(y=' + s + ',y===y?y:undefined)';
};
/**
    Return undefined if s undefined
    @param {string} s JavaScript string to be modified
    @return {string} Covered expression

    @example

    123,a       => a
    undefined,a => undefined
    NaN,a       => undefined

*/
utils.und = (s, r) => {
    return '(y=' + s + ',typeof y=="undefined"?undefined:' + r + ')';
};
/**
    Return always true. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
    @function
    @return {boolean} Always true
*/
utils.returnTrue = () => {
    return true;
};
/**
    Return undefined. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
    @function
    @return {undefined} Always undefined
*/
utils.returnUndefined = function () { };
/**
    Escape string
    @function
    @param {string} s Source string
    @return {string} Escaped string
    @example

    Pit\er's => Pit\\er\'s

*/
/**
    Get the global scope
    Inspired by System.global
    @return {object} The global scope
*/
utils.global = (function () {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return Function('return this')();
}());
/**
  * Find out if a function is native to the enviroment
  * @param {function} Function to check
  * @return {boolean} True if function is native
  */
utils.isNativeFunction = fn => {
    return typeof fn === 'function' && !!~fn.toString().indexOf('[native code]');
};
utils.isArray = function (obj) {
    return '[object Array]' === Object.prototype.toString.call(obj);
};
/**
  * Extend object a with properties of b
  * @function
  * @param {object} a
  * @param {object} b
  * @return {object}
*/
utils.extend = (a, b) => {
    a = a || {};
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
};
export default utils;
