var fs = require('fs');
var alasql = require('..');
var s = fs.readFileSync('../dist/alasql.min.js').toString();

var state = "ANY";
var idx = 0;
var ilen = s.length;
var w = '';
var dict = {};
var dotdict = {};

for(var i=0; i<ilen;i++) {
	var ch = s[i];
	var a = ch.toUpperCase();
	if(state == "ANY") {
		if(ch == '.') {
			state="DOTLITERAL";
			w += '.';
			continue;
		} else if((a >= 'A' && a <= 'Z') || (a == '_')) {
			state="LITERAL";
			w += ch;
			continue;
		} else {
			state = 'ANY';
			w = '';
			continue;
		}
	} else if(state == "LITERAL") {
		if(ch == '.') {
			state="DOTLITERAL";
			w = '.';
			continue;
		} else if((a >= 'A' && a <= 'Z') || (a >= '0' && a <= '9') || (a == '_')) {
			state="LITERAL";
			w += ch;
			continue;
		} else {
			state = 'ANY';
			if(w.length > 1) {
			dict["_"+w] = (dict["_"+w]||0)+1;
			}
			w = '';
			continue;			
		}
	} else if(state == "DOTLITERAL") {
		if((a >= 'A' && a <= 'Z') || (a >= '0' && a <= '9') || (a == '_')) {
			state="DOTLITERAL";
			w += ch;
			continue;
		} else {
			state = 'ANY';
			dotdict["_"+w] = (dotdict["_"+w]||0)+1;
			w = '';
			continue;			
		}
	}
};

console.log(alasql('SELECT TOP 20 [0] AS w, [1] as q, \
	(LEN([0])-2)*[1] as e FROM ? WHERE LEN([0])>5 ORDER BY e DESC',[dict]));

console.log(alasql('SELECT TOP 20 [0] AS w, [1] as q, \
	(LEN([0])-3)*[1] as e FROM ? \
	WHERE LEN([0])>3 ORDER BY e DESC',[dotdict]));

console.log(alasql('SELECT SUM((LEN([0])-2)*[1]) as e FROM ? WHERE LEN([0])>5 ',[dict]));
console.log(alasql('SELECT SUM((LEN([0])-3)*[1]) as e FROM ? WHERE LEN([0])>5 ',[dotdict]));

