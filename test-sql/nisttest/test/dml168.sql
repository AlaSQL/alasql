-- MODULE  DML168  

-- SQL Test Suite, V6.0, Interactive SQL, dml168.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0876 SQL_IDENTIFIER and CHARACTER_DATA domains!

   CREATE TABLE T0876 (
     C1 INFORMATION_SCHEMA.SQL_IDENTIFIER,
     C2 INFORMATION_SCHEMA.CHARACTER_DATA);
-- PASS:0876 If table created successfully?

   COMMIT WORK;

   INSERT INTO T0876 VALUES ('T0876',
     'This table tests a couple of domains.');
-- PASS:0876 If 1 row inserted successfully?

   SELECT COUNT(*) 
     FROM T0876
     WHERE C1 = 'T0876';
-- PASS:0876 If COUNT = 1?

   COMMIT WORK;

   DROP TABLE T0876 CASCADE;
-- PASS:0876 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0876 <<< END TEST
-- *********************************************

-- TEST:0878 Keyword COLUMN in ALTER TABLE is optional!

   CREATE TABLE T0878 (C1 INT);
-- PASS:0878 If table created successfully?

   COMMIT WORK;

   ALTER TABLE T0878 ADD C2 CHAR (4);
-- PASS:0878 If table altered successfully?

   COMMIT WORK;

   ALTER TABLE T0878
     ALTER C2 SET DEFAULT 'ABCD';
-- PASS:0878 If table altered successfully?

   COMMIT WORK;

   ALTER TABLE T0878
     DROP C1 CASCADE;
-- PASS:0878 If table altered successfully?

   COMMIT WORK;

   INSERT INTO T0878 VALUES (DEFAULT);
-- PASS:0878 If 1 row inserted successfully?

   SELECT * FROM T0878;
-- PASS:0878 If answer = 'ABCD'?

   COMMIT WORK;

   DROP TABLE T0878 CASCADE;
-- PASS:0878 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0878 <<< END TEST
-- *********************************************

-- TEST:0879 <drop table constraint definition>!

   CREATE TABLE T0879 (
     C1 INT,
     C2 INT,
       CONSTRAINT DELME CHECK (C1 > 0),
       CONSTRAINT REFME UNIQUE (C2));
-- PASS:0879 If table created successfully?

   COMMIT WORK;

   CREATE TABLE U0879 (
     C1 INT REFERENCES T0879 (C2));
-- PASS:0879 If table created successfully?

   COMMIT WORK;

   ALTER TABLE T0879
     DROP CONSTRAINT DELME RESTRICT;
-- PASS:0879 If table altered successfully?

   COMMIT WORK;

   INSERT INTO T0879 VALUES (0, 0);
-- PASS:0879 If 1 row inserted successfully?

   INSERT INTO T0879 VALUES (-1, -1);
-- PASS:0879 If 1 row inserted successfully?

   SELECT COUNT(*) FROM T0879;
-- PASS:0879 If COUNT = 2?

   INSERT INTO U0879 VALUES (20);
-- PASS:0879 If ERROR - integrity constraint violation?

   INSERT INTO T0879 VALUES (2, 0);
-- PASS:0879 If ERROR - integrity constraint violation?

   COMMIT WORK;

   ALTER TABLE T0879
     DROP CONSTRAINT REFME RESTRICT;
-- PASS:0879 If ERROR - syntax error or access rule violation?

   COMMIT WORK;

   ALTER TABLE T0879
     DROP CONSTRAINT REFME CASCADE;
-- PASS:0879 If table altered successfully?

   COMMIT WORK;

   INSERT INTO U0879 VALUES (20);
-- PASS:0879 If 1 row inserted successfully?

   INSERT INTO T0879 VALUES (0, 0);
-- PASS:0879 If 1 row inserted successfully?

   COMMIT WORK;

   DROP TABLE T0879 CASCADE;
-- PASS:0879 If table dropped successfully?

   COMMIT WORK;

   DROP TABLE U0879 CASCADE;
-- PASS:0879 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0879 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
