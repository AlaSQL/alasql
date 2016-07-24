Package.describe({
	name: 'agershun:alasql',
	version: '0.2.9',
	// Brief, one-line summary of the package.
	summary: 'Please use NPM package of alasql instead.',
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

  	api.mainModule('alasql.js');

	// Todo: implement browser version for client and fs version for server
	//api.mainModule('alasql.fs.js', 'server');
	//api.mainModule('alasql.js', 'client');

});

Package.onTest(function(api) {
	//  api.use('tinytest');
	//  api.use('agershun:alasql');
	//  api.addFiles('alasql-tests.js');
});

Npm.depends({
	"lodash": "4.12.0",
	"request": "2.69.0",
	"xlsjs": "0.7.5",
	"xlsx": "0.8.0"
});


