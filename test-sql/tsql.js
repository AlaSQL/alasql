var alasql = require('../alasql.min.js');
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "tsql/'+filename+'"');
		done();
	});
};

describe('T-SQL Chapter 01',function(){
	it('Setup',function(done){
		alasql('SET dropifnotexists ON');
		alasql('CREATE DATABASE dbo');
		alasql('CREATE DATABASE tempdb');
		done();
	});

	a('test001.sql');
	a('test002.sql');
	a('test003.sql');
	a('test004.sql');
	a('test005.sql');
if(false) {
	a('test006.sql');
}
	a('test007.sql');
	a('test008.sql');
	a('test009.sql');
if(false) {
	a('test010.sql');
	a('test011.sql');
	a('test012.sql');
	a('test013.sql');
	a('test014.sql');
	a('test015.sql');
	a('test016.sql');
	a('test017.sql');
	a('test018.sql');
	a('test019.sql');
	a('test020.sql');
}		
});
