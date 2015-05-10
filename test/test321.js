if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 321 CREATE GRAPH', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test321a; USE test321a');
    done();
  });

  it('2. CREATE GRAPH',function(done){
    alasql('SELECT * FROM CSV("test321a.csv",{headers:true})',[],function(data){
      // Select unique
      var vv = alasql('SEARCH DISTINCT(UNION ALL(/[source],/[target])) FROM ?',[data]);

      alasql('CREATE GRAPH '+vv.map(function(v){return '"'+v+'"'}));

      alasql('CREATE GRAPH '+data.map(function(e){
          return '"'+e.source+'" > {[value]:'+e.value+'} > "'+e.target+'"';    
      }));

  alasql('SEARCH "Harry" PATH("Roger") EDGE SET(color="red")');
  alasql('SEARCH "Johan" PATH("Carol") EDGE SET(color="blue")');

//   console.log(res);

    done();

  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test320');
    done();
  });
});

