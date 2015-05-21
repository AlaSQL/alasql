-- MODULE  YTS780  

-- SQL Test Suite, V6.0, Interactive SQL, yts780.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7560 <time zone interval> in literal!

   DELETE FROM TTIME_BASE;

   INSERT INTO TTIME2 
   VALUES 
   (4, TIME '12:00:00-07:35',TIMESTAMP '1995-12-25 12:00:00-07:35');
-- PASS:7560 If 1 row inserted successfully?

   INSERT INTO TTIME2
   VALUES 
   (5, TIME '10:00:00-09:40',TIMESTAMP '2000-01-01 00:00:00-12:32');
-- PASS:7560 If 1 row inserted successfully?

   INSERT INTO TTIME2
   VALUES 
   (2, TIME '00:10:00+08:38',TIMESTAMP '1984-12-07 19:56:32+08:29');
-- PASS:7560 If 1 row inserted successfully?

   INSERT INTO TTIME2
   VALUES 
   (3, TIME '05:55:15-10:30',TIMESTAMP '1970-07-13 09:45:10+01:00');
-- PASS:7560 If 1 row inserted successfully?

   INSERT INTO TTIME2
   VALUES 
   (1, TIME '17:49:32+05:55',TIMESTAMP '1972-05-07 02:58:30-11:34');
-- PASS:7560 If 1 row inserted successfully?

   INSERT INTO TTSTORE2
   SELECT PK,
       EXTRACT (HOUR FROM 
               TT2 AT TIME ZONE INTERVAL '00:00' HOUR TO MINUTE),
       EXTRACT (MINUTE FROM
               TT2 AT TIME ZONE INTERVAL '00:00' HOUR TO MINUTE),
       TT2
       FROM TTIME2;
-- PASS:7560 If insert completed successfully?

      SELECT num, colthu, coltmu,
               EXTRACT (HOUR FROM TT2),
               EXTRACT (MINUTE FROM TT2)
         FROM TTSTORE2
         ORDER BY colthu, coltmu;
-- PASS:7560 If 5 rows are selected with the following order?
--
-- PASS:7560 If   1   11   54   17   49?
-- PASS:7560 If   2   15   32    0   10?
-- PASS:7560 If   3   16   25    5   55?
-- PASS:7560 If   4   19   35   12    0?
-- PASS:7560 If   5   19   40   10    0?

   SELECT PK,
         EXTRACT (HOUR FROM TS2),
         EXTRACT (MINUTE FROM TS2)
     FROM TTIME2
     WHERE PK = 1;
-- PASS:7560 If  1   2   58?

   SELECT num FROM TTSTORE2
     WHERE TT2 BETWEEN TIME '12:25:00-04:00'
       AND TIME '20:40:00+01:00'
     ORDER BY num DESC;
-- PASS:7560 If 3 rows are selected in the following order?
--                num
--                ===
-- PASS:7560 If   5?
-- PASS:7560 If   4?
-- PASS:7560 If   2?  

   ROLLBACK WORK;

-- END TEST >>> 7560 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
