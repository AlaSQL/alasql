if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};


describe('Test 243 AVG bug', function() {

  it('1. AVG bug',function(done){

      var arr = [
            {
                person:1,
                sold:5
           },{
               person:2,
               sold:10
           },{
               person:1,
               sold:20
           },{
               person:3,
               sold:40
           }
         ];

    var res = alasql('SELECT person, avg(sold) FROM ? WHERE 1 GROUP BY person',[arr]);

    console.log(res);
//      assert(data[0].CV == 100);
      done();
  });


  it('1. AVG bug',function(done){

      var arr = [
            {
                person:1,
                sold:5
           },{
               person:2,
               sold:10
           },{
               person:1,
               sold:20
           },{
               person:2,
               sold:40
           }
         ];

    var res = alasql('SELECT person, avg(sold) FROM ? WHERE 1 GROUP BY person',[arr]);

    console.log(res);
//      assert(data[0].CV == 100);
      done();
  });


});

