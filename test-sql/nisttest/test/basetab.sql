-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER AUTHORIZATION ID HU ******
-- ***************************************************************
-- MODULE BASETAB

-- SQL Test Suite, V6.0, Interactive SQL, basetab.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

--   This routine initializes the contents of tables:
--        STAFF, PROJ, WORKS, STAFF3, VTABLE, and UPUNIQ
--   This routine may be run at any time to re-initialize tables.

   DELETE FROM HU.ECCO;
   INSERT INTO HU.ECCO VALUES ('NL');
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


      DELETE FROM STAFF3;
      DELETE FROM VTABLE;
      DELETE FROM UPUNIQ;

      INSERT INTO STAFF3
              SELECT * 
              FROM   STAFF;

      INSERT INTO VTABLE VALUES(10,+20,30,40,10.50);
      INSERT INTO VTABLE VALUES(0,1,2,3,4.25);
      INSERT INTO VTABLE VALUES(100,200,300,400,500.01);
      INSERT INTO VTABLE VALUES(1000,-2000,3000,NULL,4000.00);

      INSERT INTO UPUNIQ VALUES(1,'A');
      INSERT INTO UPUNIQ VALUES(2,'B');
      INSERT INTO UPUNIQ VALUES(3,'C');
      INSERT INTO UPUNIQ VALUES(4,'D');
      INSERT INTO UPUNIQ VALUES(6,'F');
      INSERT INTO UPUNIQ VALUES(8,'H');

      COMMIT WORK;

      SELECT COUNT(*) FROM STAFF3;
-- PASS:Setup if count = 5?

      SELECT COUNT(*) FROM VTABLE;
-- PASS:Setup if count = 4?

      SELECT COUNT(*) FROM UPUNIQ;
-- PASS:Setup if count = 6?
-- *************************************************////END-OF-MODULE
