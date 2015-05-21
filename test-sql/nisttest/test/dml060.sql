-- MODULE DML060

-- SQL Test Suite, V6.0, Interactive SQL, dml060.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0261 WHERE (2 * (c1 - c2)) BETWEEN!

     SELECT COL1, COL2
          FROM VTABLE
          WHERE(2*(COL3 - COL2)) BETWEEN 5 AND 200
          ORDER BY COL1;
-- PASS:0261 If 2 rows are selected ?
-- PASS:0261 If first row is  ( 10,  20)?
-- PASS:0261 If second row is (100, 200)?

-- END TEST >>> 0261 <<< END TEST

-- ********************************************************************

-- TEST:0262 WHERE clause with computation, ANY/ALL subqueries!

     UPDATE VTABLE
          SET COL1 = 1
          WHERE COL1 = 0;
-- PASS:0262 If 1 row is updated?

     SELECT COL1, COL2
          FROM VTABLE
          WHERE (COL3 * COL2/COL1) > ALL
                (SELECT HOURS FROM WORKS)
                OR -(COL3 * COL2/COL1) > ANY
                (SELECT HOURS FROM WORKS)
          ORDER BY COL1;
-- PASS:0262 If 2 rows are selected?
-- PASS:0262 If first row is  ( 100,   200)?
-- PASS:0262 If second row is (1000, -2000)?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0262 <<< END TEST
 
-- ******************************************************************

-- TEST:0263 Computed column in ORDER BY!

     SELECT COL1, (COL3 * COL2/COL1 - COL2 + 10)
          FROM VTABLE
          WHERE COL1 > 0
          ORDER BY 2;
-- PASS:0263 If 3 rows are selected in order with values:?
-- PASS:0263      (1000, -3990)?
-- PASS:0263      (  10,    50)?
-- PASS:0263      ( 100,   410)?

-- END TEST >>> 0263 <<< END TEST

-- ********************************************************************

-- TEST:0265 Update:searched - view with check option!

-- setup
     INSERT INTO WORKS
            VALUES('E3','P4',50);
-- PASS:0265 If 1 row is inserted?

           SELECT EMPNUM, PNUM, HOURS
                FROM SUBSP;
-- PASS:0265 If 2 rows are selected?

     SELECT * FROM WORKS;
-- PASS:0265 If 13 rows selected?

     UPDATE SUBSP 
          SET EMPNUM = 'E9'
          WHERE PNUM = 'P2';
-- PASS:0265 If ERROR, view check constraint, 0 rows are updated?
 
     SELECT * FROM WORKS;
-- PASS:0265 If 13 rows selected and no EMPNUM = 'E9'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0265 <<< END TEST

-- ******************************************************************

-- TEST:0266 Update:searched - UNIQUE violation under view!

-- setup
     INSERT INTO WORKS
            VALUES('E3','P4',50);
-- PASS:0266 If 1 row is inserted?

     SELECT EMPNUM, PNUM, HOURS
          FROM SUBSP;
-- PASS:0266 If 2 rows are selected?

     SELECT * FROM WORKS WHERE EMPNUM = 'E3';
-- PASS:0266 If 2 rows selected and PNUM values are 'P2' and 'P4'?

     UPDATE SUBSP
          SET PNUM = 'P6'
          WHERE EMPNUM = 'E3';
-- PASS:0266 If ERROR, unique constraint, 0 rows updated?

     SELECT EMPNUM, PNUM, HOURS
          FROM SUBSP;
-- PASS:0266 If 2 rows are selected?

     SELECT * FROM WORKS WHERE EMPNUM = 'E3';
-- PASS:0266 If 2 rows selected and PNUM values are 'P2' and 'P4'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0266 <<< END TEST

-- ******************************************************************

-- TEST:0267 Update compound key, interim uniqueness conflict!

     DELETE FROM WORKS1;
-- Making sure the table is empty

-- setup
     INSERT INTO WORKS1 VALUES ('P1','P6',1);
     INSERT INTO WORKS1 VALUES ('P2','P6',2);
     INSERT INTO WORKS1 VALUES ('P3','P6',3);
     INSERT INTO WORKS1 VALUES ('P4','P6',4);
     INSERT INTO WORKS1 VALUES ('P5','P6',5);
     INSERT INTO WORKS1 VALUES ('P6','P6',6);
     INSERT INTO WORKS1 VALUES ('P1','P5',7);
     INSERT INTO WORKS1 VALUES ('P2','P5',8);
     INSERT INTO WORKS1 VALUES ('P3','P5',9);
     INSERT INTO WORKS1 VALUES ('P4','P5',10);
     INSERT INTO WORKS1 VALUES ('P5','P5',11);
     INSERT INTO WORKS1 VALUES ('P6','P5',12);
     INSERT INTO WORKS1 VALUES ('P1','P4',13);
     INSERT INTO WORKS1 VALUES ('P2','P4',14);
     INSERT INTO WORKS1 VALUES ('P3','P4',15);
     INSERT INTO WORKS1 VALUES ('P4','P4',16);
     INSERT INTO WORKS1 VALUES ('P5','P4',17);
     INSERT INTO WORKS1 VALUES ('P6','P4',18);
     INSERT INTO WORKS1 VALUES ('P1','P3',19);
     INSERT INTO WORKS1 VALUES ('P2','P3',20);
     INSERT INTO WORKS1 VALUES ('P3','P3',21);
     INSERT INTO WORKS1 VALUES ('P4','P3',22);
     INSERT INTO WORKS1 VALUES ('P5','P3',23);
     INSERT INTO WORKS1 VALUES ('P6','P3',24);
     INSERT INTO WORKS1 VALUES ('P1','P2',25);
     INSERT INTO WORKS1 VALUES ('P2','P2',26);
     INSERT INTO WORKS1 VALUES ('P3','P2',27);
     INSERT INTO WORKS1 VALUES ('P4','P2',28);
     INSERT INTO WORKS1 VALUES ('P5','P2',29);
     INSERT INTO WORKS1 VALUES ('P6','P2',30);
     INSERT INTO WORKS1 VALUES ('P1','P1',31);
     INSERT INTO WORKS1 VALUES ('P2','P1',32);
     INSERT INTO WORKS1 VALUES ('P3','P1',33);
     INSERT INTO WORKS1 VALUES ('P4','P1',34);
     INSERT INTO WORKS1 VALUES ('P5','P1',35);
     INSERT INTO WORKS1 VALUES ('P6','P1',36);

     UPDATE WORKS1
       SET PNUM = EMPNUM, EMPNUM = PNUM;
-- PASS:0267 If 36 rows are updated?

     SELECT COUNT(*) 
          FROM WORKS1
          WHERE EMPNUM = 'P1' AND HOURS > 30;
-- PASS:0267 If count = 6?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0267 <<< END TEST

-- *************************************************////END-OF-MODULE
