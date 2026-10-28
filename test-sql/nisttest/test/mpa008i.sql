-- MODULE MPA008I  initialization

-- SQL Test Suite, V6.0, Interactive SQL, mpa008i.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0517 Transaction serializability:  Twins Problem!

-- setup
   DELETE FROM TTT;
-- Making sure table is empty

   INSERT INTO TTT VALUES (1,'A');
   INSERT INTO TTT VALUES (2,'A');
   INSERT INTO TTT VALUES (3,'A');
   INSERT INTO TTT VALUES (4,'A');
   INSERT INTO TTT VALUES (5,'A');

   SELECT COUNT(*) FROM TTT;
-- PASS:0517 If count = 5?

   COMMIT WORK;

-- *************************************************////END-OF-MODULE
