// Prepare
// zz

var zz = require('./zz');

zz.times = 1000000;

var b = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10};

zz('json', function(){
	var r = {
		a:b.a,
		b:b.b,
		c:b.c,
		d:b.d,
		e:b.e,
		f:b.f,
		g:b.g,
		h:b.h,
		i:b.i,
		j:b.j
	};
});

zz('json with', function(){
	with(b) var r = {
		a:a,
		b:b,
		c:c,
		d:d,
		e:e,
		f:f,
		g:g,
		h:h,
		i:i,
		j:j
	};
});


zz('assign', function(){
	var r = {};
		r.a=b.a;
		r.b=b.b;
		r.c=b.c;
		r.d=b.d;
		r.e=b.e;
		r.f=b.f;
		r.g=b.g;
		r.h=b.h;
		r.i=b.i;
		r.j=b.j;
});


zz('for in', function(){
	var r = {};
	for(var k in b){
		r[k] = b[k]
	}
});


zz.log();

// Test2