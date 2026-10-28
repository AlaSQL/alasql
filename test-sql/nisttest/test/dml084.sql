-- MODULE DML084  

-- SQL Test Suite, V6.0, Interactive SQL, dml084.sql
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

-- TEST:0503 SQLSTATE 42000: syntax error or access rule vio.1!

   SELECT COL2 
         FROM HU.UPUNIQ
         WHERE NUMKEY = 1;
-- PASS:0503 If ERROR, syntax error or access rule violation?
-- PASS:0503 0 rows selected OR SQLSTATE = 42000 OR SQLCODE < 0?

   UPDATE HU.UPUNIQ 
         SET COL2 = 'xx';
-- PASS:0503 If ERROR, syntax error or access rule violation?
-- PASS:0503 0 rows updated OR SQLSTATE = 42000 OR SQLCODE < 0?

   DELETE FROM HU.UPUNIQ;
-- PASS:0503 If ERROR, syntax error or access rule violation?
-- PASS:0503 0 rows deleted OR SQLSTATE = 42000 OR SQLCODE < 0?

   INSERT INTO HU.UPUNIQ
         VALUES (9,'M');
-- PASS:0503 If ERROR, syntax error or access rule violation?
-- PASS:0503 0 rows inserted OR SQLSTATE = 42000 OR SQLCODE < 0?

   SELECT COUNT(*) 
         FROM HU.STAFF
         WHERE GRADE <
                 (SELECT MAX(HOURS) FROM HU.WORKS)
             OR    GRADE >
                     (SELECT MAX(NUMKEY) FROM HU.UPUNIQ)
             OR    GRADE + 100 > 
                     (SELECT MIN(HOURS) FROM HU.WORKS);
-- PASS:0503 If ERROR, syntax error or access rule violation?
-- PASS:0503 0 rows selected OR SQLSTATE = 42000 OR SQLCODE < 0?
 
   INSERT INTO HU.UPUNIQ 
         VALUES (13,44);
-- PASS:0503 If ERROR, syntax error or access rule violation?
-- PASS:0503 0 rows inserted OR SQLSTATE = 42000 OR SQLCODE < 0?

   INSERT INTO HU.UPUNIQ 
         VALUES (555666777);
-- PASS:0503 If ERROR, syntax error or access rule violation? 
-- PASS:0503 0 rows inserted OR SQLSTATE = 42000 OR SQLCODE < 0?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0503 <<< END TEST
-- *********************************************

-- TEST:0504 SQLSTATE 42000: syntax error or access rule vio.2!

-- NOTE:  OPTIONAL test
-- NOTE: This test is passed by default if SQLSTATE
--       is not supported in the Interactive SQL interface

-- NOTE: Test numbers 0503 and 0504 check for SQLSTATE
-- NOTE: 42000 on syntax errors and access violations.
-- NOTE: SQL-92 permits, but does not require, an
-- NOTE: implementation to achieve a high level of security
-- NOTE: by returning the same error for an access
-- NOTE: violation as for a reference to a non-existent
-- NOTE: table.  This test exercises several different
-- NOTE: types of syntax errors and access violations.  If
-- NOTE: you are trying for a high security level, please
-- NOTE: insure that the behavior of all these errors are
-- NOTE: indistinguishable.
-- NOTE: 
-- NOTE: For minimal SQL-92 conformance, each run time
-- NOTE: error must produce SQLSTATE 42000 or 42 with some
-- NOTE: implementor-defined subclass.  The subclass can
-- NOTE: be different for each error.

-- setup, note SQLSTATE value, if supported in Interactive SQL
   SELECT COL2
         FROM HU.UPUNIQ
         WHERE NUMKEY = 1;

   SELECT COL2 
         FROM HU.UPUPUP 
         WHERE NUMKEY = 1;
-- PASS:0504 If the SQLSTATE value is the same as?
-- PASS:0504 the SQLSTATE value of the previous SELECT?


-- setup, note SQLSTATE value, if supported in Interactive SQL  
   UPDATE HU.UPUNIQ
         SET COL2 = 'xx';

   UPDATE HU.UPUPUP
         SET COL2 = 'xx';
-- PASS:0504 If the SQLSTATE value is the same as? 
-- PASS:0504 the SQLSTATE value of the previous UPDATE?


-- setup, note SQLSTATE value, if supported in Interactive SQL
   DELETE FROM HU.UPUNIQ;
        
   DELETE FROM HU.UPUPUP;
-- PASS:0504 If the SQLSTATE value is the same as?
-- PASS:0504 the SQLSTATE value of the previous DELETE?


-- setup, note SQLSTATE value, if supported in Interactive SQL
   INSERT INTO HU.UPUNIQ
         VALUES (9,'M');

   INSERT INTO HU.UPUPUP 
         VALUES (9,'M');
-- PASS:0504 If the SQLSTATE value is the same as?
-- PASS:0504 the SQLSTATE value of the previous INSERT?


-- setup, note SQLSTATE value, if supported in Interactive SQL
   SELECT COUNT(*) 
         FROM HU.STAFF
         WHERE GRADE <
                 (SELECT MAX(HOURS) FROM HU.WORKS)
             OR    GRADE >
                     (SELECT MAX(NUMKEY) FROM HU.UPUNIQ)
             OR    GRADE + 100 > 
                     (SELECT MIN(HOURS) FROM HU.WORKS);

   SELECT COUNT(*) 
         FROM HU.STAFF
         WHERE GRADE <
                 (SELECT MAX(HOURS) FROM HU.WORKS)
             OR    GRADE >
                     (SELECT MAX(NUMKEY) FROM HU.UPUPUP)
             OR    GRADE + 100 > 
                     (SELECT MIN(HOURS) FROM HU.WORKS);
-- PASS:0504 If the SQLSTATE value is the same as?
-- PASS:0504 the SQLSTATE value of the previous SELECT?


-- restore
   ROLLBACK WORK;

-- END TEST >>> 0504 <<< END TEST
-- *************************************************////END-OF-MODULE
