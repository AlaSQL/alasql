-- MODULE SDL011

-- SQL Test Suite, V6.0, Interactive SQL, sdl011.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0147 CREATE Schema!

     INSERT INTO AUTH_TABLE
            VALUES (100,'A');
-- PASS:0147 If 1 row is inserted?

      SELECT FIRST1, USER
           FROM AUTH_TABLE;
-- PASS:0147 If FIRST1 = 100 and USER = 'SULLIVAN1'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0147 <<< END TEST

-- *************************************************////END-OF-MODULE
