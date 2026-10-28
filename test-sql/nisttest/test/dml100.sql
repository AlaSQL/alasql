-- MODULE  DML100  

-- SQL Test Suite, V6.0, Interactive SQL, dml100.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0587 SET TR READ ONLY / READ WRITE (static)!

   ROLLBACK WORK;

   SET TRANSACTION READ ONLY;

   CREATE TABLE SLACK (SLACK_FACTOR FLOAT);
-- PASS:0587 If ERROR, invalid transaction state, table not created?

   ROLLBACK WORK;

   CREATE TABLE SLACK (SLACK_FACTOR FLOAT);
-- PASS:0587 If table is created?

   COMMIT WORK;

   SET TRANSACTION READ ONLY;

   INSERT INTO SLACK VALUES (2.4);
-- PASS:0587 If ERROR, invalid transaction state, 0 rows inserted?

   COMMIT WORK;

   INSERT INTO SLACK VALUES (2.4);
-- PASS:0587 If 1 row is inserted?

   INSERT INTO SLACK VALUES (2.0);
-- PASS:0587 If 1 row is inserted?

   SET TRANSACTION READ ONLY;
-- PASS:0587 If ERROR, invalid transaction state?

   COMMIT WORK;

-- NOTE:0587 Subtest five is not applicable.

   SET TRANSACTION READ ONLY;

   UPDATE SLACK
  SET SLACK_FACTOR = 5.0
  WHERE SLACK_FACTOR < 5.0;
-- PASS:0587 If ERROR, invalid transaction state, 0 rows updated?

   SET TRANSACTION READ WRITE;
-- PASS:0587 If ERROR, invalid transaction state?

   UPDATE SLACK
  SET SLACK_FACTOR = 5.0
  WHERE SLACK_FACTOR < 5.0;
-- PASS:0587 If ERROR, invalid transaction state, 0 rows updated?

   ROLLBACK WORK;

   SET TRANSACTION READ ONLY;

   DELETE FROM SLACK
  WHERE SLACK_FACTOR < 5.0;
-- PASS:0587 If ERROR, invalid transaction state, 0 rows deleted?

   COMMIT WORK;

   SET TRANSACTION READ WRITE;

   INSERT INTO SLACK VALUES (2.4);
-- PASS:0587 If 1 row is inserted?

   INSERT INTO SLACK VALUES (2.0);
-- PASS:0587 If 1 row is inserted?

   SET TRANSACTION READ ONLY;
-- PASS:0587 If ERROR, invalid transaction state?

   COMMIT WORK;

   SELECT COUNT(*) FROM HU.ECCO;
-- PASS:0587 If count = 1?

   SET TRANSACTION READ ONLY;
-- PASS:0587 If ERROR, invalid transaction state?

   ROLLBACK WORK;

   DELETE FROM SLACK;
-- PASS:0587 If 4 rows are deleted?

   COMMIT WORK;

   SET TRANSACTION READ WRITE;

   DROP TABLE SLACK CASCADE;
-- PASS:0587 If table is dropped?

   COMMIT WORK;

-- END TEST >>> 0587 <<< END TEST
-- *************************************************////END-OF-MODULE
