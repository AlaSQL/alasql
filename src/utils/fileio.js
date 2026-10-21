/*
	File reading and writing for Node, the browser, React Native, Cordova and Meteor, split from src/15utility.js (docs/src-map.md). Same functions, same bodies.
*/

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
  Load text file from anywhere
  @param {string|object} path File path or HTML event
  @param {boolean} asy True - async call, false - sync call
  @param {function} success Success function
  @param {function} error Error function
  @return {string} Read data

  @todo Define Event type
  @todo Smaller if-else structures.
  */

const protocolRegex = /^[a-z]+:\/\//i;
let loadFile = (utils.loadFile = function (path, asy, success, error) {
	var data, fs;
	if (utils.isNode || utils.isMeteorServer) {
		//*not-for-browser/*
		fs = require('fs');

		// If path is empty, than read data from stdin (for Node)
		if ([null, undefined].includes(path)) {
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
			return;
		}

		if (protocolRegex.test(path)) {
			fetchData(path, x => success(cutbom(x)), error, asy);
			return;
		}

		//If async callthen call async
		if (asy) {
			fs.readFile(path, function (err, data) {
				if (err) {
					return error(err, null);
				}
				success(cutbom(data.toString()));
			});
			return;
		}

		// Call sync version
		try {
			data = fs.readFileSync(path);
		} catch (e) {
			error(e, null);
			return;
		}

		success(cutbom(data.toString()));
		return;
	}

	if (utils.isReactNative) {
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
		return;
	}

	if (utils.isCordova) {
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

		return;
	}

	/* For string */
	if (typeof path === 'string') {
		// For browser read from tag
		/*
			 SELECT * FROM TXT('#one') -- read data from HTML element with id="one"
		 */
		if (path.substr(0, 1) === '#' && typeof document !== 'undefined') {
			data = document.querySelector(path).textContent;
			success(data);
			return;
		}

		/*
			 Simply read file from HTTP request, like:
			 SELECT * FROM TXT('http://alasql.org/README.md');
		 */
		fetchData(path, x => success(cutbom(x)), error, asy);
		return;
	}

	if (path instanceof Event) {
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
	fetchData(path, x => success(cutbom(x)), error, asy);
});

let _fetch = typeof fetch !== 'undefined' ? fetch : null;
//*not-for-browser/*
_fetch = typeof fetch !== 'undefined' ? fetch : require('cross-fetch');
//*/

async function fetchData(path, success, error, async) {
	if (async) {
		return getData(path, success, error);
	}
	return await getData(path, success, error);
}

function getData(path, success, error) {
	return _fetch(path)
		.then(response => response.text())
		.then(txt => {
			success(txt);
		})
		.catch(e => {
			if (error) return error(e);
			console.error(e);
			throw e;
		});
}

function getBinaryData(path, success, error) {
	return _fetch(path)
		.then(response => response.arrayBuffer())
		.then(buf => {
			var a = new Uint8Array(buf);
			var b = [...a].map(e => String.fromCharCode(e)).join('');
			success(b);
		})
		.catch(e => {
			if (error) return error(e);
			console.error(e);
			throw e;
		});
}

/**
  @function Load binary file from anywhere
  @param {string} path File path
  @param {boolean} asy True - async call, false - sync call
  @param {function} success Success function
  @param {function} error Error function
  @return 1 for Async, data - for sync version

  @todo merge functionality from loadFile and LoadBinaryFile
  */

var loadBinaryFile = (utils.loadBinaryFile = function (
	path,
	runAsync,
	success,
	error = x => {
		throw x;
	}
) {
	var fs;
	if (utils.isNode || utils.isMeteorServer) {
		//*not-for-browser/*
		fs = require('fs');

		if (/^[a-z]+:\/\//i.test(path)) {
			return getBinaryData(path, success, error);
		} else {
			if (runAsync) {
				fs.readFile(path, function (err, data) {
					if (err) {
						return error(err);
					}
					var arr = [];
					for (var i = 0; i < data.length; ++i) {
						arr[i] = String.fromCharCode(data[i]);
					}
					success(arr.join(''));
				});
			} else {
				var data;
				try {
					data = fs.readFileSync(path);
				} catch (e) {
					return error(e);
				}
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
		RNFetchBlob.fs
			.readFile(path, 'base64')
			.then(function (data) {
				success(data);
			})
			.catch(error);
		//*/
	} else {
		if (typeof path === 'string') {
			// For browser
			var xhr = new XMLHttpRequest();
			xhr.open('GET', path, runAsync); // Async
			xhr.responseType = 'arraybuffer';
			xhr.onload = function () {
				var data = new Uint8Array(xhr.response);
				var arr = [];
				for (var i = 0; i < data.length; ++i) {
					arr[i] = String.fromCharCode(data[i]);
				}
				success(arr.join(''));
			};
			xhr.onerror = error;
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
			reader.onerror = error;
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
		filename.match(/^[A-Z]+:\/\/|\n|\..{2,6}$/i) ||
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

	return res;
});

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
