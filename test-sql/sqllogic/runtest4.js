//
// Parser and teste for SQLLOGICTEST and AlaSQL
// (c) 2015, Andrey Gershun
// 

var alasql = require('../../dist/alasql.js');
var fs = require('fs');
var md5 = require('blueimp-md5').md5;

// List of tests
var filenames = [
	// './test/select1.test',
 // 	'./test/select2.test',
	// './test/select3.test',
//	'./test/select4.test',
	'./test/select5.test',
	// './test/evidence/in1.test',
	// './test/evidence/in2.test',
	// './test/evidence/slt_lang_aggfunc.test',
	// './test/evidence/slt_lang_createtrigger.test',
	// './test/evidence/slt_lang_createview.test',
	// './test/evidence/slt_lang_dropindex.test',
	// './test/evidence/slt_lang_droptable.test',
	// './test/evidence/slt_lang_droptrigger.test',
	// './test/evidence/slt_lang_dropview.test',
	// './test/evidence/slt_lang_reindex.test',
	// './test/evidence/slt_lang_replace.test',
	// './test/evidence/slt_lang_update.test',
	//  './test/index/between/1/slt_good_0.test',
	//  './test/index/commute/10/slt_good_0.test',
	//  './test/index/delete/1/slt_good_0.test', 
 // 	 './test/index/in/10/slt_good_0.test',
	//  './test/index/orderby/10/slt_good_0.test',
	//  './test/index/orderby_nosort/10/slt_good_0.test', 
 // 	 './test/index/random/10/slt_good_0.test',
 // 	 './test/index/view/10/slt_good_1.test',
	//  './test/random/aggregates/slt_good_0.test',
	//  './test/random/expr/slt_good_0.test',
	//  './test/random/groupby/slt_good_0.test',
	//  './test/random/select/slt_good_0.test'

];


var limit = 3200;//3140; /*1000000*/
var errlimit = 2;
var nerrors = 0;
//var mode = 'PostgreSQL';		// Let say we are a la Oracle :)
var mode = 'oracle';		// Let say we are a la Oracle :)


var restests = []; // Array for result of tests

// Process all filenames
filenames.forEach(function(filename,i) {
	console.log(filename);
	var rt = test(filename,true);
	restests.push(rt);
//	console.log(rt);
});

// Aggregate results
var rtt = alasql('SELECT ROW COUNT(*) AS ntests, \
	SUM(ntests) AS ntests, \
	SUM(nparsed) AS nparsed, \
	SUM(npassed) AS npassed, \
	SUM(upassed) AS upassed, \
	SUM(ntests - npassed) AS tnpassed, \
	SUM(duration) AS duration, \
	SUM(memused) AS memused \
	FROM ?', [restests]);

console.log('TOTAL:',rtt)

//console.log(restests);

// For future to recognize interruptions
var wip = false;
var wipskip = true;
// setTimeout(function(){
// 	if(wip) console.log('Too long');
// },2000);
//console.log(test('./evidence/slt_lang_createview.test',false));


