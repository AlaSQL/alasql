// Prepare
// zz

var zz = require('./zz');


var one = {a:'one', b:'two', c:'three'};
var two = ['one', 'two', 'three'];

function clone(obj) {
  var target = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
}


// Test 1
zz.times = 1000000;
zz('for in', function(){
	var a = {};
	for(var k in one){
		a[k] = one[k]
	}
});

zz('precompiled', function(){
	var a = {a:one.a,b:one.b,c:one.c};
});

function cop() {
	var a = {a:one.a,b:one.b,c:one.c};
}

zz('precompiled+fn', function(){
	cop();
});

zz('array', function(){
	var a = [two[0],two[1],two[2]];
});

zz('clone', function(){
	var a = clone(one);
});

zz('Object.keys', function(){
	var a = Object.keys(one);
});

zz('JSON', function(){
	var a = JSON.parse(JSON.stringify(one));
});

zz.log();

// Test2