-- MODULE FLG006

-- SQL Test Suite, V6.0, Interactive SQL, flg006.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION MCGINN 

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0299 FIPS Flagger - identifier length > 18!
-- NOTE:  OPTIONAL FIPS Flagger test
-- FIPS Flagger Test.  Support for this feature is not required.
-- If supported, this feature must be flagged as an extension to the standard.

-- NOTE:0299 Delete any SQL statement which causes 
-- NOTE:0299   this procedure to abort.  But, there
-- NOTE:0299   is no need to remove a statement with a warning.

  INSERT INTO TABLEFGHIJKLMNOPQ19 VALUES (299);
  INSERT INTO SHORTTABLE VALUES (299);
  INSERT INTO BASETABLE1 VALUES (299);

  SELECT COL2                 FROM  TABLEFGHIJKLMNOPQ19;
  SELECT COLUMN123456789IS19  FROM  SHORTTABLE;
  SELECT COL3                 FROM  VIEWABCDEFGHIKLMN19;
-- PASS:0299 If the value 299 is selected by any of SQL SELECTs above?

-- restore
  ROLLBACK WORK;

-- END TEST >>> 0299 <<< END TEST
-- *************************************************////END-OF-MODULE
