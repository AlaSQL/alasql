-- MODULE DML004

-- SQL Test Suite, V6.0, Interactive SQL, dml004.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0008 SQLCODE 100:SELECT on empty table !
     SELECT EMPNUM,HOURS
          FROM WORKS
          WHERE PNUM = 'P8'
          ORDER BY EMPNUM DESC;

-- PASS:0008 If 0 rows selected, SQLCODE = 100, end of data?

-- END TEST >>> 0008 <<< END TEST
-- ****************************************************************

-- TEST:0009 SELECT NULL value!

-- setup
     INSERT INTO WORKS
            VALUES('E9','P9',NULL);
-- PASS:0009 If 1 row is inserted?

     SELECT EMPNUM
          FROM WORKS
          WHERE HOURS IS NULL;
-- PASS:0009 If EMPNUM = 'E9'?

          SELECT EMPNUM, HOURS
               FROM WORKS
               WHERE PNUM = 'P9'
               ORDER BY EMPNUM DESC;

-- PASS:0009 If EMPNUM = 'E9' and HOURS is NULL?

-- restore
     ROLLBACK WORK;


-- END TEST >>> 0009 <<< END TEST
-- ******************************************************************

-- NO_TEST:0161 FETCH NULL value without indicator, SQLCODE < 0!

-- Testing Indicators

-- **********************************************************

-- NO_TEST:0162 FETCH NULL value with indicator syntax!

-- Testing indicators

-- ****************************************************************

-- NO_TEST:0010 FETCH truncated CHAR column with indicator!

-- Testing indicators
-- *************************************************////END-OF-MODULE
