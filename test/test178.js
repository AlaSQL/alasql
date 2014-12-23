if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};



//if(typeof exports != 'object') {

describe('Test 178 - function in GROUP BY', function() {

  var city = [{city:"Moscow", continent:'Europe'},
    {city:"Kyiv", continent:'Europe'},
    {city:"Minsk", continent:'Europe'},
    {city:'Madrid', continent:'Europe'},
    {city:'Beijing', continent:'Asia'}, 
    {city:'Tokyo', continent:'Asia'}];

	it("1. Default select from GROUP BY clause", function(done) {
//		var res = alasql('SELECT COUNT(*) AS cnt FROM ? GROUP BY MID(city,1,1), city',[city]);
    var res = alasql('SELECT continent, COUNT(*) FROM ? GROUP BY continent',[city]);
    assert.deepEqual(res, [ 
        { continent: 'Europe', 'COUNT(*)': 4 },
        { continent: 'Asia', 'COUNT(*)': 2 } ]
    );
//    console.log(res);
    done();
  });

});
