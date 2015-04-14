var gulp  = require('gulp')
var shell = require('./')

var paths = {
  js: ['*.js', 'test/*.js']
}

gulp.task('test', shell.task('mocha -R spec -r should'))

gulp.task('coverage', ['test'], shell.task('istanbul cover _mocha -- -R spec'))

gulp.task('coveralls', ['coverage'], shell.task('cat coverage/lcov.info | coveralls'))

gulp.task('lint', shell.task([
  'jshint ' + paths.js.join(' '),
  'jscs '   + paths.js.join(' '),
]))

gulp.task('default', ['coverage', 'lint'])

gulp.task('watch', function () {
  gulp.watch(paths.js, ['default'])
})
