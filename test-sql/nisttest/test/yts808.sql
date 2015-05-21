-- MODULE  YTS808  

-- SQL Test Suite, V6.0, Interactive SQL, yts808.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7565 LOCAL time zone in <datetime value expression>!

   DELETE FROM TTIME_BASE;

   INSERT INTO TTIME VALUES
     (1, TIME '00:00:00', TIMESTAMP '1995-06-07 00:00:00');
-- PASS:7565 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (2, TIME '10:15:13', TIMESTAMP '1980-04-10 10:15:13');
-- PASS:7565 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (3, TIME '23:14:09', TIMESTAMP '1973-09-22 23:14:09');
-- PASS:7565 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (4, TIME '05:39:42', TIMESTAMP '1999-12-31 05:39:42');
-- PASS:7565 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (5, TIME '17:56:26', TIMESTAMP '1961-10-28 17:56:26');
-- PASS:7565 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (6, TIME '17:56:26', TIMESTAMP '1961-10-28 17:56:26');
-- PASS:7565 If 1 row inserted successfully?

   SELECT COUNT (*) 
     FROM TTIME
     WHERE TT AT LOCAL > TIME '10:30:05+01:45';
-- PASS:7565 If the sum of this COUNT and next COUNT = 6?

   SELECT COUNT (*) 
     FROM TTIME
     WHERE TIME '06:15:05-02:30' >= TT AT LOCAL;
-- PASS:7565 If the sum of this COUNT and previous COUNT = 6?

   SELECT COUNT (*) 
     FROM TTIME
     WHERE TS AT LOCAL > TIMESTAMP '1980-04-10 10:30:05+01:45';
-- PASS:7565 If the sum of this COUNT and next COUNT = 6?

   SELECT COUNT (*)
     FROM TTIME
     WHERE TIMESTAMP '1980-04-10 06:15:05-02:30' >= TS AT LOCAL;
-- PASS:7565 If the sum of this COUNT and previous COUNT = 6?

   ROLLBACK WORK;

-- END TEST >>> 7565 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
