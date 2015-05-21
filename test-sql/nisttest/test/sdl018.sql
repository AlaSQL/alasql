-- MODULE SDL018

-- SQL Test Suite, V6.0, Interactive SQL, sdl018.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0154 Schema def. - Same table name from different Schema!
      SELECT COUNT(*)
           FROM VTABLE;
-- PASS:0154 If count = 4?

      SELECT COUNT(*)
           FROM CUGINI.VTABLE;
-- PASS:0154 If count = 0?

-- setup
     INSERT INTO CUGINI.VTABLE
            SELECT *
            FROM VTABLE;
-- PASS:0154 If 4 rows are inserted?

      SELECT COUNT(*)
           FROM CUGINI.VTABLE;
-- PASS:0154 If count = 4?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0154 <<< END TEST

-- *************************************************////END-OF-MODULE
