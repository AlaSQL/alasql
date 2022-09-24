/*jshint unused:false*/
/*
    Utilities for Alasql.js

    @todo Review the list of utilities
    @todo Find more effective utilities
*/

/**
 Alasql utility functions
 @type {object}
 */
var utils = (alasql.utils = {});

/**
 Convert NaN to undefined
 @function
 @param {string} s JavaScript string to be modified
 @return {string} Covered expression

 @example

 123         => 123
 undefined   => undefined
 NaN         => undefined

 */
function n2u(s) {
	return '(y=' + s + ',y===y?y:undefined)';
}

/**
 Return undefined if s undefined
 @param {string} s JavaScript string to be modified
 @return {string} Covered expression

 @example

 123,a       => a
 undefined,a => undefined
 NaN,a       => undefined

 */
function und(s, r) {
	return '(y=' + s + ',typeof y=="undefined"?undefined:' + r + ')';
}

/**
 Return always true. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
 @function
 @return {boolean} Always true
 */
function returnTrue() {
	return true;
}

/**
 Return undefined. Stub for non-ecisting WHERE clause, because is faster then if(whenrfn) whenfn()
 @function
 @return {undefined} Always undefined
 */
function returnUndefined() {}

/**
 Escape string
 @function
 @param {string} s Source string
 @return {string} Escaped string
 @example

 Pit\er's => Pit\\er\'s

 */
// based on joliss/js-string-escape
var escapeq = (utils.escapeq = function (s) {
	//    console.log(s);
	return ('' + s).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
		// Escape all characters not included in SingleStringCharacters and
		// DoubleStringCharacters on
		// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
		switch (character) {
			case '"':
			case "'":
			case '\\':
				return '\\' + character;
			// Four possible LineTerminator characters need to be escaped:
			case '\n':
				return '\\n';
			case '\r':
				return '\\r';
			case '\u2028':
				return '\\u2028';
			case '\u2029':
				return '\\u2029';
		}
	});
});

/**
 Double quotes for SQL statements
 @param {string} s Source string
 @return {string} Escaped string

 @example

 Piter's => Piter''s

 */
