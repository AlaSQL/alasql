var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var Buffer = require('buffer').Buffer;
var Concat = require('concat-with-sourcemaps');

module.exports = function(file, opt) {
  if (!file) throw new PluginError('gulp-concat', 'Missing file option for gulp-concat');
  if (!opt) opt = {};
  // to preserve existing |undefined| behaviour and to introduce |newLine: ""| for binaries
  if (typeof opt.newLine !== 'string') opt.newLine = gutil.linefeed;

  var firstFile = null;

  var fileName = file;
  if (typeof file !== 'string') {
    if (typeof file.path !== 'string') {
      throw new PluginError('gulp-concat', 'Missing path in file options for gulp-concat');
    }
    fileName = path.basename(file.path);
    firstFile = new File(file);
  }

  var concat = null;

  function bufferContents(file) {
    if (file.isNull()) return; // ignore
    if (file.isStream()) return this.emit('error', new PluginError('gulp-concat',  'Streaming not supported'));

    if (!firstFile) firstFile = file;
    if (!concat) concat = new Concat(!!firstFile.sourceMap, fileName, opt.newLine);

    concat.add(file.relative, file.contents.toString(), file.sourceMap);
  }

  function endStream() {
    if (firstFile) {
      var joinedFile = firstFile;

      if (typeof file === 'string') {
        joinedFile = firstFile.clone({contents: false});
        joinedFile.path = path.join(firstFile.base, file);
      }

      joinedFile.contents = new Buffer(concat.content);

      if (concat.sourceMapping)
        joinedFile.sourceMap = JSON.parse(concat.sourceMap);

      this.emit('data', joinedFile);
    }

    this.emit('end');
  }

  return through(bufferContents, endStream);
};
