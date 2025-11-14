// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 306 XML reader', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test306;USE test306');
	});

	afterAll(function () {
		alasql('DROP DATABASE test306');
	});

	test('1. Read XML file / SEARCH like JSON', function (done) {
		alasql(
			'SEARCH children/"Worksheet" attributes [ss:Name] FROM XML("' + __dirname + '/test306.xml")',
			[],
			function (res) {
				assert.deepEqual(res, ['Sheet1', 'demo']);
				done();
			}
		);
	});

	test('1a. Read XML file / SEARCH XML', function (done) {
		//    alasql('SEARCH xml /Worksheet%[ss:Name] FROM XML("test306.xml")',[],function(res){
		alasql(
			'SEARCH XML Worksheet %[ss:Name] FROM XML("' + __dirname + '/test306.xml")',
			[],
			function (res) {
				//      console.log(res);
				assert.deepEqual(res, ['Sheet1', 'demo']);
				done();
			}
		);
	});

	test('2. Read XML file / SEARCH XML', function (done) {
		//    alasql('SEARCH xml /Worksheet%[ss:Name] FROM XML("test306.xml")',[],function(res){
		alasql(
			'SEARCH XML Worksheet %[ss:Name] FROM XML("' + __dirname + '/test306.xml")',
			[],
			function (res) {
				//      console.log(res);
				assert.deepEqual(res, ['Sheet1', 'demo']);
				done();
			}
		);
	});

	test('3. Read XML file / SEARCH XML', function (done) {
		alasql('SEARCH XML / * Data$ FROM XML("' + __dirname + '/test306.xml")', [], function (res) {
			//       console.log(res);
			assert.deepEqual(res, ['aaaa', '2', '3', '5', '6', '7']);
			done();
		});
	});

	test('4. Read XML file / SEARCH XML', function (done) {
		alasql(
			'SEARCH XML / *Data$ WHERE(_>3) FROM XML("' + __dirname + '/test306.xml")',
			[],
			function (res) {
				assert.deepEqual(res, ['5', '6', '7']);
				done();
			}
		);
	});

	test('5. Read XML file / SEARCH XML', function (done) {
		alasql('SEARCH xml %xmlns FROM XML("' + __dirname + '/test306.xml")', [], function (res) {
			//      console.log(res);
			assert.deepEqual(res, ['urn:schemas-microsoft-com:office:spreadsheet']);
			done();
		});
	});

	test('6a. Read GEFX file / SEARCH XML', function (done) {
		//     alasql('SEARCH XML /graph/nodes/% {[$id]:id,name:label} FROM XML("test306a.xml")',[],function(res){
		alasql(
			'SEARCH XML [graph] nodes node %/ {[$id]:id,name:label,[$node]:"VERTEX"} FROM XML("' +
				__dirname +
				'/test306a.xml")',
			[],
			function (res) {
				//      console.log(res);
				assert.deepEqual(res, [
					{$id: '0', name: 'Hello', $node: 'VERTEX'},
					{$id: '1', name: 'Word', $node: 'VERTEX'},
				]);
				done();
			}
		);
	});

	test('6b. Read GEFX file / SEARCH XML', function (done) {
		//     alasql('SEARCH XML /graph/nodes/% {[$id]:id,name:label} FROM XML("test306a.xml")',[],function(res){
		alasql(
			'SEARCH XML [graph] nodes/%/ {[$id]:id,name:label} FROM XML("' +
				__dirname +
				'/test306a.xml")',
			[],
			function (res) {
				assert.deepEqual(res, [
					{$id: '0', name: 'Hello'},
					{$id: '1', name: 'Word'},
				]);
				done();
			}
		);
	});
	test('7. Edges ', function (done) {
		//     alasql('SEARCH XML /graph/edges/% FROM XML("test306a.xml")',[],function(res){
		alasql(
			'SEARCH XML [graph] edges/%/ FROM XML("' + __dirname + '/test306a.xml")',
			[],
			function (res) {
				//        console.log(res);
				assert.deepEqual(res, [{id: '0', source: '0', target: '1'}]);
				done();
			}
		);
	});

	test('7. SEARCH INTO ', function (done) {
		alasql(
			'SEARCH XML [graph] edges/%/ INTO CSV({headers:true, utf8Bom:false}) FROM XML("' +
				__dirname +
				'/test306a.xml")',
			[],
			function (res) {
				//     alasql('SEARCH XML /graph/edges/% INTO CSV({headers:true}) FROM XML("test306a.xml")',[],function(res){
				//        console.log('>>',res,'<<');
				assert.deepEqual(res, '"id";"source";"target"\r\n0;0;1\r\n');
				//         assert.deepEqual(res, [ { id: '0', source: '0', target: '1' } ]);
				done();
			}
		);
	});
});
