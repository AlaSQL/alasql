// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 143 streamfn', () => {
	test('1. Create database', done => {
		alasql('CREATE DATABASE test143; use test143');
		done();
	});

	test('3. INNER JOIN on stream', done => {
		test143(true);
		alasql.databases[alasql.useid].dbversion++;
		test143(false);
		alasql.databases[alasql.useid].dbversion++;
		//		test143(true);
		//		test143(false);
		//		test143(true);

		//console.log(res.length);
		done();
	});

	test('99. Drop database', done => {
		alasql('DROP DATABASE test143');
		done();
	});
});

function test143(dontcache) {
	var nc1 = 0,
		nc2 = 0,
		nc3 = 0;

	var myfn = function (i) {
		nc1++;
		if (i >= 100) return;
		return {a: i, b: i + 2};
	};
	myfn.dontcache = dontcache;

	var myfn2 = function (i) {
		nc2++;
		if (i >= 100) return;
		for (var k = 0; k < 10; k++) {
			Math.random();
		}
		return {a: (i % 25) + 1, c: (i + 1) * 10};
	};
	myfn2.dontcache = dontcache;
	//		myfn3.dontcache = true;
	var tm = Date.now();
	//if(true) {
	var res = alasql('select q.a, q.b, t.a as ta, t.c from ? q INNER join ? t using a', [
		myfn,
		myfn2,
	]);
	nc3 += res.length;

	//console.table(res);
	//		console.log('INNER',res.length);
	//if(false) {
	var res = alasql('select q.a, q.b, t.a as ta, t.c from ? q SEMI join ? t using a', [myfn, myfn2]);
	nc3 += res.length;
	//console.table(res);
	//console.log('SEMI', res.length);
	//}
	var res = alasql('select q.a, q.b, t.a as ta, t.c from ? q ANTI join ? t using a', [myfn, myfn2]);
	nc3 += res.length;
	//console.table(res);
	//console.log('ANTI', res.length);

	//if(true) {
	var res = alasql('select q.a, q.b, t.a as ta, t.c from ? q LEFT join ? t using a', [myfn, myfn2]);
	nc3 += res.length;
	//console.table(res);
	//console.log('LEFT',res.length);
	//		expect(res.length == 13013).toBe(true);

	var res = alasql('select q.a, q.b, t.a as ta, t.c from ? q RIGHT join ? t using a', [
		myfn,
		myfn2,
	]);
	nc3 += res.length;
	//console.table(res);
	//console.log('RIGHT',res.length);
	//expect(res.length == 13039).toBe(true);

	var res = alasql('select q.a, q.b, t.a as ta, t.c from ? q OUTER join ? t using a', [
		myfn,
		myfn2,
	]);
	nc3 += res.length;
	//console.table(res);
	//console.log('OUTER',res.length);
	//		expect(res.length == 13039).toBe(true);
	//}
	//}
	// var res = alasql('select q.a, q.b, t.c from ? q OUTER join ? t using a '+
	// 	'EXCEPT select q.a, q.b, t.c from ? q LEFT join ? t using a',[myfn,myfn2,myfn,myfn2]);
	// console.log(res);

	//		console.log(res);
	tm = Date.now() - tm;
	//			console.log(tm);
	//			console.log(dontcache, nc1,nc2, nc3, tm/nc2);
}
