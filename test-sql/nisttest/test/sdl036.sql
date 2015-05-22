-- MODULE SDL036  

-- SQL Test Suite, V6.0, Interactive SQL, sdl036.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0481 Priv.violation: no privileges on view!

   DELETE FROM CUGINI.VVTABLE;
-- PASS:0481 If ERROR, syntax error/access violation, 0 rows deleted?

   INSERT INTO CUGINI.VVTABLE
         VALUES (0,1,2,3,4.25);
-- PASS:0481 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT COL2 
         FROM CUGINI.VVTABLE
         WHERE COL1 = 0;
-- PASS:0481 If ERROR, syntax error/access violation, 0 rows selected?

   UPDATE CUGINI.VVTABLE
         SET COL2 = 2;
-- PASS:0481 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0481 <<< END TEST
-- *********************************************

-- TEST:0482 GRANT ALL PRIVILEGES ON VIEW!

-- setup
   DELETE FROM CUGINI.VII;

   INSERT INTO CUGINI.VII 
         VALUES (2);
-- PASS:0482 If 1 row is inserted?

   UPDATE CUGINI.VII
         SET C1 = 3
         WHERE C1 = 2;
-- PASS:0482 If 1 row is updated?

   SELECT C1 
         FROM CUGINI.VII;
-- PASS:0482 If 1 row is selected and C1 = 3?

   DELETE FROM CUGINI.VII;
-- PASS:0482 If 1 row is deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0482 <<< END TEST
-- *********************************************

-- TEST:0483 Priv.violation: GRANT UPDATE not grantable on view!

   UPDATE HU.VSTAFF3
         SET GRADE = 15
         WHERE EMPNUM = 'E2';
-- PASS:0483 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0483 <<< END TEST
-- *************************************************////END-OF-MODULE

