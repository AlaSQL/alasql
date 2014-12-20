if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};



//if(typeof exports != 'object') {

describe('Test 176 - CSV and TSV', function() {

	it("1. CSV", function(done) {

		var text = "1,2;\t\"3\"\t,3\r\n5,6\t7,'1aq'";

		console.log(parseRows(text));
		done();
	});

});


// This part of code was taken from d3.js library
// with minor modifications

    parseRows = function(text) {

var delimiterCode = 59; //;
var delimiterCode = 44; //,
var delimiterCode = 9;  // \t

var quoteCode = 39; // '
var quoteCode = 34; // "
var headers = true;
var hs = [];


      var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
      function token() {
        if (I >= N) return EOF;
        if (eol) return eol = false, EOL;
        var j = I;
        if (text.charCodeAt(j) === quoteCode) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === quoteCode) {
              if (text.charCodeAt(i + 1) !== quoteCode) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.substring(j + 1, i).replace(/""/g, '"');
        }
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; else if (c === 13) {
            eol = true;
            if (text.charCodeAt(I) === 10) ++I, ++k;
          } else if (c !== delimiterCode) continue;
          return text.substring(j, I - k);
        }
        return text.substring(j);
      }
      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }

        if(headers) {
        	if(n == 0) {
        		hs = a;
        	} else {
        		var r = {};
        		hs.forEach(function(h,idx){
        			r[h] = a[idx];
        		});
        		rows.push(r);
        	}
        	n++;
        } else {
    	    rows.push(a);
    	}
      }
      return rows;
    };

//};

