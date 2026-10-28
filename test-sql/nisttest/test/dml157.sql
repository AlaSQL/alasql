-- MODULE  DML157  

-- SQL Test Suite, V6.0, Interactive SQL, dml157.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0856 Transitional Schema Definition!

  SELECT STATION_ID, DCP, STATION_NAME, DEG_LATITUDE,
       DEG_LONGITUDE, EXTRACT (HOUR FROM MERIDIAN), FEET_MLLW,
       KNOTS_PERM_CURRENT FROM HYDROGRAPHY.STATIONS
       ORDER BY STATION_ID, DCP;
-- PASS:0856 If 6 rows are returned in the following order?

-- PASS:0856 If column1 - column8 are the following for the FIRST row?
-- PASS:0856 If c1 = 670001?
-- PASS:0856 If c2 = 0?
-- PASS:0856 If c3 = 'NAHA HARBOR, OKINAWA'?
-- PASS:0856 If c4 = '26 12.5N'?
-- PASS:0856 If c5 = '127 40.1E'?
-- PASS:0856 If c6 = 9?
-- PASS:0856 If c7 = 1.18 (+ or - 0.001)? 
-- PASS:0856 If c8 = NULL?

-- PASS:0856 If column1 - column8 are the following for the SECOND row?
-- PASS:0856 If c1 = 1495000?
-- PASS:0856 If c2 = 1?
-- PASS:0856 If c3 = 'ESPERANZA, ANTARCTICA'?
-- PASS:0856 If c4 = '63 23.7S'?
-- PASS:0856 If c5 = '56 59.7W'?
-- PASS:0856 If c6 = NULL?
-- PASS:0856 If c7 = NULL?
-- PASS:0856 If c8 = NULL?

-- PASS:0856 If column1 - column8 are the following for the THIRD row?
-- PASS:0856 If c1 = 1495000?
-- PASS:0856 If c2 = 2?
-- PASS:0856 If c3 = 'ESPERANZA, ANTARCTICA'?
-- PASS:0856 If C4 = '63 23.7S'?
-- PASS:0856 If C5 = '56 59.7W'?
-- PASS:0856 If C6 = NULL?
-- PASS:0856 If C7 = NULL?
-- PASS:0856 If C8 = NULL?

-- PASS:0856 If column1 - column8 are the following for the FOURTH row?
-- PASS:0856 If c1 = 9414290?
-- PASS:0856 If c2 = 0?
-- PASS:0856 If c3 = 'SAN FRANCISCO, SAN FRANCISCO BAY'?
-- PASS:0856 If c4 = '37 48.4N'?
-- PASS:0856 If c5 = '122 27.9W'?
-- PASS:0856 If c6 = -8?
-- PASS:0856 If c7 = 3.13 (+ or - 0.001)?
-- PASS:0856 If c8 =  -0.2 (+ or - 0.001)?

-- PASS:0856 If column1 - column8 are the following for the FIFTH row?
-- PASS:0856 If c1 = 9452210?
-- PASS:0856 If c2 = 0?
-- PASS:0856 If c3 = 'JUNEAU, GASTINEAU CHANNEL, STEPHENS'?
-- PASS:0856 If c4 = '58 17.9N'?
-- PASS:0856 If c5 = '134 24.7W'?
-- PASS:0856 If c6 = -9?
-- PASS:0856 If c7 = 5.62 (+ or - 0.001)?
-- PASS:0856 If c8 = NULL?

-- PASS:0856 If column1 - column8 are the following for the SIXTH row?
-- PASS:0856 If c1 = 9962420?
-- PASS:0856 If c2 = 1?
-- PASS:0856 If c3 = 'EASTER ISLAND, HANGA PIKO HARBOR'?
-- PASS:0856 If c4 = '27 9.0S'?
-- PASS:0856 If c5 = '109 26.9W'?
-- PASS:0856 If c6 = -7?
-- PASS:0856 If c7 = 1.5 (+ or - 0.001)?
-- PASS:0856 If c8 = NULL?

   SELECT STATION_ID, DCP, STATION_NAME, DEG_LATITUDE,
       DEG_LONGITUDE, EXTRACT (HOUR FROM MERIDIAN), FEET_MLLW,
       KNOTS_PERM_CURRENT FROM HYDROGRAPHY.STATIONS_D
       ORDER BY STATION_ID, DCP;

-- PASS:0856 If 6 rows are returned in the following order?

-- PASS:0856 If column1 - column8 are the following for the FIRST row?
-- PASS:0856 If c1 = 670001?
-- PASS:0856 If c2 = 0?
-- PASS:0856 If c3 = 'NAHA HARBOR, OKINAWA'?
-- PASS:0856 If c4 = 26.208 (+ or - 0.001)?
-- PASS:0856 If c5 = 127.668 (+ or - 0.001)?
-- PASS:0856 If c6 = 9?

-- PASS:0856 If column1 - column8 are the following for the SECOND row?
-- PASS:0856 If c1 = 1495000?
-- PASS:0856 If c2 = 1?
-- PASS:0856 If c3 = 'ESPERANZA, ANTARCTICA'?
-- PASS:0856 If c4 = -63.395 (+ or - 0.001)?
-- PASS:0856 If c5 = -56.995 (+ or - 0.001)?
-- PASS:0856 If c6 = NULL?

-- PASS:0856 If column1 - column8 are the following for the THIRD row?
-- PASS:0856 If c1 = 1495000?
-- PASS:0856 If c2 = 2?
-- PASS:0856 If c3 = 'ESPERANZA, ANTARCTICA'?
-- PASS:0856 If C4 = -63.395 (+ or - 0.001)?
-- PASS:0856 If C5 = -56.995 (+ or - 0.001)?
-- PASS:0856 If C6 = NULL?

-- PASS:0856 If column1 - column8 are the following for the FOURTH row?
-- PASS:0856 If c1 = 9414290?
-- PASS:0856 If c2 = 0?
-- PASS:0856 If c3 = 'SAN FRANCISCO, SAN FRANCISCO BAY'?
-- PASS:0856 If c4 = 37.807 (+ or - 0.001)?
-- PASS:0856 If c5 = -122.465 (+ or - 0.001)?
-- PASS:0856 If c6 = -8?

-- PASS:0856 If column1 - column8 are the following for the FIFTH row?
-- PASS:0856 If c1 = 9452210?
-- PASS:0856 If c2 = 0?
-- PASS:0856 If c3 = 'JUNEAU, GASTINEAU CHANNEL, STEPHENS'?
-- PASS:0856 If c4 = 58.298 (+ or - 0.001)?
-- PASS:0856 If c5 = -134.412 (+ or - 0.001)?
-- PASS:0856 If c6 = -9?

-- PASS:0856 If column1 - column8 are the following for the SIXTH row?
-- PASS:0856 If c1 = 9962420?
-- PASS:0856 If c2 = 1?
-- PASS:0856 If c3 = 'EASTER ISLAND, HANGA PIKO HARBOR'?
-- PASS:0856 If c4 = -27.15 (+ or - 0.001)?
-- PASS:0856 If c5 = -109.448 (+ or - 0.001)?
-- PASS:0856 If c6 = -7?

   COMMIT WORK;

-- END TEST >>> 0856 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
