if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '807'; // insert test file number

describe('Test ' + test + ' - Composite foreign keys.', function () {
	it('Create tables with foreign keys', function (done) {
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

	it('CREATE TABLE with FOREIGN KEYS and INSERT', function (done) {
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
		assert.deepEqual(res, [{'COUNT(*)': 1}]);
		var res = alasql('SELECT COUNT (*) FROM SITE');
		assert.deepEqual(res, [{'COUNT(*)': 1}]);
		done();
	});

	it('CREATE TABLE with FOREIGN KEYS and INSERT (with partial null foreign key)', function (done) {
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
		assert.throws(function () {
			alasql(
				'insert into COLLABORATOR(companyId, siteId, id, name) values ("achme", NULL, "700", "dnoB semaJ");'
			);
		});
		done();
	});

	it('CREATE TABLE with FOREIGN KEYS and INSERT (with full null foreign key)', function (done) {
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
		assert.deepEqual(res, [{'COUNT(*)': 1}]);
		done();
	});

	it('Insert wrong data without references', function (done) {
		assert.throws(function () {
			alasql(
				'insert into COLLABORATOR(companyId, siteId, id, name) values ("badData", "badData", "badData", "badData");'
			);
		});
		done();
	});
});
