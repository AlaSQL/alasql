var fs = require('fs');
var alasql = require('../../dist/alasql.js')

createSchemas();
runTests();

function createSchemas(){
	var scat = fs.readFileSync('schema/runsch.all').toString().replace(/\n\r/g,"\n").split(/\n/g);
	for(var i=0; i<27/*47*/;i++) {
		if(typeof scat[i] == 'undefined') continue;
		scat[i] = scat[i].replace(/\ \ /g,' ').replace(/\ \ /g,' ');
		var sl = scat[i].split(' ');
		if(sl[0]!='RUNSCH') continue;
		console.log(sl);
		createSchema(sl[1],sl[2]);
	}
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
}

function processDDL(sql) {
	if(sql.trim()=='') return;
	var w = sql.split(' ');
	if(w[0] == 'CREATE' && w[1] == 'SCHEMA') {
		alasql('CREATE DATABASE '+w[3]+';USE '+w[3]);
		return;
	} else if(w[0] == 'CREATE' && w[1] == 'TABLE') {
//		console.log('***',sql);
		alasql(sql);
	}

}

function runTests(){
	
};