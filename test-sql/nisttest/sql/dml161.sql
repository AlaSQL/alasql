-- MODULE  DML161  

-- SQL Test Suite, V6.0, Interactive SQL, dml161.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0861 CURRENT_USER, SESSION_USER, SYSTEM_USER!

   SELECT CURRENT_USER FROM HU.ECCO;
-- PASS:0861 If CURRENT_USER = 'FLATER'?

   SELECT SESSION_USER FROM HU.ECCO;
-- PASS:0861 If SESSION_USER = 'FLATER'?

   SELECT SYSTEM_USER FROM HU.ECCO;
-- PASS:0861 If SYSTEM_USER = 'FLATER'?

   COMMIT WORK;

-- END TEST >>> 0861 <<< END TEST
-- *********************************************

-- TEST:0862 CURRENT_USER etc. with set session authid!

-- NOTE:  This test attempts to change session authorization.
--        Because, authorizations are implemantation-defined,
--        this test may need modification.  It might not be 
--        possible to change the session authorization, as
--        explained in 16.4 GR.4.  In this case, the restrictions
--        that render it impossible should be documented and the
--        test assumed to be passed.  However, the test must pass
--        the syntax check.

   SET SESSION AUTHORIZATION 'SCHANZLE';
-- PASS:0862 If session authorization set successfully?

   SELECT CURRENT_USER FROM HU.ECCO;
-- PASS:0862 If CURRENT_USER = 'SCHANZLE'?

   SELECT SESSION_USER FROM HU.ECCO;
-- PASS:0862 If SESSION_USER = 'SCHANZLE'?

   SELECT SYSTEM_USER FROM HU.ECCO;
-- PASS:0862 If SYSTEM_USER = 'FLATER'?

   COMMIT WORK;

-- END TEST >>> 0862 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
