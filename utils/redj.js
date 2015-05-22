var fs = require('fs');
var s = fs.readFileSync('../src/alasqlparser.jison').toString();

var aa = s.match(/return\s+\'[A-Z]+\'/g);
var aa = aa.map(function(a){return a.substr(8,a.length-1-8)});

var bb = s.match(/;\s+([A-Z][A-Za-z]*\s+:)/g);

bb.forEach(function(b){
	c = b.substr(1,b.length-2).trim();
	var d = s.match(new RegExp("\\s"+c+"\\s","g"));

	console.log(c,d);
});



//console.log(bb);