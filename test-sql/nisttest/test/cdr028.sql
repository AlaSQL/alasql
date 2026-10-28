-- MODULE CDR028  

-- SQL Test Suite, V6.0, Interactive SQL, cdr028.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0486 Priv.violation: illegal REFERENCES!

   SELECT COUNT(*)
         FROM RASTER;
-- PASS:0486 If count >= 0, no ERROR message ?

-- setup, note ERROR message or successful COMPLETION 
   SELECT COUNT(*) 
         FROM REFRESH;

   INSERT INTO REFRESH
         VALUES ('cabbage');
-- PASS:0486 Consider BOTH current INSERT  AND  previous SELECT COUNT?
-- PASS:0486  ( If ERROR, COUNT not selected            ?
-- PASS:0486     AND 0 rows inserted in current INSERT) ?
-- PASS:0486 OR                                         ?
-- PASS:0486  (  successful COMPLETION, count >= 0      ?
-- PASS:0486     AND 1 row inserted in current INSERT)  ?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0486 <<< END TEST
-- *************************************************////END-OF-MODULE
