if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
	var DOMStorage = require("dom-storage");
	global.localStorage = new DOMStorage("./test381.json", { strict: false, ws: '' });
};

/*
 This sample beased on this article:

  https://jira.mongodb.org/browse/SERVER-831
*/

describe('Test 386 - Nested Search (issue #495)', function() {

    var data = [
      { "_id" : 1,
        "name" : "Dave Gahan",
        "medications" : [
          { "id" : 23,
            "name" : "Dilaudid",
            "type" : "Rx",
            "prescriptions" : [
              { "id" : 13,
                "quantity" : 60,
                "started" : 2009-01-01
              },
              { "id" : 77,
                "quantity" : 45,
                "started" : 2009-02-01
              }
            ]
          },
          { "id" : 41,
            "name" : "Oxycodone",
            "type" : "Rx"
          }
        ]
      },

      { "_id" : 2,
        "name" : "Sergio Brahnan",
        "medications" : [
          { "id" : 231,
            "name" : "Dilaudid",
            "type" : "Rx",
            "prescriptions" : [
              { "id" : 131,
                "quantity" : 601,
                "started" : 2009-01-01
              },
              { "id" : 771,
                "quantity" : 451,
                "started" : 2009-02-01
              }
            ]
          },
          { "id" : 411,
            "name" : "Oxycodone",
            "type" : "Rx"
          }
        ]
      }

    ];



  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test386;USE test386');
    done();
  });


	it('2. Change property', function(done){
    alasql('SEARCH /medications/prescriptions/WHERE(id=77) SET(quantity=30) FROM ?',[data]);
    assert(data[0].medications[0].prescriptions[1].quantity == 30);
		done();
	});


  it('3. Change property in all levels', function(done){
    alasql('SEARCH /+ WHERE(id=77) SET(quantity=31) FROM ?',[data]);
    assert(data[0].medications[0].prescriptions[1].quantity == 31);
    done();
  });

  it('4. Change property in all levels', function(done){
    alasql('SEARCH / * WHERE(id=77) SET(quantity=32) FROM ?',[data]);
    assert(data[0].medications[0].prescriptions[1].quantity == 32);
    done();
  });

  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test386');
    done();
  });


});
