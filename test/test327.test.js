// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 327 FOREIGN KEYS', () => {
	test.skip('1. CREATE DATABASE', done => {
		alasql('CREATE DATABASE test327; USE test327');
		done();
	});

	test.skip('2. CREATE TABLES Parts', done => {
		alasql(() => {
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

	test.skip('3. INSERT VALUES INTO Parts', done => {
		alasql(() => {
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

	test.skip('4. CREATE TABLE BOM', done => {
		if (false) {
			alasql(() => {
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
		alasql(() => {
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

	test.skip('5. INSERT VALUES INTO BOM', done => {
		alasql(() => {
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

	test.skip('6. SELECT values from BOM', done => {
		var res = alasql('SELECT * FROM BOM WHERE assemblyid = 1');
		expect(res).toEqual([
			{partid: 6, assemblyid: 1, unit: 'EA', qty: 1},
			{partid: 7, assemblyid: 1, unit: 'EA', qty: 1},
			{partid: 10, assemblyid: 1, unit: 'EA', qty: 1},
			{partid: 14, assemblyid: 1, unit: 'mL', qty: 230},
		]);
		//    console.log(res);
		done();
	});

	test.skip('7. INSERT duplicated key', done => {
		expect(() => {
			alasql(
				"INSERT INTO dbo.BOM(partid, assemblyid, unit, qty) VALUES \
          ( 1, NULL, 'EA',   1.00)"
			);
		}).toThrow(Error);
		done();
	});

	test.skip('8. INSERT with wrong FOREIGN KEY', done => {
		expect(() => {
			alasql(
				"INSERT INTO dbo.BOM(partid, assemblyid, unit, qty) VALUES \
          ( 1, 99, 'EA',   1.00)"
			);
		}).toThrow(Error);
		done();
	});

	test.skip('8. INSERT with right FOREIGN KEY', done => {
		var res = alasql(
			"INSERT INTO dbo.BOM(partid, assemblyid, unit, qty) VALUES \
          ( 1, 2, 'EA',   1.00)"
		);
		expect(res == 1).toBe(true);
		done();
	});

	/*
      
  test.skip('8. SELECT',function(done){
    var res = alasql("SELECT VALUE distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'");
    expect(res == 99999).toBe(true);
    done();
  });

  test.skip('9. FOREIGN KEY DOT operator',function(done){
    var res = alasql.parse("SELECT city1.name, city2, distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'");
//    console.log(res.statements[0].columns[0].toJS('a','b'));
    var res = alasql("SELECT city1.name, city2, distance FROM dbo.Roads WHERE city1 = 'SFO' AND city2 = 'SVO'");
    expect(res == 99999).toBe(true);
    done();
  });

*/
	test.skip('99. DROP DATABASE', done => {
		alasql('DROP DATABASE test327');
		done();
	});
});
