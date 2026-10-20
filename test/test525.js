if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
} else {
	__dirname = '.';
}

describe('Test 525 - XLSXML XML character escaping', function () {
	if (typeof exports === 'object') {
		it('A) Export data with special XML characters', function (done) {
			var data = [
				{name: 'Test & Co', value: '<10'},
				{name: 'Quotes "test"', value: "It's > 5"},
				{name: 'Ampersand & less', value: '3 < 5 & 7 > 6'},
				{name: 'Normal text', value: 100},
			];

			var outfile = __dirname + '/restest525.xls';
			alasql('SELECT * INTO XLSXML(?,{headers:true}) FROM ?', [outfile, data], function () {
				// Read the file and check if it's valid XML
				fs.readFile(outfile, 'utf8', function (err, content) {
					if (err) {
						done(err);
						return;
					}

					// Check that special characters are properly escaped
					// & should be &amp;
					// < should be &lt;
					// > should be &gt;
					// " should be &quot; (in attributes)
					// ' should be &apos; or &#39; (in attributes)

					// The file should not contain unescaped special characters in data cells
					// We should be able to parse it as XML
					try {
						// Check that file contains proper XML header
						assert(content.includes('<?xml version="1.0"?>'), 'Should have XML header');
						assert(
							content.includes('xmlns="urn:schemas-microsoft-com:office:spreadsheet"'),
							'Should have proper namespace'
						);

						// Check that the content doesn't have raw unescaped characters in data
						// Extract data content between <Data> tags
						var dataMatches = content.match(/<Data[^>]*>([^<]*)<\/Data>/g);
						if (dataMatches) {
							dataMatches.forEach(function (match) {
								var innerText = match.replace(/<Data[^>]*>/, '').replace(/<\/Data>/, '');
								// If there's text content, it should not contain unescaped < > & unless they are entity references
								if (innerText && innerText.length > 0) {
									// Check for unescaped ampersands (not part of entity reference)
									var hasUnescapedAmp = /&(?!(amp|lt|gt|quot|apos|#\d+);)/.test(innerText);
									if (hasUnescapedAmp) {
										throw new Error('Found unescaped ampersand in: ' + innerText);
									}
								}
							});
						}

						done();
					} catch (e) {
						done(e);
					}
				});
			});
		});

		it('B) Verify exported data can be read back', function (done) {
			var data = [
				{name: 'Test & Co', value: '<10'},
				{name: 'Quotes "test"', value: "It's > 5"},
			];

			var outfile = __dirname + '/restest525b.xls';
			alasql('SELECT * INTO XLSXML(?,{headers:true}) FROM ?', [outfile, data], function () {
				// Try to read it back using alasql's XML parser
				alasql('SELECT * FROM XML(?)', [outfile], function (res) {
					// The file should at least be parseable
					assert(res, 'Should be able to read the file');
					done();
				});
			});
		});

		it('C) Test all five XML special characters', function (done) {
			var data = [
				{
					text: 'Contains & ampersand',
					description: 'First < second',
				},
				{
					text: 'Greater > than',
					description: 'Quote "in" text',
				},
				{
					text: "Apostrophe's here",
					description: 'All: < > & " \' together',
				},
			];

			var outfile = __dirname + '/restest525c.xls';
			alasql('SELECT * INTO XLSXML(?,{headers:true}) FROM ?', [outfile, data], function () {
				fs.readFile(outfile, 'utf8', function (err, content) {
					if (err) {
						done(err);
						return;
					}

					// File should be valid XML - try basic validation
					// Should not have unescaped < or > or & in data content
					var lines = content.split('\n');
					var inData = false;
					var errors = [];

					lines.forEach(function (line, i) {
						// Simple check: if we're in a data cell, unescaped special chars are bad
						if (line.includes('<Data')) {
							var dataContent = line.match(/<Data[^>]*>(.+?)<\/Data>/);
							if (dataContent && dataContent[1]) {
								var text = dataContent[1];
								// Check for unescaped & (not followed by valid entity)
								if (/&(?!(amp|lt|gt|quot|apos|#\d+);)/.test(text)) {
									errors.push('Line ' + (i + 1) + ': unescaped & in: ' + text);
								}
								// Check for unescaped < or >
								if (/[<>]/.test(text)) {
									errors.push('Line ' + (i + 1) + ': unescaped < or > in: ' + text);
								}
							}
						}
					});

					if (errors.length > 0) {
						done(new Error('XML validation errors:\n' + errors.join('\n')));
					} else {
						done();
					}
				});
			});
		});
	}
});
