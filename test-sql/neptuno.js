var alasql = require('../alasql.min.js');
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "neptuno/'+filename+'"');
		done();
	});
};

describe("Neptuno database",function(){
	it("Setup",function(done){
		this.timeout(5000);
		alasql('SET dropifnotexists ON');
		alasql('CREATE DATABASE neptuno; USE neptuno');
		alasql('SOURCE "neptuno/neptuno.sql"');
		done();
	});
	a('test001.sql');
});
