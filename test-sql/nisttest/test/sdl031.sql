-- MODULE SDL031  

-- SQL Test Suite, V6.0, Interactive SQL, sdl031.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0468 Priv.violation: individual without any privileges!

   DELETE FROM CUGINI.VTABLE;
-- PASS:0468 If ERROR, syntax error/access violation, 0 rows deleted?

   INSERT INTO CUGINI.VTABLE
         VALUES (0,1,2,3,4.25);
-- PASS:0468 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT COL2 
         FROM CUGINI.VTABLE
         WHERE COL1 = 0;
-- PASS:0468 If ERROR, syntax error/access violation, 0 rows selected?

   UPDATE CUGINI.VTABLE
         SET COL2 = 2;
-- PASS:0468 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0468 <<< END TEST
-- *********************************************

-- TEST:0469 GRANT ALL PRIVILEGES to individual!

-- setup
   DELETE FROM CUGINI.II;

   INSERT INTO CUGINI.II 
         VALUES (2);
-- PASS:0469 If 1 row is inserted?

   UPDATE CUGINI.II
         SET C1 = 3
         WHERE C1 = 2;
-- PASS:0469 If 1 row is updated?

   SELECT C1
         FROM CUGINI.II;
-- PASS:0469 If 1 row is selected and C1 = 3?

   DELETE FROM CUGINI.II;
-- PASS:0469 If 1 row is deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0469 <<< END TEST
-- *********************************************

-- TEST:0470 GRANT ALL PRIVILEGES to public!

-- setup
   DELETE FROM CUGINI.JJ;

   INSERT INTO CUGINI.JJ 
         VALUES (2);
-- PASS:0470 If 1 row is inserted?

   UPDATE CUGINI.JJ
         SET C1 = 3
         WHERE C1 = 2;
-- PASS:0470 If 1 row is updated?

   SELECT C1 
         FROM CUGINI.JJ;
-- PASS:0470 If 1 row is selected and C1 = 3?

   DELETE FROM CUGINI.JJ;
-- PASS:0470 If 1 row is deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0470 <<< END TEST
-- *********************************************

-- TEST:0471 Priv.violation: GRANT privilege not grantable!

   UPDATE HU.STAFF3
         SET GRADE = 15
         WHERE EMPNUM = 'E2';
-- PASS:0471 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0471 <<< END TEST
-- *************************************************////END-OF-MODULE

