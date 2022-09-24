if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 327 FOREIGN KEYS', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test327; USE test327');
		done();
	});

	it.skip('2. CREATE TABLES Parts', function(done) {
		alasql(function() {
			/*
      CREATE TABLE dbo.Parts
      (
        partid   INT         NOT NULL PRIMARY KEY,
        partname VARCHAR(25) NOT NULL
      );
    */
		});
		done();
	});

	it.skip('3. INSERT VALUES INTO Parts', function(done) {
		alasql(function() {
			/*
      INSERT INTO dbo.Parts(partid, partname) VALUES
        ( 1, 'Black Tea'      ),
        ( 2, 'White Tea'      ),
        ( 3, 'Latte'          ),
        ( 4, 'Espresso'       ),
        ( 5, 'Double Espresso'),
        ( 6, 'Cup Cover'      ),
        ( 7, 'Regular Cup'    ),
        ( 8, 'Stirrer'        ),
        ( 9, 'Espresso Cup'   ),
        (10, 'Tea Shot'       ),
        (11, 'Milk'           ),
        (12, 'Coffee Shot'    ),
        (13, 'Tea Leaves'     ),
        (14, 'Water'          ),
        (15, 'Sugar Bag'      ),
        (16, 'Ground Coffee'  ),
        (17, 'Coffee Beans'   );
    */
		});
		done();
	});

	it.skip('4. CREATE TABLE BOM', function(done) {
		if (false) {
			alasql(function() {
				/*
      CREATE TABLE dbo.BOM
      (
        partid     INT           NOT NULL REFERENCES dbo.Parts,
        assemblyid INT           NULL     REFERENCES dbo.Parts,
        unit       VARCHAR(3)    NOT NULL,
        qty        DECIMAL(8, 2) NOT NULL,
        UNIQUE(partid, assemblyid),
        CHECK (partid <> assemblyid)
      );
    */
			});
		}
		alasql(function() {
			/*
      CREATE TABLE dbo.BOM
      (
        partid     INT           NOT NULL,
        assemblyid INT           NULL,
        unit       VARCHAR(3)    NOT NULL,
        qty        DECIMAL(8, 2) NOT NULL,
        UNIQUE(partid, assemblyid),
        CHECK (partid <> assemblyid),
        FOREIGN KEY (partid) REFERENCES dbo.Parts,
        CONSTRAINT assembly_fk FOREIGN KEY (assemblyid) REFERENCES dbo.Parts (partid)
      );
    */
		});

		done();
	});

	it.skip('5. INSERT VALUES INTO BOM', function(done) {
		alasql(function() {
			/*
      INSERT INTO dbo.BOM(partid, assemblyid, unit, qty) VALUES
        ( 1, NULL, 'EA',   1.00),
        ( 2, NULL, 'EA',   1.00),
        ( 3, NULL, 'EA',   1.00),
        ( 4, NULL, 'EA',   1.00),
        ( 5, NULL, 'EA',   1.00),
        ( 6,    1, 'EA',   1.00),
        ( 7,    1, 'EA',   1.00),
        (10,    1, 'EA',   1.00),
        (14,    1, 'mL', 230.00),
        ( 6,    2, 'EA',   1.00),
        ( 7,    2, 'EA',   1.00),
        (10,    2, 'EA',   1.00),
        (14,    2, 'mL', 205.00),
        (11,    2, 'mL',  25.00),
        ( 6,    3, 'EA',   1.00),
        ( 7,    3, 'EA',   1.00),
        (11,    3, 'mL', 225.00),
        (12,    3, 'EA',   1.00),
        ( 9,    4, 'EA',   1.00),
        (12,    4, 'EA',   1.00),
        ( 9,    5, 'EA',   1.00),
        (12,    5, 'EA',   2.00),
        (13,   10, 'g' ,   5.00),
        (14,   10, 'mL',  20.00),
        (14,   12, 'mL',  20.00),
        (16,   12, 'g' ,  15.00),
        (17,   16, 'g' ,  15.00);
      */
		});
		done();
	});

	it.skip('6. SELECT values from BOM', function(done) {
		var res = alasql('SELECT * FROM BOM WHERE assemblyid = 1');
		assert.deepEqual(res, [
			{partid: 6, assemblyid: 1, unit: 'EA', qty: 1},
			{partid: 7, assemblyid: 1, unit: 'EA', qty: 1},
			{partid: 10, assemblyid: 1, unit: 'EA', qty: 1},
			{partid: 14, assemblyid: 1, unit: 'mL', qty: 230},
		]);
		//    console.log(res);
		done();
	});

	it.skip('7. INSERT duplicated key', function(done) {
		assert.throws(function() {
			alasql(
				"INSERT INTO dbo.BOM(partid, assemblyid, unit, qty) VALUES \
          ( 1, NULL, 'EA',   1.00)"
			);
		}, Error);
		done();
	});

	it.skip('8. INSERT with wrong FOREIGN KEY', function(done) {
		assert.throws(function() {
			alasql(
				"INSERT INTO dbo.BOM(partid, assemblyid, unit, qty) VALUES \
          ( 1, 99, 'EA',   1.00)"
			);
		}, Error);
		done();
	});

	it.skip('8. INSERT with right FOREIGN KEY', function(done) {
		var res = alasql(
			"INSERT INTO dbo.BOM(partid, assemblyid, unit, qty) VALUES \
          ( 1, 2, 'EA',   1.00)"
		);
		assert(res == 1);
		done();
	});

	/*
      
  it.skip('8. SELECT',function(done){
    var res = alasql("SELECT VALUE distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'");
    assert(res == 99999);
    done();
  });

  it.skip('9. FOREIGN KEY DOT operator',function(done){
    var res = alasql.parse("SELECT city1.name, city2, distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'");
//    console.log(res.statements[0].columns[0].toJS('a','b'));
    var res = alasql("SELECT city1.name, city2, distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'");
    assert(res == 99999);
    done();
  });

*/
	it.skip('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test327');
		done();
	});
});
