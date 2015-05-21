-- MODULE  YTS777  

-- SQL Test Suite, V6.0, Interactive SQL, yts777.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS2              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7511 DROP SCHEMA - non-empty schema!

   CREATE SCHEMA SC777;
-- PASS:7511 If schema created successfully?

   COMMIT WORK;

   CREATE TABLE SC777.STAFF
     (EMPNUM   CHAR(3) NOT NULL UNIQUE,
     EMPNAME  CHAR(20),
     GRADE    DECIMAL(4),
     CITY     CHAR(15));
-- PASS:7511 If table created successfully?

   COMMIT WORK;

   CREATE TABLE SC777.PROJ
     (PNUM     CHAR(3) NOT NULL UNIQUE,
     PNAME    CHAR(20),
     PTYPE    CHAR(6),
     BUDGET   DECIMAL(9),
     CITY     CHAR(15));
-- PASS:7511 If table created successfully?

   COMMIT WORK;

   CREATE TABLE SC777.WORKS
     (EMPNUM   CHAR(3) NOT NULL,
      PNUM     CHAR(3) NOT NULL,
      HOURS    DECIMAL(5),
      UNIQUE(EMPNUM,PNUM));
-- PASS:7511 If table created successfully?

   COMMIT WORK;

   CREATE VIEW SC777.EMP (NUM1, EMPNAME, GRADE, CITY,
     NUM2, PNUM, HOURS) AS
        SELECT * FROM SC777.STAFF, SC777.WORKS
        WHERE SC777.STAFF.EMPNUM = SC777.WORKS.EMPNUM;
-- PASS:7511 If view created successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA
     WHERE SCHEMA_NAME = 'SC777';
-- PASS:7511 If COUNT = 1?

   INSERT INTO SC777.STAFF VALUES ('E1','Adrian',10,'London');
-- PASS:7511 If 1 row inserted successfully?

   INSERT INTO SC777.STAFF VALUES ('E2','Brian',15,'Manchester');
-- PASS:7511 If 1 row inserted successfully?

   INSERT INTO SC777.PROJ
     VALUES ('P23','Marketing','Local',20000,'London');
-- PASS:7511 If 1 row inserted successfully?

   INSERT INTO SC777.PROJ
     VALUES ('P2','Sales','Local',10000,'Bristol');
-- PASS:7511 If 1 row inserted successfully?

   INSERT INTO SC777.WORKS VALUES ('E1','P2',60);
-- PASS:7511 If 1 row inserted successfully?

   INSERT INTO SC777.WORKS VALUES ('E33','P4',20);
-- PASS:7511 If 1 row inserted successfully?

   COMMIT WORK;

   DROP SCHEMA SC777 RESTRICT;
-- PASS:7511 If ERROR - syntax error or access rule violation?

   COMMIT WORK;

   DROP SCHEMA SC777 CASCADE;
-- PASS:7511 If schema dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7511 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
