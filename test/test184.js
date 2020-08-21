if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 184 - SELECT INDEX', function () {
	it('0.test _', function (done) {
		var data = [1, 2, 3, 4, 1, 2, 2, 3];
		var res = alasql('SELECT _, ARRAY(_) FROM ? GROUP BY _', [data]);
		// console.log(res);
		assert.deepEqual(res, [
			{_: 1, 'ARRAY(_)': [1, 1]},
			{_: 2, 'ARRAY(_)': [2, 2, 2]},
			{_: 3, 'ARRAY(_)': [3, 3]},
			{_: 4, 'ARRAY(_)': [4]},
		]);
		done();
	});

	// it('0.test _',function(done){
	//   var data = [1,2,3,4,1,2,2,3];
	//   var res = alasql('SELECT one._, ARRAY(_) FROM ? one GROUP BY one._',[data]);
	//   console.log(res);
	//   assert(false);
	//   done();
	// });

	it('1. SELECT INDEX', function (done) {
		var data = [1, 2, 3, 4, 1, 2, 2, 3];
		var res = alasql('SELECT INDEX _,ARRAY(_) FROM ? GROUP BY _', [data]);
		//      console.log(res);
		assert.deepEqual(res, {'1': [1, 1], '2': [2, 2, 2], '3': [3, 3], '4': [4]});
		//      console.log(res);

		var res = alasql('SELECT INDEX _,COUNT(*) FROM ? GROUP BY _', [data]);
		//      console.log(res);
		assert.deepEqual(res, {'1': 2, '2': 3, '3': 2, '4': 1});
		//      console.log(res);
		//      var res = alasql('SELECT TEXT COUNT(*),ARRAY(_) FROM ? GROUP BY _',[data]);
		//      assert(res = '')
		//      console.log(res);
		done();
	});
});
