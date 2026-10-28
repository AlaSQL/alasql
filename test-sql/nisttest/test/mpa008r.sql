-- MODULE MPA008R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpa008r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0517 Transaction serializability:  Twins Problem!
-- Synchronize typing with MPB008R, by pausing at the designated "sync point".
-- Do not continue past the sync point until MPB008R has reached
--   a sync point with the same number.

-- WAIT !!!
-- Verify that MPB008R has attempted to INSERT INTO TTT
--                              and has COMMITted

-- **** sync point #1 ****
   SELECT COUNT(*)
      FROM TTT WHERE ANUM = 3;
-- PASS:0517 If count = 1?

   DELETE FROM TTT
      WHERE ANUM = 3;
-- PASS:0517 If 1 row is deleted?

-- **** sync point #2 ****
-- WAIT !!!
-- Verify that MPB008R has attempted to INSERT INTO TTT
-- If MPB008R is "hanging" type          ROLLBACK WORK;
--    otherwise, type the INSERT below.

-- **** sync point #3 ****
-- If you have NOT typed ROLLBACK, then type:
   INSERT INTO TTT VALUES (3,'A');

-- If there have been errors or 
--    warnings about deadlock, type
--                                       ROLLBACK WORK;
--    otherwise, type
--                                       COMMIT WORK;

-- **** sync point #4 ****
   SELECT COUNT(*)
      FROM TTT WHERE ANUM = 3;
-- PASS:0517 If count = 1?

   DELETE FROM TTT
      WHERE ANUM = 3;
-- PASS:0517 If 1 row is deleted?

-- **** sync point #5 ****
-- WAIT !!!
-- Verify that MPB008R has attempted to INSERT INTO TTT
-- Proceed whether or not MPB008R is "hanging."

-- **** sync point #6 ****
   INSERT INTO TTT VALUES (3,'A');

-- If there have been errors or 
--    warnings about deadlock, type
--                                       ROLLBACK WORK;
--    otherwise, type
--                                       COMMIT WORK;


-- *************************************************////END-OF-MODULE
