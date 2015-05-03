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

	var data = [{city:"London",population:5000000}, {city:"Moscow",population:12000000}, ];
  
/*
  it('1. Save XLS', function(done) {
    alasql('SELECT * INTO XLS("restest280a.xls",{headers:true}) FROM ?',[data],function(){
    	done();
    });
  });
*/
  it('2. Save XLSXML', function(done) {
    var opts = {headers:true, column:{style:{
      Font:{
        FontName:"Calibri", "x:Family":'',Size:"20", Color:"#FF0077", Bold:"1"}
      }
      
    }};
    alasql('SELECT * INTO XLSXML("restest280b.xls",?) FROM ?',[opts,data],function(){
	    done();	
    });
  });
/*
  it('3. Save complex XLSXML', function(done) {
    alasql('SELECT * INTO XLSXML("restest280c.xls",{headers:true, sheets:{Sheet1:{},Sheet2:{}}}) FROM ?',[data],function(){
	    done();	
    });
  });
*/
});


};