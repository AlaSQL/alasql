-- MODULE SDL033  

-- SQL Test Suite, V6.0, Interactive SQL, sdl033.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0473 Priv.violation: GRANT all on view but not table!

   DELETE FROM FLATER.VS1
         WHERE C2 = 1;
-- PASS:0473 If 1 row is deleted?

   SELECT COUNT(*) 
         FROM FLATER.VS1;
-- PASS:0473 If count = 1?

   INSERT INTO FLATER.VS1
         VALUES (0,7);
-- PASS:0473 If 1 row is inserted?

   UPDATE FLATER.VS1
         SET C2 = 8
         WHERE C2 = 7;
-- PASS:0473 If 1 row is updated?

   SELECT C1, C2 
         FROM FLATER.VS1
         WHERE C2 = 0;
-- PASS:0473 If 1 row is selected and C1 = 0 and C2 = 0?

-- restore
   ROLLBACK WORK;

   DELETE FROM FLATER.BASE_VS1;
-- PASS:0473 If ERROR, syntax error/access violation, 0 rows deleted?

   SELECT COUNT(*)
         FROM FLATER.VS1;
-- PASS:0473 If count = 2?

   INSERT INTO FLATER.BASE_VS1
         VALUES (0,7);
-- PASS:0473 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT COUNT(*)
         FROM FLATER.VS1;
-- PASS:0473 If count = 2?

   UPDATE FLATER.BASE_VS1
         SET C2 = 1;
-- PASS:0473 If ERROR, syntax error/access violation, 0 rows updated?

   SELECT COUNT(*) 
         FROM FLATER.VS1
         WHERE C2 = 1;
-- PASS:0473 If count = 1?

   SELECT COUNT(*) 
         FROM FLATER.BASE_VS1;
-- PASS:0473 If ERROR, syntax error/access violation, 0 rows selected?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0473 <<< END TEST
-- *************************************************////END-OF-MODULE

