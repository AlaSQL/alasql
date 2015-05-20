-- MODULE MPB002R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpb002r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0231 Transactions serializable - SELECT/UPDATE(replace)!
-- Execute the following 3 SQL statements 5 times
-- Repeat 1 more time for each ROLLBACK needed


                           SELECT DOLLARS FROM TT WHERE ANUM = 25;
-- Add 10 dollars and remember as $$

-- Replace $$ below
                           UPDATE TT SET DOLLARS = $$ WHERE ANUM = 25;

-- If there have been errors or 
--    warnings about deadlock, type
--                         ROLLBACK WORK;
--    otherwise, type         *or*
--                         COMMIT WORK;

-- *************************************************////END-OF-MODULE



  --                  DOLLARS values committed:

  --                     |_______|

  --                     |_______|

  --                     |_______|

  --                     |_______|

  --                     |_______|
