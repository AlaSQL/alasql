-- MODULE  DML165  

-- SQL Test Suite, V6.0, Interactive SQL, dml165.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0870 Non-identical descriptors in UNION!

   CREATE TABLE APPLES (
     KEY1 INT,
     APPLE_NAME CHAR (15));
-- PASS:0870 If table created successfully?

   COMMIT WORK;

   CREATE TABLE ORANGES (
     KEY2 FLOAT,
     ORANGE_NAME VARCHAR (10));
-- PASS:0870 If table ceated successfully?

   COMMIT WORK;

   INSERT INTO APPLES VALUES (
     1, 'Granny Smith');
-- PASS:0870 If 1 row inserted successfully?

   INSERT INTO APPLES VALUES (
     2, 'Red Delicious');
-- PASS:0870 If 1 row inserted successfully?

   INSERT INTO ORANGES VALUES (
     1.5E0, 'Navel');
-- PASS:0870 If 1 row inserted successfully?

   INSERT INTO ORANGES VALUES (
     2.5E0, 'Florida');
-- PASS:0870 If 1 row inserted successfully?

   SELECT * FROM APPLES UNION ALL SELECT * FROM ORANGES
     ORDER BY 1;
-- PASS:0870 If 4 rows returned in the following order?
--                col1                 col2
--                ====                 ====
-- PASS:0870 If   1.0 (+ or - 0.01)    Granny Smith?
-- PASS:0870 If   1.5 (+ or - 0.01)    Navel?
-- PASS:0870 If   2.0 (+ or - 0.01)    Red Delicious?
-- PASS:0870 If   2.5 (+ or - 0.01)    Florida?

   COMMIT WORK;

   DROP TABLE APPLES CASCADE;
-- PASS:0870 If table dropped successfully?

   COMMIT WORK;

   DROP TABLE ORANGES CASCADE;
-- PASS:0870 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0870 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
