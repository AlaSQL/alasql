//
// zz.js 
// Test microframework
// (c) 2014, Andrey Gershun

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.zz = factory();
    }
}(this, function () {

function zz(name, cb){
	var times = zz.times || 10000;
	if(!zz.res) zz.res = [];
	var tm = Date.now();
	for(var i=0;i<times;i++) {
		cb();
	};
	zz.res.push({name:name,time: Date.now()-tm})
};

zz.log = function() {
	var space = '                                          ';
	var max = 0+Math.max.apply(Math, zz.res.map(function(r){return r.name.length}));
	var head = ('Tests' + space).substr(0,max)+'  Time (ms)';
	console.log(head);
//	console.log(head.map(function(){return '=';}).join());
	zz.res.forEach(function(r){console.log((r.name + space).substr(0,max)+'  '+("       "+r.time).substr(-8));});
}

return zz;
}));