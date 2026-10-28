-- MODULE DML051

-- SQL Test Suite, V6.0, Interactive SQL, dml051.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0227 BETWEEN predicate with character string values!
      SELECT PNUM
           FROM   PROJ
           WHERE  PNAME BETWEEN 'A' AND 'F';
-- PASS:0227 If PNUM = 'P2'?

      SELECT PNUM
           FROM   PROJ
           WHERE PNAME >= 'A' AND PNAME <= 'F';
-- PASS:0227 If PNUM = 'P2'?

-- END TEST >>> 0227 <<< END TEST
-- ***********************************************************

-- TEST:0228 NOT BETWEEN predicate with character string values!
      SELECT CITY
           FROM   STAFF
           WHERE  EMPNAME NOT BETWEEN 'A' AND 'E';
-- PASS:0228 If CITY = 'Akron'?

      SELECT CITY
           FROM   STAFF
           WHERE  NOT( EMPNAME BETWEEN 'A' AND 'E' );
-- PASS:0228 If CITY = 'Akron'?

-- END TEST >>> 0228 <<< END TEST
-- *************************************************////END-OF-MODULE
