-- MODULE  DML177  

-- SQL Test Suite, V6.0, Interactive SQL, dml177.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0889 FIPS sizing, INTEGER binary prec >= 31!

   CREATE TABLE NOMAIL (C1 INT);
-- PASS:0889 If table created successfully?

   COMMIT WORK;

   INSERT INTO NOMAIL VALUES (2147483647);
-- PASS:0889 If 1 row inserted successfully?

   INSERT INTO NOMAIL VALUES (-2147483647);
-- PASS:0889 If 1 row inserted successfully?

   SELECT C1 
     FROM NOMAIL WHERE C1 > 0;
-- PASS:0889 If C1 = 2147483647?

   SELECT C1 
     FROM NOMAIL WHERE C1 < 0;
-- PASS:0889 If C1 = -2147483647?

   SELECT C1 - 2147483646 
     FROM NOMAIL
     WHERE C1 > 0;
-- PASS:0889 If value = 1?

   SELECT C1 + 2147483646 
     FROM NOMAIL
     WHERE C1 < 0;
-- PASS:0889 If value = -1?

   UPDATE NOMAIL
     SET C1 = C1 + 2147483646
     WHERE C1 < 0;
-- PASS:0889 If update completed successfully?

   SELECT C1 
     FROM NOMAIL WHERE C1 < 0;
-- PASS:0889 If C1 = -1?

   UPDATE NOMAIL
     SET C1 = C1 - 1;
-- PASS:0889 If update completed successfully?

   SELECT COUNT(*) 
     FROM NOMAIL
     WHERE C1 = 2147483645;
-- PASS:0889 If COUNT = 0?

   SELECT COUNT(*) 
     FROM NOMAIL
     WHERE C1 = 2147483646;
-- PASS:0889 If COUNT = 1?

   SELECT COUNT(*) 
     FROM NOMAIL
     WHERE C1 = 2147483647;
-- PASS:0889 If COUNT = 0?

   COMMIT WORK;

   DROP TABLE NOMAIL CASCADE;
-- PASS:0889 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0889 <<< END TEST
-- *********************************************

-- TEST:0890 FIPS sizing, SMALLINT binary prec >= 15!

   CREATE TABLE YESMAIL (C1 SMALLINT);
-- PASS:0890 If table created successfully?

   COMMIT WORK;

   INSERT INTO YESMAIL VALUES (32767);
-- PASS:0890 If 1 row inserted successfully?

   INSERT INTO YESMAIL VALUES (-32767);
-- PASS:0890 If 1 row inserted successfully?

   SELECT C1 
     FROM YESMAIL WHERE C1 > 0;
-- PASS:0890 If C1 = 32767?

   SELECT C1 
     FROM YESMAIL WHERE C1 < 0;
-- PASS:0890 If C1 = -32767?

   SELECT C1 - 32766 
     FROM YESMAIL
     WHERE C1 > 0;
-- PASS:0890 If value = 1?

   SELECT C1 + 32766 
     FROM YESMAIL
     WHERE C1 < 0;
-- PASS:0890 If value = -1?

   UPDATE YESMAIL
     SET C1 = C1 + 32766
     WHERE C1 < 0;
-- PASS:0890 If update completed successfully?

   SELECT C1 
     FROM YESMAIL WHERE C1 < 0;
-- PASS:0890 If C1 = -1?

   UPDATE YESMAIL
     SET C1 = C1 - 1;
-- PASS:0890 If update completed successfully?

   SELECT COUNT(*) 
     FROM YESMAIL
     WHERE C1 = 32765;
-- PASS:0890 If COUNT = 0?

   SELECT COUNT(*) 
     FROM YESMAIL
     WHERE C1 = 32766;
-- PASS:0890 If COUNT = 1?

   SELECT COUNT(*) 
     FROM YESMAIL
     WHERE C1 = 32767;
-- PASS:0890 If COUNT = 0?

   COMMIT WORK;

   DROP TABLE YESMAIL CASCADE;
-- PASS:0890 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0890 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
