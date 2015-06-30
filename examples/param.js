
var alasql = require('alasql');

var data = [{a:0},{a:1},{a:2},{a:3},{a:4}];

var res = alasql('SELECT * FROM ? WHERE a >= ?', [data, 2]);

console.log(res);