var escapeqq = (utils.undoubleq = function (s) {
	return s.replace(/(\')/g, "''");
});

/**
 Replace double quotes with single quote
 @param {string} s Source string
 @return {string} Replaced string
 @example

 Piter''s => Piter's

 */
var doubleq = (utils.doubleq = function (s) {
	return s.replace(/(\'\')/g, "\\'");
});

/**
 Replace sigle quote to escaped single quote
 @param {string} s Source string
 @return {string} Replaced string

 @todo Chack this functions

 */
var doubleqq = (utils.doubleqq = function (s) {
	return s.replace(/\'/g, "'");
});

/**
 Cut BOM first character for UTF-8 files (for merging two files)
 @param {string} s Source string
 @return {string} Replaced string
 */

var cutbom = function (s) {
	if (s[0] === String.fromCharCode(65279)) {
		s = s.substr(1);
	}
	return s;
};

/**
 Get the global scope
 Inspired by System.global
 @return {object} The global scope
 */
utils.global = (function () {
	if (typeof self !== 'undefined') {
		return self;
	}
	if (typeof window !== 'undefined') {
		return window;
	}
	if (typeof global !== 'undefined') {
		return global;
	}
	return Function('return this')();
})();

/**
 Find out if a function is native to the enviroment
 @param {function} Function to check
 @return {boolean} True if function is native
 */
var isNativeFunction = (utils.isNativeFunction = function (fn) {
	return typeof fn === 'function' && !!~fn.toString().indexOf('[native code]');
});

/**
 Find out if code is running in a web worker enviroment
 @return {boolean} True if code is running in a web worker enviroment
 */
utils.isWebWorker = (function () {
	try {
		var importScripts = utils.global.importScripts;
		return utils.isNativeFunction(importScripts);
	} catch (e) {
		return false;
	}
})();

/**
 Find out if code is running in a node enviroment
 @return {boolean} True if code is running in a node enviroment
 */
utils.isNode = (function () {
	try {
		return utils.isNativeFunction(utils.global.process.reallyExit);
	} catch (e) {
		return false;
	}
})();

/**
 Find out if code is running in a browser enviroment
 @return {boolean} True if code is running in a browser enviroment
 */
utils.isBrowser = (function () {
	try {
		return utils.isNativeFunction(utils.global.location.reload);
	} catch (e) {
		return false;
	}
})();

/**
 Find out if code is running in a browser with a browserify setup
 @return {boolean} True if code is running in a browser with a browserify setup
 */
utils.isBrowserify = (function () {
	return utils.isBrowser && typeof process !== 'undefined' && process.browser;
})();

/**
 Find out if code is running in a browser with a requireJS setup
 @return {boolean} True if code is running in a browser with a requireJS setup
 */
utils.isRequireJS = (function () {
	return (
		utils.isBrowser && typeof require === 'function' && typeof require.specified === 'function'
	);
})();

/**
 Find out if code is running with Meteor in the enviroment
 @return {boolean} True if code is running with Meteor in the enviroment

 @todo Find out if this is the best way to do this
 */
utils.isMeteor = (function () {
	return typeof Meteor !== 'undefined' && Meteor.release;
})();

/**
 Find out if code is running on a Meteor client
 @return {boolean} True if code is running on a Meteor client
 */
utils.isMeteorClient = utils.isMeteorClient = (function () {
	return utils.isMeteor && Meteor.isClient;
})();

/**
 Find out if code is running on a Meteor server
 @return {boolean} True if code is running on a Meteor server
 */
utils.isMeteorServer = (function () {
	return utils.isMeteor && Meteor.isServer;
})();

/**
 Find out code is running in a cordovar enviroment
 @return {boolean} True if code is running in a web worker enviroment

 @todo Find out if this is the best way to do this
 */
utils.isCordova = (function () {
	return typeof cordova === 'object';
})();

utils.isReactNative = (function () {
	var isReact = false;
	//*not-for-browser/*
	try {
		if (typeof require('react-native') === 'object') {
			isReact = true;
		}
	} catch (e) {
		void 0;
	}
	//*/
	return isReact;
})();

utils.hasIndexedDB = (function () {
	return !!utils.global.indexedDB;
})();

utils.isArray = function (obj) {
	return '[object Array]' === Object.prototype.toString.call(obj);
};
/**
 Load text file from anywhere
 @param {string|object} path File path or HTML event
 @param {boolean} asy True - async call, false - sync call
 @param {function} success Success function
 @param {function} error Error function
 @return {string} Read data

 @todo Define Event type
 @todo Smaller if-else structures.
 */
var loadFile = (utils.loadFile = function (path, asy, success, error) {
	var data, fs;
	if (utils.isNode || utils.isMeteorServer) {
		//*not-for-browser/*
		fs = require('fs');

		// If path is empty, than read data from stdin (for Node)
		if (typeof path === 'undefined') {
			var buff = '';
			process.stdin.setEncoding('utf8');
			process.stdin.on('readable', function () {
				var chunk = process.stdin.read();
				if (chunk !== null) {
					buff += chunk.toString();
				}
			});
			process.stdin.on('end', function () {
				success(cutbom(buff));
			});
		} else {
			if (/^[a-z]+:\/\//i.test(path)) {
				var request = require('request');
				request(path, function (err, response, body) {
					if (err) {
						return error(err, null);
					}
					success(cutbom(body.toString()));
				});
			} else {
				//If async callthen call async
				if (asy) {
					fs.readFile(path, function (err, data) {
						if (err) {
							return error(err, null);
						}
						success(cutbom(data.toString()));
					});
				} else {
					// Call sync version
					try {
						data = fs.readFileSync(path);
					} catch (e) {
						return error(err, null);
					}
					success(cutbom(data.toString()));
				}
			}
		}
	} else if (utils.isReactNative) {
		// If ReactNative
		var RNFS = require('react-native-fs');
		RNFS.readFile(path, 'utf8')
			.then(function (contents) {
				success(cutbom(contents));
			})
			.catch(function (err) {
				return error(err, null);
			});
		//*/
	} else if (utils.isCordova) {
		/* If Cordova */
		utils.global.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			fileSystem.root.getFile(path, {create: false}, function (fileEntry) {
				fileEntry.file(function (file) {
					var fileReader = new FileReader();
					fileReader.onloadend = function (e) {
						success(cutbom(this.result));
					};
					fileReader.readAsText(file);
				});
			});
		});

		/** @todo Check eliminated code below */

		/*/*

        var paths = path.split('/');
        var filename = paths[paths.length-1];
        var dirpath = path.substr(0,path.length-filename.length);
 //       console.log('CORDOVA',filename,dirpath);
 //return success('[{"a":"'+filename+'"}]');

        window.resolveLocalFileSystemURL(dirpath, function(dir) {
            dir.getFile(filename, null, function(file) {
                file.file(function(file) {
                    var reader = new FileReader();
 //                   console.log('READ FILE 2');
                    reader.onloadend = function(e) {
//                    console.log('READ FILE 3',this.result);
                        success(this.result);
                    };
                    reader.readAsText(file);
                });
            });
        });
*/
	} else {
		/* For string */
		if (typeof path === 'string') {
			// For browser read from tag
			/*
                SELECT * FROM TXT('#one') -- read data from HTML element with id="one"
            */
			if (path.substr(0, 1) === '#' && typeof document !== 'undefined') {
				data = document.querySelector(path).textContent;
				success(data);
			} else {
				/*
                    Simply read file from HTTP request, like:
                    SELECT * FROM TXT('http://alasql.org/README.md');
                */
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							if (success) {
								success(cutbom(xhr.responseText));
							}
						} else if (error) {
							return error(xhr);
						}
						// Todo: else...?
					}
				};
				xhr.open('GET', path, asy); // Async
				xhr.responseType = 'text';
				xhr.send();
			}
		} else if (path instanceof Event) {
			/*
                For browser read from files input element
                <input type="files" onchange="readFile(event)">
                <script>
                    function readFile(event) {
                        alasql('SELECT * FROM TXT(?)',[event])
                    }
                </script>
            */
			/** @type {array} List of files from <input> element */
			var files = path.target.files;
			/** type {object} */
			var reader = new FileReader();
			/** type {string} */
			var name = files[0].name;
			reader.onload = function (e) {
				var data = e.target.result;
				success(cutbom(data));
			};
			reader.readAsText(files[0]);
		}
	}
});

