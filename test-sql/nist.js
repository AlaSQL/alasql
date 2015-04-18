var alasql = require('../alasql.min.js');
function a(filename) {
	it(filename,function(done){
		alasql('SOURCE "nist/'+filename+'"');
		done();
	});
};

describe('NIST SQL Examples - http://www.itl.nist.gov/div897/ctg/dm/sql_examples.htm',function(){
	it('Setup',function(done){
//		this.timeout(10000);
		alasql('CREATE DATABASE NIST; USE NIST');
		done();
	});
	// Set of samples from 
	// http://sql.learncodethehardway.org/book/
	a('01.sql');
	a('02.sql');
	a('03.sql');
	a('04.sql');
	a('05.sql');
	a('06.sql');
	a('07.sql');
	a('08.sql');
	a('09.sql');
	a('10.sql');
	a('11.sql');
	a('12.sql');
	a('13.sql');
	a('14.sql');
	a('15.sql');
	a('16.sql');
	a('17.sql');
	a('18.sql');
	a('19.sql');
	a('20.sql');
	a('21.sql');
	a('22.sql');
	a('23.sql');
	a('24.sql');
	a('25.sql');
	a('26.sql');
	a('27.sql');
	a('28.sql');
	a('29.sql');
	a('30.sql');
});
