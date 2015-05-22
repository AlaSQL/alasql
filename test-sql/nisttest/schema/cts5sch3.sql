-- SQL Test Suite, V6.0, Schema Definition, cts5sch3.sql
-- 59-byte ID
-- TEd Version #
-- date_time print
-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER SCHEMA ID CTS1 ******
-- ***************************************************************

-- This file defines the base tables needed for some INFORMATION_SCHEMA tests.

-- The creation of this schema is supported only at INTERMEDIATE level
CREATE SCHEMA CTS1b;

-- Because this is executed under CTS1, all the identifiers must be fully
-- qualified to prevent them from ending up in schema CTS1.


CREATE TABLE CTS1B.STAFF7 (EMPNUM    CHAR(3) NOT NULL,
  EMPNAME  CHAR(20),
  GRADE DECIMAL(4),
  CITY   CHAR(15),
  PRIMARY KEY (EMPNUM),
  CHECK (GRADE BETWEEN 1 AND 20));

CREATE TABLE CTS1B.PROJ_DURATION 
( MONTHS  INTEGER,  
  TIME_LEFT   INTEGER,   
  EMP_HOURS   INTEGER,
  CHECK (MONTHS > 0)); 

-- ************* create domain statements ***********    
 
CREATE DOMAIN CTS1B.esal AS INTEGER  
CHECK  (VALUE>500); 

CREATE DOMAIN CTS1B.domchar AS CHARACTER;

CREATE DOMAIN CTS1B.domsmall AS SMALLINT
CHECK (VALUE IN (1, 3 ,5, 7));

-- ************* End of Schema *************
