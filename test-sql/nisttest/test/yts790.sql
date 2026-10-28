-- MODULE  YTS790  

-- SQL Test Suite, V6.0, Interactive SQL, yts790.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

   ROLLBACK WORK;

-- TEST:7524 GRANT USAGE on character set, WITH GRANT OPTION!

   GRANT USAGE ON CHARACTER SET CS
     TO CTS2 WITH GRANT OPTION;
-- PASS:7524 If GRANT  completed successfully?

   COMMIT WORK;

-- END TEST >>> 7524 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
