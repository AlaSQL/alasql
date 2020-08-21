if (typeof describe !== 'function') {
	var http = require('http'),
		url = require('url'),
		path = require('path'),
		fs = require('fs'),
		exec = require('child_process').exec,
		port = process.argv[2] || 8888;

	// Making HTML for the test
	var template = fs.readFileSync(__dirname + '/browserTestRunner.tmlp.html', 'utf8');

	var testFiles = walkFiles(__dirname, /test\d{3}\.js$/, null, true, true);

	var testFilesHtml = '';

	for (var i in testFiles) {
		testFilesHtml += '<script src="' + testFiles[i] + '"></script>\n';
	}

	var html = template.replace('@INSERT_TESTFILES', testFilesHtml);

	// Server from https://gist.github.com/ryanflorence/701407
	http
		.createServer(function (request, response) {
			var uri = url.parse(request.url).pathname,
				filename = path.join(__dirname, uri);

			// all subfolder paths starts from ../ folder
			if (2 < uri.split('/').length) {
				filename = path.join(__dirname + '/../', uri);
			}

			if ('/' === uri) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(html);
				response.end();
				return;
			}

			fs.exists(filename, function (exists) {
				if (!exists || fs.statSync(filename).isDirectory()) {
					response.writeHead(404, {'Content-Type': 'text/plain'});
					response.write('404 Not Found\n');
					response.end();
					return;
				}

				fs.readFile(filename, 'binary', function (err, file) {
					if (err) {
						response.writeHead(500, {'Content-Type': 'text/plain'});
						response.write(err + '\n');
						response.end();
						return;
					}

					response.writeHead(200);
					response.write(file, 'binary');
					response.end();
				});
			});
		})
		.listen(parseInt(port, 10));

	console.log(
		'Ready to test AlaSQL in the browser at\n  => http://localhost:' +
			port +
			'/\nCTRL + C to shutdown'
	);

	if ('win32' == process.platform) {
		exec('start ' + 'http://localhost:' + port);
	} else {
		exec('open ' + 'http://localhost:' + port);
	}

	function walkFiles(dir, reFilterYes, reFilterNo, oneFolderOnly, onlyFileName) {
		reFilterYes = reFilterYes || false;
		reFilterNo = reFilterNo || false;

		var results = [];
		var list = fs.readdirSync(dir);
		list.forEach(function (fileName) {
			var file = dir + '/' + fileName;
			if (reFilterNo && reFilterNo.test(file)) return;
			var stat = fs.statSync(file);
			if (!oneFolderOnly && stat && stat.isDirectory()) {
				results = results.concat(walkFiles(file, reFilterYes, reFilterNo));
			} else {
				if (reFilterYes && !reFilterYes.test(file)) return;
				results.push(onlyFileName ? fileName : file);
			}
		});
		return results;
	}
}
