if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var Promise = require('es6-promise').Promise;
} else {
	__dirname = '.';
};


describe('Test 291 Promised version', function() {

  before(function(){
    alasql('CREATE DATABASE test291;USE test291');
  });

  after(function(){
    alasql('DROP DATABASE test291');
  });


// function alasqlp(sql, params) {
//     return new Promise(function(resolve, reject){
//         alasql(sql, params, function(data,err) {
//              if(err) {
//                  reject(err);
//              } else {
//                  resolve(data);
//              }
//         });
//     });
// };


  it('2. Promise',function(done){

    alasql.promise('SELECT VALUE 1')
    .then(function(res){
         assert.deepEqual(res,1);
         done();
    }).catch(function(err){
        throw err;
    });;
  });

  it('3. Promise Exception',function(done){

    alasql.promise('SELECT * FROM one')
    .then(function(res){
/// console.log(res);
    }).catch(function(err){
        assert(err instanceof Error);
        done();
    });;

  });

  it('3. Promise all',function(done){

    alasql.promise(['value of SELECT 1', ['value of select ?', 2]])
			.then(function(res){
				assert.deepEqual(res, [1,2]);
				done();
			}).catch(function(reason){console.log(reason)})

  });
  // TODO: Add other operators

});
