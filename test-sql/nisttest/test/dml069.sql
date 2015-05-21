-- MODULE DML069 

-- SQL Test Suite, V6.0, Interactive SQL, dml069.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU 

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- NO_TEST:0404 2 FETCHes (different target types) on same cursor!

-- Testing cursors

-- ***************************************************************

-- NO_TEST:0405 2 cursors open from different schemas (coded join)!

-- Testing cursors

-- ***************************************************************

-- TEST:0406 Subquery from different schema!
 
     DELETE FROM CUGINI.VTABLE;
-- Making sure the table is empty

-- setup 
     INSERT INTO CUGINI.VTABLE VALUES (80, 100, 100, 100, 100.0);
     INSERT INTO CUGINI.VTABLE VALUES (40, 200, 100, 100, 100.0);

     SELECT PNUM
          FROM WORKS
             WHERE EMPNUM = 'E1' AND HOURS IN 
                 (SELECT COL1 FROM CUGINI.VTABLE
                 WHERE  COL1 > 50);

-- PASS:0406 If PNUM = 'P3'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0406 <<< END TEST
-- *************************************************************

-- NO_TEST:0407 SELECT INTO :XX ... WHERE :XX = !

-- Testing host variables

-- **************************************************************

-- TEST:0408 UPDATE references column value BEFORE update!

     DELETE FROM WORKS1;
-- Making sure the table is empty

-- setup
     INSERT INTO WORKS1 SELECT * FROM WORKS;
 
     UPDATE WORKS1
          SET PNUM = EMPNUM, EMPNUM = PNUM, HOURS = (HOURS + 3) * HOURS;

     SELECT * 
          FROM WORKS1
             WHERE EMPNUM = 'P2'
             ORDER BY EMPNUM, PNUM ASC;

-- PASS:0408 If FOR ROW #1, EMPNO1 = 'P2', PNUM1 = 'E1', HOURS1 = 460?
-- PASS:0408 If FOR ROW #2, EMPNO1 = 'P2', PNUM1 = 'E2',HOURS1 = 6640? 
-- PASS:0408 If FOR ROW #3, EMPNO1 = 'P2', PNUM1 = 'E3', HOURS1 = 460?
-- PASS:0408 If FOR ROW #4, EMPNO1 = 'P2', PNUM1 = 'E4', HOURS1 = 460?
 

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0408 <<< END TEST
-- *************************************************////END-OF-MODULE