/**
 @function Load binary file from anywhere
 @param {string} path File path
 @param {boolean} asy True - async call, false - sync call
 @param {function} success Success function
 @param {function} error Error function
 @return 1 for Async, data - for sync version

 @todo merge functionality from loadFile and LoadBinaryFile
 */

var loadBinaryFile = (utils.loadBinaryFile = function (path, asy, success, error) {
	var fs;
	if (utils.isNode || utils.isMeteorServer) {
		//*not-for-browser/*
		fs = require('fs');

		if (/^[a-z]+:\/\//i.test(path)) {
			var request = require('request');
			request({url: path, encoding: null}, function (err, response, data) {
				if (err) {
					throw err;
				}
				var arr = [];
				for (var i = 0; i < data.length; ++i) {
					arr[i] = String.fromCharCode(data[i]);
				}
				success(arr.join(''));
			});
		} else {
			if (asy) {
				fs.readFile(path, function (err, data) {
					if (err) {
						throw err;
					}
					var arr = [];
					for (var i = 0; i < data.length; ++i) {
						arr[i] = String.fromCharCode(data[i]);
					}
					success(arr.join(''));
				});
			} else {
				var data = fs.readFileSync(path);
				var arr = [];
				for (var i = 0; i < data.length; ++i) {
					arr[i] = String.fromCharCode(data[i]);
				}
				success(arr.join(''));
			}
		}
	} else if (utils.isReactNative) {
		// If ReactNative
		//var RNFS = require('react-native-fs');
		var RNFetchBlob = require('react-native-fetch-blob').default;
		var dirs = RNFetchBlob.fs.dirs;
		//should use readStream instead if the file is large
		RNFetchBlob.fs.readFile(path, 'base64').then(function (data) {
			//RNFetchBlob.base64.decode(data) //need more test on excel
			success(data);
		});
		//*/
	} else {
		if (typeof path === 'string') {
			// For browser
			var xhr = new XMLHttpRequest();
			xhr.open('GET', path, asy); // Async
			xhr.responseType = 'arraybuffer';
			xhr.onload = function () {
				var data = new Uint8Array(xhr.response);
				var arr = [];
				for (var i = 0; i < data.length; ++i) {
					arr[i] = String.fromCharCode(data[i]);
				}
				success(arr.join(''));
			};
			// xhr.responseType = "blob";
			xhr.send();
		} else if (path instanceof Event) {
			// console.log("event");
			var files = path.target.files;
			var reader = new FileReader();
			var name = files[0].name;
			reader.onload = function (e) {
				var data = e.target.result;
				success(data);
			};
			reader.readAsArrayBuffer(files[0]);
		} else if (path instanceof Blob) {
			success(path);
		}
	}
});

