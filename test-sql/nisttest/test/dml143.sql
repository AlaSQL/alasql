-- MODULE  DML143  

-- SQL Test Suite, V6.0, Interactive SQL, dml143.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0529 Priv. violation:  SELECT in <insert statement>!

   INSERT INTO CONCATBUF
     SELECT TESTNO FROM HU.TESTREPORT;
-- PASS:0529 If ERROR, syntax error/access violation, 0 rows inserted?

   ROLLBACK WORK;

-- END TEST >>> 0529 <<< END TEST
-- *************************************************////END-OF-MODULE
