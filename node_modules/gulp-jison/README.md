gulp-jison [![NPM version](https://badge.fury.io/js/gulp-jison.png)](http://badge.fury.io/js/gulp-jison) [![Build Status](https://travis-ci.org/matteckert/gulp-jison.png?branch=master)](https://travis-ci.org/matteckert/gulp-jison) [![Dependency Status](https://david-dm.org/matteckert/gulp-jison.png)](https://david-dm.org/matteckert/gulp-jison)
==========

Jison plugin for gulp

Usage
-----

```javascript
var jison = require('gulp-jison');

gulp.task('jison', function() {
    return gulp.src('./src/*.jison')
        .pipe(jison({ moduleType: 'commonjs' }))
        .pipe(gulp.dest('./src/'));
});
```

Errors
------

gulp-jison will emit any Jison errors. If you don't listen to the 
`.on('error', cb)` event, gulp will crash if there's a Jison error.

Options
--------

gulp-jison supports the same options object as Jison itself.

License
-------

The MIT License (MIT)

Copyright (c) 2014 Matt Eckert <me@matteckert.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
