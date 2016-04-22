/// <reference path="alasql.d.ts" />
declare function require(name:string);
var alasql:AlaSQL = require('../../dist/alasql.js');

var res:any;

// test 1
alasql('=2*3');
console.log(1);

// test 2
res = alasql('=2*3');
console.log(2,res);

// test 3
alasql.options.errorlog = true;

alasql('SELECT SELECT');
// test 4
console.log(alasql.error instanceof Error);

// test 5
alasql('=2*3',[],function(data){
	console.log(5,data);
});

// test 6
alasql('SELECT SELECT',[],function(data,err){
	console.log(5,err instanceof Error);
});

// test 7
var data = [{a:1},{a:2}];
res = alasql(data).Select('a').exec();
console.log(7,res);

// test 8
alasql.promise([
			'select 99', 
			['select ?', [100]]
		]).then(function(res){
			console.log(8, res)
		})
