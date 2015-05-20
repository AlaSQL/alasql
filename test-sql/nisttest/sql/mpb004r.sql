-- MODULE MPB004R  repetition

-- SQL Test Suite, V6.0, Interactive SQL, mpb004r.sql
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

     SELECT 'BB', BNUM, BNUM - 150 FROM BB;
-- Remember the value of BB as #BB#               BB = |__________|
-- Subtract 150 for later reference         BB - 150 = |__________|

     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
     UPDATE BB SET BNUM = BNUM - 3;
-- PASS:0268 If BB updated 50 times?
-- *** tester - If these lines are actually being TYPED
--          instead of being executed as a stored procedure,
--          then type the following three lines
--          instead of executing the 50 UPDATE STATEMENTS ABOVE.
--
--          UPDATE BB SET BNUM = BNUM - 50;
--          UPDATE BB SET BNUM = BNUM - 50;
--          UPDATE BB SET BNUM = BNUM - 50;


     SELECT 'AA', ANUM, ANUM - 20 FROM AA;
-- Remember the value of AA as #AA#               AA = |__________|
-- Subtract 20 for later reference           AA - 20 = |__________|

     UPDATE AA SET ANUM = ANUM - 5;
     UPDATE AA SET ANUM = ANUM - 5;
     UPDATE AA SET ANUM = ANUM - 5;
     UPDATE AA SET ANUM = ANUM - 5;
-- PASS:0268 If AA updated 4 times?

     SELECT 'BB-150', BNUM FROM BB;
-- PASS:0268 If BNUM is 150 less than #BB# above?

     SELECT 'AA-20', ANUM FROM AA;
-- PASS:0268 If ANUM is 20 less than #AA# above?

-- If there have been errors or 
--    warnings about deadlock, type
--                                       ROLLBACK WORK;
--    otherwise, type                       *or*
--                                       COMMIT WORK;

-- *************************************************////END-OF-MODULE
