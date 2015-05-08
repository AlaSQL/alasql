if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 315 Brackets for SEARCH', function() {

  it('1. Simple Brackets',function(done){


    var data = {a:10,b:100, c:{d:5,e:6}};
    var res = alasql('SEARCH a FROM ?', [data]);
    assert(res[0] == 10);
    var res = alasql('SEARCH (a) FROM ?', [data]);
    assert(res[0] == 10);

    var res = alasql('SEARCH with(c d) FROM ?', [data]);
    assert(res[0] == 5);

    var res = alasql('SEARCH c with(d) FROM ?', [data]);
    assert(res[0] == 5);

    var res = alasql('SEARCH with(c) d FROM ?', [data]);
    assert(res[0] == 5);

    var res = alasql('SEARCH with(c) with(d) FROM ?', [data]);
    assert(res[0] == 5);


    var data = [{a:1}, {b:{a:2},c:2},{c:3}];

    var res = alasql('SEARCH / / a FROM ?', [data]);
    assert(res == 2);

    var res = alasql('SEARCH / a FROM ?', [data]);
    assert.deepEqual(res,[1]);

    var res = alasql('SEARCH / + a FROM ?', [data]);
//    console.log(res);
    assert.deepEqual(res,[1,2]);


   var res = alasql('SEARCH (/)+ a FROM ?', [data]);
    assert.deepEqual(res,[1,2]);

   var res = alasql('SEARCH ((/)+ (a)) FROM ?', [data]);
    assert.deepEqual(res,[1,2]);

    var res = alasql('SEARCH (/)? a FROM ?', [data]);
    assert.deepEqual(res,[1]);
//    console.log(res);

    var data = [{a:1}, {b:{a:2},c:2},{c:3}];
    var res = alasql('SEARCH /+ a FROM ?', [data]);
    assert.deepEqual(res,[1,2]);


    var data = [{a:1}, {b:{a:2},c:2}, {c:3}];
    var res = alasql('SEARCH / + a FROM ?', [data]);
//    console.log(res);

    var res = alasql('SEARCH / + FROM ?', [data]);
    assert.deepEqual(res,[ { a: 1 }, { b: { a: 2 }, c: 2 }, { c: 3 }, 1, { a: 2 }, 2, 3, 2 ]);

    var res = alasql('SEARCH ((/+) a) ORDER BY(_ DESC) FROM ?', [data]);
    assert.deepEqual(res,[2,1]);

    var res = alasql('SEARCH ((/+) a) ORDER BY() FROM ?', [data]);
    assert.deepEqual(res,[2,1]);

    var res = alasql('SEARCH ((/+) a) ORDER BY(DESC) FROM ?', [data]);
    assert.deepEqual(res,[2,1]);

    var res = alasql('SEARCH (/+a) ORDER BY(DESC) FROM ?', [data]);
    assert.deepEqual(res,[2,1]);

    var res = alasql('SEARCH (/ *a) ORDER BY(DESC) FROM ?', [data]);
    assert.deepEqual(res,[2,1]);

    done();

  });

});

