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

	a('01/test001.sql');
	a('01/test002.sql');
	a('01/test003.sql');
	a('01/test004.sql');
	a('01/test005.sql');
if(false) {
	a('01/test006.sql');
}
	a('01/test007.sql');
	a('01/test008.sql');
	a('01/test009.sql');
if(false) {
	a('01/test010.sql');
	a('01/test011.sql');
	a('01/test012.sql');
	a('01/test013.sql');
	a('01/test014.sql');
	a('01/test015.sql');
	a('01/test016.sql');
	a('01/test017.sql');
	a('01/test018.sql');
	a('01/test019.sql');
	a('01/test020.sql');
}		
});
