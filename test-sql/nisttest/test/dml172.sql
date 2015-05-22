-- MODULE  DML172  

-- SQL Test Suite, V6.0, Interactive SQL, dml172.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0884 ASCII_FULL and SQL_TEXT in column definition!

   CREATE TABLE T0884 (
     C1 CHAR (4) CHARACTER SET ASCII_FULL,
     C2 CHAR (4) CHARACTER SET SQL_TEXT);
-- PASS:0884 If table created successfully?

   COMMIT WORK;

   INSERT INTO T0884 VALUES (_ASCII_FULL '^#|~',
     _SQL_TEXT 'This');
-- PASS:0884 If 1 row inserted successfully?

   SELECT COUNT(*) 
     FROM T0884
     WHERE C1 = _ASCII_FULL '^#|~'
     AND C2 = _SQL_TEXT 'This';
-- PASS:0884 If COUNT = 1?

   COMMIT WORK;

   DROP TABLE T0884 CASCADE;
-- PASS:0884 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 0884 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
