-- MODULE MPB007R  repetition  

-- SQL Test Suite, V6.0, Interactive SQL, mpb007r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0507 Transaction serializability, READ/DELETE/INSERT!
-- Synchronize typing with MPA007R, by pausing at the designated "sync point".
-- Do not continue past the sync point until MPA007R has reached
--   a sync point with the same number.

   SELECT BNUM FROM BB;
-- PASS:0507 If 1 row selected and BNUM = 6?

-- **** sync point #1 ****
   INSERT INTO AA VALUES (6);
   DELETE FROM BB WHERE BNUM = 6;


-- If there have been errors or 
--    warnings about deadlock, type
--                                       ROLLBACK WORK;
--    otherwise, type                       *or*
--                                       COMMIT WORK;

-- **** sync point #2 ****
   SELECT ANUM FROM AA;
-- Remember this/these values as ??

-- **** sync point #3 ****
-- For each value of ?? above, move (insert/delete) the value:
   INSERT INTO BB VALUES (??);
   DELETE FROM AA WHERE ANUM = ??;


-- If there have been errors or 
--    warnings about deadlock, type
--                                       ROLLBACK WORK;
--    otherwise, type                       *or*
--                                       COMMIT WORK;

-- *************************************************////END-OF-MODULE
