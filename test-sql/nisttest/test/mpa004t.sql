-- MODULE MPA004T  testreport

-- SQL Test Suite, V6.0, Interactive SQL, mpa004t.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0268 Transaction serializability, deadlock management!

-- verify
     SELECT ANUM FROM AA;
-- PASS:0268 If ANUM = 131?

     SELECT BNUM FROM BB;
-- PASS:0268 If BNUM = -30?

     COMMIT WORK; 

-- END TEST >>> 0268 <<< END TEST

-- *************************************************////END-OF-MODULE
