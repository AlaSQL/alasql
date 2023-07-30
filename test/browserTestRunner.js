if (typeof describe !== 'function') {
	const http = require('http');
	const path = require('path');
	const {argv} = require('process');
	const fs = require('fs');
	const {exec} = require('child_process');

	const port = argv[2] || 8888;

	const types = {
		js: 'text/javascript',
		html: 'text/html',
		css: 'text/css',
		json: 'application/json',
	};

	// Making HTML for the test
	const template = fs.readFileSync(__dirname + '/browserTestRunner.tmlp.html', 'utf8');

	function walkFiles(dir, reFilterYes, reFilterNo, oneFolderOnly, onlyFileName) {
		reFilterYes = reFilterYes || false;
		reFilterNo = reFilterNo || false;

		let results = [];
		let list = fs.readdirSync(dir);
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

	const testFiles = walkFiles(__dirname, /test\d+\.js$/, null, true, true);

	const testFilesHtml = testFiles.map(file => `<script src="${file}"></script>`).join('\n');

	var html = template.replace('@INSERT_TESTFILES', testFilesHtml);

	// Server from https://gist.github.com/ryanflorence/701407
	http
		.createServer((request, response) => {
			let pathname = new URL(`http://localhost/` + request.url).pathname;

			// normalize leading slash
			pathname = '/' + pathname.replace(/^\/+/, '');

			var filename = path.join(__dirname, pathname);

			// all subfolder paths starts from ../ folder
			if (2 < pathname.split('/').length) {
				filename = path.join(__dirname + '/../', pathname);
			}

			if ('/' === pathname) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(html);
				response.end();
				return;
			}

			const exists = fs.existsSync(filename);

			if (!exists || fs.statSync(filename).isDirectory()) {
				response.writeHead(404, {'Content-Type': 'text/plain'});
				response.write('404 Not Found\n');
				response.end();
				return;
			}

			const type = types[path.extname(filename).slice(1)];

			response.writeHead(200, 'OK', {
				'content-type': type || 'application/octet-stream',
			});

			fs.createReadStream(filename).pipe(response);
		})
		.listen(port);

	console.log(`Ready to test AlaSQL in the browser at\n  => http://localhost:${port}`);
	console.log('CTRL + C to shutdown');

	exec(`${process.platform === 'win32' ? 'start' : 'open'} http://localhost:${port}`);
}
