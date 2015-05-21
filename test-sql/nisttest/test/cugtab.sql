-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER AUTHORIZATION ID HERD ****
-- ***************************************************************
-- MODULE  CUGTAB  

-- SQL Test Suite, V6.0, Interactive SQL, cugtab.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CUGINI

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- This routine initializes the contents of tables:
--      AA, BB, CC, DD, EE, FF, GG, HH, SRCH1, BADG1, BADG2.
-- This routine may be run at any time to re-initialize tables.

   DELETE FROM CUGINI.AA;
   INSERT INTO CUGINI.AA VALUES('Twenty Characters...');

   DELETE FROM CUGINI.BB;

   DELETE FROM CUGINI.CC;
   INSERT INTO CUGINI.CC VALUES('Twenty Characters...');

   DELETE FROM CUGINI.DD;
   INSERT INTO CUGINI.DD VALUES('a');

   SELECT COUNT(*) FROM CUGINI.AA;
-- PASS:Setup if count = 1?

   SELECT COUNT(*) FROM CUGINI.BB;
-- PASS:Setup if count = 0?

   SELECT COUNT(*) FROM CUGINI.CC;
-- PASS:Setup if count = 1?

   SELECT COUNT(*) FROM CUGINI.DD;
-- PASS:Setup if count = 1?

   COMMIT WORK;

   DELETE FROM CUGINI.EE;
   INSERT INTO CUGINI.EE VALUES(0);

   DELETE FROM CUGINI.FF;

   DELETE FROM CUGINI.GG;
   INSERT INTO CUGINI.GG VALUES(1);

   DELETE FROM CUGINI.HH;
   INSERT INTO CUGINI.HH VALUES(2);

   SELECT COUNT(*) FROM CUGINI.EE;
-- PASS:Setup if count = 1?

   SELECT COUNT(*) FROM CUGINI.FF;
-- PASS:Setup if count = 0?

   SELECT COUNT(*) FROM CUGINI.GG;
-- PASS:Setup if count = 1?

   SELECT COUNT(*) FROM CUGINI.HH;
-- PASS:Setup if count = 1?

   COMMIT WORK;

   DELETE FROM CUGINI.SRCH1;
   INSERT INTO CUGINI.SRCH1 VALUES (0);
   INSERT INTO CUGINI.SRCH1 VALUES (1);

   DELETE FROM CUGINI.BADG1;
   INSERT INTO CUGINI.BADG1 VALUES (2);
   DELETE FROM CUGINI.BADG2;
   INSERT INTO CUGINI.BADG2 VALUES (2);

   SELECT COUNT(*) FROM CUGINI.SRCH1;
-- PASS:Setup if count = 2?

   SELECT COUNT(*) FROM CUGINI.BADG1;
-- PASS:Setup if count = 1?

   SELECT COUNT(*) FROM CUGINI.BADG2;
-- PASS:Setup if count = 1?

   COMMIT WORK;
-- *************************************************////END-OF-MODULE

