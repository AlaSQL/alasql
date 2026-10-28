-- SQL Test Suite, V6.0, Schema Definition, cts5sch1.sql
-- 59-byte ID
-- TEd Version #
-- date_time print
-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER SCHEMA ID CTS2 ******
-- ***************************************************************

-- This file defines the base tables needed for some INFORMATION_SCHEMA tests.

-- The following command is supported only at Intermediate Level
   CREATE SCHEMA CTS2;

-- The following command should be used if ENTRY level rather than 
-- intermediate is supported
-- CREATE SCHEMA AUTHORIZATION CTS2;

CREATE TABLE PROJ_MAN
(P_REF   CHAR(3) NOT NULL UNIQUE,
 BUDGET  DECIMAL(20),
 SCOPE   CHAR(20),
 MGR     CHAR(15) UNIQUE);

-- DOMAIN STATEMENTS

CREATE DOMAIN numdom AS INTEGER;

-- GRANT PERMISSIONS

  GRANT REFERENCES ON PROJ_MAN TO CTS1;

  GRANT USAGE ON numdom TO CTS1;

-- ************* End of Schema *************
