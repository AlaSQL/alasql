var alasql = require('../dist/alasql.min.js');

//var alasql = require('../dist/alasql.opt.js');

console.log(alasql('=1+100+(SELECT SUM(_) FROM RANGE(1,10))'));
console.log(alasql('SELECT FROM RANGE(1,10)'));