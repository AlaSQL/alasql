-- MODULE MPA003R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpa003r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0232 Transactions serializable - UPDATE with arithmetic!
-- Execute the following 3 SQL statements 5 times
-- Repeat 1 more time for each ROLLBACK needed


          UPDATE TT SET DOLLARS = DOLLARS + 5 WHERE ANUM = 1;

          UPDATE TT SET DOLLARS = DOLLARS - 5 WHERE ANUM = 25;

-- If there have been errors or 
--    warnings about deadlock, type
--                                       ROLLBACK WORK;
--    otherwise, type                       *or*
--                                       COMMIT WORK;

-- *************************************************////END-OF-MODULE



  --       CHECK each time UPDATE transaction is committed:

  --                     |_______|

  --                     |_______|

  --                     |_______|

  --                     |_______|

  --                     |_______|
