var alasql = require('../alasql.min.js');
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "hardway/'+filename+'"');
		done();
	});
};

describe('Learn SQL by Hard Way database',function(){
	it('Setup',function(done){
		this.timeout(10000);
		alasql('CREATE DATABASE HardWay; USE HardWay');
		done();
	});
	// Set of samples from 
	// http://sql.learncodethehardway.org/book/
	a('test001.sql');
	a('test002.sql');
	a('test003.sql');
	a('test004.sql');
	a('test005.sql');
	a('test006.sql');
	a('test007.sql');
	a('test008.sql');
	a('test009.sql');
	a('test010.sql');
	a('test011.sql');
	a('test012.sql');
});
