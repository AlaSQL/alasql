-- MODULE SDL002

-- SQL Test Suite, V6.0, Interactive SQL, sdl002.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0138 GRANT ALL Privileges to Public (SELECT, INSERT) !

     SELECT EMPNUM,EMPNAME,USER
          FROM HU.STAFF
          WHERE EMPNUM = 'E3';
-- PASS:0138 If EMPNAME = 'Carmen' and USER = 'SULLIVAN'?

     INSERT INTO HU.STAFF
            VALUES('E7','SULLIVAN',15,'Gaithersburg');
-- PASS:0138 If 1 row is inserted?

     SELECT EMPNUM,EMPNAME
          FROM HU.STAFF
          WHERE EMPNUM='E7';
-- PASS:0138 If EMPNAME = 'SULLIVAN'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0138 <<< END TEST
-- *************************************************////END-OF-MODULE
