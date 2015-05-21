-- MODULE SDL028

-- SQL Test Suite, V6.0, Interactive SQL, sdl028.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU 

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0397 Grouped view!

     SELECT EMP1, EMP_AVG, EMP_MAX 
           FROM SET_TEST
           ORDER BY EMP1;

-- PASS:0397 If for the first row EMP1 = 'E1',?
-- PASS:0397 EMP_AVG is between 38 and 39, and EMP_MAX = 80?
 
-- END TEST >>> 0397 <<< END TEST
-- *************************************************************

-- TEST:0420 View with multiple SELECT of same column!

     SELECT EMP1, HOURS, HOURS_2 
           FROM DUP_COL
           WHERE EMP1 = 'E3';

-- PASS:0420 If EMP1 = 'E3', HOURS = 20 and HOURS_2 = 40?

-- END TEST >>> 0420 <<< END TEST
-- *************************************************////END-OF-MODULE
