if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 241 :: type casting operator and Ranges', function () {
	it(':: operator', function (done) {
		var res = alasql('select value 10::string');
		assert(res === '10');
		done();
	});

	// 1::INT

	// Ranges

	// select '[1,2)'::range
	// select 1 in '[1,2)'::range

	// {
	//   ubopen:true,
	//   ubvalue:,
	//   lbopen:true,
	//   lbvalue:
	// }

	// a @&& a
	// a @* a
});
