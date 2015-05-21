-- MODULE DML016

-- SQL Test Suite, V6.0, Interactive SQL, dml016.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0064 SELECT USER!

     SELECT USER, PNAME
          FROM HU.PROJ;
-- PASS:0064 If 6 rows are selected and each USER = 'SULLIVAN' ?

-- END TEST >>> 0064 <<< END TEST
-- ***********************************************************

-- NO_TEST:0172 SELECT USER into short variable!
-- Tests Host Variable

-- **********************************************************

-- TEST:0065 SELECT CHAR literal and term with numeric literal!

     SELECT 'USER',PNAME
          FROM HU.PROJ;
-- PASS:0065 If 6 rows are selected and first column is value 'USER'?

     SELECT PNUM,'BUDGET IN GRAMS IS ',BUDGET * 5
          FROM HU.PROJ
          WHERE PNUM = 'P1';
-- PASS:0065 If values are 'P1', 'BUDGET IN GRAMS IS ', 50000?

-- END TEST >>> 0065 <<< END TEST
-- ************************************************************

-- TEST:0066 SELECT numeric literal!
     SELECT EMPNUM,10
          FROM HU.STAFF
          WHERE GRADE = 10;
-- PASS:0066 If 1 row with values 'E2' and 10?

     SELECT EMPNUM, 10
          FROM HU.STAFF;
-- PASS:0066 If 5 rows are selected with second value always = 10?
-- PASS:0066 and EMPNUMs are 'E1', 'E2', 'E3', 'E4', 'E5'?

-- END TEST >>> 0066 <<< END TEST
-- *************************************************////END-OF-MODULE
