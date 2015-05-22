-- X/OPEN Extensions SQL Test Suite, V6.0, Schema Definition, xschema1.nc
-- 59-byte ID
-- TEd Version #
-- date_time print
-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER SCHEMA ID XOPEN1 ******
-- ***************************************************************


-- This file defines the base tables used in most of the tests. It
-- is used for X/Open Testing only.

-- This non-standard schema definition is provided so that
-- implementations which require semicolons to terminate statements,
-- but which are otherwise conforming, can still execute the 
-- remaining tests.

-- Users may delete the CREATE SCHEMA statement or add further
-- statements, as necessary, to permit creation of the schema
-- without prejudice to the implementation's X/Open conformance status

  CREATE SCHEMA AUTHORIZATION XOPEN1;



  CREATE TABLE XOPEN1.ECCO (C1 CHAR(6));

  CREATE TABLE AAA (A1 CHAR(2), A2 CHAR(2), A3 CHAR(2));

  CREATE TABLE BBB (B1 CHAR(2), B2 CHAR(2), B3 CHAR(2) NOT NULL);
  CREATE UNIQUE INDEX BBB_NDX ON BBB(B3);

  CREATE TABLE CCC (C1 CHAR(2), C2 CHAR(2), C3 CHAR(2));

  CREATE TABLE CHAR_TEST (COL1 CHAR(254));
  CREATE TABLE INT_TEST (COL1 INTEGER);
  CREATE TABLE SMALL_TEST (COL1 SMALLINT);
  CREATE TABLE REAL_TEST (REF CHAR(1),COL1 REAL);
  CREATE TABLE REAL3_TEST (COL1 REAL,COL2 REAL,COL3 REAL);
  CREATE TABLE DOUB_TEST (REF CHAR(1),COL1 DOUBLE PRECISION);
  CREATE TABLE DOUB3_TEST (COL1 DOUBLE PRECISION,COL2 DOUBLE
     PRECISION,COL3 DOUBLE PRECISION);

-- Users may provide an explicit precision for FLOAT_TEST.COL1

  CREATE TABLE FLOAT_TEST (REF CHAR(1),COL1 FLOAT);

  CREATE TABLE INDEXLIMIT(COL1 CHAR(2), COL2 CHAR(2),
     COL3 CHAR(2), COL4 CHAR(2), COL5 CHAR(2),
     COL6 CHAR(2), COL7 CHAR(2));

  CREATE TABLE WIDETABLE (WIDE CHAR(118));
  CREATE TABLE WIDETAB (WIDE1 CHAR(38), WIDE2 CHAR(38), WIDE3 CHAR(38));

  CREATE TABLE TEST_TRUNC (TEST_STRING CHAR (6));

  CREATE TABLE WARNING(TESTCHAR CHAR(6), TESTINT INTEGER);

  CREATE TABLE TV (dec3 DECIMAL(3), dec1514 DECIMAL(15,14),
                   dec150 DECIMAL(15,0), dec1515 DECIMAL(15,15));

  CREATE TABLE TU (smint SMALLINT, dec1514 DECIMAL(15,14),
                   integr INTEGER, dec1515 DECIMAL(15,15));

  CREATE TABLE STAFF
   (EMPNUM   CHAR(3) NOT NULL,
    EMPNAME  CHAR(20),
    GRADE    DECIMAL(4),
    CITY     CHAR(15));

  CREATE UNIQUE INDEX STAFF_NDX ON STAFF(EMPNUM);


  CREATE TABLE PROJ
   (PNUM     CHAR(3) NOT NULL,
    PNAME    CHAR(20),
    PTYPE    CHAR(6),
    BUDGET   DECIMAL(9),
    CITY     CHAR(15));

  CREATE UNIQUE INDEX PROJ_NDX ON PROJ(PNUM);


  CREATE TABLE WORKS
   (EMPNUM   CHAR(3) NOT NULL,
    PNUM     CHAR(3) NOT NULL,
    HOURS    DECIMAL(5));

  CREATE UNIQUE INDEX WORKS_NDX ON WORKS(EMPNUM,PNUM);


  CREATE TABLE INTS
  (INT1      SMALLINT NOT NULL,
   INT2      SMALLINT NOT NULL);

-- ************* create view statements follow *************


CREATE VIEW TESTREPORT AS
    SELECT TESTNO, RESULT, TESTTYPE
    FROM HU.TESTREPORT;


-- ************* grant statements follow *************
   GRANT SELECT ON XOPEN1.ECCO TO PUBLIC;

   GRANT INSERT ON TESTREPORT TO PUBLIC;

   GRANT ALL PRIVILEGES ON STAFF
           TO PUBLIC;

   GRANT SELECT ON WORKS
           TO PUBLIC;

   GRANT SELECT ON PROJ
           TO PUBLIC;

   GRANT ALL PRIVILEGES ON XOPEN1.AAA TO XOPEN2;
   GRANT SELECT, UPDATE ON XOPEN1.AAA TO XOPEN2 WITH GRANT OPTION;
   GRANT INSERT, DELETE ON XOPEN1.BBB TO XOPEN2 WITH GRANT OPTION;
   GRANT SELECT ON XOPEN1.BBB TO XOPEN2 WITH GRANT OPTION;
   GRANT SELECT, INSERT ON XOPEN1.CCC TO XOPEN2;


-- ************* End of Schema *************
