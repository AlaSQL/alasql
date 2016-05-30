Package.describe({
	name: 'agershun:alasql',
	version: '0.2.7',
	// Brief, one-line summary of the package.
	summary: 'AlaSQL - JavaScript SQL database library',
	// URL to the Git repository containing the source code for this package.
	git: 'http://github.com/agershun/alasql.git',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	//  api.versionsFrom('METEOR-CORE@0.9.0');
	//  api.use('alasql', ['client', 'server']);
	//  api.export('alasql','client');
	//  api.addFiles('./../../dist/alasql.min.js');
	//  api.addFiles('./../../dist/alasql-echo.js');

  	api.mainModule('dist/alasql.min.js');

	// Todo: implement browser version for client and fs version for server
	//  api.mainModule('my-package-client.js', 'client');
	//  api.mainModule('my-package-server.js', 'server');

});

Package.onTest(function(api) {
	//  api.use('tinytest');
	//  api.use('agershun:alasql');
	//  api.addFiles('alasql-tests.js');
});

Npm.depends({
 	"es6-promise": "3.2.1",
	"lodash": "4.12.0",
	"request": "2.69.0",
	"xlsjs": "0.7.5",
	"xlsx": "0.8.0"
});


