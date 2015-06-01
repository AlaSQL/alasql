# xls

Parser for Excel XLS (BIFF5/BIFF8) and 2003-2004 (XML) files.  Pure-JS cleanroom
implementation from the Microsoft Open Specifications and related documents.

Demo: <http://oss.sheetjs.com/js-xls>

Source: <http://git.io/xls>

## Installation

With [npm](https://www.npmjs.org/package/xlsjs):

    npm install xlsjs

In the browser:

    <script lang="javascript" src="xls.js"></script>

With [bower](http://bower.io/search/?q=js-xls):

    bower install js-xls

CDNjs automatically pulls the latest version and makes all versions available at
<http://cdnjs.com/libraries/xls>

## Optional Modules

The node version automatically requires modules for additional features.  Some
of these modules are rather large in size and are only needed in special
circumstances, so they do not ship with the core.  For browser use, they must
be included directly:

    <!-- international support from https://github.com/sheetjs/js-codepage -->
    <script src="dist/cpexcel.js"></script>

An appropriate version for each dependency is included in the dist/ directory.

The complete single-file version is generated at `dist/xls.full.min.js`

## ECMAScript 5 Compatibility

Since xls.js uses ES5 functions like `Array#forEach`, older browsers require
[Polyfills](http://git.io/QVh77g).  This repo and the gh-pages branch include
[a shim](https://github.com/SheetJS/js-xls/blob/master/shim.js)

To use the shim, add the shim before the script tag that loads xls.js:

    <script type="text/javascript" src="/path/to/shim.js"></script>

## Parsing Workbooks

For parsing, the first step is to read the file.  This involves acquiring the
data and feeding it into the library.  Here are a few common scenarios:

- node readFile:

```
if(typeof require !== 'undefined') XLS = require('xlsjs');
var workbook = XLS.readFile('test.xls');
/* DO SOMETHING WITH workbook HERE */
```

- ajax (for a more complete example that works in older browsers, check the demo
  at <http://oss.sheetjs.com/js-xls/ajax.html>):

```
/* set up XMLHttpRequest */
var url = "test_files/formula_stress_test_ajax.xls";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLS */
  var workbook = XLS.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
}

oReq.send();
```

- HTML5 drag-and-drop using readAsBinaryString:

```
/* set up drag-and-drop event */
function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  var files = e.dataTransfer.files;
  var i,f;
  for (i = 0, f = files[i]; i != files.length; ++i) {
    var reader = new FileReader();
    var name = f.name;
    reader.onload = function(e) {
      var data = e.target.result;

      /* if binary string, read with type 'binary' */
      var workbook = XLS.read(data, {type: 'binary'});

      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsBinaryString(f);
  }
}
drop_dom_element.addEventListener('drop', handleDrop, false);
```

## Working with the Workbook

This example gets the value of cell A1 of the first worksheet:

```
var sheet_name_list = workbook.SheetNames;
var Sheet1A1 = workbook.Sheets[sheet_name_list[0]]['A1'].v;
```

Complete examples:

- <http://oss.sheetjs.com/js-xls/> HTML5 File API / Base64 Text / Web Workers

Note that older versions of IE does not support HTML5 File API, so the base64
mode is provided for testing.  On OSX you can get the base64 encoding with:

    $ <target_file.xls base64 | pbcopy

- <http://oss.sheetjs.com/js-xls/ajax.html> XMLHttpRequest

- <https://github.com/SheetJS/js-xls/blob/master/bin/xls.njs> node

The node version installs a binary `xls` which can read XLS and XML2003
files and output the contents in various formats.  The source is available at
`xls.njs` in the bin directory.

Some helper functions in `XLS.utils` generate different views of the sheets:

- `XLS.utils.sheet_to_csv` generates CSV
- `XLS.utils.sheet_to_json` generates an array of objects
- `XLS.utils.get_formulae` generates a list of formulae

## Interface

`XLS` is the exposed variable in the browser and the exported node variable

`XLS.version` is the version of the library (added by the build script).

`XLS.SSF` is an embedded version of the [format library](http://git.io/ssf).

### Parsing functions

`XLS.read(data, read_opts)` attempts to parse `data`.

`XLS.readFile(filename, read_opts)` attempts to read `filename` and parse.

### Utilities

Utilities are available in the `XLS.utils` object:

Exporting:

- `sheet_to_json` converts a workbook object to an array of JSON objects.
- `sheet_to_csv` generates delimiter-separated-values output
- `sheet_to_formulae` generates a list of the formulae (with value fallbacks)

Cell and cell address manipulation:

- `format_cell` generates the text value for a cell (using number formats)
- `{en,de}code_{row,col}` convert between 0-indexed rows/cols and A1 forms.
- `{en,de}code_cell` converts cell addresses
- `{en,de}code_range` converts cell ranges

## Workbook / Worksheet / Cell Object Description

js-xls conforms to the Common Spreadsheet Format (CSF):

### General Structures

Cell address objects are stored as `{c:C, r:R}` where `C` and `R` are 0-indexed
column and row numbers, respectively.  For example, the cell address `B5` is
represented by the object `{c:1, r:4}`.

Cell range objects are stored as `{s:S, e:E}` where `S` is the first cell and
`E` is the last cell in the range.  The ranges are inclusive.  For example, the
range `A3:B7` is represented by the object `{s:{c:0, r:2}, e:{c:1, r:6}}`. Utils
use the following pattern to walk each of the cells in a range:

```
for(var R = range.s.r; R <= range.e.r; ++R) {
  for(var C = range.s.c; C <= range.e.c; ++C) {
    var cell_address = {c:C, r:R};
  }
}
```

### Cell Object

| Key | Description |
| --- | ----------- |
| `v` | raw value (see Data Types section for more info) |
| `w` | formatted text (if applicable) |
| `t` | cell type: `b` Boolean, `n` Number, `e` error, `s` String, `d` Date |
| `f` | cell formula (if applicable) |
| `z` | number format string associated with the cell (if requested) |
| `s` | the style/theme of the cell (if applicable) |

Built-in export utilities (such as the CSV exporter) will use the `w` text if it
is available.  To change a value, be sure to delete `cell.w` (or set it to
`undefined`) before attempting to export.  The utilities will regenerate the `w`
text from the number format (`cell.z`) and the raw value if possible.

### Data Types

The raw value is stored in the `v` field, interpreted based on the `t` field.

Type `b` is the Boolean type.  `v` is interpreted according to JS truth tables

Type `e` is the Error type. `v` holds the number and `w` holds the common name:

| Value | Error Meaning |
| ----: | :------------ |
|  0x00 | #NULL!        |
|  0x07 | #DIV/0!       |
|  0x0F | #VALUE!       |
|  0x17 | #REF!         |
|  0x1D | #NAME?        |
|  0x24 | #NUM!         |
|  0x2A | #N/A          |
|  0x2B | #GETTING_DATA |

Type `n` is the Number type. This includes all forms of data that Excel stores
as numbers, such as dates/times and Boolean fields.  Excel exclusively uses data
that can be fit in an IEEE754 floating point number, just like JS Number, so the
`v` field holds the raw number.  The `w` field holds formatted text.

Type `s` is the String type.  `v` should be explicitly stored as a string to
avoid possible confusion.


### Worksheet Object

Each key that does not start with `!` maps to a cell (using `A-1` notation)

`worksheet[address]` returns the cell object for the specified address.

Special worksheet keys (accessible as `worksheet[key]`, each starting with `!`):

- `ws['!ref']`: A-1 based range representing the worksheet range. Functions that
  work with sheets should use this parameter to determine the range.  Cells that
  are assigned outside of the range are not processed.  In particular, when
  writing a worksheet by hand, be sure to update the range.  For a longer
  discussion, see <http://git.io/KIaNKQ>

  Functions that handle worksheets should test for the presence of `!ref` field.
  If the `!ref` is omitted or is not a valid range, functions are free to treat
  the sheet as empty or attempt to guess the range.  The standard utilities that
  ship with this library treat sheets as empty (for example, the CSV output is an
  empty string).

- `ws['!merges']`: array of range objects corresponding to the merged cells in
  the worksheet.  Plaintext utilities are unaware of merge cells.  CSV export
  will write all cells in the merge range if they exist, so be sure that only
  the first cell (upper-left) in the range is set.

### Workbook Object

`workbook.SheetNames` is an ordered list of the sheets in the workbook

`wb.Sheets[sheetname]` returns an object representing the worksheet.

`wb.Props` is an object storing the standard properties.  `wb.Custprops` stores
custom properties.  Since the XLS standard properties deviate from the XLSX
standard, both objects are identical.


## Parsing Options

The exported `read` and `readFile` functions accept an options argument:

| Option Name | Default | Description |
| :---------- | ------: | :---------- |
| cellFormula | true    | Save formulae to the .f field ** |
| cellNF      | false   | Save number format string to the .z field |
| cellStyles  | false   | Save style/theme info to the .s field |
| sheetRows   | 0       | If >0, read the first `sheetRows` rows ** |
| bookFiles   | false   | If true, add raw files to book object ** |
| bookProps   | false   | If true, only parse enough to get book metadata ** |
| bookSheets  | false   | If true, only parse enough to get the sheet names |
| password    | ""      | If defined and file is encrypted, use password ** |

- `cellFormula` only applies to constructing XLS formulae.  XLML R1C1 formulae
  are stored in plaintext, but XLS formulae are stored in a binary format.
- Even if `cellNF` is false, formatted text will be generated and saved to `.w`
- In some cases, sheets may be parsed even if `bookSheets` is false.
- `bookSheets` and `bookProps` combine to give both sets of information
- `bookFiles` adds a `cfb` object (XLS only)
- `sheetRows-1` rows will be generated when looking at the JSON object output
  (since the header row is counted as a row when parsing the data)
- Currently only XOR encryption is supported.  Unsupported error will be thrown
  for files employing other encryption methods.

## Tested Environments

 - NodeJS 0.8, 0.10 (latest release), 0.11.14 (unstable), io.js
 - IE 6/7/8/9/10/11 using Base64 mode (IE10/11 using HTML5 mode)
 - FF 18 using Base64 or HTML5 mode
 - Chrome 24 using Base64 or HTML5 mode

Tests utilize the mocha testing framework.  Travis-CI and Sauce Labs links:

 - <https://travis-ci.org/SheetJS/js-xls> for XLS module in nodejs
 - <https://travis-ci.org/SheetJS/SheetJS.github.io> for XLS* modules
 - <https://saucelabs.com/u/sheetjs> for XLS* modules using Sauce Labs

## Test Files

Test files are housed in [another repo](https://github.com/SheetJS/test_files).

Running `make init` will refresh the `test_files` submodule and get the files.

## Testing

`make test` will run the node-based tests.  To run the in-browser tests, clone
[the oss.sheetjs.com repo](https://github.com/SheetJS/SheetJS.github.io) and
replace the xls.js file (then fire up the browser and go to `stress.html`):

```
$ cp xls.js ../SheetJS.github.io
$ cd ../SheetJS.github.io
$ simplehttpserver # or "python -mSimpleHTTPServer" or "serve"
$ open -a Chromium.app http://localhost:8000/stress.html
```

For a much smaller test, run `make test_misc`.

## Contributing

Due to the precarious nature of the Open Specifications Promise, it is very
important to ensure code is cleanroom.  Consult CONTRIBUTING.md

The xls.js file is constructed from the files in the `bits` subdirectory. The
build script (run `make`) will concatenate the individual bits to produce the
script.  Before submitting a contribution, ensure that running make will produce
the xls.js file exactly.  The simplest way to test is to move the script:

```
$ mv xls.js xls.new.js
$ make
$ diff xls.js xls.new.js
```

To produce the dist files, run `make dist`.  The dist files are updated in each
version release and should not be committed between versions.

## XLSX/XLSM/XLSB/ODS Support

XLSX/XLSM/XLSB/ODS is available in [js-xlsx](http://git.io/xlsx).

## License

Please consult the attached LICENSE file for details.  All rights not explicitly
granted by the Apache 2.0 license are reserved by the Original Author.

It is the opinion of the Original Author that this code conforms to the terms of
the Microsoft Open Specifications Promise, falling under the same terms as
OpenOffice (which is governed by the Apache License v2).  Given the vagaries of
the promise, the Original Author makes no legal claim that in fact end users are
protected from future actions.  It is highly recommended that, for commercial
uses, you consult a lawyer before proceeding.

## References

Certain features are shared with the Office Open XML File Formats, covered in:

ISO/IEC 29500:2012(E) "Information technology — Document description and processing languages — Office Open XML File Formats"

OSP-covered specifications:

 - [MS-CFB]: Compound File Binary File Format
 - [MS-XLS]: Excel Binary File Format (.xls) Structure Specification
 - [MS-XLSB]: Excel (.xlsb) Binary File Format
 - [MS-XLSX]: Excel (.xlsx) Extensions to the Office Open XML SpreadsheetML File Format
 - [MS-ODATA]: Open Data Protocol (OData)
 - [MS-OFFCRYPTO]: Office Document Cryptography Structure
 - [MS-OLEDS]: Object Linking and Embedding (OLE) Data Structures
 - [MS-OLEPS]: Object Linking and Embedding (OLE) Property Set Data Structures
 - [MS-OSHARED]: Office Common Data Types and Objects Structures
 - [MS-OVBA]: Office VBA File Format Structure
 - [MS-OE376]: Office Implementation Information for ECMA-376 Standards Support
 - [MS-CTXLS]: Excel Custom Toolbar Binary File Format
 - [MS-XLDM]: Spreadsheet Data Model File Format
 - [MS-EXSPXML3]: Excel Calculation Version 2 Web Service XML Schema
 - [XLS]: Microsoft Office Excel 97-2007 Binary File Format Specification

## Badges

[![Build Status](https://travis-ci.org/SheetJS/js-xls.svg?branch=master)](https://travis-ci.org/SheetJS/js-xls)

[![Coverage Status](http://img.shields.io/coveralls/SheetJS/js-xls/master.svg)](https://coveralls.io/r/SheetJS/js-xls?branch=master)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/4ee4284bf2c638cff8ed705c4438a686 "githalytics.com")](http://githalytics.com/SheetJS/js-xls)
