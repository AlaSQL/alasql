# adler32

Signed ADLER-32 algorithm implementation in JS (for the browser and nodejs).
Emphasis on correctness and performance.

## Installation

In [nodejs](https://www.npmjs.org/package/adler-32):

    npm install adler-32

In the browser:

    <script lang="javascript" src="adler32.js"></script>

The browser exposes a variable ADLER32

## Usage

- `ADLER32.buf(byte array or buffer)` assumes the argument is a set of 8 bit
  unsigned integers (e.g. nodejs `Buffer` or simple array of ints)

- `ADLER32.bstr(binary string)` interprets the argument as a binary string where
  the `i`-th byte is `str.charCodeAt(i)`

- `ADLER32.str(string)` interprets the argument as a standard JS string

## Testing

`make test` will run the nodejs-based test.  To run the in-browser tests, run a
local server and go to the `ctest` directory.  To update the browser artifacts,
run `make ctest`.

To generate the bits file, use the `adler32` function from python zlib:

```
>>> from zlib import adler32
>>> x="foo bar baz٪☃🍣"
>>> adler32(x)
1543572022
>>> adler32(x+x)
-2076896149
>>> adler32(x+x+x)
2023497376
```

## Performance

`make perf` will run algorithmic performance tests (which should justify certain
decisions in the code).  

[js-crc](http://git.io/crc32) has more performance notes

Bit twiddling is much faster than taking the mod on Safari and older Firefoxes.
Instead of taking the literal mod 65521, it is faster to keep it in the integers
by bit-shifting: `65536 ~ 15 mod 65521` so for nonnegative integer `a`:

```
    a = (a >>> 16) * 65536 + (a & 65535)            [equality]
    a ~ (a >>> 16) * 15    + (a & 65535) mod 65521
```

The mod is taken at the very end, since the intermediate result may exceed 65521

## Magic Number

The magic numbers were chosen so as to not overflow a 31-bit integer:

```
F[n_] := Reduce[x*(x + 1)*n/2 + (x + 1)*(65521) < (2^31 - 1) && x > 0, x, Integers]
F[255] (* bstr:  x \[Element] Integers && 1 <= x <= 3854 *)
F[127] (* ascii: x \[Element] Integers && 1 <= x <= 5321 *)
```

Subtract up to 4 elements for the unicode case.

## License

Please consult the attached LICENSE file for details.  All rights not explicitly
granted by the Apache 2.0 license are reserved by the Original Author.

[![Build Status](https://travis-ci.org/SheetJS/js-adler32.svg?branch=master)](https://travis-ci.org/SheetJS/js-adler32)

[![Coverage Status](https://coveralls.io/repos/SheetJS/js-adler32/badge.png?branch=master)](https://coveralls.io/r/SheetJS/js-adler32?branch=master)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8827aa40b3fdbca7c7ad0f51c68b3379 "githalytics.com")](http://githalytics.com/SheetJS/js-adler32)

