/***
  @description Array Utils
***/
/**
    Union arrays
    @function
    @param {array} a
    @param {array} b
    @return {array}
*/
export function arrayUnion(a,b) {
    var r = b.slice(0);
    a.forEach(function(i){
                            if (r.indexOf(i) < 0){
                                r.push(i);
                            }
                        });
    return r;
}

/**
 Array Difference
 */
export function arrayDiff(a,b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};

/**
  Arrays deep intersect (with records)
 */
export function arrayIntersect(a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;

        b.forEach(function(bi){
            found = found || (ai===bi);
        });

        if(found) {
            r.push(ai);
        }
    });
    return r;
};


/**
  Arrays deep union (with records)
 */
export function arrayUnionDeep(a,b) {
    var r = b.slice(0);
    a.forEach(function(ai) {
        var found = false;

        r.forEach(function(ri){
//            found = found || equalDeep(ai, ri, true);
            found = found || deepEqual(ai, ri);
        });

        if(!found) {
            r.push(ai);
        }
    });
    return r;
};

/**
  Arrays deep union (with records)
 */
export function arrayExceptDeep(a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;

        b.forEach(function(bi){
//            found = found || equalDeep(ai, bi, true);
            found = found || deepEqual(ai, bi);
        });

        if(!found) {
            r.push(ai);
        }
    });
    return r;
};

/**
  Arrays deep intersect (with records)
 */
export function arrayIntersectDeep(a,b) {
    var r = [];
    a.forEach(function(ai) {
        var found = false;

        b.forEach(function(bi){
//            found = found || equalDeep(ai, bi, true);
            found = found || deepEqual(ai, bi, true);
        });

        if(found) {
            r.push(ai);
        }
    });
    return r;
};

/**
    Array with distinct records
    @param {array} data
    @return {array}
*/
export function distinctArray(data) {
    var uniq = {};
    // TODO: Speedup, because Object.keys is slow
    for(var i=0,ilen=data.length;i<ilen;i++) {
        var uix;
        if(typeof data[i] === 'object') {
            uix = Object.keys(data[i]).sort().map(function(k){return k+'`'+data[i][k];}).join('`');
        } else {
            uix = data[i];
        }
        uniq[uix] = data[i];
    }
    var res = [];
    for(var key in uniq){
        res.push(uniq[key]);
    }
    return res;
};

/**
   Flat array by first row
 */
export function flatArray(a) {
//console.log(684,a);
    if(!a || 0 === a.length){
        return [];
    }

    // For recordsets
    if(typeof a === 'object' && a instanceof alasql.Recordset) {
        return a.data.map(function(ai){return ai[a.columns[0].columnid];});
    }
    // Else for other arrays
    var key = Object.keys(a[0])[0];
    if(key === undefined){
        return [];
    }
    return a.map(function(ai) {return ai[key];});
};

/**
  Convert array of objects to array of arrays
 */
export function arrayOfArrays(a) {
    return a.map(function(aa){
        var ar = [];
        for(var key in aa){
            ar.push(aa[key]);
        }
        return ar;
    });
};
