-- MODULE SDL030  

-- SQL Test Suite, V6.0, Interactive SQL, sdl030.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0464 Priv.violation: GRANT only SELECT to PUBLIC!

   SELECT INTTEST
         FROM CUGINI.EE;
-- PASS:0464 If 1 row is selected and INTTEST = 0?

   INSERT INTO CUGINI.EE
         VALUES (9);
-- PASS:0464 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT COUNT(*) 
         FROM CUGINI.EE;
-- PASS:0464 If count = 1?

   UPDATE CUGINI.EE
         SET INTTEST = 1;
-- PASS:0464 If ERROR, syntax error/access violation, 0 rows updated?

   SELECT COUNT(*) 
         FROM CUGINI.EE WHERE INTTEST = 1;
-- PASS:0464 If count = 0?

   DELETE FROM CUGINI.EE;
-- PASS:0464 If ERROR, syntax error/access violation, 0 rows deleted?

   SELECT COUNT(*) 
         FROM CUGINI.EE;
-- PASS:0464 If count = 1?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0464 <<< END TEST
-- *********************************************

-- TEST:0465 Priv.violation: GRANT only INSERT to PUBLIC!

   INSERT INTO CUGINI.FF
        VALUES (-99);
-- PASS:0465 If 1 row is inserted?

   SELECT INTTEST 
        FROM CUGINI.FF;
-- PASS:0465 If ERROR, syntax error/access violation, 0 rows selected?

   UPDATE CUGINI.FF
        SET INTTEST = 1;
-- PASS:0465 If ERROR, syntax error/access violation, 0 rows updated?
 
   DELETE FROM CUGINI.FF;
-- PASS:0465 If ERROR, syntax error/access violation, 0 rows deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0465 <<< END TEST
-- *********************************************

-- TEST:0466 Priv.violation: GRANT only UPDATE to PUBLIC!

   UPDATE CUGINI.GG
         SET C1 = 3;
-- PASS:0466 If 1 row is updated?

   SELECT C1
         FROM CUGINI.GG;
-- PASS:0466 If ERROR, syntax error/access violation, 0 rows selected?

   INSERT INTO CUGINI.GG
         VALUES (-99);
-- PASS:0466 If ERROR, syntax error/access violation, 0 rows inserted?

   DELETE FROM CUGINI.GG;
-- PASS:0466 If ERROR, syntax error/access violation, 0 rows deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0466 <<< END TEST
-- *********************************************

-- TEST:0467 Priv. violation: GRANT only DELETE to PUBLIC!

   DELETE FROM CUGINI.HH;
-- PASS:0467 If 1 row is deleted?

   INSERT INTO CUGINI.HH
         VALUES (99);
-- PASS:0467 If ERROR, syntax error/access violation, 0 rows inserted?

   SELECT SMALLTEST 
         FROM CUGINI.HH;
-- PASS:0467 If ERROR, syntax error/access violation, 0 rows selected?

   UPDATE CUGINI.HH
         SET SMALLTEST = -99;
-- PASS:0467 If ERROR, syntax error/access violation, 0 rows updated?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0467 <<< END TEST
-- *************************************************////END-OF-MODULE

