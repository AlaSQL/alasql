var fs = require('fs');
var alasql = require('../../dist/alasql.js')

createSchemas();
runTests();

function createSchemas(){
	console.log('CREATE SCHEMAS');
	console.log('==============');
	var scat = fs.readFileSync('schema/runsch.all').toString().replace(/\n\r/g,"\n").split(/\n/g);
	for(var i=0; i<47/*47*/;i++) {
		if(typeof scat[i] == 'undefined') continue;
		scat[i] = scat[i].replace(/\ \ /g,' ').replace(/\ \ /g,' ');
		var sl = scat[i].split(' ');
		if(sl[0]!='RUNSCH') continue;
		if(sl[1] == 'schema8.std') continue;
		if(sl[1] == 'schema9.std') continue;
		if(sl[1] == 'schem10.std') continue;
		if(sl[1] == 'schem11.std') continue;
		if(sl[1] == 'schem12.std') continue;
		if(sl[1] == 'cts5sch2.sql') continue;
		if(sl[1] == 'cts5sch3.sql') continue;
		process.stdout.write(sl[1]+'('+sl[2]+'), ');
		createSchema(sl[1],sl[2]);
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
		return;
	} else if(w[0] == 'CREATE' && w[1] == 'SCHEMA' && w[2] != 'AUTHORIZATION') {
		alasql('CREATE DATABASE '+w[2]+';USE '+w[2]);
		return;
	} else if(w[0] == 'CREATE' && w[1] == 'TABLE') {
//		console.log('***',sql);
		alasql(sql);
	}

}

function runTests(){
	console.log('RUN TESTS');
	console.log('=========');
	var scat = fs.readFileSync('test/runsql.all').toString().replace(/\n\r/g,"\n").split(/\n/g);
	for(var i=0; i<19;i++) {
		if(typeof scat[i] == 'undefined') continue;
		scat[i] = scat[i].replace(/\ \ /g,' ').replace(/\ \ /g,' ');
		var sl = scat[i].split(' ');
		if(sl[0]!='RUNSQL') continue;
		console.log(sl[1]+'('+sl[2]+'): ');
		runTest(sl[1],sl[2]);
	}
	process.stdout.write('\n');
};

function runTest(filename,schemaid) {
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
	if(sql.trim() == '') return;
	var qq = '-- PASS:Setup if count = ';
	if(sql.substr(0,qq.length) == qq) {
		var tres = sql.substr(qq.length).replace(/\?/g,"");
		lastRes1 = lastRes[0][Object.keys(lastRes[0])[0]];
//		console.log('test for count', tres,lastRes1);
		if(lastRes1 == tres) {
//			console.log('OK');
		} else {
			console.log('BAD', lastSql, lastRes,lastRes1, tres);
		}
	} else {
		lastRes = alasql(sql);
		lastSql = sql;
//		console.log(sql,lastRes);		
	}


}