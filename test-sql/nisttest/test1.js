var fs = require('fs');
var alasql = require('../../dist/alasql.js')

var ntests = 0, nparsed = 0, npassed = 0, nokk = 0, nok = 0;

createSchemas(47);
runTests(300);

// createSchemas(30);
//runTests(300);

console.log(ntests,nparsed,nparsed/ntests,npassed,npassed/ntests, nokk, nok, nok/nokk);

function createSchemas(maxi){
	console.log('CREATE SCHEMAS');
	console.log('==============');
	var scat = fs.readFileSync('schema/runsch.all').toString().replace(/\n\r/g,"\n").split(/\n/g);
	for(var i=0; i<maxi/*47*/;i++) {
		if(typeof scat[i] == 'undefined') continue;
		scat[i] = scat[i].replace(/\ \ /g,' ').replace(/\ \ /g,' ');
		var sl = scat[i].split(' ');
		if(sl[0]!='RUNSCH') continue;
/*		if(sl[1] == 'schema8.std') continue;
		if(sl[1] == 'schema9.std') continue;
		if(sl[1] == 'schem10.std') continue;
		if(sl[1] == 'schem11.std') continue;
		if(sl[1] == 'schem12.std') continue;
		if(sl[1] == 'cts5sch2.sql') continue;
		if(sl[1] == 'cts5sch3.sql') continue;
*/		process.stdout.write(sl[1]+'('+sl[2]+'), ');
		createSchema(sl[1],sl[2]);
		process.stdout.write('\n');
	}
	process.stdout.write('\n');
};

function createSchema(filename, schemaid){
	var sch = fs.readFileSync('schema/'+filename).toString().replace(/\n\r/g,"\n").split(/\n/g);
	var sql = '';
	for(var i=0;i<sch.length;i++) {
		var sl = sch[i];
		sl = sl.split('--')[0];
		if(sl.trim()=='') {
			processDDL(sql);
			sql = '';
			continue;
		}
		sql += sl.trim()+' ';
	}
	processDDL(sql);
//	console.log(Object.keys(alasql.databases[schemaid].tables));
}

function processDDL(sql) {
	if(sql.trim()=='') return;
	var w = sql.split(' ');
	if(w[0] == 'CREATE' && w[1] == 'SCHEMA' && w[2] == 'AUTHORIZATION') {
		alasql('CREATE DATABASE '+w[3]+';USE '+w[3]);
		process.stdout.write('>>'+w[3]+'<<');
		return;
	} else if(w[0] == 'CREATE' && w[1] == 'SCHEMA' && w[2] != 'AUTHORIZATION') {
		alasql('CREATE DATABASE '+w[2]+';USE '+w[2]);
		process.stdout.write('>>'+w[2]+'<<');
		return;
	} else if((w[0] == 'CREATE' && w[1] == 'TABLE')
		|| (w[0] == 'CREATE' && w[1] == 'VIEW')) {
//		console.log('***',sql);

		ntests++;
		var bad = false;
		try {
			alasql.parse(sql);
		} catch(err) {
//			console.log(sql,err);
//			halt(1);
			bad = true;
		}
		if(bad) {
			return;
		} else {
			nparsed++;
		}

		var bad = false;
		try {
			alasql(sql);
		} catch(err) {
//			console.log(alasql.useid,alasql.tables);
//			console.log(alasql.databases[alasql.useid].tables);
//			console.log(sql,err);
			bad = true;
		}
		if(bad) {
			process.stdout.write('+');			
			return;
		} else {
			process.stdout.write('.');			
			npassed++;
		}
	}

}

function runTests(imax){
	console.log('RUN TESTS');
	console.log('=========');
	var scat = fs.readFileSync('test/runsql.all').toString().replace(/\n\r/g,"\n").split(/\n/g);
	for(var i=0; i<imax;i++) {
		if(typeof scat[i] == 'undefined') continue;
		scat[i] = scat[i].replace(/\ \ /g,' ').replace(/\ \ /g,' ');
		var sl = scat[i].split(' ');
		if(sl[0]!='RUNSQL') continue;
		if(!alasql.databases[sl[2]]) {
//			console.log('SKIPPED');
			continue;
		}
		process.stdout.write(sl[1]+'('+sl[2]+'): ');
		runTest(sl[1],sl[2]);
		process.stdout.write('\n');
	}
	process.stdout.write('\n');
};

function runTest(filename,schemaid) {
	// Broken files
//	if(filename == 'sc11tab') return;

	alasql('USE '+schemaid);
	var sch = fs.readFileSync('test/'+filename+'.sql').toString().replace(/\n\r/g,"\n").split(/\n/g);
	var sql = '';
	for(var i=0;i<sch.length;i++) {
		var sl = sch[i];
		ss = sl.split('--');
		if(ss[0].trim()=='') {
			if (ss[1] && ss[1].trim().split(':')[0] == 'PASS') {
				processTest(sql);
				processTest(sl);
				sql = '';
				continue;
			} else {
				processTest(sql);
				sql = '';
				continue;
			}
		}
		sql += sl.trim()+' ';
	}
	processTest(sql);
//	console.log(Object.keys(alasql.databases[schemaid].tables));
}


var lastRes;
var lastSql;

function processTest(sql) {
	var ss = sql.split(';');
	if(ss && ss.length > 0) {
		ss.forEach(function(s){
			processTestOne(s);
		});
	}
};

function processTestOne(sql) {

	if(sql.trim() == '') return;
	var qq = '-- PASS:Setup if count = '.toLowerCase();
	if(sql.substr(0,qq.length).toLowerCase() == qq) {
		var tres = sql.substr(qq.length).replace(/\?/g,"");
		if(!lastRes || typeof lastRes != 'object') {
			nokk++;
			process.stdout.write('!');
			return;
		};
		lastRes1 = lastRes[0][Object.keys(lastRes[0])[0]];
//		console.log('test for count', tres,lastRes1);
		nokk++;
		if(lastRes1 == tres) {
			nok++;
			process.stdout.write('=');
//			console.log('OK');
		} else {
			process.stdout.write('!');
//			console.log('BAD', lastSql, lastRes,lastRes1, tres);
		}
	} else {

		ntests++;
		var bad = false;
		try {
			alasql.parse(sql);
		} catch(err) {
			bad = true;
		}
		if(bad) {
			return;
		} else {
			nparsed++;
		}

		var bad = false;
		var res;
		try {
			res = alasql(sql);
		} catch(err) {
			bad = true;
		}
		if(bad) {
			process.stdout.write('+');			
			return;
		} else {
			process.stdout.write('.');						
			npassed++;
		}

		lastRes = res;
		lastSql = sql;
//		console.log(sql,lastRes);		
	}


}