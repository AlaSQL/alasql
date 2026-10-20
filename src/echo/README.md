# Echo Plugin

This is a simple test plugin to support only one command:
```js
    alasql('REQUIRE ECHO');
    var res = alasql('ECHO 123');
```
returns 123