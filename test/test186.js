if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 186 - Linq Syntax', function() {
    it("1. empty alasql()", function(done) {
      var data1 = [{a:1,b:10},{a:2,b:20},{a:0,b:20},];
      var data2 = [{a:-1,b:-10},{a:-2,b:-20}];
      var data3 = [{x:-1,y:-10},{x:-2,y:-20}];

      var res = alasql().Select("a").exec([data1]);
//      console.log(1,res);

      var res = alasql().Select("a").exec([data2]);
//      console.log(2,res);

      var sel = alasql(data1).Select("a").exec();
//      console.log(3,res);

      var res = alasql(data1).Select("a","b","x","y").From(data3).exec();
//      console.log(4,res);

      var res1 = alasql('SELECT * FROM ? ORDER BY a',[data1]);
      var res2 = alasql(data1).OrderBy("a").exec();
//      console.log(5,res1,res2);

      var res3 = alasql(data1).Select("b").GroupBy("b").exec();
//      console.log(5,res3);

      var res3 = alasql(data1).Select("a","b").GroupBy("b","a").OrderBy("b","a").exec();
//      console.log(5,res3);

//      alasql().Select(function(x){return x.Max("index")},'id').GroupBy("id").exec();


      done();
    });

    it("2. JSLINQ compatibility",function(done){
      var myList = [
        {FirstName:"Chris",LastName:"Pearson"},
        {FirstName:"Kate",LastName:"Johnson"},
        {FirstName:"Josh",LastName:"Sutherland"},
        {FirstName:"John",LastName:"Ronald"},
        {FirstName:"Steve",LastName:"Pinkerton"}
        ];

      var exampleArray = alasql(myList)
         .Where(function(p){ return p[undefined].FirstName == "Chris"; })
         .Select(function(item){ return item.FirstName; })
         .OrderBy(function(name){ return name; })
//          .OrderBy('_')
//         .Top(2)
         .exec();

      console.log(58,exampleArray);
      done();
    });

});
