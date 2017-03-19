if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
	var fs = require("fs");
}

var test = '612'; // insert test file number

describe('Test '+test+' - INTO CSV', function() {
	
	before(function(){
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
		alasql('CREATE TABLE one (a INT, b VARCHAR)');
		alasql('INSERT INTO one VALUES (10, \'swoll\'),' +
                        '(11, \'muscles\')');

	});

	after(function(){
		alasql('DROP DATABASE test' + test);
		fs.unlink('test612-0.csv', function(err) {  });
		fs.unlink('test612-1.csv', function(err) {  });
		fs.unlink('test612-2.csv', function(err) {  });
		fs.unlink('test612-3.csv', function(err) {  });
        });

	it('With quote = \'\', single string value', function(){
		alasql("SELECT 'swing' AS `colname` INTO CSV('test612-0', {quote:''})");
		fs.open('test612-0.csv', 'r', function(err, fd) {
			if (err) {
				console.error(err);
			}

			var buf = new Buffer(1024);
			var csvstr = '';
			fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
				if (err) {
					console.error(err);
				}

				if (bytes > 0) {
					csvstr = buf.slice(0, bytes).toString();
				}

				assert(csvstr === 'colname\n"swing"');
		
				fs.close(fd, function(err) {
					if (err) {
						console.error(err);
					}
				});
			});
        	});
	});

	it('With quote = \'\', single multiword string value', function(){
		alasql("SELECT 'swing out' AS `colname` INTO CSV('test612-1', {quote:''})");
		fs.open('test612-1.csv', 'r', function(err, fd) {
			if (err) {
				console.error(err);
			}

			var buf = new Buffer(1024);
			var csvstr = '';
			fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
				if (err) {
					console.error(err);
				}

				if (bytes > 0) {
					csvstr = buf.slice(0, bytes).toString();
				}

				assert(csvstr === 'colname\n"swing out"');
		
				fs.close(fd, function(err) {
					if (err) {
						console.error(err);
					}
				});
			});
        	});
	});

	it('With quote = \'\', multiple rows', function(){
		alasql("SELECT a, b INTO CSV('test612-2', {quote:''}) FROM one");
		fs.open('test612-2.csv', 'r', function(err, fd) {
			if (err) {
				console.error(err);
			}

			var buf = new Buffer(1024);
			var csvstr = '';
			fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
				if (err) {
					console.error(err);
				}

				if (bytes > 0) {
					csvstr = buf.slice(0, bytes).toString();
				}

				assert(csvstr === 'a;b\n10,"swoll"\n11,"muscles"');
		
				fs.close(fd, function(err) {
					if (err) {
						console.error(err);
					}
				});
			});
        	});
	});


	it('With quote = \'\\?\', single multiword string value', function(){
		alasql("SELECT 'swing out' AS `colname` INTO CSV('test612-3', {quote:''})");
		fs.open('test612-3.csv', 'r', function(err, fd) {
			if (err) {
				console.error(err);
			}

			var buf = new Buffer(1024);
			var csvstr = '';
			fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
				if (err) {
					console.error(err);
				}

				if (bytes > 0) {
					csvstr = buf.slice(0, bytes).toString();
				}

				assert(csvstr === 'colname\n?swing out?');
		
				fs.close(fd, function(err) {
					if (err) {
						console.error(err);
					}
				});
			});
        	});
	});
});
