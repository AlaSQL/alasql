if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
  var Promise = require('es6-promise').Promise;
} else {
	__dirname = '.';
};


describe('Test 291 Promised version', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test291;USE test291');
    done();
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
      console.log(res);
    }).catch(function(err){
        assert(err instanceof Error);
        done();
    });;

  });
  // TODO: Add other operators

  it('4. DROP DATABASE',function(done){
    alasql('DROP DATABASE test291');
    done();
  });
});
