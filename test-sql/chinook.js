var alasql = require('../alasql.min.js');
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "chinook/'+filename+'"');
		done();
	});
};

describe('Chinook database',function(){
	console.log('There is a problem with multiline /* */ comments');
	it('Setup',function(done){
		this.timeout(10000);
		alasql('CREATE DATABASE Chinook; USE Chinook');
		alasql('SOURCE "chinook/Chinook_Alasql.sql"');
		done();
	});
	// Set of samples from 
	// http://gdichicago.com/classes/intro-databases/class4.html#/8
	a('test001.sql');
});
