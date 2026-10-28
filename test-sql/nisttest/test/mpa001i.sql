-- MODULE MPA001I  initialization

-- SQL Test Suite, V6.0, Interactive SQL, mpa001i.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0230 Transactions serializable - assign sequential key!

-- setup
      DELETE FROM TT;
-- Making sure table is empty

      INSERT INTO  TT  VALUES (0, 1);
-- PASS:0230 If 1 row is inserted?

      COMMIT WORK;

-- *************************************************////END-OF-MODULE
