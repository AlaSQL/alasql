-- MODULE DML091  

-- SQL Test Suite, V6.0, Interactive SQL, dml091.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- NOTE Direct support for SQLCODE or SQLSTATE is not required
-- NOTE    in Interactive Direct SQL, as defined in FIPS 127-2.
-- NOTE   ********************* instead ***************************
-- NOTE If a statement raises an exception condition,
-- NOTE    then the system shall display a message indicating that
-- NOTE    the statement failed, giving a textual description
-- NOTE    of the failure.
-- NOTE If a statement raises a completion condition that is a
-- NOTE    "warning" or "no data", then the system shall display
-- NOTE    a message indicating that the statement completed,
-- NOTE    giving a textual description of the "warning" or "no data."

-- TEST:0497 SQLSTATE 22003: data exception/numeric val.range 2!

-- setup
   DELETE FROM HU.P1;
   DELETE FROM FOUR_TYPES;

   INSERT INTO HU.P1 
         VALUES (100000);
-- PASS:0497 If 1 row is inserted?
-- PASS:0497 OR ERROR, data exception/numeric value out of range?
-- PASS:0497 OR 0 rows inserted OR SQLSTATE = 22003 OR SQLCODE < 0? 

   INSERT INTO HU.P1 
         VALUES (-1000000);
-- PASS:0497 If 1 row is inserted?
-- PASS:0497 OR ERROR, data exception/numeric value out of range?
-- PASS:0497 OR 0 rows inserted OR SQLSTATE = 22003 OR SQLCODE < 0?

   INSERT INTO HU.P1 
         VALUES (-9);
-- PASS:0497 If 1 row is inserted?

   INSERT INTO HU.P1 
         VALUES (9);
-- PASS:0497 If 1 row is inserted?

   UPDATE HU.P1 
         SET NUMTEST = NUMTEST + 100000
      WHERE NUMTEST = 9;
-- PASS:0497 If 1 row is updated?
-- PASS:0497 OR ERROR, data exception/numeric value out of range?
-- PASS:0497 OR 0 rows updated OR SQLSTATE = 22003 OR SQLCODE < 0?
 
   UPDATE HU.P1 SET NUMTEST =
       ((1 + NUMTEST) * 100000)
     WHERE NUMTEST = 100009
     OR    NUMTEST IN (SELECT GRADE - 4 FROM HU.STAFF);
-- PASS:0497 If 1 row is updated?
-- PASS:0497 OR ERROR, data exception/numeric value out of range?
-- PASS:0497 OR 0 rows updated OR SQLSTATE = 22003 OR SQLCODE < 0?

   UPDATE HU.P1
         SET NUMTEST = NUMTEST * 200000
         WHERE NUMTEST = -9;
-- PASS:0497 If 1 row is updated?
-- PASS:0497 OR ERROR, data exception/numeric value out of range?
-- PASS:0497 OR 0 rows updated OR SQLSTATE = 22003 OR SQLCODE < 0?

-- setup
   INSERT INTO FOUR_TYPES 
         VALUES (1,'X',11112222.00,.000003E-25);

   SELECT T_DECIMAL / .000000001
         FROM FOUR_TYPES 
         WHERE T_CHAR = 'X';
-- PASS:0497 If 1 row is selected and T_DECIMAL = 1.1112222E+16 ?
-- PASS:0497 OR ERROR, data exception/numeric value out of range?
-- PASS:0497 OR 0 rows selected OR SQLSTATE = 22003 OR SQLCODE < 0?


-- NOTE:0497 If the following values are too large (not supported),
-- NOTE:0497  use TEd to decrease them to maximum allowed.
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);
   INSERT INTO FOUR_TYPES (T_REAL) VALUES (-1.555222E+38);

-- NOTE:0497 If we have not inserted enough big values into FOUR_TYPES,
-- NOTE:0497 to cause an ERROR on the SELECT SUM(T_REAL) below, then
-- NOTE:0497 use TEd to enlarge the above values for T_REAL to the
-- NOTE:0497 maximum allowed by your implementation.
-- NOTE:0497 If that is not enough, add more INSERTs.
 
   SELECT SUM(T_REAL) FROM FOUR_TYPES;
-- PASS:0497 If ERROR, data exception/numeric value out of range?
-- PASS:0497 OR 0 rows selected OR SQLSTATE = 22003 OR SQLCODE < 0?


   ROLLBACK WORK;

-- END TEST >>> 0497 <<< END TEST
-- *************************************************////END-OF-MODULE
