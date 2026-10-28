-- MODULE MPA007I  initialization  

-- SQL Test Suite, V6.0, Interactive SQL, mpa007i.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0507 Transaction serializability, READ/DELETE/INSERT!

-- setup
   DELETE FROM AA;
   DELETE FROM BB;
-- Making sure tables are empty

   INSERT INTO AA VALUES (1);
-- PASS:0507 If 1 row is inserted?

   INSERT INTO BB VALUES (6);
-- PASS:0507 If 1 row is inserted?

   COMMIT WORK;

-- *************************************************////END-OF-MODULE
