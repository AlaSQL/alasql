-- MODULE  YTS763  

-- SQL Test Suite, V6.0, Interactive SQL, yts763.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7518 <query expression> with INTERSECT CORRESPONDING!

   SELECT COUNT (*) FROM STAFF_CTS2;
-- PASS:7518 If COUNT = 8?

   SELECT COUNT (*) FROM STAFF_CTS;
-- PASS:7518 If COUNT = 5?

   INSERT INTO CTS1.ET(col2, col3, col4)
     SELECT * FROM STAFF_CTS2
     INTERSECT CORRESPONDING
     SELECT * FROM STAFF_CTS;
-- PASS:7518 If insert completed successfully?


   SELECT col2, col3, col4
     FROM CTS1.ET
     ORDER BY col3, col4;
-- PASS:7518 If 3 rows are selected in the following order?
--                col2     col3     col4
--                ====     ====     ====
-- PASS:7518 If   Betty    10       Vienna?
-- PASS:7518 If   Don      12       Deale?
-- PASS:7518 If   Carmen   13       Vienna?

   ROLLBACK WORK;

-- END TEST >>> 7518 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
