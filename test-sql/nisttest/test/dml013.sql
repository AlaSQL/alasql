-- MODULE DML013

-- SQL Test Suite, V6.0, Interactive SQL, dml013.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0039 COUNT DISTINCT function!

-- setup
     INSERT INTO WORKS
            VALUES('E5','P5',NULL);
-- PASS:0039 If 1 row inserted?

     SELECT COUNT(DISTINCT HOURS)
          FROM WORKS;
-- PASS:0039 If count = 4?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0039 <<< END TEST
-- ************************************************************

-- TEST:0167 SUM ALL function!

-- setup
     INSERT INTO WORKS
            VALUES('E5','P5',NULL);
-- PASS:0167 If 1 row is inserted?

     SELECT SUM(ALL HOURS)
          FROM WORKS;
-- PASS:0167 If SUM(ALL HOURS) = 464?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0167 <<< END TEST
-- ************************************************************

-- TEST:0168 SUM function!

-- setup
     INSERT INTO WORKS
            VALUES('E5','P5',NULL);
-- PASS:0168 If 1 row is inserted?

     SELECT SUM(HOURS)
          FROM WORKS;
-- PASS:0168 If SUM(HOURS) = 464?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0168 <<< END TEST
-- ***********************************************************

-- TEST:0169 COUNT(*) function !

-- setup
     INSERT INTO WORKS
            VALUES('E5','P5',NULL);
-- PASS:0169 If 1 row is inserted?

     SELECT COUNT(*)
          FROM WORKS;
-- PASS:0169 If count = 13?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0169 <<< END TEST
-- *************************************************************

-- TEST:0040 SUM function with WHERE clause!
     SELECT SUM(HOURS)
          FROM WORKS
          WHERE PNUM = 'P2';
-- PASS:0040 If SUM(HOURS) = 140?

-- END TEST >>> 0040 <<< END TEST
-- ***************************************************************

-- TEST:0170 SUM DISTINCT function with WHERE clause!
     SELECT SUM(DISTINCT HOURS)
          FROM WORKS
          WHERE PNUM = 'P2';
-- PASS:0170 If SUM(DISTINCT HOURS) = 100?

-- END TEST >>> 0170 <<< END TEST
-- **************************************************************

-- TEST:0171 SUM(column) + value!
     SELECT SUM(HOURS)+10
          FROM WORKS
          WHERE PNUM = 'P2';

-- PASS:0171 If SUM(HOURS)+10 = 150?

-- END TEST >>> 0171 <<< END TEST
-- ***************************************************************

-- TEST:0041 MAX function in subquery!
     SELECT EMPNUM
          FROM STAFF
          WHERE GRADE = (SELECT MAX(GRADE) FROM STAFF)
          ORDER BY EMPNUM;
-- PASS:0041 If 2 rows are selected and EMPNUMs = 'E3' and 'E5'?

-- END TEST >>> 0041 <<< END TEST
-- ***************************************************************

-- TEST:0042 MIN function in subquery!
     SELECT EMPNUM
          FROM STAFF
          WHERE GRADE =
               (SELECT MIN(GRADE) FROM STAFF);
-- PASS:0042 If EMPNUM = 'E2'?

-- END TEST >>> 0042 <<< END TEST
-- ***************************************************************

-- TEST:0043 AVG function!
     SELECT AVG(GRADE)
          FROM STAFF;
-- PASS:0043 If AVG(GRADE) = 12?

-- END TEST >>> 0043 <<< END TEST
-- ***************************************************************

-- TEST:0044 AVG function - empty result NULL value!
     DELETE FROM TEMP_S;

    SELECT AVG(GRADE)
         FROM   TEMP_S;
-- PASS:0044 If AVG(GRADE) is NULL?

-- END TEST >>> 0044 <<< END TEST
-- *************************************************////END-OF-MODULE