var removeFile = (utils.removeFile = function (path, cb) {
	if (utils.isNode) {
		//*not-for-browser/*
		var fs = require('fs');
		fs.remove(path, cb);
	} else if (utils.isCordova) {
		utils.global.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			fileSystem.root.getFile(
				path,
				{create: false},
				function (fileEntry) {
					fileEntry.remove(cb);
					cb && cb(); // jshint ignore:line
				},
				function () {
					cb && cb(); // jshint ignore:line
				}
			);
		});
	} else if (utils.isReactNative) {
		// If ReactNative
		var RNFS = require('react-native-fs');
		RNFS.unlink(path)
			.then(function () {
				cb && cb();
			})
			.catch(function (err) {
				throw err;
			});
		//*/
	} else {
		throw new Error('You can remove files only in Node.js and Apache Cordova');
	}
});

// Todo: check if it makes sense to support cordova and Meteor server
var deleteFile = (utils.deleteFile = function (path, cb) {
	//*not-for-browser/*
	if (utils.isNode) {
		var fs = require('fs');
		fs.unlink(path, cb);
	} else if (utils.isReactNative) {
		// If ReactNative
		var RNFS = require('react-native-fs');
		RNFS.unlink(path)
			.then(function () {
				cb && cb();
			})
			.catch(function (err) {
				throw err;
			});
	}
	//*/
});

utils.autoExtFilename = function (filename, ext, config) {
	config = config || {};
	if (
		typeof filename !== 'string' ||
		filename.match(/^[A-z]+:\/\/|\n|\..{2,4}$/) ||
		config.autoExt === 0 ||
		config.autoExt === false
	) {
		return filename;
	}
	return filename + '.' + ext;
};

var fileExists = (utils.fileExists = function (path, cb) {
	if (utils.isNode) {
		//*not-for-browser/*
		var fs = require('fs');
		fs.exists(path, cb);
	} else if (utils.isCordova) {
		utils.global.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			fileSystem.root.getFile(
				path,
				{create: false},
				function (fileEntry) {
					cb(true);
				},
				function () {
					cb(false);
				}
			);
		});
	} else if (utils.isReactNative) {
		// If ReactNative
		var RNFS = require('react-native-fs');
		RNFS.exists(path)
			.then(function (yes) {
				cb && cb(yes);
			})
			.catch(function (err) {
				throw err;
			});
		//*/
	} else {
		// TODO Cordova, etc.
		throw new Error('You can use exists() only in Node.js or Apach Cordova');
	}
});

/**
 Save text file from anywhere
 @param {string} path File path
 @param {array} data Data object
 @param {function} cb Callback
 @param {object=} opts
 */

