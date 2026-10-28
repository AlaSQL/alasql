var alasql = require('../dist/alasql.min.js');
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "chinook/'+filename+'"');
		done();
	});
};

describe('Chinook database',function(){
	it('Setup',function(done){
		this.timeout(100000);
		alasql('CREATE DATABASE Chinook; USE Chinook');
		alasql('SOURCE "chinook/Chinook_Alasql.sql"');
		done();
	});
	// Set of samples from 
	// http://gdichicago.com/classes/intro-databases/class4.html#/8
	a('test001.sql');
	a('test002.sql');
	a('test003.sql');
//	a('test004.sql');
//	a('test005.sql');
//	a('test006.sql');
//	a('test007.sql');
//	a('test008.sql');
//	a('test009.sql');
//	a('test010.sql');
});
