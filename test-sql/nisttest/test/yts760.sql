-- MODULE  YTS760  

-- SQL Test Suite, V6.0, Interactive SQL, yts760.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7534 CASE expression with one simple WHEN!

   UPDATE CTS1.STAFFc
    SET GRADE = CASE GRADE WHEN 13 THEN 23 END,
    MGR = CASE MGR WHEN 'E5' THEN 'E9' ELSE 'E8' END;
-- PASS:7534 If update completed successfully?

   SELECT COUNT (*) FROM CTS1.STAFFc
   WHERE GRADE IS NULL;
-- PASS:7534 If COUNT = 6?

   SELECT GRADE FROM CTS1.STAFFc
   WHERE EMPNUM = 'E3';
-- PASS:7534 If GRADE = 23?

   SELECT COUNT (*) FROM CTS1.STAFFc
   WHERE MGR = 'E8';
-- PASS:7534 If COUNT = 6?

   SELECT MGR FROM CTS1.STAFFc
   WHERE EMPNUM = 'E6';
-- PASS:7534 If MGR = E9?

   ROLLBACK WORK;

-- END TEST >>> 7534 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
