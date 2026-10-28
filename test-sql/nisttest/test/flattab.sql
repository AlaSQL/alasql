-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER AUTHORIZATION ID FLATER **
-- ***************************************************************
-- MODULE  FLATTAB  

-- SQL Test Suite, V6.0, Interactive SQL, flattab.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- This routine initializes the contents of tables:
--      BASE_VS1, USIG and U_SIG
-- This routine may be run at any time to re-initialize tables.

   DELETE FROM BASE_VS1;
   INSERT INTO BASE_VS1 VALUES (0,1);
   INSERT INTO BASE_VS1 VALUES (1,0);
   INSERT INTO BASE_VS1 VALUES (0,0);
   INSERT INTO BASE_VS1 VALUES (1,1);

   SELECT COUNT(*) FROM BASE_VS1;
-- PASS:Setup If count = 4?

   DELETE FROM USIG;
   INSERT INTO USIG VALUES (0,2);
   INSERT INTO USIG VALUES (1,3);

   DELETE FROM U_SIG;
   INSERT INTO U_SIG VALUES (4,6);
   INSERT INTO U_SIG VALUES (5,7);

   SELECT COUNT(*) FROM USIG;
-- PASS:Setup If count = 2?

   SELECT COUNT(*) FROM U_SIG;
-- PASS:Setup If count = 2?

   COMMIT WORK;
-- *************************************************////END-OF-MODULE

