var alasql = require('../../alasql');

alasql.from.csv = function(filename, opts){
	var fs = require('fs');
//	console.log(__dirname+'/'+filename);
	var txt = fs.readFileSync(filename).toString();
	var aaa = txt.split(/\r?\n/);
	var h = aaa.shift().split(',');
//	console.log(h);
	return {rows:aaa, headers:h};
};

alasql("select country_name into #city from csv('country.csv',@{headers:true}) where continent_code = 'AF'",[],function(res){
	console.log(res[0]);
	console.log(alasql.temp.city);
});
