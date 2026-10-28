-- MODULE  YTS757  

-- SQL Test Suite, V6.0, Interactive SQL, yts757.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

   CREATE TABLE dom_chk 
     (col1     atom,
      col2     smint);

   COMMIT WORK;

-- TEST:7507 INSERT value in column defined on domain!

   INSERT INTO dom_chk VALUES ('c',38);
-- PASS:7507 If 1 row inserted successfully?

   SELECT col1, col2 FROM dom_chk;
-- PASS:7507 If col1 = "c" and col2 = 38?

   INSERT INTO dom_chk VALUES ('a',1);
-- PASS:7507 If 1 row inserted successfully?

   INSERT INTO dom_chk VALUES ('m', 100);
-- PASS:7507 If 1 row inserted successfully?

   INSERT INTO dom_chk VALUES ('z', 101);
-- PASS:7507 If ERROR - integrity constraint violation?

   SELECT COUNT (*) FROM dom_chk
    WHERE col1 = 'z';
-- PASS:7507 If COUNT = 0?

   UPDATE dom_chk
     SET col1 = 'q'
     WHERE col2 = 38;
-- PASS:7507 If ERROR - integrity constraint violation?

   SELECT COUNT (*) FROM dom_chk
     WHERE col1 = 'q';
-- PASS:7507 If COUNT = 0?

   ROLLBACK WORK;

-- END TEST >>> 7507 <<< END TEST
-- *********************************************

-- TEST:7508 Put value in column defined on domaom breading constraint!

   INSERT INTO dom_chk VALUES ('<', 100);
-- PASS:7508 If ERROR - integrity constraint violation?

   INSERT INTO dom_chk VALUES ('a', 101);
-- PASS:7508 If ERROR - integrity constraint violation?

   ROLLBACK WORK;

   DROP TABLE dom_chk CASCADE;
-- PASS:7508 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7508 <<< END TEST
-- *************************************************////END-OF-MODULE
