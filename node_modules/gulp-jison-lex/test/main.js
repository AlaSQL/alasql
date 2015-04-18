var should = require('should');
var jisonLex = require('jison-lex');
var gulpJisonLex = require('../');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
require('mocha');

function virtualFile(filename, contents) {
    return new gutil.File({
        path: path.join(__dirname, 'fixtures', filename),
        base: path.join(__dirname, 'fixtures'),
        cwd: process.cwd(),
        contents: contents
    });
};

describe('gulp-jison-lex', function () {

    it('should output the same lexer as jison-lex', function (done) {

        var filepath = 'test/fixtures/calculator.jisonlex';
        var contents = fs.readFileSync(filepath);
        var expected = jisonLex.generate(contents.toString());

        gulpJisonLex()
            .on('error', done)
            .on('data', function (data) {
                data.contents.toString().should.equal(expected);
                done();
            })
            .write(virtualFile('calculator.jisonlex', contents));
    });

});