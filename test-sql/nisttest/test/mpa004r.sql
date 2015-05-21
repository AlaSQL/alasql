-- MODULE MPA004R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpa004r.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SULLIVAN1

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   COMMIT WORK;

-- date_time print

-- TEST:0268 Transaction serializability, deadlock management!
-- Start MPA004R.SQL AND MPB004R.SQL at the same time
-- If there are deadlock messages, you may type 
--          <break> and ROLLBACK WORK; at any time.

     SELECT 'AA', ANUM, ANUM + 150 FROM AA;
-- Remember the value of AA as #AA#              AA = |__________|
-- Add 150 for later reference             AA + 150 = |__________|

     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
     UPDATE AA SET ANUM = ANUM + 3;
-- PASS:0268 If AA updated 50 times?
-- *** tester - If these lines are actually being TYPED
--          instead of being executed as a stored procedure,
--          then type the following three lines
--          instead of executing the 50 UPDATE STATEMENTS ABOVE.
--
--          UPDATE AA SET ANUM = ANUM + 50;
--          UPDATE AA SET ANUM = ANUM + 50;
--          UPDATE AA SET ANUM = ANUM + 50;


     SELECT 'BB', BNUM, BNUM + 20 FROM BB;
-- Remember the value of BB as #BB#              BB = |__________|
-- Add 20 for later reference               BB + 20 = |__________|

     UPDATE BB SET BNUM = BNUM + 5;
     UPDATE BB SET BNUM = BNUM + 5;
     UPDATE BB SET BNUM = BNUM + 5;
     UPDATE BB SET BNUM = BNUM + 5;
-- PASS:0268 If BB updated 4 times?
     
     SELECT 'AA+150', ANUM FROM AA;
-- PASS:0268 If ANUM is 150 greater than #AA# above?

     SELECT 'BB+20', BNUM FROM BB;
-- PASS:0268 If BNUM is 20 greater than #BB# above?

-- If there have been errors or 
--    warnings about deadlock, type
--                                       ROLLBACK WORK;
--    otherwise, type                       *or*
--                                       COMMIT WORK;

-- *************************************************////END-OF-MODULE
