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

arrayDiff = function(a,b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};

// Union arrays
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
}


/*
String.prototype.toJavaScript = function() {
	return "'"+this+"'";
}

Number.prototype.toJavaScript = function() {
	return this;
}

Boolean.prototype.toJavaScript = function() {
	return this;
}
*/