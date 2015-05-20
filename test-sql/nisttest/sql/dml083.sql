-- MODULE DML083

-- SQL Test Suite, V6.0, Interactive SQL, dml083.sql
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

-- NO_TEST:0496 SQLSTATE 22002: data exception/null, value, no indic.!

-- Testing indicators

-- *********************************************

-- TEST:0498 SQLSTATE 22001: data exception/string right trunc.!

   INSERT INTO HU.STAFF 
         VALUES ('E6','Earl Brown',11,'Claggetsville Maryland');
-- PASS:0498 If ERROR, data exception/string right trunc.?
-- PASS:0498 If 0 rows inserted OR SQLSTATE = 22001 OR SQLCODE < 0?

   INSERT INTO HU.STAFF 
         VALUES ('E7','Ella Brown',12,'Claggetsville Maryland');
-- PASS:0498 If ERROR, data exception/string right trunc.?
-- PASS:0498 If 0 rows inserted OR SQLSTATE = 22001 OR SQLCODE < 0?

   SELECT COUNT(*)
         FROM HU.STAFF;
-- PASS:0498 If count = 5?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0498 <<< END TEST
-- *********************************************

-- TEST:0500 SQLSTATE 01003: warning/null value elim. in set function!

-- setup
   DELETE FROM HU.HH;
   INSERT INTO HU.HH 
         VALUES (3);
    INSERT INTO HU.HH 
         VALUES (NULL);

   SELECT AVG(SMALLTEST)
         FROM HU.HH;
-- PASS:0500 If WARNING, null value eliminated in set function?
-- PASS:0500 OR SQLSTATE = 01003?

-- setup
   UPDATE HU.STAFF 
         SET GRADE = NULL
         WHERE GRADE = 13;

   SELECT AVG(GRADE)
         FROM HU.STAFF
         WHERE CITY = 'Vienna';
-- PASS:0500 If WARNING, null value eliminated in set function?
-- PASS:0500 OR SQLSTATE = 01003?

   SELECT SUM(DISTINCT GRADE)
         FROM HU.STAFF;
-- PASS:0500 If WARNING, null value eliminated in set function?
-- PASS:0500 OR SQLSTATE = 01003?

   INSERT INTO HU.HH 
         SELECT MAX(GRADE) 
               FROM HU.STAFF;
-- PASS:0500 If WARNING, null value eliminated in set function?
-- PASS:0500 OR SQLSTATE = 01003?

   DELETE FROM HU.HH 
         WHERE SMALLTEST < (SELECT MIN(GRADE)
                                  FROM HU.STAFF
                                  WHERE CITY = 'Vienna');
-- PASS:0500 If WARNING, null value eliminated in set function?
-- PASS:0500 OR SQLSTATE = 01003?

   SELECT CITY, COUNT(DISTINCT GRADE) 
         FROM HU.STAFF
         GROUP BY CITY
         ORDER BY CITY DESC;
-- PASS:0500 If 3 rows are selected with the following order?
-- PASS:0500     CITY    COUNT(DISTINCT GRADE)?
-- PASS:0500   'Vienna'          1?
-- PASS:0500   'Deale'           1?
-- PASS:0500   'Akron'           0?
-- PASS:0500 OR SQLSTATE = 01003?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0500 <<< END TEST
-- *********************************************

-- NO_TEST:0501 SQLSTATE 01004: warning/string right truncation!

-- Testing host variables

-- *************************************************////END-OF-MODULE
