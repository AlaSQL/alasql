-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER AUTHORIZATION ID SUN *****
-- ***************************************************************
-- MODULE SUNTAB3

-- SQL Test Suite, V6.0, Interactive SQL, suntab3.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SUN

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

--   This routine initializes the contents of tables:
--        EMP, DEPT, EXPERIENCE, STAFF_P, PROJ_P and ACR_SCH_P
--   This routine may be run at any time to re-initialize tables.

   DELETE FROM SUN.ECCO;
   INSERT INTO SUN.ECCO VALUES ('NL');
  DELETE FROM EXPERIENCE;
  DELETE FROM EMP;
  DELETE FROM DEPT;
  DELETE FROM STAFF_P;
  DELETE FROM PROJ_P;
  DELETE FROM ACR_SCH_P;

  INSERT INTO DEPT VALUES (12,'Computer','Charles');
  INSERT INTO DEPT VALUES (13,'Physics','Richard');
  INSERT INTO DEPT VALUES (14,'Education','Jeffersion');
  INSERT INTO DEPT VALUES (15,'English','Liss');

  INSERT INTO EMP VALUES  
         (21,'Tom','Languages & Operating System',12,'Computer',040523);
  INSERT INTO EMP VALUES  
         (22,'David','Database', 12,'Computer',101024);
  INSERT INTO EMP VALUES  
         (23,'Lilian','Software Enginerring', 12,'Computer',112156);
  INSERT INTO EMP VALUES  
         (24,'Mary','Liquid Mechanics', 13,'Physics',121245);
  INSERT INTO EMP VALUES  
         (25,'John','Fraction', 13,'Physics',030542);
  INSERT INTO EMP VALUES  
         (26,'Joseph','Child Education',14, 'Education',020556);
  INSERT INTO EMP VALUES  
         (27,'Peter','Literature', 15,'English',020434);

  INSERT INTO EXPERIENCE VALUES 
         ('Tom',040523,000046,'Teacher');
  INSERT INTO EXPERIENCE VALUES 
         ('Tom',040523,000066,'Officer');
  INSERT INTO EXPERIENCE VALUES 
         ('Tom',040523,000076,'Retire');
  INSERT INTO EXPERIENCE VALUES 
         ('David',101024,000048,'Farmer');
  INSERT INTO EXPERIENCE VALUES 
         ('David',101024,000066,'Porter');
  INSERT INTO EXPERIENCE VALUES 
         ('Lilian',112156,000072,'Baby siter');
  INSERT INTO EXPERIENCE VALUES 
         ('Lilian',112156,000082,'Nurse');
  INSERT INTO EXPERIENCE VALUES 
         ('Mary',121245,000065,'Fashion Model');
  INSERT INTO EXPERIENCE VALUES 
         ('John',030542,000064,'Actor');
  INSERT INTO EXPERIENCE VALUES 
         ('Joseph',020556,000072,'Sportsman');
  INSERT INTO EXPERIENCE VALUES 
         ('Joseph',020556,000072,'Teacher');
  INSERT INTO EXPERIENCE VALUES 
         ('Peter',020434,000071,'Photographer');
  INSERT INTO EXPERIENCE VALUES 
         ('Peter',020434,000081,'Movie Producer');

  INSERT INTO STAFF_P VALUES ('E1','Alice',12,'Deale');
  INSERT INTO STAFF_P VALUES ('E2','Betty',10,'Vienna');
  INSERT INTO STAFF_P VALUES ('E3','Carmen',13,'Vienna');
  INSERT INTO STAFF_P VALUES ('E4','Don',12,'Deale');
  INSERT INTO STAFF_P VALUES ('E5','Ed',13,'Akron');

  INSERT INTO PROJ_P VALUES ('P1','MXSS','Design',10000,'Deale');
  INSERT INTO PROJ_P VALUES ('P2','CALM','Code',30000,'Vienna');
  INSERT INTO PROJ_P VALUES ('P3','SDP','Test',30000,'Tampa');
  INSERT INTO PROJ_P VALUES ('P4','SDP','Design',20000,'Deale');
  INSERT INTO PROJ_P VALUES ('P5','IRM','Test',10000,'Vienna');
  INSERT INTO PROJ_P VALUES ('P6','PAYR','Design',50000,'Deale');

  INSERT INTO ACR_SCH_P VALUES(1,'AAA');

  SELECT COUNT(*) FROM DEPT;
-- PASS:Setup if count = 4?
  SELECT COUNT(*) FROM EMP;
-- PASS:Setup if count = 7?
  SELECT COUNT(*) FROM EXPERIENCE;
-- PASS:Setup if count = 13?
  SELECT COUNT(*) FROM STAFF_P;
-- PASS:Setup if count = 5?
  SELECT COUNT(*) FROM PROJ_P;
-- PASS:Setup if count = 6?
  SELECT COUNT(*) FROM ACR_SCH_P;
-- PASS:Setup if count = 1?

-- COMMIT
  COMMIT WORK;
-- *************************************************////END-OF-MODULE
