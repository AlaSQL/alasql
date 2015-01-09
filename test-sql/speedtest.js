var alasql = require('../alasql.min.js');
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "speedtest/'+filename+'"');
		done();
	});
};

describe('Speedtest', function(){
	it('Setup',function(done){
		this.timeout(3000);
		alasql('SOURCE "speedtest/speedtest.sql"');
		done();
	});
	a('test001.sql');
	console.log('Warning: there is a lack of functionality in Alasql - IDENTITY is not realized yet');
});