var saveFile = (utils.saveFile = function (path, data, cb, opts) {
	var res = 1;
	if (path === undefined) {
		//
		// Return data into result variable
		// like: alasql('SELECT * INTO TXT() FROM ?',[data]);
		//
		res = data;
		if (cb) {
			res = cb(res);
		}
	} else {
		if (utils.isNode) {
			//*not-for-browser/*
			var fs = require('fs');
			data = fs.writeFileSync(path, data);
			if (cb) {
				res = cb(res);
			}
		} else if (utils.isReactNative) {
			var RNFS = require('react-native-fs');
			RNFS.writeFile(path, data)
				.then(function (success) {
					//, 'utf8'
					if (cb) res = cb(res);
				})
				.catch(function (err) {
					console.error(err.message);
				});
		} else if (utils.isCordova) {
			utils.global.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
				//                alasql.utils.removeFile(path,function(){
				fileSystem.root.getFile(path, {create: true}, function (fileEntry) {
					fileEntry.createWriter(function (fileWriter) {
						fileWriter.onwriteend = function () {
							if (cb) {
								res = cb(res);
							}
						};
						fileWriter.write(data);
					});
				});
			});
			//*/

			/*/*
        } else if((typeof cordova == 'object') && cordova.file) {
//            console.log('saveFile 1');
        // Cordova
            var paths = path.split('/');
            var filename = paths[paths.length-1];
            var dirpath = path.substr(0,path.length-filename.length);
     //       console.log('CORDOVA',filename,dirpath);
     //return success('[{"a":"'+filename+'"}]');

            window.resolveLocalFileSystemURL(dirpath, function(dir) {
//            console.log('saveFile 2');

                dir.getFile(filename, {create:true}, function(file) {
//            console.log('saveFile 3');

//                    file.file(function(file) {
//            console.log('saveFile 4');

                        file.createWriter(function(fileWriter) {

//        fileWriter.seek(fileWriter.length);

                            var blob = new Blob([data], {type:'text/plain'});
                            fileWriter.write(blob);
                            fileWriter.onwriteend = function(){
                                if(cb) cb();
                            };
//                        console.log("ok, in theory i worked");
                        });
*/
			/*/*
                        // Corodva
                        function writeFinish() {
                            // ... your done code here...
                            return cb()
                        };
                        var written = 0;
                          var BLOCK_SIZE = 1*1024*1024; // write 1M every time of write
                          function writeNext(cbFinish) {
                            var sz = Math.min(BLOCK_SIZE, data.length - written);
                            var sub = data.slice(written, written+sz);
                            writer.write(sub);
                            written += sz;
                            writer.onwrite = function(evt) {
                              if (written < data.length)
                                writeNext(cbFinish);
                              else
                                cbFinish();
                            };
                          }
                          writeNext(writeFinish);
                        }
*/
			//                     });
			//                });
			//            });
		} else {
			if (isIE() === 9) {
				// Solution was taken from
				// http://megatuto.com/formation-JAVASCRIPT.php?JAVASCRIPT_Example=Javascript+Save+CSV+file+in+IE+8/IE+9+without+using+window.open()+Categorie+javascript+internet-explorer-8&category=&article=7993
				//				var URI = 'data:text/plain;charset=utf-8,';

				// Prepare data
				var ndata = data.replace(/\r\n/g, '&#A;&#D;');
				ndata = ndata.replace(/\n/g, '&#D;');
				ndata = ndata.replace(/\t/g, '&#9;');
				var testlink = utils.global.open('about:blank', '_blank');
				testlink.document.write(ndata); //fileData has contents for the file
				testlink.document.close();
				testlink.document.execCommand('SaveAs', false, path);
				testlink.close();
			} else {
				var opt = {
					disableAutoBom: false,
				};
				alasql.utils.extend(opt, opts);
				var blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
				saveAs(blob, path, opt.disableAutoBom);
				if (cb) {
					res = cb(res);
				}
			}
		}
	}

	return res;
});

/**
 @function Is this IE9
 @return {boolean} True for IE9 and false for other browsers

 For IE9 compatibility issues
 */
