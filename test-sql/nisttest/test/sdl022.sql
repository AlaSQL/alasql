-- MODULE SDL022

-- SQL Test Suite, V6.0, Interactive SQL, sdl022.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0200 Priv. violation: GRANT INSERT, No SELECT!

     INSERT INTO HU.UPUNIQ
            VALUES (10,'X');
-- PASS:0200 If 1 row is inserted?

     SELECT *
          FROM HU.UPUNIQ
          WHERE NUMKEY = 3;
-- PASS:0200 If ERROR, syntax error/access violation, 0 rows selected?

     INSERT INTO HU.UPUNIQ
            VALUES (10,'X');
-- PASS:0200 If ERROR, unique constraint, 0 rows selected?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0200 <<< END TEST

-- *************************************************////END-OF-MODULE
