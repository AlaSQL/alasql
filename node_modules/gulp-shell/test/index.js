/*eslint-env mocha */

var gutil = require('gulp-util')
var join = require('path').join
var expect = require('chai').expect

var shell = require('..')

var originalStdoutWrite = process.stdout.write
function expectToOutput(expected, done) {
  process.stdout.write = function (actual) {
    process.stdout.write = originalStdoutWrite
    expect(actual.toLowerCase()).to.include(expected.toLowerCase())
    done()
  }
}

describe('gulp-shell(commands, options)', function () {
  var fakeFile = new gutil.File({
    cwd: __dirname,
    base: __dirname,
    path: join(__dirname, 'test-file')
  })

  it('throws when `commands` is missing', function () {
    expect(shell).to.throw('Missing commands')
  })

  it('works when `commands` is a string', function () {
    expect(shell.bind(null, 'true')).to.not.throw()
  })

  it('passes file through', function (done) {
    var stream = shell(['true'])

    stream.on('data', function (file) {
      expect(file).to.equal(fakeFile)
      done()
    })

    stream.write(fakeFile)
  })

  it('reads input', function (done) {
    var stream = shell(['read s; echo $s'])

    process.stdin.push('something\n')
    expectToOutput('something', done)

    stream.write(fakeFile)
  })

  it('executes command after interpolation', function (done) {
    var stream = shell(['echo <%= file.path %>'])

    expectToOutput(fakeFile.path, done)

    stream.write(fakeFile)
  })

  it('prepends `./node_modules/.bin` to `PATH`', function (done) {
    var stream = shell(['echo $PATH'])

    expectToOutput(join(process.cwd(), 'node_modules/.bin'), done)

    stream.write(fakeFile)
  })

  describe('.task(commands, options)', function () {
    it('returns a function which returns a stream', function (done) {
      var task = shell.task(['true'])
      expect(task).to.be.a('function')

      var stream = task()
      stream.on('data', function () {
        done()
      })
    })
  })

  describe('options', function () {
    describe('ignoreErrors', function () {
      it('emits error by default', function (done) {
        var stream = shell(['false'])

        stream.on('error', function () {
          done()
        })

        stream.write(fakeFile)
      })

      it("won't emit error when `ignoreErrors` == true", function (done) {
        var stream = shell(['false'], {ignoreErrors: true})

        stream.on('error', function () {
          throw new Error()
        })

        stream.on('data', function () {
          done()
        })

        stream.write(fakeFile)
      })
    })

    describe('quiet', function () {
      it("won't output anything when `quiet` == true", function (done) {
        var stream = shell(['echo cannot see me!'], {quiet: true})

        expectToOutput('this should not match anything!', done)

        stream.on('data', function () {
          process.stdout.write = originalStdoutWrite
          done()
        })

        stream.write(fakeFile)
      })
    })

    describe('errorMessage', function () {
      it('allows for custom messages', function (done) {
        var errorMessage = 'foo'
        var stream = shell(['false'], {errorMessage: errorMessage})

        stream.on('error', function (error) {
          expect(error.message).to.equal(errorMessage)
          done()
        })

        stream.write(fakeFile)
      })

      it('includes the error object in the error context', function (done) {
        var errorMessage = 'Foo <%= error.code %>'
        var expectedMessage = 'Foo 2'
        var stream = shell(['exit 2'], {errorMessage: errorMessage})

        stream.on('error', function (error) {
          expect(error.message).to.equal(expectedMessage)
          done()
        })

        stream.write(fakeFile)
      })
    })

    describe('cwd', function () {
      it('sets the current working directory when `cwd` is a string', function (done) {
        var stream = shell(['pwd'], {cwd: '..'})

        expectToOutput(join(__dirname, '../..'), done)

        stream.write(fakeFile)
      })
    })

    describe('cwd', function () {
      it('uses the process current working directory when `cwd` is not passed', function (done) {
        var stream = shell(['pwd'])

        expectToOutput(join(__dirname, '..'), done)

        stream.write(fakeFile)
      })
    })
  })
})
