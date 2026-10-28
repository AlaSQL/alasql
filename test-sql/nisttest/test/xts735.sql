-- MODULE   XTS735

-- SQL Test Suite, V6.0, Interactive SQL, xts735.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7035 INSERT National character literal in NCHAR column!

   CREATE TABLE TAB735
         (C1 NUMERIC(5) UNIQUE,
          C2 NCHAR(12));
-- PASS:7035 If table created successfully?

   COMMIT WORK;

   INSERT INTO TAB735 VALUES(1,NULL);
-- PASS:7035 If 1 row inserted successfully?

   INSERT INTO TAB735 VALUES(2, N'!');
-- PASS:7035 If 1 row inserted successfully?

   INSERT INTO TAB735 VALUES(3, N'  !');
-- PASS:7035 If 1 row inserted successfully?

   COMMIT WORK;

   SELECT C1,C2
         FROM CTS1.TAB735
         ORDER BY C1;
-- PASS:7035 If 3 rows are selected with the following order?
--                 c1      c2
--                ----    ----
-- PASS:7035 If    1      NULL?
-- PASS:7035 If    2       !  ?
-- PASS:7035 If    3       !  ?

   ROLLBACK WORK;

   DROP TABLE TAB735 CASCADE;
-- PASS:7035 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7035 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
