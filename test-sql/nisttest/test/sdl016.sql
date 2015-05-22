-- MODULE SDL016

-- SQL Test Suite, V6.0, Interactive SQL, sdl016.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0152 CREATE VIEW with Check Option!

     INSERT INTO STAFFV2
            VALUES('E6','Ling',15,'Xian');
-- PASS:0152 If 1 row is inserted?

      SELECT COUNT(*)
           FROM STAFFV2;
-- PASS:0152 If count = 5?

     INSERT INTO STAFFV2
            VALUES('E7','Gallagher',10,'Rockville');
-- PASS:0152 If ERROR, view check constraint, 0 rows inserted?

      SELECT COUNT(*)
           FROM STAFFV2;
-- PASS:0152 If count = 5?

      SELECT COUNT(*)
           FROM STAFF;
-- PASS:0152 If count = 6?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0152 <<< END TEST
-- *************************************************////END-OF-MODULE
