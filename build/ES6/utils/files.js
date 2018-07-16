import env from './enviroment';
import trans from './transformation';
const cutbom = trans.cutbom;
const utils = {};
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
utils.loadFile = function (path, asy, success, error) {
    var data, fs;
    if (env.isNode || env.isMeteorServer) {
        //*not-for-browser/*
        if (utils.isMeteor) {
            fs = Npm.require('fs');
        }
        else {
            fs = require('fs');
        }
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
        }
        else {
            if (/^[a-z]+:\/\//i.test(path)) {
                var request = require('request');
                request(path, function (err, response, body) {
                    if (err) {
                        throw err;
                    }
                    success(cutbom(body.toString()));
                });
            }
            else {
                //If async callthen call async
                if (asy) {
                    fs.readFile(path, function (err, data) {
                        if (err) {
                            throw err;
                        }
                        success(cutbom(data.toString()));
                    });
                }
                else {
                    // Call sync version
                    data = fs.readFileSync(path);
                    success(cutbom(data.toString()));
                }
            }
        }
    }
    else if (utils.isReactNative) {
        // If ReactNative
        var RNFS = require('react-native-fs');
        RNFS.readFile(path, 'utf8')
            .then(function (contents) {
            success(cutbom(contents));
        })
            .catch(function (err) {
            throw err;
        });
        //*/
    }
    else if (utils.isCordova) {
        /* If Cordova */
        utils.global.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, { create: false }, function (fileEntry) {
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
    }
    else {
        /* For string */
        if (typeof path === 'string') {
            // For browser read from tag
            /*
            SELECT * FROM TXT('#one') -- read data from HTML element with id="one"
        */
            if (path.substr(0, 1) === '#' && typeof document !== 'undefined') {
                data = document.querySelector(path).textContent;
                success(data);
            }
            else {
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
                        }
                        else if (error) {
                            error(xhr);
                        }
                        // Todo: else...?
                    }
                };
                xhr.open('GET', path, asy); // Async
                xhr.responseType = 'text';
                xhr.send();
            }
        }
        else if (path instanceof Event) {
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
};
/**
@function Load binary file from anywhere
@param {string} path File path
@param {boolean} asy True - async call, false - sync call
@param {function} success Success function
@param {function} error Error function
@return 1 for Async, data - for sync version

@todo merge functionality from loadFile and LoadBinaryFile
*/
utils.loadBinaryFile = function (path, asy, success, error) {
    var fs;
    if (utils.isNode || utils.isMeteorServer) {
        //*not-for-browser/*
        if (utils.isMeteorServer) {
            fs = Npm.require('fs'); // For Meteor
        }
        else {
            fs = require('fs');
        }
        if (/^[a-z]+:\/\//i.test(path)) {
            var request = require('request');
            request({ url: path, encoding: null }, function (err, response, data) {
                if (err) {
                    throw err;
                }
                var arr = [];
                for (var i = 0; i < data.length; ++i) {
                    arr[i] = String.fromCharCode(data[i]);
                }
                success(arr.join(''));
            });
        }
        else {
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
            }
            else {
                var data = fs.readFileSync(path);
                var arr = [];
                for (var i = 0; i < data.length; ++i) {
                    arr[i] = String.fromCharCode(data[i]);
                }
                success(arr.join(''));
            }
        }
    }
    else if (utils.isReactNative) {
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
    }
    else {
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
        }
        else if (path instanceof Event) {
            // console.log("event");
            var files = path.target.files;
            var reader = new FileReader();
            var name = files[0].name;
            reader.onload = function (e) {
                var data = e.target.result;
                success(data);
            };
            reader.readAsArrayBuffer(files[0]);
        }
        else if (path instanceof Blob) {
            success(path);
        }
    }
};
var removeFile = (utils.removeFile = function (path, cb) {
    if (utils.isNode) {
        //*not-for-browser/*
        var fs = require('fs');
        fs.remove(path, cb);
    }
    else if (utils.isCordova) {
        utils.global.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, { create: false }, function (fileEntry) {
                fileEntry.remove(cb);
                if (cb)
                    cb(); // jshint ignore:line
            }, function () {
                if (cb)
                    cb(); // jshint ignore:line
            });
        });
    }
    else if (utils.isReactNative) {
        // If ReactNative
        var RNFS = require('react-native-fs');
        RNFS.unlink(path)
            .then(function () {
            if (cb)
                cb();
        })
            .catch(function (err) {
            throw err;
        });
        //*/
    }
    else {
        throw new Error('You can remove files only in Node.js and Apache Cordova');
    }
});
// Todo: check if it makes sense to support cordova and Meteor server
utils.deleteFile = (path, cb) => {
    //*not-for-browser/*
    if (utils.isNode) {
        var fs = require('fs');
        fs.unlink(path, cb);
    }
    else if (utils.isReactNative) {
        // If ReactNative
        var RNFS = require('react-native-fs');
        RNFS.unlink(path)
            .then(function () {
            if (cb)
                cb();
        })
            .catch(function (err) {
            throw err;
        });
    }
    //*/
};
utils.autoExtFilename = (filename, ext, config) => {
    config = config || {};
    if (typeof filename !== 'string' ||
        filename.match(/^[A-z]+:\/\/|\n|\..{2,4}$/) ||
        config.autoExt === 0 ||
        config.autoExt === false) {
        return filename;
    }
    return filename + '.' + ext;
};
utils.fileExists = function (path, cb) {
    if (utils.isNode) {
        //*not-for-browser/*
        var fs = require('fs');
        fs.exists(path, cb);
    }
    else if (utils.isCordova) {
        utils.global.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, { create: false }, function (fileEntry) {
                cb(true);
            }, function () {
                cb(false);
            });
        });
    }
    else if (utils.isReactNative) {
        // If ReactNative
        var RNFS = require('react-native-fs');
        RNFS.exists(path)
            .then(function (yes) {
            if (cb)
                cb(yes);
        })
            .catch(function (err) {
            throw err;
        });
        //*/
    }
    else {
        // TODO Cordova, etc.
        throw new Error('You can use exists() only in Node.js or Apach Cordova');
    }
};
/**
Save text file from anywhere
@param {string} path File path
@param {array} data Data object
@param {function} cb Callback
@param {object=} opts
*/
utils.saveFile = function (path, data, cb, opts) {
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
    }
    else {
        if (utils.isNode) {
            //*not-for-browser/*
            var fs = require('fs');
            data = fs.writeFileSync(path, data);
            if (cb) {
                res = cb(res);
            }
        }
        else if (utils.isReactNative) {
            var RNFS = require('react-native-fs');
            RNFS.writeFile(path, data)
                .then(function (success) {
                //, 'utf8'
                if (cb)
                    res = cb(res);
            })
                .catch(function (err) {
                console.error(err.message);
            });
        }
        else if (utils.isCordova) {
            utils.global.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                //                alasql.utils.removeFile(path,function(){
                fileSystem.root.getFile(path, { create: true }, function (fileEntry) {
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
        }
        else {
            if (utils.isIE() === 9) {
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
            }
            else {
                var opt = {
                    disableAutoBom: false,
                };
                utils.extend(opt, opts);
                var blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
                utils.saveAs(blob, path, opt.disableAutoBom);
                if (cb) {
                    res = cb(res);
                }
            }
        }
    }
    return res;
};
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
export default utils;
