console.log(parser);

var yy = parser.yy = {};

// Utility
// TODO Replace with standard function
yy.extend = function (a,b){
	if(typeof a == 'undefined') a = {};
	for(key in b) {
		if(b.hasOwnProperty(key)) {
			a[key] = b[key]
		}
	}
	return a;
};;
