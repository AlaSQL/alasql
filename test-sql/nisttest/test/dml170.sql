-- MODULE  DML170  

-- SQL Test Suite, V6.0, Interactive SQL, dml170.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0880 Long constraint names, cursor names!

   CREATE TABLE T0880 (
     C1 INT, C2 INT,
     CONSTRAINT
     "It was the best of times; it was the worst of times.  THE END"
     PRIMARY KEY (C1, C2));
-- PASS:0880 If table created successfully?

   COMMIT WORK;

   INSERT INTO T0880 VALUES (0, 1);
-- PASS:0880 If 1 row inserted successfully?

   INSERT INTO T0880 VALUES (1, 2);
-- PASS:0880 If 1 row inserted successfully?

   INSERT INTO T0880 VALUES (1, 2);
-- PASS:0880 If ERROR - integrity constraint violation?

   SELECT C1 FROM T0880 ORDER BY C1;
-- PASS:0880 If 2 rows are returned in the following order?
--                c1
--                ==
-- PASS:0880 If   0 ?
-- PASS:0880 If   1 ?

   COMMIT WORK;

   ALTER TABLE T0880
     DROP CONSTRAINT
     "It was the best of times; it was the worst of times.  THE END"
     CASCADE;
-- PASS:0880 If table altered successfully?

   COMMIT WORK;

   INSERT INTO T0880 VALUES (0, 1);
-- PASS:0880 If 1 row inserted successfully?

   SELECT COUNT (*) FROM T0880;
-- PASS:0880 If COUNT = 3?

   COMMIT WORK;

   DROP TABLE T0880 CASCADE;
-- PASS:0880 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0880 <<< END TEST
-- *********************************************

-- TEST:0881 Long character set names, domain names!

   CREATE CHARACTER SET
     "Little boxes on the hillside, Little boxes made of ticky-tacky"
     GET SQL_TEXT;
-- PASS:0881 If character set created successfully?

   COMMIT WORK;

   CREATE DOMAIN
     "Little boxes on the hillside, Little boxes all the same."
     CHAR (4) CHARACTER SET
     "Little boxes on the hillside, Little boxes made of ticky-tacky";
-- PASS:0881 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE T0881 ( C1
     "Little boxes on the hillside, Little boxes all the same.");
-- PASS:0881 If table created successfully?

   COMMIT WORK;

   INSERT INTO T0881 VALUES ('ABCD');
-- PASS:0881 If insert completed successfully?

   SELECT COUNT(*) FROM T0881
     WHERE C1 = 'ABCD';
-- PASS:0881 If COUNT = 1?

   COMMIT WORK;

   DROP TABLE T0881 CASCADE;
-- PASS:0881 if table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN
     "Little boxes on the hillside, Little boxes all the same."
     CASCADE;
-- PASS:0881 If domain dropped successfully?

   COMMIT WORK;

   DROP CHARACTER SET
   "Little boxes on the hillside, Little boxes made of ticky-tacky";
-- PASS:0881 If character set dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0881 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
