-- MODULE   XTS718

-- SQL Test Suite, V6.0, Interactive SQL, xts718.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7018 SET SESSION AUTHORIZATION to different value!

   SELECT COUNT(*) FROM CTS1.STAFF;
-- PASS:7018 If COUNT = 5?

   ROLLBACK WORK;

   SET SESSION AUTHORIZATION 'CTS2';
-- PASS:7018 If statement executed successfully without ERRORs?

   SELECT COUNT(*) FROM  CTS2.PROJ_MAN;
-- PASS:7018 If COUNT = 0?

   SELECT COUNT(*) FROM  CTS1.STAFF;
-- PASS:7018 If ERROR - access rule violation?

   ROLLBACK WORK;

   SET SESSION AUTHORIZATION 'ILLEGALUSER';
-- PASS:7018 If ERROR - invalid authorization specification?

   SET SESSION AUTHORIZATION 'PUBLIC';
-- PASS:7018 If ERROR - invalid authorization specification?

   SET SESSION AUTHORIZATION 'CTS1';
-- PASS:7018 If statement executed successfully without ERRORs?

   SELECT COUNT(*) FROM CTS1.STAFF;
-- PASS:7018 If COUNT = 5?

   ROLLBACK WORK;

-- END TEST >>> 7018 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
