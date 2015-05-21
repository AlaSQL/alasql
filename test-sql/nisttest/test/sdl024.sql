-- MODULE SDL024

-- SQL Test Suite, V6.0, Interactive SQL, sdl024.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0203 CREATE VIEW On a VIEW !

     SELECT COUNT(*)
          FROM STAFFV2_VIEW;
-- PASS:0203 If count = 1?

     SELECT EMPNUM, GRADE
          FROM STAFFV2_VIEW
          WHERE EMPNUM = 'E3';
-- PASS:0203 If EMPNUM = 'E3' and GRADE = 13 ?

     INSERT INTO STAFFV2_VIEW
            VALUES('E7','Gallagher',17,'Vienna');
-- PASS:0203 If 1 row is inserted?

     SELECT COUNT(*)
          FROM STAFFV2_VIEW;
-- PASS:0203 If count = 2 ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0203 <<< END TEST

-- *************************************************////END-OF-MODULE
