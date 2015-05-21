-- MODULE  YTS807  

-- SQL Test Suite, V6.0, Interactive SQL, yts807.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7564 TIMEZONE_HOUR & TIMEZONE_MINUTE in <extract exptrssion>!

   DELETE FROM TTIME_BASE;

   INSERT INTO TTIME (PK, TT)
     VALUES (1, TIME '00:00:00');
-- PASS:7564 If insert completed successfully?

   SELECT PK,
     EXTRACT (TIMEZONE_HOUR FROM CAST (TT AS TIME WITH TIME ZONE)),
     EXTRACT (TIMEZONE_MINUTE FROM CAST (TT AS TIME WITH TIME ZONE))
         FROM TTIME
         WHERE PK = 1;
-- PASS:7564 If PK = 1?
-- PASS:7564 If TIMEZONE_HOUR between -12 and 13?
-- PASS:7564 If TIMEZONE_MINUTE between 0 and 59?

   DELETE FROM TTIME_BASE;

   INSERT INTO TTIME2 
     VALUES (1, TIME '00:00:00+07:35',
     TIMESTAMP '1995-12-25 00:00:00+07:35');
-- PASS:7564 If insert completed successfully?

   INSERT INTO TTIME2 
     VALUES (2, TIME '01:00:15+09:15',
     TIMESTAMP '1990-07-13 10:30:16+12:35');
-- PASS:7564 If insert completed successfully?

   INSERT INTO TTIME2 
     VALUES (3, TIME '23:30:10-16:12',
     TIMESTAMP '1989-03-30 07:58:10-02:20');
-- PASS:7564 If insert completed successfully?

   INSERT INTO TTIME2 
     VALUES (4, TIME '12:55:05-07:35',
     TIMESTAMP '1970-06-28 20:10:15-10:07');
-- PASS:7564 If insert completed successfully?

   INSERT INTO TTIME2 
     VALUES (5, TIME '09:45:45+09:15',
     TIMESTAMP '1961-04-21 01:02:03+05:29');
-- PASS:7564 If insert completed successfully?

   SELECT PK,
                EXTRACT (TIMEZONE_HOUR FROM TT2),
                EXTRACT (TIMEZONE_MINUTE FROM TT2),
                EXTRACT (TIMEZONE_HOUR FROM TS2),
                EXTRACT (TIMEZONE_MINUTE FROM TS2)
         FROM TTIME2
         WHERE PK = 1;
-- PASS:7564 If PK = 1?
-- PASS:7564 If HOUR1 = 7?
-- PASS:7564 If MIN1 = 35?
-- PASS:7564 If HOUR2 = 7?
-- PASS:7564 If MIN2 = 35?

   INSERT INTO ET (col5)  
     SELECT EXTRACT (TIMEZONE_MINUTE FROM TS2) AS AA
     FROM TTIME2;
-- PASS:7564 If insert completed successfully?

   SELECT COUNT (DISTINCT COL5) 
     FROM CTS1.ET;
-- PASS:7564 If COUNT = 4?

   ROLLBACK WORK;

-- END TEST >>> 7564 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
