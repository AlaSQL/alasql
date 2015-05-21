-- MODULE SDL001

-- SQL Test Suite, V6.0, Interactive SQL, sdl001.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0137 CREATE Schema!
-- NOTE:0137  This is an accounting routine to document which schema
-- NOTE:0137  was executed among: schema1.std, schema1.smi, schema1.nc

     INSERT INTO WHICH_SCHEMA1 VALUES 
          ('Use of SCHEMA1.STD is required to pass this test. ');
-- PASS:0137 If 1 row inserted?

     SELECT C1 FROM WHICH_SCHEMA1;

-- PASS:0137 If 1 row selected ?
-- PASS:0137 If C1 starts with 'Use of SCHEMA1.STD is required' ?
-- PASS:0137 If C1 ends with   ' to pass this test.'            ? 

-- reset
   ROLLBACK WORK;

-- END TEST >>> 0137 <<< END TEST

-- *************************************************////END-OF-MODULE
