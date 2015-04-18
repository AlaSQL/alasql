if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 257 INTO XL()', function() {

  it('1. INTO XL', function(done){
    var data = [{a:1,b:10},{a:2,b:20}];
    // Show headers
    var opts = { 
        headers: true
    };

    // Change sheet
    var opts = { 
        sheetid:'Sheet2',
        headers: true
    };

    // List of sheets
    var opts = {
      sheets: [{
        sheetid:'Sheet2',
        headers: true
      }]
    };

    // Background color
    var opts = {
      style:"background:#00ff00"
    };

    // Background color
    var opts = {
      headers: true,
      sheetid: 'My Birds',
      style:"background:#00ff00",
      columns: [
        {columnid:'a',title:'Albatroses',
          style:'background:red;font-size:20px',
          cell:{style:'background:blue'}
        },
        {columnid:'b',title:'Bird',cell:{
          style:function(value,sheet,row,column,rowidx,columnidx){
            return 'background'+(value==10?'brown':'white')
        }}},
        { 
          columnid: 'b', cell:{value:function(value){ return value * value}}
        }
      ]
    };

    var res = alasql('SELECT * INTO XLS("restest257a.xls",?) FROM ?',[opts,data]); 
    assert(res == 1);
    done();
  });

});

