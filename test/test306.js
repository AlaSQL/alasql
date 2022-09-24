if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 306 XML reader', function() {
	before(function() {
		alasql('CREATE DATABASE test306;USE test306');
	});

	after(function() {
		alasql('DROP DATABASE test306');
	});

	it('1. Read XML file / SEARCH like JSON', function(done) {
		alasql(
			'SEARCH children/"Worksheet" attributes [ss:Name] FROM XML("' +
				__dirname +
				'/test306.xml")',
			[],
			function(res) {
				assert.deepEqual(res, ['Sheet1', 'demo']);
				done();
			}
		);
	});

	it('1a. Read XML file / SEARCH XML', function(done) {
		//    alasql('SEARCH xml /Worksheet%[ss:Name] FROM XML("test306.xml")',[],function(res){
		alasql(
			'SEARCH XML Worksheet %[ss:Name] FROM XML("' + __dirname + '/test306.xml")',
			[],
			function(res) {
				//      console.log(res);
				assert.deepEqual(res, ['Sheet1', 'demo']);
				done();
			}
		);
	});

	it('2. Read XML file / SEARCH XML', function(done) {
		//    alasql('SEARCH xml /Worksheet%[ss:Name] FROM XML("test306.xml")',[],function(res){
		alasql(
			'SEARCH XML Worksheet %[ss:Name] FROM XML("' + __dirname + '/test306.xml")',
			[],
			function(res) {
				//      console.log(res);
				assert.deepEqual(res, ['Sheet1', 'demo']);
				done();
			}
		);
	});

	it('3. Read XML file / SEARCH XML', function(done) {
		alasql('SEARCH XML / * Data$ FROM XML("' + __dirname + '/test306.xml")', [], function(res) {
			//       console.log(res);
			assert.deepEqual(res, ['aaaa', '2', '3', '5', '6', '7']);
			done();
		});
	});

	it('4. Read XML file / SEARCH XML', function(done) {
		alasql(
			'SEARCH XML / *Data$ WHERE(_>3) FROM XML("' + __dirname + '/test306.xml")',
			[],
			function(res) {
				assert.deepEqual(res, ['5', '6', '7']);
				done();
			}
		);
	});

	it('5. Read XML file / SEARCH XML', function(done) {
		alasql('SEARCH xml %xmlns FROM XML("' + __dirname + '/test306.xml")', [], function(res) {
			//      console.log(res);
			assert.deepEqual(res, ['urn:schemas-microsoft-com:office:spreadsheet']);
			done();
		});
	});

	it('6a. Read GEFX file / SEARCH XML', function(done) {
		//     alasql('SEARCH XML /graph/nodes/% {[$id]:id,name:label} FROM XML("test306a.xml")',[],function(res){
		alasql(
			'SEARCH XML [graph] nodes node %/ {[$id]:id,name:label,[$node]:"VERTEX"} FROM XML("' +
				__dirname +
				'/test306a.xml")',
			[],
			function(res) {
				//      console.log(res);
				assert.deepEqual(res, [
					{$id: '0', name: 'Hello', $node: 'VERTEX'},
					{$id: '1', name: 'Word', $node: 'VERTEX'},
				]);
				done();
			}
		);
	});

	it('6b. Read GEFX file / SEARCH XML', function(done) {
		//     alasql('SEARCH XML /graph/nodes/% {[$id]:id,name:label} FROM XML("test306a.xml")',[],function(res){
		alasql(
			'SEARCH XML [graph] nodes/%/ {[$id]:id,name:label} FROM XML("' +
				__dirname +
				'/test306a.xml")',
			[],
			function(res) {
				assert.deepEqual(res, [{$id: '0', name: 'Hello'}, {$id: '1', name: 'Word'}]);
				done();
			}
		);
	});
	it('7. Edges ', function(done) {
		//     alasql('SEARCH XML /graph/edges/% FROM XML("test306a.xml")',[],function(res){
		alasql(
			'SEARCH XML [graph] edges/%/ FROM XML("' + __dirname + '/test306a.xml")',
			[],
			function(res) {
				//        console.log(res);
				assert.deepEqual(res, [{id: '0', source: '0', target: '1'}]);
				done();
			}
		);
	});

	it('7. SEARCH INTO ', function(done) {
		alasql(
			'SEARCH XML [graph] edges/%/ INTO CSV({headers:true, utf8Bom:false}) FROM XML("' +
				__dirname +
				'/test306a.xml")',
			[],
			function(res) {
				//     alasql('SEARCH XML /graph/edges/% INTO CSV({headers:true}) FROM XML("test306a.xml")',[],function(res){
				//        console.log('>>',res,'<<');
				assert.deepEqual(res, '"id";"source";"target"\r\n0;0;1\r\n');
				//         assert.deepEqual(res, [ { id: '0', source: '0', target: '1' } ]);
				done();
			}
		);
	});
});
