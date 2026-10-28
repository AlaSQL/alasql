-- MODULE SDL034  

-- SQL Test Suite, V6.0, Interactive SQL, sdl034.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0474 Priv.violation: need SELECT for searched UPDATE!

   UPDATE CUGINI.SRCH1
         SET C1 = 2 WHERE C1 = 0;
-- PASS:0474 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

   DELETE FROM CUGINI.SRCH1
        WHERE C1 = 0;
-- PASS:0474 If ERROR, syntax error/access violation, 0 rows deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0474 <<< END TEST
-- *********************************************

-- TEST:0475 Priv.violation: GRANT ALL w/o GRANT OPTION!

   SELECT COUNT(*) 
         FROM CUGINI.BADG1;
-- PASS:0475 If ERROR, syntax error/access violation, 0 rows selected?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0475 <<< END TEST
-- *********************************************

-- TEST:0476 Priv.violation: GRANT OPTION view but not table!

   SELECT COUNT(*) 
         FROM CUGINI.BADG2;
-- PASS:0476 If ERROR, syntax error/access violation, 0 rows selected?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0476 <<< END TEST
-- *************************************************////END-OF-MODULE

