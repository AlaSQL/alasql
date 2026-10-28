-- MODULE  DML133  

-- SQL Test Suite, V6.0, Interactive SQL, dml133.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0643 Feature 17, Multiple schemas per user!

   INSERT INTO SHIRLEY_HURWITZ.MEETINGS VALUES (
  10, 'RDA');
-- PASS:0643 If 1 row is inserted?

   INSERT INTO LEN_GALLAGHER.TRAVEL VALUES (
  'NXMONOTECU', 'RDA', '123456789');
-- PASS:0643 If 1 row is inserted?

   SELECT TIMESLOT
  FROM SHIRLEY_HURWITZ.MEETINGS, LEN_GALLAGHER.TRAVEL
  WHERE AGENDA = DESTINATION;
-- PASS:0643 If 1 row selected and TIMESLOT = 10?

   ROLLBACK WORK;

-- END TEST >>> 0643 <<< END TEST

-- *************************************************////END-OF-MODULE
