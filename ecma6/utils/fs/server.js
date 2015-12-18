/**
  Warning, these utils require fs or other serverside functionality
**/


/**
    Load text file from anywhere
    @param {string|object} path File path or HTML event
    @param {boolean} asy True - async call, false - sync call
    @param {function} success Success function
    @param {function} error Error function
    @return {string} Read data

    @todo Define Event type
*/
export function removeFile(path,cb) {
    if(typeof exports === 'object') {
        fs.remove(path,cb);
    } else if(typeof cordova === 'object') {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, {create:false}, function (fileEntry) {
                fileEntry.remove(cb);
                cb && cb(); // jshint ignore:line
            }, function(){
                cb && cb(); // jshint ignore:line
            });
        });
    } else {
        throw new Error('You can remove files only in Node.js and Apache Cordova');
    }
};

/**
    Load text file from anywhere
    @param {string|object} path File path or HTML event
    @param {boolean} asy True - async call, false - sync call
    @param {function} success Success function
    @param {function} error Error function
    @return {string} Read data

    @todo Define Event type
*/
export function loadFile(path, asy, success, error) {
  var data, fs;
  if((typeof exports === 'object') || (typeof Meteor !== 'undefined' && Meteor.isServer)) {
    if(typeof Meteor !== 'undefined') {
        /** For Meteor */
        fs = Npm.require('fs');
    } else {
        /** For Node.js */
        fs = require('fs');
    }
    /* If path is empty, than read data from stdin (for Node) */
    if(typeof path === 'undefined') {
        /* @type {string} Buffer for string*/
        var buff = '';
        process.stdin.setEncoding('utf8');
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) {
                buff += chunk.toString();
            }
        });
        process.stdin.on('end', function() {
           success(cutbom(buff));
        });
    } else {

        /* If async callthen call async*/
        if(asy) {
            fs.readFile(path,function(err,data){
                if(err) {
                    throw err;
                }
                success(cutbom(data.toString()));
            });
        } else {
            /* Call sync version */
            data = fs.readFileSync(path);
            success(cutbom(data.toString()));
        }
    }

  } else if(typeof cordova === 'object') {
          /* If Cordova */
          window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
              fileSystem.root.getFile(path, {create:false}, function (fileEntry) {
                  fileEntry.file(function(file){
                      var fileReader = new FileReader();
                      fileReader.onloadend = function(e){
                          success(cutbom(this.result));
                      };
                      fileReader.readAsText(file);
                  });
              });
          });
          /** @todo Check eliminated code below */

          /*

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
  }  else {
    throw new Error("Unexpected load file enviroment");
  }
};

export function fileExists(path,cb){
    if(typeof exports === 'object') {
        var fs = require('fs');
        fs.exists(path,cb);
    } else if(typeof cordova === 'object') {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            fileSystem.root.getFile(path, {create:false}, function (fileEntry) {
                cb(true);
            }, function(){
                cb(false);
            });
        });
/*
        function fail(){
            callback(false);
        }
        try {
            // Cordova
            var paths = path.split('/');
            var filename = paths[paths.length-1];
            var dirpath = path.substr(0,path.length-filename.length);

            window.resolveLocalFileSystemURL(dirpath, function(dir) {
                dir.getFile(filename, null, function(file) {
                    file.file(function(file) {
                        callback(true);
                    },fail);
                },fail);
            },fail);
        } catch(err) {
            fail();
        };
*/
    } else {
        // TODO Cordova, etc.
        throw new Error('You can use exists() only in Node.js or Apach Cordova');
    }
};

export function deleteFile(path,cb){
    if(typeof exports === 'object') {
        var fs = require('fs');
        fs.unlink(path, cb);
    }
};

/**
  @function Load binary file from anywhere
  @param {string} path File path
  @param {boolean} asy True - async call, false - sync call
  @param {function} success Success function
  @param {function} error Error function
  @return 1 for Async, data - for sync version
*/
export function loadBinaryFile(path, asy, success, error) {
    var fs;
    if((typeof exports === 'object') || (typeof Meteor !== 'undefined' && Meteor.isServer)) {
        // For Node.js
        if(typeof Meteor !== 'undefined') {
            var fs = Npm.require('fs'); // For Meteor
        } else {
            var fs = require('fs');
        }
        if(asy) {
            fs.readFile(path,function(err,data){
                if(err) {
                    throw err;
                }
                var arr = [];
                for(var i = 0; i < data.length; ++i){
                    arr[i] = String.fromCharCode(data[i]);
                }
                success(arr.join(""));
            });

        } else {
            var data = fs.readFileSync(path);
            var arr = [];
            for(var i = 0; i < data.length; ++i){
                arr[i] = String.fromCharCode(data[i]);
            }
            success(arr.join(""));
        }

    }
};

/**
    @function Is this IE9
    @return {boolean} True for IE9 and false for other browsers

    For IE9 compatibility issues
*/
export function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1]) : false;
}