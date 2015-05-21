-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER AUTHORIZATION ID SUN *****
-- ***************************************************************
-- MODULE SUNTAB0

-- SQL Test Suite, V6.0, Interactive SQL, suntab0.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

--   This routine initializes the contents of tables:
--        STAFF, PROJ, and WORKS
--   This routine may be run at any time to re-initialize tables.

      DELETE FROM STAFF;
      DELETE FROM PROJ;
      DELETE FROM WORKS;

      INSERT INTO STAFF VALUES ('E1','Alice',12,'Deale');
      INSERT INTO STAFF VALUES ('E2','Betty',10,'Vienna');
      INSERT INTO STAFF VALUES ('E3','Carmen',13,'Vienna');
      INSERT INTO STAFF VALUES ('E4','Don',12,'Deale');
      INSERT INTO STAFF VALUES ('E5','Ed',13,'Akron');

      INSERT INTO PROJ VALUES  ('P1','MXSS','Design',10000,'Deale');
      INSERT INTO PROJ VALUES  ('P2','CALM','Code',30000,'Vienna');
      INSERT INTO PROJ VALUES  ('P3','SDP','Test',30000,'Tampa');
      INSERT INTO PROJ VALUES  ('P4','SDP','Design',20000,'Deale');
      INSERT INTO PROJ VALUES  ('P5','IRM','Test',10000,'Vienna');
      INSERT INTO PROJ VALUES  ('P6','PAYR','Design',50000,'Deale');

      INSERT INTO WORKS VALUES  ('E1','P1',40);
      INSERT INTO WORKS VALUES  ('E1','P2',20);
      INSERT INTO WORKS VALUES  ('E1','P3',80);
      INSERT INTO WORKS VALUES  ('E1','P4',20);
      INSERT INTO WORKS VALUES  ('E1','P5',12);
      INSERT INTO WORKS VALUES  ('E1','P6',12);
      INSERT INTO WORKS VALUES  ('E2','P1',40);
      INSERT INTO WORKS VALUES  ('E2','P2',80);
      INSERT INTO WORKS VALUES  ('E3','P2',20);
      INSERT INTO WORKS VALUES  ('E4','P2',20);
      INSERT INTO WORKS VALUES  ('E4','P4',40);
      INSERT INTO WORKS VALUES  ('E4','P5',80);

      COMMIT WORK;

      SELECT COUNT(*) FROM PROJ;
-- PASS:Setup if count = 6?

      SELECT COUNT(*) FROM STAFF;
-- PASS:Setup if count = 5?

      SELECT COUNT(*) FROM WORKS;
-- PASS:Setup if count = 12?


      COMMIT WORK;

-- *************************************************////END-OF-MODULE
