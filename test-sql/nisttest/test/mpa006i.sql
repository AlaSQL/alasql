-- MODULE MPA006I  initialization

-- SQL Test Suite, V6.0, Interactive SQL, mpa006i.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0506 SQLSTATE 40001: transaction rollback/serialization failure!

-- setup
   DELETE FROM TT;
   DELETE FROM TTT;
   DELETE FROM AA;
   DELETE FROM BB;
-- Making sure tables are empty

   INSERT INTO AA VALUES ( 1);
-- PASS:0506 If 1 row is inserted?

   INSERT INTO BB VALUES ( 100);
-- PASS:0506 If 1 row is inserted?

   COMMIT WORK;

   SELECT * FROM TT;
-- PASS:0506 If 0 rows selected?

   SELECT * FROM TTT;
-- PASS:0506 If 0 rows selected?

   COMMIT WORK;

-- *************************************************////END-OF-MODULE
