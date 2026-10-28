-- MODULE  YTS809  

-- SQL Test Suite, V6.0, Interactive SQL, yts809.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7566 TIME ZONE in <datetime value expression>!

   SELECT COUNT (*) 
         FROM CTS1.TTIME3
         WHERE TT2 AT TIME ZONE
            ((SELECT TT2 FROM TTIME3
               WHERE PK = 1)
               -
               (SELECT TT2 FROM TTIME3
               WHERE PK = 3))
            HOUR TO MINUTE
         < TIME '02:00:00+10:00';
-- PASS:7566 If the sum of this COUNT and the next COUNT = 6?

   SELECT COUNT (*) 
     FROM CTS1.TTIME3
     WHERE TIME '16:00:00+00:00'
     <= TT2 AT TIME ZONE (
            ((SELECT TT2 FROM TTIME3
               WHERE PK = 2)
               -
               (SELECT TT2 FROM TTIME3
               WHERE PK = 5))
            HOUR TO MINUTE
          - INTERVAL '08:02' HOUR TO MINUTE);
-- PASS:7566 If the sum of this COUNT and the previous COUNT = 6?

   SELECT COUNT (*) 
     FROM CTS1.TTIME3
     WHERE TS2 AT TIME ZONE
             ((SELECT TS2 FROM TTIME3
               WHERE PK = 5)
               -
               (SELECT TS2 FROM TTIME3
               WHERE PK = 6))
           HOUR TO MINUTE
           < TIMESTAMP '1995-02-10 23:48:00+10:06';
-- PASS:7566 If the sum of this COUNT and next COUNT = 6?

   SELECT COUNT (*) 
     FROM CTS1.TTIME3 
     WHERE TS2 AT TIME ZONE (
             ((SELECT TS2 FROM TTIME3
               WHERE PK = 1)
               -
               (SELECT TS2 FROM TTIME3
               WHERE PK = 6))
               HOUR TO MINUTE
               + INTERVAL -'4500:15' HOUR TO MINUTE)
               >= TIMESTAMP '1995-02-10 03:12:00-10:30';
-- PASS:7566 If the sum of this COUNT and previous COUNT = 6?

   SELECT COUNT(*) FROM TTIME3
     WHERE TT2 AT TIME ZONE
        ((SELECT TS2 FROM TTIME3
          WHERE PK = 1)
          -
         (SELECT TS2 FROM TTIME3
          WHERE PK = 6))
          HOUR TO MINUTE
          < TIME '02:00:00+10:00';
-- PASS:7566 If ERROR - invalid time zone displacement value?

   ROLLBACK WORK;

-- END TEST >>> 7566 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
