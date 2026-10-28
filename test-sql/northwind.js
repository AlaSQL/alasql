if(typeof exports == 'object') {
	var alasql = require('../alasql.js');
}
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "northwind/'+filename+'"');
		done();
	});
};

describe('Northwind database',function(){
	it('Setup',function(done){
		this.timeout(10000);
		alasql('CREATE DATABASE Northwind; USE Northwind');
		alasql('SOURCE "northwind/Northwind.sql"');
		done();
	});
//	a('test001.sql');
});
