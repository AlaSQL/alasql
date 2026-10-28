var alasql = require('../alasql.min.js');
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "world/'+filename+'"');
		done();
	});
};

describe('World database',function(){
	it('Setup',function(done){
		this.timeout(3000);
		alasql('CREATE DATABASE world; USE world');
		alasql('SOURCE "world/world.sql"');
		done();
	});
	a('test001.sql');
});
