-- MODULE  YTS762  

-- SQL Test Suite, V6.0, Interactive SQL, yts762.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

   ROLLBACK WORK;

-- TEST:7517 <query expression> with EXCEPT!

   INSERT INTO CTS1.STAFF1 VALUES
   ('E7','Grace',10,'Paris');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E7','Grace',10,'Paris');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E7','Grace',10,'Paris');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF4 VALUES
   ('E7','Grace',10,'Paris');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF4 VALUES
   ('E7','Grace',10,'Paris');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF4 VALUES
   ('E7','Grace',10,'Paris');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E8','Henry',20,'Prague');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E8','Henry',20,'Prague');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E8','Henry',20,'Prague');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF4 VALUES
   ('E8','Henry',20,'Prague');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF4 VALUES
   ('E8','Henry',20,'Prague');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E9','Imogen',10,'Prague');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E9','Imogen',10,'Prague');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E10','John',20,'Brussels');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E10','John',20,'Brussels');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E11','Keith',10,'Vienna');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF4 VALUES
   ('E11','Keith',10,'Vienna');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF4 VALUES
   ('E11','Keith',10,'Vienna');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF1 VALUES
   ('E12','Laura',20,'Deale');
-- PASS:7517 If 1 row inserted successfully?

   INSERT INTO CTS1.STAFF4 VALUES
   ('E13','Mike',30,'Vienna');
-- PASS:7517 If 1 row inserted successfully?

   SELECT * FROM CTS1.STAFF1
   EXCEPT SELECT * FROM CTS1.STAFF4;
-- PASS:7517 If 3 rows are selected in any order?
-- PASS:7517 If   E9   Imogen   10   Prague?
-- PASS:7517 If   E10  John     20   Brussels?
-- PASS:7517 If   E12  Laura    20   Deale?

   SELECT * FROM CTS1.STAFF1
   EXCEPT SELECT * FROM CTS1.STAFF4;
-- PASS:7517 If ERROR - no data?

   INSERT INTO CTS1.ET (col1, col2, col3, col4)
   SELECT * FROM CTS1.STAFF1 EXCEPT ALL
   SELECT * FROM CTS1.STAFF4;
-- PASS:7517 If insert completed successfully?

   SELECT COUNT (DISTINCT COL1) FROM CTS1.ET;
-- PASS:7517 If COUNT = 4?

   SELECT COUNT (*) FROM CTS1.ET;
-- PASS:7517 If COUNT = 6?

   DELETE FROM CTS1.ET;

   INSERT INTO CTS1.ET (col1, col2, col3, col4)
   SELECT DISTINCT * FROM CTS1.STAFF1 EXCEPT ALL
   SELECT * FROM CTS1.STAFF4;
-- PASS:7517 If insert completed successfully?

   SELECT COUNT (*) FROM CTS1.ET;
-- PASS:7517 If COUNT = 3?

   DELETE FROM CTS1.ET;

   INSERT INTO CTS1.ET (col1, col2, col3, col4)
   SELECT * FROM CTS1.STAFF1 EXCEPT ALL
   SELECT DISTINCT * FROM CTS1.STAFF4;
-- PASS:7517 If insert completed successfully?

   SELECT COUNT (*) FROM CTS1.ET;
-- PASS:7517 If COUNT = 9?

   ROLLBACK WORK;

-- END TEST >>> 7517 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
