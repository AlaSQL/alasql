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
        root.zt = factory();
    }
}(this, function () {

function zt(name, times, cb){
	if(arguments.length == 2) {
		cb = times;
		times = zt.times || 10000;
	} else 	if(arguments.length == 3) {
		zt.times = times;
	};
	if(!zt.res) zt.res = [];
	var tm = Date.now();
	for(var i=0;i<times;i++) {
		cb();
	};
	zt.res.push({name:name,time: Date.now()-tm})
};

zt.log = function() {
	var space = '                                          ';
	var max = 0+Math.max.apply(Math, zt.res.map(function(r){return r.name.length}));
	var head = ('Tests' + space).substr(0,max)+'  Time (ms)';
	console.log(head);
//	console.log(head.map(function(){return '=';}).join());
	zt.res.forEach(function(r){console.log((r.name + space).substr(0,max)+'  '+("       "+r.time).substr(-8));});
	zt.res = [];
}

return zt;
}));