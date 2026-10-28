-- MODULE FLG008

-- SQL Test Suite, V6.0, Interactive SQL, flg008.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU 

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0454 SELECT nonGROUP column in GROUP BY!
-- FIPS Flagger Test.  Support for this feature is not required.
-- If supported, this feature must be flagged as an extension to the standard.

   SELECT PTYPE, CITY, SUM (BUDGET), COUNT(*)
      FROM PROJ
      GROUP BY CITY
      ORDER BY CITY;

-- PASS:0454 If either 3, 4, or 6 rows are selected?
-- NOTE:0454 If 3 rows, then note whether sample CITY is given.
-- NOTE:0454 If 4 or 6 rows, then note whether SUM and COUNT
-- NOTE:0454   are for CITY or for PTYPE within CITY.

-- END TEST >>> 0454 <<< END TEST
-- *************************************************////END-OF-MODULE
