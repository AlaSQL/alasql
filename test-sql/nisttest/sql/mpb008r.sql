-- MODULE MPB008R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpb008r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0517 Transaction serializability:  Twins Problem!
-- Synchronize typing with MPA008R, by pausing at the designated "sync point".
-- Do not continue past the sync point until MPA008R has reached
--   a sync point with the same number.

-- Do not WAIT !!!
-- Begin before MPA008R

   INSERT INTO TTT VALUES (3,'B');
-- PASS:0517 If ERROR, unique constraint, 0 rows inserted?

   COMMIT WORK;

-- **** sync point #1 ****
-- WAIT !!!
-- Verify that MPA008R has DELETEd FROM TTT WHERE ANUM = 3

-- **** sync point #2 ****
-- NOTE:0517 It is OK for only one of the INSERT or COMMIT to fail.
   INSERT INTO TTT VALUES (3,'B');
-- PASS:0517 If ERROR, unique constraint or serialization failure?
-- PASS:0517 If 0 rows inserted?
-- **** Tell MPA008R to ROLLBACK if this INSERT "hangs"

   COMMIT WORK;
-- PASS:0517 If ERROR, unique constraint or serialization failure?
-- PASS:0517 If previous INSERT failed or 0 rows COMMITted?

-- **** sync point #3 ****
-- WAIT !!!
-- Verify that MPA008R has completed the first transaction
-- for SELECT/DELETE/INSERT with a COMMIT or ROLLBACK.

-- **** sync point #4 ****
-- WAIT  !!!
-- Verify that MPA008R has DELETEd from TTT WHERE ANUM = 3;

-- **** sync point #5 ****
-- NOTE:0517 It is OK for only one of the INSERT or COMMIT to fail.
   INSERT INTO TTT VALUES (3,'B');
-- PASS:0517 If ERROR, unique constraint or serialization failure?
-- PASS:0517 If 0 rows inserted?
-- **** Issue a CANCEL or BREAK (^C) if this INSERT "hangs"

   COMMIT WORK;
-- PASS:0517 If ERROR, unique constraint or serialization failure?
-- PASS:0517 If previous INSERT failed or 0 rows COMMITted?

-- **** sync point #6 ****

-- *************************************************////END-OF-MODULE
