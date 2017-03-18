if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
        var fs = require("fs");
}

var test = '727'; // insert test file number

describe('Test '+test+' - INTO CSV', function() {
	
	after(function(){
		fs.unlink('sdfsfd.csv');
        });

	it('With quote = \'\'', function(){
                alasql("SELECT \"1\" INTO CSV('sdfsfd', {quote:''})");
        });
});
