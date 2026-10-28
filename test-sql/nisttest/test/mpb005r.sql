-- MODULE MPB005R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpb005r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0457 Transactions serializable - phantom read!
-- Execute the following 2 sets of SQL statements 6 times.
-- If there are errors or warnings about deadlock, COMMIT and repeat the
--  SELECT statement causing the errors or warnings.
-- Alternate set 1 and set 2.
-- Stop when 6 sets of each have been executed without errors or warnings.

                           SELECT * FROM AA;
-- PASS:0457 If 20 rows selected or 25 rows selected?
-- PASS:0457 or there are errors or warnings about deadlock?

                           COMMIT WORK;


                           SELECT COUNT(*) FROM AA;
-- PASS:0457 If count = 20 or count = 25 ?
-- PASS:0457 or there are errors or warnings about deadlock?

                           COMMIT WORK;



-- *************************************************////END-OF-MODULE



  -- Write down the number of rows shown or COUNT(*):

  -- Number of rows on screen        |_______|

  -- COUNT(*)                        |_______|

  -- Number of rows on screen        |_______|

  -- COUNT(*)                        |_______|

  -- Number of rows on screen        |_______|

  -- COUNT(*)                        |_______|

  -- Number of rows on screen        |_______|

  -- COUNT(*)                        |_______|

  -- Number of rows on screen        |_______|

  -- COUNT(*)                        |_______|

  -- Number of rows on screen        |_______|

  -- COUNT(*)                        |_______|

