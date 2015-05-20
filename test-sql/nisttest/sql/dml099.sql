-- MODULE  DML099  

-- SQL Test Suite, V6.0, Interactive SQL, dml099.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- NO_TEST:0581 Implicit numeric casting (feature 9) dynamic!

-- Testing dynamic SQL

-- *********************************************

-- TEST:0582 Implicit numeric casting (feature 9) static!

   CREATE TABLE ICAST2 (C1 INT, C2 DOUBLE PRECISION, C3 NUMERIC(5,3));
-- PASS:0582 If table is created?

   COMMIT WORK;

   INSERT INTO ICAST2 VALUES (.31416E+1, 3, .3142293E+1);
-- PASS:0582 If 1 row is inserted?

   SELECT C1, C2, C3 FROM ICAST2;
-- PASS:0582 If 1 row is selected with C1 = 3 and C3 = 3.142?

   UPDATE ICAST2 SET C1 = 5.2413E+0, C2 = 5, C3 = 5.2413E+0;
-- PASS:0582 If 1 row is updated?

   SELECT C1, C2, C3 FROM ICAST2;
-- PASS:0582 If 1 row is selected with C1 = 5 and C3 = 5.241?

   UPDATE ICAST2 SET C1 = 6.28E+0, C2 = 2.1E+0, C3 = .07E+2;
-- PASS:0582 If 1 row is updated?

   UPDATE ICAST2 SET C1 = C2, C3 = C3 + C2;
-- PASS:0582 If 1 row is updated?

   SELECT C1, C2, C3 FROM ICAST2;
-- PASS:0582 If 1 row is selected with C1 = 2 and C3 = 9.100?

   ROLLBACK WORK;

   DROP TABLE ICAST2 CASCADE;

   COMMIT WORK;

-- END TEST >>> 0582 <<< END TEST
-- *********************************************

-- NO_TEST:0583 FIPS sizing, Dynamic SQL character strings!

-- Testing dynamic SQL

-- *************************************************////END-OF-MODULE
