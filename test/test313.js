if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 313 SEARCH ORDER BY', function() {

  it('1. ORDER BY',function(done){

    var data = [{a:1},{a:10},{a:2}];
    var res = alasql('SEARCH / ORDER BY (a) FROM ?', [data]);

    var data = [1,10,2];
    var res = alasql('SEARCH / ORDER BY (_) FROM ?', [data]);

    var data = [{a:1},{a:10},{a:2}];
    var res = alasql('SEARCH / ORDER BY (a DESC) a  FROM ?', [data]);

    console.log(res);
    done();

  });

});

