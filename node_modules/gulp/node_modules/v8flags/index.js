// this entire module is depressing.

const os = require('os');
const fs = require('fs');
const path = require('path');
const execFile = require('child_process').execFile;
const env = process.env;
const user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
const configfile = '.v8flags.'+process.versions.v8+'.'+user+'.json';
const exclusions = ['--help'];

const failureMessage = [
  'Unable to cache a config file for v8flags to a your home directory',
  'or a temporary folder. To fix this problem, please correct your',
  'environment by setting HOME=/path/to/home or TEMP=/path/to/temp.',
  'NOTE: the user running this must be able to access provided path.',
  'If all else fails, please open an issue here:',
  'http://github.com/tkellen/js-v8flags'
].join('\n');

function fail (err) {
  err.message += '\n\n' + failureMessage;
  return err;
}

function openConfig (cb) {
  var userHome = require('user-home');
  var configpath = path.join(userHome || os.tmpdir(), configfile);
  fs.open(configpath, 'a+', function (err, fd) {
    if (err) {
      return cb(fail(err));
    }
    return cb(null, fd);
  });
}

function writeConfig (fd, cb) {
  execFile(process.execPath, ['--v8-options'], function (execErr, result) {
    var flags;
    if (execErr) {
      return cb(execErr);
    }
    flags = result.match(/\s\s--(\w+)/gm).map(function (match) {
      return match.substring(2);
    }).filter(function (name) {
      return exclusions.indexOf(name) === -1;
    });
    var buf = new Buffer(JSON.stringify(flags));

    fs.write(fd, buf, 0, buf.length, null, function (writeErr, bytesWritten, buffer) {
      fs.close(fd, function (closeErr) {
        var err = writeErr || closeErr;
        if (err) {
          return cb(fail(err));
        }
        return cb(null, JSON.parse(buffer.toString()));
      });
    });
  });
}

function readConfig (fd, filesize, cb) {
  var buf = new Buffer(filesize);
  fs.read(fd, buf, 0, filesize, 0, function (readErr, bytesRead, buffer) {
    fs.close(fd, function (closeErr) {
      var err = readErr || closeErr;
      if (err) {
        return cb(fail(err));
      }
      return cb(null, JSON.parse(buffer.toString()));
    });
  });
}

module.exports = function (cb) {
  openConfig(function (err, fd) {
    if (err) {
      return cb(fail(err));
    }
    fs.fstat(fd, function (statErr, stats) {
      var filesize = stats.size;
      if (statErr) {
        return cb(fail(statErr));
      }
      if (filesize === 0) {
        return writeConfig(fd, cb);
      }
      return readConfig(fd, filesize, cb);
    });
  });
};

module.exports.configfile = configfile;
