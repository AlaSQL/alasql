-- MODULE  YTS796  

-- SQL Test Suite, V6.0, Interactive SQL, yts796.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7530 <scalar subquery> as first operand in <comp pred>!

   SELECT EMPNAME FROM STAFF WHERE
     (SELECT EMPNUM FROM WORKS WHERE PNUM = 'P3')
     = EMPNUM;
-- PASS:7530 If empname = 'Alice'?

   SELECT EMPNAME FROM STAFF WHERE 
     (SELECT EMPNUM FROM WORKS WHERE PNUM = 'P4')
     = EMPNUM;
-- PASS:7530 If ERROR - cardinality violation?

   ROLLBACK WORK;

-- END TEST >>> 7530 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
