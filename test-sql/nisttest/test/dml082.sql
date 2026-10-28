-- MODULE DML082  

-- SQL Test Suite, V6.0, Interactive SQL, dml082.sql
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
 
-- NO_TEST:0491 SQLSTATE 22022: data exception/indicator overflow!

-- Testing indicators 

-- *********************************************

-- TEST:0492 SQLSTATE 22019: data exception/invalid escape char!

-- setup
   UPDATE HU.STAFF 
         SET CITY = 'Percent%Xunder_'
         WHERE EMPNUM = 'E1';

   SELECT COUNT(*) 
         FROM HU.STAFF 
         WHERE CITY LIKE '%XX%X_%' ESCAPE 'XX';
-- PASS:0492 If ERROR, data exception/invalid escape char?
-- PASS:0492 0 rows selected OR SQLSTATE = 22019 OR SQLCODE < 0?

   SELECT COUNT(*)
         FROM HU.STAFF
         WHERE CITY LIKE '%XX%X_%' ESCAPE 'X';
-- PASS:0492 If count = 1?

   SELECT COUNT(*)
         FROM HU.STAFF
         WHERE CITY LIKE '%XX_%' ESCAPE 'XX';
-- PASS:0492 If ERROR, data exception/invalid escape char?
-- PASS:0492 0 rows selected OR SQLSTATE = 22019 OR SQLCODE < 0?

   SELECT COUNT(*) 
         FROM HU.STAFF WHERE CITY
         LIKE '%XX_%' ESCAPE 'X';
-- PASS:0492 If count = 1?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0492 <<< END TEST
-- *********************************************

-- TEST:0493 SQLSTATE 22025: data exception/invalid escape seq.!

-- setup
   DELETE FROM CPBASE;
   INSERT INTO CPBASE 
         VALUES(82,'Per%X&und_');

   SELECT COUNT(*) 
         FROM CPBASE WHERE JUNK1
         LIKE 'P%X%%X' ESCAPE 'X';
-- PASS:0493 If ERROR, data exception/invalid escape seq.?
-- PASS:0493 0 rows selected OR SQLSTATE = 22025 OR SQLCODE < 0?

   SELECT COUNT(*) 
         FROM CPBASE WHERE JUNK1
         LIKE 'P%X%%' ESCAPE 'X';
-- PASS:0493 If count = 1?

   INSERT INTO HU.STAFF 
         SELECT 'E12','ff',KC,'gg' 
               FROM CPBASE
               WHERE JUNK1 LIKE '%X%%Xd_' ESCAPE 'X';
-- PASS:0493 If ERROR, data exception/invalid escape seq.?
-- PASS:0493 0 rows inserted OR SQLSTATE = 22025 OR SQLCODE < 0?

   INSERT INTO HU.STAFF 
         SELECT 'E13','ff',KC,'gg' 
               FROM CPBASE
               WHERE JUNK1 LIKE '%X%%X_' ESCAPE 'X';
-- PASS:0493 If 1 row is inserted?

   UPDATE CPBASE
         SET KC = -1
         WHERE JUNK1 LIKE '%?X%' ESCAPE '?';
-- PASS:0493 If ERROR, data exception/invalid escape seq.?
-- PASS:0493 0 rows updated OR SQLSTATE = 22025 OR SQLCODE < 0?

   UPDATE CPBASE 
         SET KC = -1
         WHERE JUNK1 LIKE '%?%X%' ESCAPE '?';
-- PASS:0493 If 1 row is updated?

   DELETE FROM CPBASE
         WHERE JUNK1 LIKE '_e%&u%' ESCAPE '&';
-- PASS:0493 If ERROR, data exception/invalid escape seq.?
-- PASS:0493 0 rows deleted OR SQLSTATE = 22025 OR SQLCODE < 0?

   DELETE FROM CPBASE
         WHERE JUNK1 LIKE '_e%&&u%' ESCAPE '&';
-- PASS:0493 If 1 row is deleted?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0493 <<< END TEST
-- *********************************************

-- TEST:0494 SQLSTATE 22003: data exception/numeric value out of range!

-- setup
   DELETE FROM HU.HH;

   INSERT INTO HU.HH 
         VALUES (10);
-- PASS:0494 If 1 row is inserted? 
-- PASS:0494 OR ERROR, data exception/numeric value out of range?
-- PASS:0494 OR 0 rows inserted OR SQLSTATE = 22003 OR SQLCODE < 0?

   INSERT INTO HU.HH 
         VALUES (100);
-- PASS:0494 If 1 row is inserted?
-- PASS:0494 OR ERROR, data exception/numeric value out of range?
-- PASS:0494 OR 0 rows inserted OR SQLSTATE = 22003 OR SQLCODE < 0?

   INSERT INTO HU.HH 
         VALUES (1000);
-- PASS:0494 If 1 row is inserted?
-- PASS:0494 OR ERROR, data exception/numeric value out of range?
-- PASS:0494 OR 0 rows inserted OR SQLSTATE = 22003 OR SQLCODE < 0?

   INSERT INTO HU.HH 
         VALUES (10000);
-- PASS:0494 If 1 row is inserted?
-- PASS:0494 OR ERROR, data exception/numeric value out of range?
-- PASS:0494 OR 0 rows inserted OR SQLSTATE = 22003 OR SQLCODE < 0?

   INSERT INTO HU.HH
         VALUES (100000);
-- PASS:0494 If 1 row is inserted?
-- PASS:0494 OR ERROR, data exception/numeric value out of range?
-- PASS:0494 OR 0 rows inserted OR SQLSTATE = 22003 OR SQLCODE < 0?
    
   INSERT INTO HU.HH
         VALUES (1000000);
-- PASS:0494 If 1 row is inserted?
-- PASS:0494 OR ERROR, data exception/numeric value out of range?
-- PASS:0494 OR 0 rows inserted OR SQLSTATE = 22003 OR SQLCODE < 0?
    
-- restore
   ROLLBACK WORK;

-- END TEST >>> 0494 <<< END TEST
-- *********************************************

-- TEST:0505 SQLSTATE 44000: with check option violation!

   INSERT INTO FLATER.WCOV 
         VALUES (0);
-- PASS:0505 If ERROR, with check option violation?
-- PASS:0505 0 rows inserted OR SQLSTATE = 44000 OR SQLCODE < 0?

   INSERT INTO FLATER.WCOV
         VALUES (75);
-- PASS:0505 If 1 row is inserted?

   UPDATE FLATER.WCOV
         SET C1 = -C1 
         WHERE C1 = 75;
-- PASS:0505 If ERROR, with check option violation?
-- PASS:0505 0 rows updated OR SQLSTATE = 44000 OR SQLCODE < 0?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0505 <<< END TEST
-- *************************************************////END-OF-MODULE
