-- MODULE  YTS782  

-- SQL Test Suite, V6.0, Interactive SQL, yts782.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7561 Set local time zone - invalid value, exception!

   DELETE FROM TTIME_BASE;
-- PASS:7561 If delete completed successfully?

   INSERT  INTO TTIME (PK, TT)
     VALUES (1, TIME '00:00:00');
-- PASS:7561 If 1 row inserted successfully?

   INSERT  INTO TTIME (PK, TT)
     VALUES (2, TIME '10:50:00');
-- PASS:7561 If 1 row inserted successfully?

   INSERT  INTO TTIME (PK, TT)
     VALUES (3, TIME '20:11:00');
-- PASS:7561 If 1 row inserted successfully?

   INSERT  INTO TTIME (PK, TT)
     VALUES (4, TIME '01:45:00');
-- PASS:7561 If 1 row inserted successfully?

   INSERT INTO TTIME (PK)
     VALUES (5);
-- PASS:7561 If 1 row inserted successfully?

   SET TIME ZONE INTERVAL '13:01' HOUR TO MINUTE;
-- PASS:7561 If ERROR - data exception; invalid time zone disp value?

   SELECT COUNT(*) 
     FROM TTIME
     WHERE PK = 1
     AND TT = TIME '00:00:00';
-- PASS:7561 If COUNT = 1?

   SET TIME ZONE INTERVAL -'13:00' HOUR TO MINUTE;
-- PASS:7561 If ERROR - data exception; invalid time zone disp value?

   SELECT COUNT(*) 
     FROM TTIME
     WHERE PK = 1
     AND TT = TIME '00:00:00';
-- PASS:7561 If COUNT = 1?

   SET TIME ZONE CAST ((SELECT A.TT - B.TT 
     FROM TTIME A, TTIME B
     WHERE A.PK = 3 AND B.PK = 5) AS INTERVAL HOUR TO MINUTE);
-- PASS:7561 If ERROR - data exception; invalid time zone disp value?

   SELECT COUNT(*) 
     FROM TTIME
     WHERE PK = 1
     AND TT = TIME '00:00:00';
-- PASS:7561 If COUNT = 1?

   ROLLBACK WORK;

-- END TEST >>> 7561 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
