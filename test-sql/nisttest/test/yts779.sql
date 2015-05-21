-- MODULE  YTS779  

-- SQL Test Suite, V6.0, Interactive SQL, yts779.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7521 ALTER TABLE DROP COLUMN DEFAULT!

   CREATE DOMAIN int_dom2 AS INTEGER
     DEFAULT 99;
-- PASS:7521 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE alt_test
     ( K integer,
       L integer DEFAULT 100,
       M integer default 90,
       N int_dom2 default 80);
-- PASS:7521 If table created successfully?

   COMMIT WORK;

   ALTER TABLE alt_test ALTER COLUMN L DROP DEFAULT;
-- PASS:7521 If table altered successfully?

   COMMIT WORK;

   ALTER TABLE alt_test ALTER COLUMN M DROP DEFAULT;
-- PASS:7521 If table altered successfully?

   COMMIT WORK;

   ALTER TABLE alt_test ALTER COLUMN N DROP DEFAULT;
-- PASS:7521 If table altered successfully?

   COMMIT WORK;

   INSERT INTO alt_test (K) VALUES (7);
-- PASS:7521 If 1 row inserted successfully?

   COMMIT WORK;

   SELECT * 
     FROM alt_test;
-- PASS:7521 If column1 = 7?
-- PASS:7521 If column2 is NULL?
-- PASS:7521 If column3 is NULL?
-- PASS:7521 If column4 = 99?

   COMMIT WORK;

   DROP TABLE ALT_TEST CASCADE;
-- PASS:7521 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN INT_DOM2 CASCADE;
-- PASS:7521 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7521 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
