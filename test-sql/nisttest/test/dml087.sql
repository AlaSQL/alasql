-- MODULE DML087  

-- SQL Test Suite, V6.0, Interactive SQL, dml087.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0518 CREATE VIEW with DISTINCT!

   SELECT COUNT(*)
         FROM DV1;
-- PASS:0518 If count = 4?

   SELECT HOURS FROM DV1
         ORDER BY HOURS DESC;
-- PASS:0518 If 4 rows selected AND first HOURS = 80?
-- PASS:0518 AND second HOURS = 40 AND third HOURS = 20?
-- PASS:0518 AND fourth HOURS = 12? 

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0518 <<< END TEST;
-- *********************************************;

-- TEST:0519 CREATE VIEW with subqueries!

   SELECT COUNT(*)
         FROM VS2
         WHERE C1 = 0;
-- PASS:0519 If count = 2?

   SELECT COUNT(*)
         FROM VS2
         WHERE C1 = 1;
-- PASS:0519 If count = 2?

   SELECT COUNT(*)
         FROM VS3;
-- PASS:0519 If count = 0?

   SELECT COUNT(*) 
         FROM VS4;
-- PASS:0519 If count = 0?

   SELECT COUNT(*) 
         FROM VS5;
-- PASS:0519 If count = 2?

   SELECT COUNT(*)
         FROM VS6;
-- PASS:0519 If count = 2?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0519 <<< END TEST;
-- *********************************************;

-- TEST:0520 Underscores are legal an significant!

   SELECT COUNT(*)
         FROM USIG 
         WHERE C1 = 0;
-- PASS:0520 If count = 1?

   SELECT COUNT(*)
         FROM USIG
         WHERE C1 = 2;
-- PASS:0520 If count = 0?

   SELECT COUNT(*) 
         FROM USIG
         WHERE C_1 = 0;
-- PASS:0520 If count = 0?

   SELECT COUNT(*) 
         FROM USIG
         WHERE C_1 = 2;
-- PASS:0520 If count = 1?

   SELECT COUNT(*)
         FROM USIG
         WHERE C1 = 4;
-- PASS:0520 If count = 0?

   SELECT COUNT(*) 
         FROM U_SIG
         WHERE C1 = 0;
-- PASS:0520 If count = 0?

   SELECT COUNT(*) 
         FROM U_SIG 
         WHERE C1 = 4;
-- PASS:0520 If count = 1?

   SELECT COUNT(*) 
         FROM HU.STAFF U_CN
         WHERE U_CN.GRADE IN
                       (SELECT UCN.GRADE 
                              FROM HU.STAFF UCN
                              WHERE UCN.GRADE > 10);
-- PASS:0520 If count = 4?

   SELECT COUNT(*) 
         FROM HU.STAFF 
         WHERE GRADE > 10;
-- PASS:0520 If count = 4?

   SELECT COUNT(*) 
         FROM HU.STAFF 
         WHERE GRADE < 10;
-- PASS:0520 If count = 0?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0520 <<< END TEST;
-- *************************************************////END-OF-MODULE;