function isIE() {
	var myNav = navigator.userAgent.toLowerCase();
	return myNav.indexOf('msie') !== -1 ? parseInt(myNav.split('msie')[1]) : false;
}

//  For LOAD
//  var saveBinaryFile = utils.saveFile = function(path, data, cb) {
//     if(utils.isNode) {
//         // For Node.js
//         var fs = require('fs');
//         var data = fs.writeFileSync(path,data);
//     } else {
//         var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
//         saveAs(blob, path);
//     }
//  };

/**
 @function Hash a string to signed integer
 @param {string} source string
 @return {integer} hash number
 */

// FNV-1a inspired hashing
var hash = (utils.hash = function (str) {
	var hash = 0x811c9dc5,
		i = str.length;
	while (i) {
		hash ^= str.charCodeAt(--i);
		hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
	}
	return hash;
});

/**
 Union arrays
 @function
 @param {array} a
 @param {array} b
 @return {array}
 */
var arrayUnion = (utils.arrayUnion = function (a, b) {
	var r = b.slice(0);
	a.forEach(function (i) {
		if (r.indexOf(i) < 0) {
			r.push(i);
		}
	});
	return r;
});

/**
 Array Difference
 */
var arrayDiff = (utils.arrayDiff = function (a, b) {
	return a.filter(function (i) {
		return b.indexOf(i) < 0;
	});
});

/**
 Arrays deep intersect (with records)
 */
var arrayIntersect = (utils.arrayIntersect = function (a, b) {
	var r = [];
	a.forEach(function (ai) {
		var found = false;

		b.forEach(function (bi) {
			found = found || ai === bi;
		});

		if (found) {
			r.push(ai);
		}
	});
	return r;
});

/**
 Arrays deep union (with records)
 */
var arrayUnionDeep = (utils.arrayUnionDeep = function (a, b) {
	var r = b.slice(0);
	a.forEach(function (ai) {
		var found = false;

		r.forEach(function (ri) {
			//            found = found || equalDeep(ai, ri, true);
			found = found || deepEqual(ai, ri);
		});

		if (!found) {
			r.push(ai);
		}
	});
	return r;
});

/**
 Arrays deep union (with records)
 */
var arrayExceptDeep = (utils.arrayExceptDeep = function (a, b) {
	var r = [];
	a.forEach(function (ai) {
		var found = false;

		b.forEach(function (bi) {
			//            found = found || equalDeep(ai, bi, true);
			found = found || deepEqual(ai, bi);
		});

		if (!found) {
			r.push(ai);
		}
	});
	return r;
});

/**
 Arrays deep intersect (with records)
 */
var arrayIntersectDeep = (utils.arrayIntersectDeep = function (a, b) {
	var r = [];
	a.forEach(function (ai) {
		var found = false;

		b.forEach(function (bi) {
			//            found = found || equalDeep(ai, bi, true);
			found = found || deepEqual(ai, bi, true);
		});

		if (found) {
			r.push(ai);
		}
	});
	return r;
});

/**
 Deep clone objects
 */
var cloneDeep = (utils.cloneDeep = function cloneDeep(obj) {
	if (null === obj || typeof obj !== 'object') {
		return obj;
	}

	if (obj instanceof Date) {
		return new Date(obj);
	}

	if (obj instanceof String) {
		return obj.toString();
	}

	if (obj instanceof Number) {
		return +obj;
	}

	var temp = obj.constructor(); // changed

	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			temp[key] = cloneDeep(obj[key]);
		}
	}
	return temp;
});

/**
 Check equality of objects
 */

