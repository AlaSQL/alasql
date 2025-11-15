// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

var test_number = '807'; // insert test file number

describe('Test ' + test_number + ' - Composite foreign keys.', () => {
	test('Create tables with foreign keys', done => {
		alasql('DROP TABLE IF EXISTS COMPANY');
		alasql('DROP TABLE IF EXISTS SITE');
		alasql('DROP TABLE IF EXISTS COLLABORATOR');
		alasql(
			'create table COMPANY ( ' +
				' id        varchar(50) not null, ' +
				' name      varchar(255) unique not null, ' +
				' constraint CMP_PK primary key (id) ' +
				');'
		);

		alasql(
			'create table SITE ( ' +
				'companyId     varchar(  50) not null, ' +
				'id            varchar(  50) not null, ' +
				'name          varchar( 255) not null, ' +
				'constraint SITE_PK primary key (companyId, id), ' +
				'constraint SITE_COMPANY_FK foreign key (companyId) REFERENCES COMPANY(id) ' +
				');'
		);

		alasql(
			'create table COLLABORATOR ( ' +
				'companyId     varchar(  50) not null, ' +
				'siteId        varchar(  50) not null, ' +
				'id            varchar(  50) not null, ' +
				'name          varchar( 255) not null, ' +
				'constraint COLLABORATOR_PK primary key (companyId, siteId, id), ' +
				'constraint COLLABORATOR_COMP_FK foreign key (companyId) references COMPANY(companyId), ' +
				'constraint COLLABORATOR_SITE_FK foreign key (companyId, siteId) references SITE(companyId, id) ' +
				');'
		);

		done();
	});

	test('CREATE TABLE with FOREIGN KEYS and INSERT', done => {
		alasql('DROP TABLE IF EXISTS COMPANY');
		alasql('DROP TABLE IF EXISTS SITE');
		alasql('DROP TABLE IF EXISTS COLLABORATOR');
		alasql(
			'create table COMPANY ( ' +
				' id        varchar(50) not null, ' +
				' name      varchar(255) unique not null, ' +
				' constraint CMP_PK primary key (id) ' +
				');'
		);

		alasql(
			'create table SITE ( ' +
				'companyId     varchar(  50) not null, ' +
				'id            varchar(  50) not null, ' +
				'name          varchar( 255) not null, ' +
				'constraint SITE_PK primary key (companyId, id), ' +
				'constraint SITE_COMPANY_FK foreign key (companyId) REFERENCES COMPANY(id) ' +
				');'
		);

		alasql(
			'create table COLLABORATOR ( ' +
				'companyId     varchar(  50) not null, ' +
				'siteId        varchar(  50) not null, ' +
				'id            varchar(  50) not null, ' +
				'name          varchar( 255) not null, ' +
				'constraint COLLABORATOR_PK primary key (companyId, siteId, id), ' +
				'constraint COLLABORATOR_COMP_FK foreign key (companyId) references COMPANY(id), ' +
				'constraint COLLABORATOR_SITE_FK foreign key (companyId, siteId) references SITE(companyId, id) ' +
				');'
		);
		alasql('insert into COMPANY(id, name) values ("achme", "Acme Corp");');
		alasql('insert into SITE(companyId, id, name) values ("achme", "area51", "Area 51");');
		alasql(
			'insert into COLLABORATOR(companyId, siteId, id, name) values ("achme", "area51", "700", "dnoB semaJ");'
		);
		var res = alasql('SELECT COUNT (*) FROM COLLABORATOR');
		expect(res).toEqual([{'COUNT(*)': 1}]);
		var res = alasql('SELECT COUNT (*) FROM SITE');
		expect(res).toEqual([{'COUNT(*)': 1}]);
		done();
	});

	test('CREATE TABLE with FOREIGN KEYS and INSERT (with partial null foreign key)', done => {
		alasql('DROP TABLE IF EXISTS COMPANY');
		alasql('DROP TABLE IF EXISTS SITE');
		alasql('DROP TABLE IF EXISTS COLLABORATOR');
		alasql(
			'create table COMPANY ( ' +
				' id        varchar(50) not null, ' +
				' name      varchar(255) unique not null, ' +
				' constraint CMP_PK primary key (id) ' +
				');'
		);

		alasql(
			'create table SITE ( ' +
				'companyId     varchar(  50) not null, ' +
				'id            varchar(  50) not null, ' +
				'name          varchar( 255) not null, ' +
				'constraint SITE_PK primary key (companyId, id), ' +
				'constraint SITE_COMPANY_FK foreign key (companyId) REFERENCES COMPANY(id) ' +
				');'
		);

		alasql(
			'create table COLLABORATOR ( ' +
				'companyId     varchar(  50) not null, ' +
				'siteId        varchar(  50), ' + //can be null
				'id            varchar(  50) not null, ' +
				'name          varchar( 255) not null, ' +
				'constraint COLLABORATOR_PK primary key (companyId, siteId, id), ' +
				'constraint COLLABORATOR_COMP_FK foreign key (companyId) references COMPANY(id), ' +
				'constraint COLLABORATOR_SITE_FK foreign key (companyId, siteId) references SITE(companyId, id) ' +
				');'
		);
		alasql('insert into COMPANY(id, name) values ("achme", "Acme Corp");');
		alasql('insert into SITE(companyId, id, name) values ("achme", "area51", "Area 51");');
		expect(() => {
			alasql(
				'insert into COLLABORATOR(companyId, siteId, id, name) values ("achme", NULL, "700", "dnoB semaJ");'
			);
		}).toThrow();
		done();
	});

	test('CREATE TABLE with FOREIGN KEYS and INSERT (with full null foreign key)', done => {
		alasql('DROP TABLE IF EXISTS COMPANY');
		alasql('DROP TABLE IF EXISTS SITE');
		alasql('DROP TABLE IF EXISTS COLLABORATOR');
		alasql(
			'create table COMPANY ( ' +
				' id        varchar(50) not null, ' +
				' name      varchar(255) unique not null, ' +
				' constraint CMP_PK primary key (id) ' +
				');'
		);

		alasql(
			'create table SITE ( ' +
				'companyId     varchar(  50) not null, ' +
				'id            varchar(  50) not null, ' +
				'name          varchar( 255) not null, ' +
				'constraint SITE_PK primary key (companyId, id), ' +
				'constraint SITE_COMPANY_FK foreign key (companyId) REFERENCES COMPANY(id) ' +
				');'
		);

		alasql(
			'create table COLLABORATOR ( ' +
				'companyId     varchar(  50), ' + //can be null
				'siteId        varchar(  50), ' + //can be null
				'id            varchar(  50) not null, ' +
				'name          varchar( 255) not null, ' +
				'constraint COLLABORATOR_PK primary key (id), ' +
				'constraint COLLABORATOR_COMP_FK foreign key (companyId) references COMPANY(id), ' +
				'constraint COLLABORATOR_SITE_FK foreign key (companyId, siteId) references SITE(companyId, id) ' +
				');'
		);
		alasql('insert into COMPANY(id, name) values ("achme", "Acme Corp");');
		alasql('insert into SITE(companyId, id, name) values ("achme", "area51", "Area 51");');
		alasql(
			'insert into COLLABORATOR(companyId, siteId, id, name) values (NULL, NULL, "700", "dnoB semaJ");'
		);

		var res = alasql('SELECT COUNT (*) FROM COLLABORATOR');
		expect(res).toEqual([{'COUNT(*)': 1}]);
		done();
	});

	test('Insert wrong data without references', done => {
		expect(() => {
			alasql(
				'insert into COLLABORATOR(companyId, siteId, id, name) values ("badData", "badData", "badData", "badData");'
			);
		}).toThrow();
		done();
	});
});
