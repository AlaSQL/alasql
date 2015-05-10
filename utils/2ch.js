var fs = require('fs');
var alasql = require('..');
var s = fs.readFileSync('../dist/alasql.min.js').toString();

var state = "ANY";
var idx = 0;
var ilen = s.length;
var w = '';
var dict = {};

for(var i=0; i<ilen;i++) {
	var ch = s[i];
	var a = ch.toUpperCase();
	if(state == "ANY") {
		if(ch == '.') {
			state="LITERAL";
			w = '_';
			continue;
		} else if((a >= 'A' && a <= 'Z') || (a == '_')) {
			state="ANY";
			w = '';
			continue;
		} else {
			state = 'ANY';
			w = '';
			continue;
		}
	} else if(state == "LITERAL") {
		if((a >= 'A' && a <= 'Z') || (a >= '0' && a <= '9') || (a == '_')) {
			state="LITERAL";
			w += ch;
			continue;
		} else {
			state = 'ANY';
			dict[w] = (dict[w]||0)+1;
			w = '';
			continue;			
		}
	}
};

console.log(alasql('SELECT TOP 10 [0]->substr(1) AS w, [1] as q, \
	(LEN([0])-3)*[1] as e FROM ? WHERE LEN([0])>5 ORDER BY e DESC',[dict]));

console.log(alasql('SELECT SUM((LEN([0])-3)*[1]) as e FROM ? WHERE LEN([0])>5 ',[dict]));

