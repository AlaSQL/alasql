var a = require('assert');
var cjson = require('../');
var fixtures = __dirname + '/fixtures';

var data = {
    conf1: {key: 'value'},
    conf2: {key: 'value'},
    conf3: {key: 'value'},
    conf4: {
        "//key" : "value",
        "key": "//value",
        "/*key": "value",
        "key": "/*value*/"
    },
    conf5: {"'key/*test*/'": "'value//test'"},
    conf6: {"key\"/*test*/": "value\"//test"},
    conf7: {"key": "{{root}}/src"},
    conf8: {}
};

a.doesNotThrow(function() {
    cjson.load(fixtures + '/conf1.json');
}, 'valid config loaded');

a.deepEqual(cjson.load(fixtures + '/conf1.json'), data.conf1, 'data is correct');

a.deepEqual(cjson.load(fixtures + '/conf2.json'), data.conf2, 'singleline comment');

a.deepEqual(cjson.load(fixtures + '/conf3.json'), data.conf3, 'multiline comment');

a.deepEqual(cjson.load(fixtures + '/conf4.json'), data.conf4, 'comments inside of a string');

a.deepEqual(cjson.load(fixtures + '/conf5.json'), data.conf5, 'single and double quotes mix');

a.deepEqual(cjson.load(fixtures + '/conf6.json'), data.conf6, 'escaped double quote inside of a string');

a.deepEqual(cjson.load(fixtures + '/conf7.json', {replace: {root: '/usr'}}), {"key": "/usr/src"}, 'tmpl replacement');

a.deepEqual(cjson.load(fixtures + '/conf8.json'), data.conf8, 'string-like comment');

var data1 = {
    conf1: {key: 'value'},
    conf6: data.conf6
};

a.deepEqual(cjson.load([fixtures + '/conf1.json', fixtures + '/conf6.json']), data1, 'load array of jsons');


var data2 = {
    key: 'value',
    "key\"/*test*/": "value\"//test"
};

a.deepEqual(cjson.load([fixtures + '/conf1.json', fixtures + '/conf6.json'], true), data2, 'load array of jsons and merge them');

a.deepEqual(cjson.load(fixtures), data, 'load all and merge them');

a.deepEqual(cjson.load(fixtures, {ext: '.cjson'}), {conf9: {a: 1}}, 'use custom ext');

var str = require('fs').readFileSync(fixtures + '/conf2.json').toString();

a.deepEqual(cjson.parse(str), data.conf2, '.parse method with comments');

(function extend() {
    a.deepEqual(cjson.extend({test1: 1}, {test2: 2}), {test1: 1, test2: 2}, 'extend 2 simple objects');
    a.deepEqual(cjson.extend({test1: 1}, {test2: 2}, {test3: 3}), {test1: 1, test2: 2, test3: 3}, 'extend 3 simple objects');
    a.deepEqual(cjson.extend({test1: 1}, true), {test1: 1}, '2 arg is not an object');
    a.deepEqual(cjson.extend( true, {test1: {test1: 1}}, {test1: {test2: 2} } ), { test1: {test1: 1, test2: 2} }, 'deep extend' );
    a.deepEqual(cjson.extend( true, {test: {test: 'test'}}, {test: {test: 'test'} } ), {test: {test: 'test'} }, 'deep extend, check endless lop' );
    var data1 = {a: {b: 1}},
        data2 = {a: {b: 2}};
    cjson.extend(true, {}, data1, data2);
    a.notDeepEqual(data1, data2, 'original deep object is not mangled');
}());

(function freeze() {
    var data1 = {a: {b: 1}},
        data2 = {a: {b: 1}};

    cjson.freeze(data1);
    data1.abc = 123;
    data1.a = 123;
    a.deepEqual(data1, data2, 'data1 wasn\'t changed');

    data1 = cjson.load(fixtures + '/conf1.json', {freeze: true}),
    data2 = cjson.load(fixtures + '/conf1.json', {freeze: true});
    data1.abc = 123;
    data1.a = 123;
    a.deepEqual(data1, data2, 'data1 wasn\'t changed');
}())

console.log('All tests passed.');

