// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

describe('Test 63 - PIVOT', () => {
	test('Create new table', done => {
		alasql('create database test63');
		alasql('use database test63');
		alasql('drop table if exists sales');
		alasql('create table sales (city string, product string, qty int)');
		alasql('insert into sales values ("Minsk","Pen",100)');
		alasql('insert into sales values ("Minsk","Pencil",100)');
		alasql('insert into sales values ("Bratislava","Pen",50)');
		expect(250).toEqual(alasql('select value sum(qty) from sales'));
		done();
	});

	test('PIVOT - not yet created', done => {
		var res = alasql('select * from sales');

		//		alasql('drop database test63');
		done();
	});
});
