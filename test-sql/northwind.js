if(typeof exports == 'object') {
	var alasql = require('../dist/alasql.js');
}

function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "northwind/'+filename+'"');
		done();
	});
};

describe('Northwind database',function(){
	it('1. Setup',function(done){
		alasql('CREATE DATABASE Northwind; USE Northwind');
		done();
	});
		a('n01.sql');
		a('n02.sql');
		a('n03.sql');
		a('n04.sql');
		a('n05.sql');
		a('n06.sql');
		a('n07.sql');
		a('n08.sql');

});
