-- MODULE DML047

-- SQL Test Suite, V6.0, Interactive SQL, dml047.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0222 FIPS sizing -- Length(240) of a character string!
-- FIPS sizing TEST
-- NOTE:0222 Literal length is only 78

-- setup
     INSERT INTO T240 VALUES(
'Now is the time for all good men and women to come to the aid of their country'
);
-- PASS:0222 If 1 row is inserted?

     SELECT * 
          FROM T240;
-- PASS:0222 If STR240 starts with 'Now is the time for all good men'?
-- PASS:0222 and ends 'and women to come to the aid of their country'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0222 <<< END TEST
-- *************************************************////END-OF-MODULE
