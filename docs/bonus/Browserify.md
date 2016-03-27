
# Browserify

When targeting the browser, several code bundlers (like Webpack and Browserify) will pick up modules you might not want.

Here's a list of modules that alasql requires
* fs
* cptable
* jszip
* xlsx
* xls
* cpexcel
* path
* es6-promise

Have a read on [excluding](https://github.com/substack/browserify-handbook#excluding), [ignoring](https://github.com/substack/browserify-handbook#ignoring), and [shimming](https://github.com/substack/browserify-handbook#shimming) with browserify. 

An example of you you can exclude modules:

```js
var browserify = require("browserify");
var bundle = browserify("./main.js").bundle();
// Will ignore the modules fs, path, xlsx, xls
["fs","path","xlsx","xls"].map(function(ignore){bundle.ignore(ignore)});
```




----


<a href="http://alasql.org"><img src="https://cloud.githubusercontent.com/assets/1063454/14003947/d6e7b7be-f156-11e5-8a25-71c785031a5f.png" align="right" alt="AlaSQL logo" width="82" height="82"/></a>