/*/*
var equalDeep = utils.equalDeep = function equalDeep (x, y, deep) {
    if (deep) {
        if (x === y){
            return true;
        }

        var p;
        for (p in y) {
            if (typeof (x[p]) === 'undefined') { return false; }
        }

        for (p in y) {
            if (y[p]) {
                switch (typeof (y[p])) {
                    case 'object':
                        if (!equalDeep(y[p],x[p])) { return false; } break;
                    case 'function':
                        if (
                                typeof (x[p]) === 'undefined' ||
                                (p !== 'equals' && y[p].toString() !== x[p].toString())
                            ){
                                return false;
                            }
                        break;
                    default:
                        if (y[p] !== x[p]) { return false; }
                }
            } else {
                if (x[p]){
                    return false;
                }
            }
        }

        for (p in x) {
            if (typeof (y[p]) === 'undefined') { return false; }
        }

        return true;
    }
    return x === y;
};
*/

/**
 Compare two objects in deep
 */
var deepEqual = (utils.deepEqual = function (x, y) {
	if (x === y) {
		return true;
	}

	if (typeof x === 'object' && null !== x && typeof y === 'object' && null !== y) {
		if (Object.keys(x).length !== Object.keys(y).length) {
			return false;
		}
		for (var prop in x) {
			if (!deepEqual(x[prop], y[prop])) {
				return false;
			}
		}
		return true;
	}

	return false;
});
/**
 Array with distinct records
 @param {array} data
 @return {array}
 */
var distinctArray = (utils.distinctArray = function (data) {
	var uniq = {};
	// TODO: Speedup, because Object.keys is slow
	for (var i = 0, ilen = data.length; i < ilen; i++) {
		var uix;
		if (typeof data[i] === 'object') {
			uix = Object.keys(data[i])
				.sort()
				.map(function (k) {
					return k + '`' + data[i][k];
				})
				.join('`');
		} else {
			uix = data[i];
		}
		uniq[uix] = data[i];
	}
	var res = [];
	for (var key in uniq) {
		res.push(uniq[key]);
	}
	return res;
});

/**
 Extend object a with properties of b
 @function
 @param {object} a
 @param {object} b
 @return {object}
 */
var extend = (utils.extend = function extend(a, b) {
	a = a || {};
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
});

/**
 Flat array by first row
 */
var flatArray = (utils.flatArray = function (a) {
	//console.log(684,a);
	if (!a || 0 === a.length) {
		return [];
	}

	// For recordsets
	if (typeof a === 'object' && a instanceof alasql.Recordset) {
		return a.data.map(function (ai) {
			return ai[a.columns[0].columnid];
		});
	}
	// Else for other arrays
	var key = Object.keys(a[0])[0];
	if (key === undefined) {
		return [];
	}
	return a.map(function (ai) {
		return ai[key];
	});
});

/**
 Convert array of objects to array of arrays
 */
var arrayOfArrays = (utils.arrayOfArrays = function (a) {
	return a.map(function (aa) {
		var ar = [];
		for (var key in aa) {
			ar.push(aa[key]);
		}
		return ar;
	});
});

