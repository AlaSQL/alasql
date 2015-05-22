-- MODULE SDL035  

-- SQL Test Suite, V6.0, Interactive SQL, sdl035.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0477 Priv.violation: GRANT only SELECT on view!

   SELECT CHARTEST
         FROM CUGINI.VAA;
-- PASS:0477 If 1 row is selected and CHARTEST = "Twenty Characters..."?

   INSERT INTO CUGINI.VAA
         VALUES ('This should not work');
-- PASS:0477 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT COUNT(*)
         FROM CUGINI.VAA;
-- PASS:0477 If count = 1?

   UPDATE CUGINI.VAA
         SET CHARTEST = 'This should not work';
-- PASS:0477 If syntax error/access violation, 0 rows updated?

   SELECT COUNT(*)
         FROM CUGINI.VAA 
         WHERE CHARTEST <> 'Twenty Characters...';
-- PASS:0477 If count = 0?

   DELETE FROM CUGINI.VAA;
-- PASS:0477 If syntax error/access violation, 0 rows deleted?

   SELECT COUNT(*) 
         FROM CUGINI.VAA;
-- PASS:0477 If count = 1?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0477 <<< END TEST
-- *********************************************

-- TEST:0478 Priv.violation: GRANT only INSERT on view!

   INSERT INTO CUGINI.VBB
         VALUES ('A');
-- PASS:0478 If 1 row is inserted?

   SELECT CHARTEST 
         FROM CUGINI.VBB;
-- PASS:0478 If syntax error/access violation, 0 rows selected?

   UPDATE CUGINI.VBB
         SET CHARTEST = 'B';
-- PASS:0478 If syntax error/access violation, 0 rows updated?

   DELETE FROM CUGINI.VBB;
-- PASS:0478 If syntax error/access violation, 0 rows deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0478 <<< END TEST
-- *********************************************

-- TEST:0479 Priv.violation: GRANT only UPDATE on view!

   UPDATE CUGINI.VCC
         SET CHARTEST = 'This--should-- work';
-- PASS:0479 If 1 row is updated?

   SELECT CHARTEST
         FROM CUGINI.VCC;
-- PASS:0479 If ERROR, syntax error/access violation, 0 rows selected?

   INSERT INTO CUGINI.VCC
         VALUES ('This should not work');
-- PASS:0479 If ERROR, syntax error/access violation, 0 rows inserted?

   DELETE FROM CUGINI.VCC;
-- PASS:0479 If ERROR, syntax error/access violation, 0 rows deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0479 <<< END TEST
-- *********************************************

-- TEST:0480 Priv.violation: GRANT only DELETE on view!

   DELETE FROM CUGINI.VDD;
-- PASS:0480 If 1 row is deleted?

   INSERT INTO CUGINI.VDD
         VALUES ('A');
-- PASS:0480 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT CHARTEST 
         FROM CUGINI.VDD;
-- PASS:0480 If ERROR, syntax error/access violation, 0 rows selected?

   UPDATE CUGINI.VDD
         SET CHARTEST = 'B';
-- PASS:0480 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0480 <<< END TEST
-- *************************************************////END-OF-MODULE

