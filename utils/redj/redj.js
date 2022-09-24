var fs = require('fs');

// Read file
var s = fs.readFileSync('./src/alasqlparser.jison').toString();

var ss = s.split('/lex');

// Prepare list of terminals
var aa = s.match(/return \'[A-Z_]+\'/g);
var aa = aa.map(function (a) {
	return a.substr(8, a.length - 1 - 8);
});

// Prepare literals
//var bb = s.match(/;\s+([A-Z][A-Za-z]*\s+:)/g);
var bb = s.match(/\n[A-Z][A-Za-z]*\s+:/g);

bb.forEach(function (b) {
	aa.push(b.substr(1, b.length - 2).trim());
});

aa.push('Literal');
//	var d = s.match(new RegExp("\\s"+c+"\\s","g"));

//	console.log(aa.length);

var abc1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var abc2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789';

for (var i = 0; i < aa.length; i++) {
	var c1 = (i / abc2.length) | 0;
	var c2 = i % abc2.length;
	var ch = abc1[c1] + abc2[c2];
	ss[0] = ss[0].replace(new RegExp("return\\s+\\'" + aa[i] + "\\'", 'g'), "return '" + ch + "'");
	ss[1] = ss[1].replace(new RegExp('\\s' + aa[i] + '\\s', 'g'), ' ' + ch + ' ');
	ss[1] = ss[1].replace(new RegExp('\\(' + aa[i] + '\\|', 'g'), '(' + ch + '|');
	ss[1] = ss[1].replace(new RegExp('\\|' + aa[i] + '\\|', 'g'), '|' + ch + '|');
	ss[1] = ss[1].replace(new RegExp('\\|' + aa[i] + '\\)', 'g'), '|' + ch + ')');
	ss[1] = ss[1].replace(new RegExp('\\s' + aa[i] + '\\?', 'g'), ' ' + ch + '?');
}

var so = ss[0] + '/lex' + ss[1];
fs.writeFileSync('./src/alasqlparser1.jison', so);
//console.log(s);

//console.log(bb);
