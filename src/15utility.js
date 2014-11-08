/*
//
// Utilities for Alasql.js
// Date: 03.11.2014
// (c) 2014, Andrey Gershun
//
*/

// Fast hash function
function hash(str){
    var h = 0;
    if (str.length == 0) return h;
    for (var i = 0; i < str.length; i++) {
        h = ((h<<5)-h)+str.charCodeAt(i);
        h = h & h; 
   	}
    return h;
};

// Union arrays
arrayUnion = function(a,b) {
    var r = b.slice(0);
    a.forEach(function(i) { if (r.indexOf(i) < 0) r.push(i); });
    return r;
};

// Array Difference
arrayDiff = function(a,b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};

// Arrays deep union (with records)
arrayUnionDeep = function(a,b) {
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
arrayExceptDeep = function(a,b) {
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
arrayIntersectDeep = function(a,b) {
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
function cloneDeep(obj) {
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
equalDeep = function (x, y, deep) {
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
function extend (a,b){
    if(typeof a == 'undefined') a = {};
    for(key in b) {
        if(b.hasOwnProperty(key)) {
            a[key] = b[key]
        }
    }
    return a;
};;

// Flat array by first row
flatArray = function flatArray(a) {
    if(!a || a.length == 0) return [];
    var key = Object.keys(a[0])[0];
    if(typeof key == 'undefined') return [];
    return a.map(function(ai) {return ai[key]});
}

