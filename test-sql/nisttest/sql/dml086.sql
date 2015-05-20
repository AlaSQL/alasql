
-- MODULE DML086  

-- SQL Test Suite, V6.0, Interactive SQL, dml086.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0511 CHECK clauses in nested views (clarified in SQL-92)!

   INSERT INTO V_WORKS2
         VALUES('E9','P7',13);
-- PASS:0511 If ERROR, view check constraint, 0 rows inserted?
             
   INSERT INTO V_WORKS2
         VALUES('E7','P4',95);
-- PASS:0511 If 1 row is inserted?

   INSERT INTO V_WORKS3
         VALUES('E8','P2',85);
-- PASS:0511 If ERROR, view check constraint, 0 rows inserted?

-- NOTE:0511 SQL-92 GR11a of 11.19 requires implicit CASCADE of checking.
-- NOTE:0511 ERROR (failure to insert row) means outer check option (checking)
-- NOTE:0511     implies inner check option (checking), thus implicit
-- NOTE:0511     CASCADE of checking.
-- NOTE:0511 Successful insertion of row means outer check option (checking)
-- NOTE:0511     does not imply inner check option (checking).

   INSERT INTO V_WORKS3
         VALUES('E1','P7',90);
-- PASS:0511 If 1 row is inserted?

   INSERT INTO V_WORKS3
         VALUES('E9','P2',10);
-- PASS:0511 If ERROR, view check constraint, 0 rows inserted?

   SELECT COUNT(*)
         FROM  WORKS
         WHERE EMPNUM = 'E9';
-- PASS:0511 If count = 0?

   SELECT COUNT(*)
         FROM  WORKS
         WHERE HOURS > 85;
-- PASS:0511 If count = 2?

   UPDATE V_WORKS3
         SET EMPNUM = 'E12', HOURS = 222
         WHERE EMPNUM = 'E1' AND PNUM = 'P2';
-- PASS:0511 If ERROR, view check constraint, 0 rows updated?

-- setup
   INSERT INTO WORKS
         VALUES('E6','P2',55);

   UPDATE V_WORKS3
         SET EMPNUM = 'E13', HOURS = 222
         WHERE EMPNUM = 'E6' AND PNUM = 'P2';
-- PASS:0511 If ERROR, view check constraint, 0 rows updated?

   SELECT COUNT(*) 
         FROM WORKS 
         WHERE HOURS = 222;
-- PASS:0511 If count = 0?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0511 <<< END TEST
-- *************************************************////END-OF-MODULE
