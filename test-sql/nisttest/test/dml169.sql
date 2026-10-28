-- MODULE  DML169  

-- SQL Test Suite, V6.0, Interactive SQL, dml169.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0877 Intermediate DB, Flag at Entry level!
-- NOTE:  This test should be run with flagging set to ENTRY LEVEL.
--        FIPS Flagger warning should be demonstrated for each
--        non-Entry statement.

   CREATE TABLE FOO (C1 INT);
-- PASS:0877 If table created successfully?
-- PASS:0877 If CREATE TABLE is flagged as non-Entry level?

   ROLLBACK WORK;

   SELECT COUNT(*) 
     FROM HU.STAFF
     WHERE 1 IS NOT NULL;
-- PASS:0877 If COUNT = 5?
-- PASS:0877 If literal with <null predicate> flagged as non_Entry?

   SELECT CURRENT_USER 
     FROM HU.ECCO;
-- PASS:0877 If statement completed successfully?
-- PASS:0877 If CURRENT_USER is flagged as non-Entry level?

   INSERT INTO HU.STAFF VALUES (
     'EX  ', 'Harvey Wallbanger', 15, 'Detroit');
-- PASS:0877 If 1 row inserted successfully?
-- PASS:0877 If CHAR(4) literal 'EX  ' stored as CHAR(3) column  ?
-- PASS:0877    value is flagged as non_Entry level              ?

   ROLLBACK WORK;

-- END TEST >>> 0877 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
