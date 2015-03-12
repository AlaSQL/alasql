if(typeof exports == 'object') {
	var alasql = require('../alasql.js');
}
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "sakila/'+filename+'"');
		done();
	});
};

describe('Sakila database',function(){
	it('Schema',function(done){
		this.timeout(10000);
		alasql('SOURCE "sakila/sakila-spatial-schema.sql"');
		done();
	});
	it('Data',function(done){
		this.timeout(10000);
		alasql('SOURCE "sakila/sakila-spatial-data.sql"');
		done();
	});
});
