-- X/OPEN Extensions SQL Test Suite, V6.0, Schema Definition, xschema2.sql
-- 59-byte ID
-- TEd Version #
-- date_time print
-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER SCHEMA ID XOPEN2 ******
-- ***************************************************************


-- This schema definition must be run after xschema1.smi, this 
-- schema file is for X/Open testing only.

-- Users may delete the CREATE SCHEMA statement or add further
-- statements, as necessary, to permit creation of the schema
-- without prejudice to the implementation's X/Open conformance status

   CREATE SCHEMA AUTHORIZATION XOPEN2;

-- ************* create view statements follow *************

   CREATE VIEW XOPEN2V AS SELECT B1, B2, B3 FROM XOPEN1.BBB;

-- ************* grant statements *************

    GRANT SELECT ON XOPEN2.XOPEN2V TO XOPEN1;

-- ************* End of Schema *************
