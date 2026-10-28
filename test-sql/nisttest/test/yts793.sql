-- MODULE  YTS793  

-- SQL Test Suite, V6.0, Interactive SQL, yts793.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7527 GRANT USAGE on character set, no WGO!

   DROP CHARACTER SET CS2;
-- PASS:7527 If DROP completed successfully?

   COMMIT WORK;

   CREATE CHARACTER SET CS2 GET LATIN1;
-- PASS:7527 If CREATE completed successfully?

   COMMIT WORK;

   GRANT USAGE ON CHARACTER SET CS2
     TO CTS2;
-- PASS:7527 If GRANT completed successfully?

   COMMIT WORK;

-- END TEST >>> 7527 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
