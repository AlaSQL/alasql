-- MODULE  YTS755  

-- SQL Test Suite, V6.0, Interactive SQL, yts755.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7505 DROP DOMAIN CASCADE - domain with default & constraint!

   CREATE DOMAIN int_dom INTEGER
     DEFAULT 15
     CHECK(VALUE < 100);
-- PASS:7505 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE dom_test
     (    num   int_dom,
          lit  char(3));
-- PASS:7505 If table created successfully?

   COMMIT WORK;

   INSERT INTO dom_test VALUES (00,'a');
-- PASS:7505 If 1 row inserted successfully?

   INSERT INTO dom_test VALUES (99,'b');
-- PASS:7505 If 1 row inserted successfully?

   INSERT INTO dom_test VALUES (50,'c');
-- PASS:7505 If 1 row inserted successfully?

   COMMIT WORK;

   DROP DOMAIN int_dom CASCADE;
-- PASS:7505 If domain dropped successfully?

   COMMIT WORK;

   INSERT INTO dom_test VALUES (101, 'g');
-- PASS:7505 If ERROR - integrity constraint violation?

   SELECT COUNT(*) 
     FROM dom_test WHERE num = 101;
-- PASS:7505 If COUNT = 0?

   INSERT INTO dom_test (lit) VALUES ('Z');
-- PASS:7505 If 1 row inserted?

   SELECT num FROM dom_test WHERE lit = 'Z';
-- PASS:7505 If num = 15?

   ROLLBACK WORK;

   DROP TABLE dom_test CASCADE;
-- PASS:7505 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7505 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
