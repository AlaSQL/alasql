-- MODULE DML042

-- SQL Test Suite, V6.0, Interactive SQL, dml042.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0213 FIPS sizing -- 100 columns in a row!
-- FIPS sizing TEST

-- setup
     INSERT INTO T100(C1,C21,C41,C61,C81,C100)
            VALUES(' 1','21','41','61','81','00');
-- PASS:0213 If 1 row is inserted?

      SELECT C1,C21,C41,C61,C81,C100
           FROM T100;
-- PASS:0213 If C1 = ' 1' and C100 = '00' ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0213 <<< END TEST

-- *************************************************////END-OF-MODULE
