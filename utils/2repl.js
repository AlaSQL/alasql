var fs = require('fs');
var alasql = require('..');
var s1 = fs.readFileSync('../dist/alasql.min.js').toString();
var len1 = s1.length;

var dict = {
	toJavaScript: 'JS',
	databases: 'DB',
	expression: 'EX',
	extend: 'X',
	ParamValue: 'PV',
};

for (var d in dict) {
	s2 = s1.replace(new RegExp('/.' + d, 'g'), '.' + dict[d]);
}

var len2 = s2.length;

console.log(len1, len2);
