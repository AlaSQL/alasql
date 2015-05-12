if(typeof exports == 'object') {
	var alasql = require('../dist/alasql.min.js');
}

function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "northwind/'+filename+'"');
		done();
	});
};

describe('Northwind database',function(){
	it('1. Setup',function(done){
		this.timeout(20000);
		var tm = Date.now();
		alasql('CREATE DATABASE Northwind; USE Northwind');
		alasql('SOURCE "northwind/Northwind.sql"',[],function(res){
			console.log(res);
			console.log((tm-Date.now)/1000+" sec");
		 	done();
		});
 	});
});
