/*
//
// Utilities for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// 
var utils = alasql.utils = {};

// Stub for non-ecisting WHERE clause 
// so is faster then if(whenrfn) whenfn()
function returnTrue () {return true};
function returnUndefined() {};

var escapeq = utils.escapeq = function(s) {
    return s.replace(/\'/g,'\\\'');
}

var doubleq = utils.doubleq = function(s) {
    return s.replace(/(\'\')/g,'\\\'');
}

var doubleqq = utils.doubleqq = function(s) {
    return s.replace(/\'/g,"\'");
}


// For LOAD
var loadFile = utils.loadFile = function(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(xhr.responseText);
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}


// Fast hash function
var hash = utils.hash = function hash(str){
    var h = 0;
    if (str.length == 0) return h;
    for (var i = 0; i < str.length; i++) {
        h = ((h<<5)-h)+str.charCodeAt(i);
        h = h & h; 
   	}
    return h;
};

// Union arrays
var arrayUnion = utils.arrayUnion = function (a,b) {
    var r = b.slice(0);
    a.forEach(function(i) { if (r.indexOf(i) < 0) r.push(i); });
    return r;
};

// Array Difference
var arrayDiff = utils.arrayDiff  = function (a,b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};

// Arrays deep intersect (with records)
var arrayIntersect = utils.arrayIntersept  = function(a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;
        
        b.forEach(function(bi){
            found = found || (ai==bi);
        });

        if(found) {
            r.push(ai); 
        }
    });
    return r;
};


// Arrays deep union (with records)
var arrayUnionDeep = utils.arrayUnionDeep = function (a,b) {
    var r = b.slice(0);
    a.forEach(function(ai) {
        var found = false;
        
        r.forEach(function(ri){
            found = found || equalDeep(ai, ri, true);
        });

        if(!found) {
            r.push(ai); 
        }
    });
    return r;
};

// Arrays deep union (with records)
var arrayExceptDeep = utils.arrayExceptDeep = function (a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;
        
        b.forEach(function(bi){
            found = found || equalDeep(ai, bi, true);
        });

        if(!found) {
            r.push(ai); 
        }
    });
    return r;
};

// Arrays deep intersect (with records)
var arrayIntersectDeep = utils.arrayInterseptDeep  = function(a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;
        
        b.forEach(function(bi){
            found = found || equalDeep(ai, bi, true);
        });

        if(found) {
            r.push(ai); 
        }
    });
    return r;
};

// Deep clone obects
var cloneDeep = utils.cloneDeep = function cloneDeep(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = cloneDeep(obj[key]);
        }
    }
    return temp;
}

// Check equality of objects
var equalDeep = utils.equalDeep = function equalDeep (x, y, deep) {
    if (deep) {
        if (x == y) return true;

        var p;
        for (p in y) {
            if (typeof (x[p]) == 'undefined') { return false; }
        }

        for (p in y) {
            if (y[p]) {
                switch (typeof (y[p])) {
                    case 'object':
                        if (!equalDeep(y[p],x[p])) { return false; } break;
                    case 'function':
                        if (typeof (x[p]) == 'undefined' ||
                  (p != 'equals' && y[p].toString() != x[p].toString()))
                            return false;
                        break;
                    default:
                        if (y[p] != x[p]) { return false; }
                }
            } else {
                if (x[p])
                    return false;
            }
        }

        for (p in x) {
            if (typeof (y[p]) == 'undefined') { return false; }
        }

        return true;
    }
    return x == y;
};

// Extend object
var extend = utils.extend = function extend (a,b){
    if(typeof a == 'undefined') a = {};
    for(key in b) {
        if(b.hasOwnProperty(key)) {
            a[key] = b[key]
        }
    }
    return a;
};;

// Flat array by first row
var flatArray = utils.flatArray = function(a) {
    if(!a || a.length == 0) return [];
    var key = Object.keys(a[0])[0];
    if(typeof key == 'undefined') return [];
    return a.map(function(ai) {return ai[key]});
};

// Convert array of objects to array of arrays
var arrayOfArrays = utils.arrayOfArrays = function (a) {
    return a.map(function(aa){
        var ar = [];
        for(var key in aa) ar[key] = aa[key];
        return ar;
    });
};

