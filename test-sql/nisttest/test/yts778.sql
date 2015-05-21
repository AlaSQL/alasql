-- MODULE  YTS778  

-- SQL Test Suite, V6.0, Interactive SQL, yts778.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7520 ALTER TABLE SET COLUMN DEFAULT!

   CREATE DOMAIN int_dom2 AS INTEGER
     DEFAULT 99;
-- PASS:7520 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE alt_test
     ( K integer,
       L integer DEFAULT 50,
       M integer,
       N int_dom2);
-- PASS:7520 If table created successfully?

   COMMIT WORK;

   INSERT INTO alt_test VALUES (1,1,1,1);
-- PASS:7520 If 1 row inserted successfully?

   INSERT INTO alt_test (K,L,N) VALUES (2,2,2);
-- PASS:7520 If 1 row inserted successfully?

   INSERT INTO alt_test (K,M) VALUES (3,3);
-- PASS:7520 If 1 row inserted successfully?

   SELECT * FROM alt_test
     ORDER BY K;
-- PASS:7520 If 3 rows are returned in the following order?
--                 c1   c2   c3   c4
--                 ==   ==   ==   ==
-- PASS:7520 If     1    1    1    1?
-- PASS:7520 If     2    2   NULL  2?
-- PASS:7520 If     3   50    3   99? 

   COMMIT WORK;

   ALTER TABLE alt_test ALTER COLUMN L SET DEFAULT 100;
-- PASS:7520 If table altered successfully?

   COMMIT WORK;

   ALTER TABLE alt_test ALTER COLUMN M SET DEFAULT 90;
-- PASS:7520 If table altered successfully?

   COMMIT WORK;

   ALTER TABLE alt_test ALTER COLUMN N SET DEFAULT 80;
-- PASS:7520 If table altered successfully?

   COMMIT WORK;

   SELECT * FROM alt_test
     ORDER BY K;
-- PASS:7520 If 3 rows are returned in the following order?
--                 c1   c2   c3   c4
--                 ==   ==   ==   ==
-- PASS:7520 If     1    1    1    1?
-- PASS:7520 If     2    2   NULL  2?
-- PASS:7520 If     3   50    3   99? 

   INSERT INTO alt_test VALUES (4,4,4,4);
-- PASS:7520 If 1 row inserted successfully?

   INSERT INTO alt_test(K,L) VALUES (5,5);
-- PASS:7520 If 1 row inserted successfully?

   INSERT INTO alt_test(K,M) VALUES (6,6);
-- PASS:7520 If 1 row inserted successfully?

   SELECT * FROM alt_test
     ORDER BY K;
-- PASS:7520 If 6 rows are returned in the following order?
--                 c1   c2   c3   c4
--                 ==   ==   ==   ==
-- PASS:7520 If     1    1    1    1?
-- PASS:7520 If     2    2   NULL  2?
-- PASS:7520 If     3   50    3   99? 
-- PASS:7520 If     4    4    4    4?
-- PASS:7520 If     5    5   90   80?
-- PASS:7520 If     6  100    6   80?

   COMMIT WORK;

   DROP TABLE ALT_TEST CASCADE;
-- PASS:7520 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN INT_DOM2 CASCADE;
-- PASS:7520 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7520 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
