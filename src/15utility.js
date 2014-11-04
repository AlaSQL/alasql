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