-- MODULE  YTS761  

-- SQL Test Suite, V6.0, Interactive SQL, yts761.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7535 CASE expression with searched WHEN!

   INSERT INTO STAFFd (EMPNUM, GRADE, MGR) 
   SELECT EMPNUM, 
       CASE WHEN GRADE = 13 THEN 23
            WHEN GRADE = 14 THEN 24
            WHEN GRADE = 12 THEN 22
       END,
       CASE WHEN MGR = 'E2' THEN 'E6'
            WHEN MGR = 'E1' THEN 'E7'
            ELSE 'E4'
       END
   FROM STAFFc;
-- PASS:7535 If insert statement completed successfully?

   SELECT COUNT (*) FROM STAFFd
   WHERE GRADE = 22;
-- PASS:7535 If COUNT = 3?

   SELECT COUNT (*) FROM STAFFd
   WHERE GRADE = 23;
-- PASS:7535 If COUNT = 1?

   SELECT COUNT (*) FROM STAFFd
   WHERE GRADE = 24;
-- PASS:7535 If COUNT = 1?

   SELECT COUNT (*) FROM STAFFd
   WHERE GRADE IS NULL;
-- PASS:7535 If COUNT = 2?

   SELECT COUNT (*) FROM STAFFd
   WHERE MGR = 'E7';
-- PASS:7535 If COUNT = 2?

   SELECT COUNT (*) FROM STAFFd
   WHERE MGR = 'E6';
-- PASS:7535 If COUNT = 2?

   SELECT COUNT (*) FROM STAFFd
   WHERE MGR = 'E4';
-- PASS:7535 If COUNT = 3?

   ROLLBACK WORK;

-- END TEST >>> 7535 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
