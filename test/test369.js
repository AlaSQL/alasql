if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


/*
Inputs for emprovements:

lets get the new Regexp out of the function so we dont need to initiate it every time

Lets add ^ and $ to special list

Future:

We need to remove the '[', ']' from the specials so we can still support the [ ] syntax.

We must make sure that ^ is not escaped if its the first char in [ ]

We must make sure % and _ are not replaced within a [ ]

Expand the function with an ESCAPE parameter


*/



describe('Test 369 LIKE', function() {

         var specials = [
           '/', '.', '*', '+', '?', '|',
           '(', ')', '[', ']', '{', '}', '\\'
         ];

     alasql.utils.like = function (pattern,value) {
         var re  = new RegExp(
           '(\\' + specials.join('|\\') + ')', 'g'
         );
       return pattern.replace(re, '\\$1').replace("%", ".*").replace("_", ".").match(value);
     }


		var data = [
			{a:'abcdef'},
               {a:'xyzwt'},
               {a:'abc123'},
               {a:'123def'},
               {a:'ab34ef'},
               {a:'ab56ef'},
		];

     it('1. Test %',function(done){
     	var res = alasql('SELECT * FROM ? WHERE a LIKE "abcdef"',[data]);
     	assert.deepEqual(res,[ { a: "abcdef" }]);
     	done();
     });


});
