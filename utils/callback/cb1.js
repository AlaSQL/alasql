function get1(n, index, cb) {
	var nn = n;
	if (n < 0) return;
	if (n >= 10) return;
	setTimeout(function () {
		cb('get1', {a: nn, b: nn * 2});
	}, 200);
}

function get2(n, index, cb) {
	var nn = n;
	if (n < 0) return;
	if (n >= 10) return;
	setTimeout(function () {
		cb('get2', {a: nn, b: nn * 3});
	}, 100);
}

var times = 0;
var buff = [];

function after(key, data) {
	buff[key] = data;
	console.log(times);
	times++;
	if (times < 6) return;
	setTimeout(function () {
		process(buff);
	}, 0);
	console.log('before process');
}

function process(data) {
	console.log('process', data);
	console.log('after process');
}

console.log('start');
get1(1, null, after);
get1(1, null, after);
get2(3, null, after);
get2(4, null, after);
get2(5, null, after);
get2(2, null, after);
console.log('finish');

var k = 5;
var data = [];

var next = function () {
	console.log('next', k);
	data.push(k);
	k--;
	if (k > 0) setTimeout(next, 0);
	else setTimeout(onfinish, 0);
};

var onfinish = function () {
	console.log(data);
};

setTimeout(next, 0);
