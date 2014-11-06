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
arrayUnion = function(a,b) 
{
    var r = b.slice(0);
    a.forEach(function(i) { if (r.indexOf(i) < 0) r.push(i); });
    return r;
};

arrayDiff = function(a,b)
{
    return a.filter(function(i) {return b.indexOf(i) < 0;});
};

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