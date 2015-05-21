-- MODULE MPB001R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpb001r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0230 Transactions serializable - assign sequential key!
-- Execute the following 3 SQL statements 5 times
-- Repeat 1 more time for each ROLLBACK needed


                                    SELECT MAX(ANUM) FROM TT;
-- Remember value and add 1.

-- Replace ### with that value.
                                    INSERT INTO TT VALUES (999,###);

-- If there have been errors or 
--    warnings about deadlock, type
--                                  ROLLBACK WORK;
--    otherwise, type                  *or*
--                                  COMMIT WORK;

-- *************************************************////END-OF-MODULE



  --                  ANUM values committed:

  --                     |_______|

  --                     |_______|

  --                     |_______|

  --                     |_______|

  --                     |_______|
