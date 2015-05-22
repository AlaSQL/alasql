-- MODULE SDL023

-- SQL Test Suite, V6.0, Interactive SQL, sdl023.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0201 Priv. violation: GRANT without Grant Option!

     INSERT INTO HU.STAFF4
            SELECT * 
            FROM HU.STAFF;
-- PASS:0201 If ERROR, syntax error/access violation, 0 rows inserted?

     SELECT EMPNUM,EMPNAME,USER
          FROM HU.STAFF4
          WHERE EMPNUM = 'E3';
-- PASS:0201 If ERROR, syntax error/access violation, 0 rows selected?

     DELETE FROM HU.STAFF4;
-- PASS:0201 If ERROR, syntax error/access violation, 0 rows deleted?

     SELECT COUNT(*)
          FROM HU.STAFF4;
-- PASS:0201 If ERROR, syntax error/access violation,  OR  count = 0?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0201 <<< END TEST
-- *************************************************////END-OF-MODULE