if (!Array.isArray) {
	Array.isArray = function (arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

/**
 Excel:convert number to Excel column, like 1 => 'A'
 @param {integer} i Column number, starting with 0
 @return {string} Column name, starting with 'A'
 */

var xlsnc = (utils.xlsnc = function (i) {
	var addr = String.fromCharCode(65 + (i % 26));
	if (i >= 26) {
		i = ((i / 26) | 0) - 1;
		addr = String.fromCharCode(65 + (i % 26)) + addr;
		if (i > 26) {
			i = ((i / 26) | 0) - 1;
			addr = String.fromCharCode(65 + (i % 26)) + addr;
		}
	}
	return addr;
});

/**
 Excel:conver Excel column name to number
 @param {string} s Column number, like 'A' or 'BE'
 @return {string} Column name, starting with 0
 */
var xlscn = (utils.xlscn = function (s) {
	var n = s.charCodeAt(0) - 65;
	if (s.length > 1) {
		n = (n + 1) * 26 + s.charCodeAt(1) - 65;
		//        console.log(n, s.charCodeAt(0)-65, s.charCodeAt(1)-65);
		if (s.length > 2) {
			n = (n + 1) * 26 + s.charCodeAt(2) - 65;
		}
	}
	return n;
});

var domEmptyChildren = (utils.domEmptyChildren = function (container) {
	var len = container.childNodes.length;
	while (len--) {
		container.removeChild(container.lastChild);
	}
});

/**
 SQL LIKE emulation
 @parameter {string} pattern Search pattern
 @parameter {string} value Searched value
 @parameter {string} escape Escape character (optional)
 @return {boolean} If value LIKE pattern ESCAPE escape
 */

var like = (utils.like = function (pattern, value, escape) {
	// Verify escape character
	if (!escape) escape = '';

	var i = 0;
	var s = '^';

	while (i < pattern.length) {
		var c = pattern[i],
			c1 = '';
		if (i < pattern.length - 1) c1 = pattern[i + 1];

		if (c === escape) {
			s += '\\' + c1;
			i++;
		} else if (c === '[' && c1 === '^') {
			s += '[^';
			i++;
		} else if (c === '[' || c === ']') {
			s += c;
		} else if (c === '%') {
			s += '.*';
		} else if (c === '_') {
			s += '.';
		} else if ('/.*+?|(){}'.indexOf(c) > -1) {
			s += '\\' + c;
		} else {
			s += c;
		}
		i++;
	}

	s += '$';
	//    if(value == undefined) return false;
	//console.log(s,value,(value||'').search(RegExp(s))>-1);
	return ('' + (value || '')).toUpperCase().search(RegExp(s.toUpperCase())) > -1;
});

utils.glob = function (value, pattern) {
	var i = 0;
	var s = '^';

	while (i < pattern.length) {
		var c = pattern[i],
			c1 = '';
		if (i < pattern.length - 1) c1 = pattern[i + 1];

		if (c === '[' && c1 === '^') {
			s += '[^';
			i++;
		} else if (c === '[' || c === ']') {
			s += c;
		} else if (c === '*') {
			s += '.*';
		} else if (c === '?') {
			s += '.';
		} else if ('/.*+?|(){}'.indexOf(c) > -1) {
			s += '\\' + c;
		} else {
			s += c;
		}
		i++;
	}

	s += '$';
	return ('' + (value || '')).toUpperCase().search(RegExp(s.toUpperCase())) > -1;
};

/**
 Get path of alasql.js
 @todo Rewrite and simplify the code. Review, is this function is required separately
 */
utils.findAlaSQLPath = function () {
	/** type {string} Path to alasql library and plugins */

	if (utils.isWebWorker) {
		return '';
		/** @todo Check how to get path in worker */
	} else if (utils.isMeteorClient) {
		return '/packages/dist/';
	} else if (utils.isMeteorServer) {
		return 'assets/packages/dist/';
	} else if (utils.isNode) {
		return __dirname;
	} else if (utils.isBrowser) {
		var sc = document.getElementsByTagName('script');

		for (var i = 0; i < sc.length; i++) {
			if (sc[i].src.substr(-16).toLowerCase() === 'alasql-worker.js') {
				return sc[i].src.substr(0, sc[i].src.length - 16);
			} else if (sc[i].src.substr(-20).toLowerCase() === 'alasql-worker.min.js') {
				return sc[i].src.substr(0, sc[i].src.length - 20);
			} else if (sc[i].src.substr(-9).toLowerCase() === 'alasql.js') {
				return sc[i].src.substr(0, sc[i].src.length - 9);
			} else if (sc[i].src.substr(-13).toLowerCase() === 'alasql.min.js') {
				return sc[i].src.substr(0, sc[i].src.length - 13);
			}
		}
	}
	return '';
};

var getXLSX = function () {
	var XLSX = alasql.private.externalXlsxLib;

	if (XLSX) {
		return XLSX;
	}

	if (utils.isNode || utils.isBrowserify || utils.isMeteorServer) {
		//*not-for-browser/*
		XLSX = require('xlsx') || null;
		//*/
	} else {
		XLSX = utils.global.XLSX || null;
	}

	if (null === XLSX) {
		throw new Error('Please include the xlsx.js library');
	}

	return XLSX;
};

// set AlaSQl path
alasql.path = alasql.utils.findAlaSQLPath();