/**
   Main test run function
*/
function test(filename, show) {
	wip = true;
	var f = fs.readFileSync(filename).toString()
	.replace(/\r\n/g,'\n')
	.split(/\n/);

	alasql.options.modifier = 'RECORDSET';
	alasql('CREATE DATABASE test; USE test');

	// Number of parsed lines

	var ntests = 0;  			// Number of tessts
	var nparsed = 0; 			// Number of parsed statements
	var npassed = 0; 			// Number of passed tests
	var upassed = 0; 			// Number of unclear results
	var tstart = Date.now(); 	// Start time
	var memstart = 0; 			// Start memory heaep size
	var skipif = false; 		// Skipif state



	for(var i = 0;i < Math.min(limit,f.length);i++) {
//		if(i>3100 && i<29209) continue;
		if(i%100 == 0) process.stdout.write('.');
		process.stdout.write(i+',');

		var sr, sa, s, exphash, explen, sql;


		var line = f[i].trim().split('#')[0];
		var w = line.split(' '); 
		if(w.length == 0 || (w.length == 1 && w[0] == '')) continue;
//		if(i>29150) console.log(w);

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

		var expect, explen, exphash;

		if(w[0] == 'query') {
			qtype = w[1]; 

			var sql = '';
			while(f[i+1].trim()!='----') {
				sql += f[i+1];
				i++;
			}
//				console.log(sql);
			i++;
			var expect = [];
			var explen = 0; // Expected length of result
			var exphash = false;
			while(f[i+1].trim()!='') {
				expect.push(f[i+1]);
				explen++;
				i++;
			};

			var ew = (expect[0]+'').split(' ');
			if(ew[1] == 'values') {
				explen = +ew[0]; // Length
				exphash = ew[4]; // Hash
			}



//console.log(exphash);
			if(skipif) {
				skipif = false;
				continue;
			}
			
			ntests++; 
			var ast;
			// First - let test parser
			try {
//				console.log(sql);
				var ast = alasql.parse(sql);
				nparsed++;
			} catch(err) {
//				console.log(err);
			}

//			console.log(131,qtype);
			if(ast.statements[0].joins && ast.statements[0].joins.length > 3) { // We skip queries with joining more than 3 tables
				process.write('0');
				continue;
			}


			// Now test results

			var reason = '';
			var success = true;
//		console.log('ooookkkk1');
			try{
				var rs = alasql(sql);
			} catch(err) {
				var success = false;
				reason = err;
//				console.log(err);
			}
			if(typeof rs == 'undefined') {
				success = false;
				reason = 'Result is empty';
			}
//		console.log('ooookkkk2');
			if(success) {
				var res;
				res = rs.data;
				// Check results
				var passed;
				// console.log(204,res.length,explen);
				if(res.length*qtype.length == explen) { // Check if length are the same

					if(exphash) { // Special case
					    var sa = [];
					    res.forEach(function(d){
					    	var s1 = '';
					    	for(var j=0;j<rs.columns.length;j++) {
					    		if(typeof d[rs.columns[j].columnid] == 'undefined'){
						    		s1 += 'NULL\n';
					    		} else {
						    		s1 += d[rs.columns[j].columnid]+'\n';
					    		}
						    	if(w[2] == 'valuesort') {
						    		sa.push(s1);
						    		s1 = '';
						    	}					    		
					    	}
					    	if(w[2] != 'valuesort') {
					    		sa.push(s1);
					    	}
					    });
						if(w[2] == 'rowsort' || w[2] == 'valuesort' ) {
							sa = sa.sort();
						}
					    var sr = sa.join('');
    					rhash = md5(sr);
    					//console.log(153,s,rhash,exphash);
						if(rhash == exphash) passed = 'passed';
						else passed = 'not passed';
					} else {
						// Case with 0

						if(res.length*qtype.length == 1) {
			//				console.log(34,expect[0],res[0][rs.columns[0].columnid],rs.columns[0].columnid);
							if(expect[0] == '0') {
								if(res[0][rs.columns[0].columnid] == false) {
									passed = 'passed';
								} else {
									passed = 'not passed';
								}
							} else if(expect[0] == '1') {
								if(res[0][rs.columns[0].columnid] == true) {
									passed = 'passed';
								} else {
									passed = 'not passed';
								}
							} else if(expect[0] == 'NULL') {
								if(typeof res[0][rs.columns[0].columnid] == 'undefined') {
									passed = 'passed';
								} else {
									passed = 'not passed';
								}
							} else {
								if((expect[0]||0) == (res[0][rs.columns[0].columnid]||0)) {
									passed = 'passed';
								} else {
									passed = 'not passed';
								}
							}				
						} else {
							// Array of values
						    var sa = [];
						    res.forEach(function(d){
						    	var s1 = '';
						    	for(var j=0;j<rs.columns.length;j++) {
						    		if(typeof d[rs.columns[j].columnid] == 'undefined'){
							    		s1 += 'NULL\n';
						    		} else {
							    		s1 += d[rs.columns[j].columnid]+'\n';
						    		}
						    		if(w[2] == 'valuesort') {
						    			sa.push(s1);
						    			s1 = '';
						    		}
						    	}
					    		if(w[2] != 'valuesort') {
							    	return s1;
							    }
						    });
						    // Sort if required
							if(w[2] == 'rowsort' ||w[2] == 'valuesort' ) {
								sa = sa.sort();
							}
						    var sr = sa.join('');

						    var se = expect.map(function(e){return e+'\n'}).join('');


//						   console.log('$$$',sr,se);
						    if(sr == se) {
						    	passed = 'passed';
						    } else {
						    	passed = 'not passed';
						    }

							// 
						}
						// NUltiple cases
					}
				} else {
					passed = 'not passed';
				}
			} else {
				if(expect[0] == '0') {
					passed = 'passed';
				} else {
					passed = 'not passed';
				}
			}

			if(typeof passed == 'undefined') {
				//Wrong result
				passed = 'unclear';
			} else {
				if(passed) {
				} else {

				}
			}
//			if(passed != 'passed' && show) console.log(passed,i,sql,res,expect,reason);
			if(passed != 'passed' && show && i>3340) console.log('#',i,sr,sa.length,explen,sql,w[2],expect,rhash,reason);
			if(passed == 'passed') npassed++;
			else if(passed == 'unclear') upassed++;
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
			ntests++;
			// Lets test parser
			try {
				var ast = alasql.parse(sql);
				nparsed++;
			} catch(err) {
				reason = err;
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

//			if(!passed && show) console.log(i,sql,res,expect,reason);
			if(!passed && show) console.log('#',i,reason);
			if(passed) npassed++;

			continue;
		} 

		console.log('WHAT IS IT?:',w); // Do not know what to do
	}
	alasql('DROP DATABASE test');
	alasql.options.modifier = undefined;

	wip = false;
	var memfinish = 0; // Current memory heap size

	// Return values
	return {filename:filename,
			ntests:ntests,
			nparsed:nparsed,
			npassed:npassed,
			upassed:upassed,
			duration:Date.now()-tstart,
			memused:memfinish-memstart};
}