-- MODULE SDL029  

-- SQL Test Suite, V6.0, Interactive SQL, sdl029.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0458 Priv.violation: GRANT only SELECT to individual!

   SELECT CHARTEST
         FROM CUGINI.AA;
-- PASS:0458 If 1 row is selected and CHARTEST = 'Twenty Characters...'?

   INSERT INTO CUGINI.AA
         VALUES ('This should not work');
-- PASS:0458 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT COUNT(*)
         FROM CUGINI.AA;
-- PASS:0458 If count = 1?

   UPDATE CUGINI.AA
         SET CHARTEST = 'This should not work';
-- PASS:0458 If ERROR, syntax error/access violation, 0 rows updated?

   SELECT COUNT(*)
         FROM CUGINI.AA WHERE CHARTEST
         <> 'Twenty Characters...';
-- PASS:0458 If count = 0?

   DELETE FROM CUGINI.AA;
-- PASS:0458 If ERROR, syntax error/access violation, 0 rows deleted?

   SELECT COUNT(*)
         FROM CUGINI.AA;
-- PASS:0458 If count = 1?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0458 <<< END TEST
-- *********************************************

-- TEST:0459 Priv.violation: GRANT only INSERT to individual!

   INSERT INTO CUGINI.BB
         VALUES ('A');
-- PASS:0459 If 1 row is inserted?

   SELECT CHARTEST 
         FROM CUGINI.BB;
-- PASS:0459 IF ERROR, syntax error/access violation, 0 rows selected?

   UPDATE CUGINI.BB
         SET CHARTEST = 'B';
-- PASS:0459 If ERROR, syntax error/access violation, 0 rows updated?

   DELETE FROM CUGINI.BB;
-- PASS:0459 If ERROR, syntax error/access violation, 0 rows deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0459 <<< END TEST
-- *********************************************

-- TEST:0460 Priv.violation: GRANT only UPDATE to individual!

   UPDATE CUGINI.CC
         SET CHARTEST = 'This--should-- work';
-- PASS:0460 If 1 row is updated?

   SELECT CHARTEST
         FROM CUGINI.CC;
-- PASS:0460 If ERROR, syntax error/access violation, 0 rows selected?

   INSERT INTO CUGINI.CC
         VALUES ('This should not work');
-- PASS:0460 If ERROR, syntax error/access violation, 0 rows inserted?

   DELETE FROM CUGINI.CC;
-- PASS:0460 If ERROR, syntax error/access violation, 0 rows deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0460 <<< END TEST
-- *********************************************

-- TEST:0461 Priv.violation: GRANT only DELETE to individual!

   DELETE FROM CUGINI.DD;
-- PASS:0461 If 1 row is deleted?

   INSERT INTO CUGINI.DD
         VALUES ('A');
-- PASS:0461 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT CHARTEST 
         FROM CUGINI.DD;
-- PASS:0461 If ERROR, syntax error/access violation, 0 row selected?

   UPDATE CUGINI.DD
         SET CHARTEST = 'B';
-- PASS:0461 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0461 <<< END TEST
-- *************************************************////END-OF-MODULE
