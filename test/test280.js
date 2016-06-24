if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var _ = require('lodash');
} else {
	__dirname = '.';
};

if(typeof exports == 'object') {
// Test only for browsers


describe('Test 280 XLS.XML tests', function() {

	var data = [{city:"London",population:5000000}, 
    {city:"Moscow",population:12000000},
    {city:"Mexico",population:20000000}, 
    {city:"New York",population:20000000}, 
  ];
  
  it('1. Save XLS', function(done) {
    alasql('SELECT * INTO XLS("'+__dirname+'/restest280a.xls",{headers:true}) FROM ?',[data],function(){
    	done();
    });
  });

  it('2. Save XLSXML', function(done) {
    var opts = {
      headers:true, 
      column: {style:{Font:{Bold:"1"}}},
      rows: {1:{style:{Font:{Color:"#FF0077"}}}},
      cells: {1:{1:{
        style: {Font:{Color:"#00FFFF"}}
      }}}
    };
    alasql('SELECT * INTO XLSXML("'+__dirname+'/restest280b.xls",?) FROM ?',[opts,data],function(){
	    done();	
    });
  });

  it('3. Save complex XLSXML', function(done) {
    alasql('SELECT * INTO XLSXML("'+__dirname+'/restest280c.xls",{headers:true, sheets:{Sheet1:{},Sheet2:{}}}) FROM ?',[data],function(){
	    done();	
    });
  });
});


};
