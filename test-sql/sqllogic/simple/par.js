var alasql = require('../../../dist/alasql.min.js');
var fs = require('fs');


var filenames = [
	'./evidence/in2.test',
	'./evidence/slt_lang_aggfunc.test',
//	'./evidence/slt_lang_createview.test'
	'./evidence/slt_lang_droptable.test',
];

var restests = [];
filenames.forEach(function(filename) {
	restests.push(test(filename,false));
});

console.log(restests);
var wip = false;
var wipskip = true;
// setTimeout(function(){
// 	if(wip) console.log('Too long');
// },2000);
//console.log(test('./evidence/slt_lang_createview.test',false));

function test(filename, show) {
	wip = true;
	var f = fs.readFileSync(filename).toString()
	.replace(/\n\r/g,'\n')
	.split(/\n/);

	alasql.options.modifier = 'RECORDSET';
	alasql('CREATE DATABASE test; USE test');

	var ntests = 0;
	var npassed = 0;
	var tstart = Date.now();
	var memstart = 0;
	var skipif = false;

	var mode = 'oracle';

	for(var i = 0;i < f.length;i++) {
		var line = f[i].trim().split('#')[0];
		var w = line.split(' '); 
		if(w.length == 0 || (w.length == 1 && w[0] == '')) continue;

		if(w[0] == 'skipif') {
			if(w[1] == mode) {
				skipif = true;
				continue; // Simple process
			} else {
				skipif = false;
				continue;
			};
		}

		if(w[0] == 'onlyif') continue; // Simple process
		if(w[0] == 'halt') continue; // Simple process
		if(w[0] == 'hash-threshold') continue; // Simple process

		if(w[0] == 'query') {
			var sql = '';
			while(f[i+1]!='----') {
				sql += f[i+1];
				i++;
			}
			i++;
			var expect = [];
			while(f[i+1]!='') {
				expect.push(f[i+1]);
				i++;
			}

			if(skipif) {
				skipif = false;
				continue;
			}

			var reason = '';
			var success = true;
			try{
				var rs = alasql(sql);
			} catch(err) {
				var success = false;
				reason = err;
			}
			if(success) {
				var res = rs.data;
				// Check results
				var passed;
				if(res.length == expect.length) {
					// Case with 0
					if(res.length == 1) {
		//				console.log(34,expect[0],res[0][rs.columns[0].columnid],rs.columns[0].columnid);
						if(expect[0] == '0') {
							if(res[0][rs.columns[0].columnid] == false) {
								passed = true;
							} else {
								passed = false;
							}
						} else if(expect[0] == '1') {
							if(res[0][rs.columns[0].columnid] == true) {
								passed = true;
							} else {
								passed = false;
							}
						}				
					} else {
						// 
					}
				} else {
					passed = false;
				}
			} else {
				if(expect[0] == '0') {
					passed = true;
				} else {
					passed = false;
				}
			}

			if(typeof passed == 'undefined') {
				//Wrong result
			} else {
				if(passed) {
				} else {

				}
			}
			if(!passed && show) console.log(i,sql,res,expect,reason);
			ntests++; if(passed) npassed++;
			continue;
		} 

		if(w[0] == 'statement') {
			var sql = '';
			while(f[i+1]!='') {
				sql += f[i+1];
				i++;
			}
			i++;

			if(skipif) {
				skipif = false;
				continue;
			}

			var success = true;
			try{
				var res = alasql(sql);
			} catch(err) {
				reason = err;
				success = false;
			}

			if((success && w[1]=='ok') || (!success && w[1]=='error')) {
				if(res == '1') {
					passed = true;
				} else {
					passed = false;
				}
			} else {
				passed = false;
			}

			if(!passed && show) console.log(i,sql,res,expect,reason);
			ntests++; if(passed) npassed++;

			continue;
		} 

		console.log('WHAT IS IT?:',w); // Do not know what to do
	}
	alasql('DROP DATABASE test');
	wip = false;
	return [filename,ntests,npassed,Date.now()-tstart,memstart];
}