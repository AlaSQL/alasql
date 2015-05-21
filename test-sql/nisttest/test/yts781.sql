-- MODULE  YTS781  

-- SQL Test Suite, V6.0, Interactive SQL, yts781.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

   ROLLBACK WORK;

-- TEST:7536 Set local time zone - valid value!

   SET TIME ZONE INTERVAL '00:00' HOUR TO MINUTE;
-- PASS:7536 If SET completed successfully?

   DELETE FROM TTIME_BASE;
-- PASS:7536 If delete completed successfully?

   INSERT INTO TTIME VALUES
     (1, TIME '12:00:00', TIMESTAMP '1995-04-10 12:00:00');
-- PASS:7536 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (2, TIME '00:15:22', TIMESTAMP '1995-04-10 01:45:33');
-- PASS:7536 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (3, TIME '23:28:54', TIMESTAMP '1995-04-10 22:54:12');
-- PASS:7536 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (4, TIME '06:31:01', TIMESTAMP '1995-04-10 11:59:59');
-- PASS:7536 If 1 row inserted successfully?

   INSERT INTO TTIME VALUES
     (5, TIME '18:49:34', TIMESTAMP '1995-04-10 19:30:02');
-- PASS:7536 If 1 row inserted successfully?

   SET TIME ZONE LOCAL;
-- PASS:7536 If SET completed successfully?

-- NOTE:NOTE: Determine Time Zone Displacement (TZD) in hours
--            and minutes from the following two SELECTs!!
   SELECT EXTRACT (TIMEZONE_HOUR FROM CURRENT_TIME)
     FROM CTS1.ECCO;
-- PASS:7536 If 1 row selected successfully?

   SELECT EXTRACT (TIMEZONE_MINUTE FROM CURRENT_TIME)
     FROM CTS1.ECCO;
-- PASS:7536 If 1 row selected successfully? 
-- NOTE:NOTE:  Remember the INTERVAL HOUR TO MINUTE value as TZD!!
-- NOTE:NOTE:  For most localities, the MINUTE value will be zero!

   SELECT PK,
       EXTRACT (YEAR FROM TS),
       EXTRACT (MONTH FROM TS),
       EXTRACT (DAY FROM TS),
       EXTRACT (HOUR FROM TS),
       EXTRACT (MINUTE FROM TS),
       EXTRACT (HOUR FROM TT),
       EXTRACT (MINUTE FROM TT)
   FROM TTIME
   ORDER BY PK;
-- PASS:7536 If 5 rows selected in the following order?
-- NOTE:NOTE:  The correct answer is the original values adjusted 
--             for TZD value.
-- NOTE:NOTE:  TZD "adjusted" may change the day, minutes and hour!
--                           TS (timestamp)       TT (time)
--                           ==============       =========
--                pk  yr  mon  day  hr  min       hr   min 
--                ==  ==  ===  ===  ==  ===       ==   ===    
-- PASS:7536 If   1  1995  4   (10  12   0)+TZD  (12    0)+TZD  ?
-- PASS:7536 If   2  1995  4   (10   1  45)+TZD  ( 0   15)+TZD  ?
-- PASS:7536 If   3  1995  4   (10  22  54)+TZD  (23   28)+TZD  ?
-- PASS:7536 If   4  1995  4   (10  11  59)+TZD  ( 6   31)+TZD  ?
-- PASS:7536 If   5  1995  4   (10  19  30)+TZD  (18   49)+TZD  ?



   SET TIME ZONE INTERVAL '05:41' HOUR TO MINUTE;
-- PASS:7536 If SET completed successfully?

   SELECT PK,
       EXTRACT (YEAR FROM TS),
       EXTRACT (MONTH FROM TS),
       EXTRACT (DAY FROM TS),
       EXTRACT (HOUR FROM TS),
       EXTRACT (MINUTE FROM TS),
       EXTRACT (HOUR FROM TT),
       EXTRACT (MINUTE FROM TT)
   FROM TTIME
   ORDER BY PK;
-- PASS:7536 If 5 rows selected in the following order?
--                                TS (timestamp)    TT (time)
--                                ==============    =========
--                pk    yr    mon  day   hr  min    hr   min 
--                ==    ==    ===  ===   ==  ===    ==   ===    
-- PASS:7536 If   1    1995    4    10   17   41    17   41   ?
-- PASS:7536 If   2    1995    4    10    7   26     5   56   ?
-- PASS:7536 If   3    1995    4    11    4   35     5    9   ?
-- PASS:7536 If   4    1995    4    10   17   40    12   12   ?
-- PASS:7536 If   5    1995    4    11    1   11     0   30   ?

   SET TIME ZONE INTERVAL '-12:58' HOUR TO MINUTE;
-- PASS:7536 If SET completed successfully?

   SELECT COUNT (*) FROM TTIME
     WHERE TT BETWEEN
     CAST (TIME '05:00:00' AS TIME WITH TIME ZONE) AND
     CAST (TIME '11:00:00' AS TIME WITH TIME ZONE);
-- PASS:7536 If COUNT = 2?

   SET TIME ZONE INTERVAL '12:27' HOUR TO MINUTE;
-- PASS:7536 If SET completed successfully?

   SELECT COUNT (*) FROM TTIME
     WHERE TT BETWEEN
     CAST (TIME '05:00:00' AS TIME WITH TIME ZONE) AND
     CAST (TIME '11:00:00' AS TIME WITH TIME ZONE);
-- PASS:7536 If COUNT = 1?

   ROLLBACK WORK;

-- END TEST >>> 7536 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
