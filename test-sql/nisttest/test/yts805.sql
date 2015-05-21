-- MODULE  YTS805  

-- SQL Test Suite, V6.0, Interactive SQL, yts805.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7562 Schema with crossed referential constraints between tables!

   CREATE SCHEMA ZZZ AUTHORIZATION CTS1
     CREATE TABLE AAA
       (A1     CHAR(3),
        A2     INTEGER,
        A3     DECIMAL(4),
        A4     NUMERIC(5),
        A5     SMALLINT,
        PRIMARY KEY (A1, A2),
        FOREIGN KEY (A3, A4) REFERENCES BBB(B1, B2),
        FOREIGN KEY (A5) REFERENCES CCC(C3))
     CREATE TABLE BBB
       (B1     DECIMAL(4),
        B2     NUMERIC(5),
        A1     CHAR(3),
        A2     INTEGER,
        PRIMARY KEY (B1, B2),
        FOREIGN KEY (A1, A2) REFERENCES AAA(A1, A2),
        UNIQUE (A1, A2))
     CREATE TABLE CCC
       (B1     DECIMAL(4),
        B2     NUMERIC(5),
        C3     SMALLINT,
        PRIMARY KEY (C3),
        FOREIGN KEY (B1,B2) REFERENCES BBB(B1, B2));
-- PASS:7562 If schema created successfully?

   COMMIT WORK;

   SELECT COUNT (*)
     FROM INFORMATION_SCHEMA.SCHEMATA
     WHERE SCHEMA_NAME = 'ZZZ';
-- PASS:7562 If COUNT = 1?

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
     WHERE TABLE_SCHEMA = 'ZZZ' AND
     TABLE_NAME = 'AAA' AND
     CONSTRAINT_TYPE = 'FOREIGN KEY';
-- PASS:7562 If COUNT = 2?

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
     WHERE TABLE_SCHEMA = 'ZZZ' AND
     TABLE_NAME = 'BBB' AND
     CONSTRAINT_TYPE = 'FOREIGN KEY';
-- PASS:7562 If COUNT = 1?

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
     WHERE TABLE_SCHEMA = 'ZZZ' AND
     TABLE_NAME = 'BBB' AND
     CONSTRAINT_TYPE = 'UNIQUE';
-- PASS:7562 If COUNT = 1?

   SELECT COUNT (*) 
     FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
     WHERE TABLE_SCHEMA = 'ZZZ' AND
     TABLE_NAME = 'CCC' AND
     CONSTRAINT_TYPE = 'FOREIGN KEY';
-- PASS:7562 If COUNT = 1?

   INSERT INTO ZZZ.AAA values ('sue',23,45,67,89);
-- PASS:7562 If ERROR - integrity constraint violation?

   INSERT INTO ZZZ.BBB  VALUES (53,778,'mat',1);
-- PASS:7562 If ERROR - integrity constraint violation?

   INSERT INTO ZZZ.CCC VALUES (456,231,5);
-- PASS:7562 If ERROR - integrity constraint violation?

   INSERT INTO ZZZ.AAA VALUES ('sue',25, NULL, NULL, NULL);
-- PASS:7562 If 1 row inserted successfully?

   INSERT INTO ZZZ.BBB VALUES (345,8441,'sue',25);
-- PASS:7562 If 1 row inserted successfully?

   INSERT INTO ZZZ.CCC VALUES (345, 8441, 1);
-- PASS:7562 If 1 row inserted successfully?

   INSERT INTO ZZZ.AAA VALUES ('ben',22,345,8441,1);
-- PASS:7562 If 1 row inserted successfully?

   ROLLBACK WORK;

   DROP SCHEMA ZZZ CASCADE;
-- PASS:7562 If schema dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7562 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
