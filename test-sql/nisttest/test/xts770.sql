-- MODULE   XTS770

-- SQL Test Suite, V6.0, Interactive SQL, xts770.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS3              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7070 <Char set spec> of SQL_CHARACTER in <identifier>!

   CREATE TABLE TAB770
         (COLNUM1 NUMERIC(5),
          COLSTR1 CHAR(10) CHARACTER SET SQL_CHARACTER);
-- PASS:7070 If table created successfully?

   COMMIT WORK;

   INSERT INTO TAB770 VALUES(10, _SQL_CHARACTER 'BARBIE');
-- PASS:7070 If 1 row inserted?

   INSERT INTO TAB770 VALUES(30, _SQL_CHARACTER 'KILLER');
-- PASS:7070 If 1 row inserted?

   INSERT INTO TAB770 VALUES(20, _SQL_CHARACTER '205 GTi');
-- PASS:7070 If 1 row inserted?

   SELECT COLNUM1,COLSTR1
         FROM TAB770
         ORDER BY COLNUM1;
-- PASS:7070 If 3 rows are selected in the following order?
--                 COLUMN1      COLSTR1
--                =========    =========
-- PASS:7070 If   10           BARBIE    ?
-- PASS:7070 If   20           205 GTi   ?
-- PASS:7070 If   30           KILLER    ?

   ROLLBACK WORK;

   DROP TABLE TAB770 CASCADE;
-- PASS:7070 If table dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7070 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
