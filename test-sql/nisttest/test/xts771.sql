-- MODULE   XTS771

-- SQL Test Suite, V6.0, Interactive SQL, xts771.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS3              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7071 CHARACTER SET ASCII_GRAPHIC in <data type>!

   CREATE TABLE TAB771
     (COLNUM1 NUMERIC(5)  PRIMARY KEY,
      COLSTR1 CHAR(10)    CHARACTER SET ASCII_GRAPHIC,
      COLSTR2 CHAR(12) CHARACTER SET ASCII_GRAPHIC);
-- PASS:7071 If table created successfully?

   COMMIT WORK;

   INSERT INTO TAB771
         VALUES(22,_ASCII_GRAPHIC'!$[\]^`{}~',_ASCII_GRAPHIC'OK');
-- PASS:7071 If 1 row inserted?

   INSERT INTO TAB771
         VALUES(20,_ASCII_GRAPHIC'`$NIK',_ASCII_GRAPHIC'MAY BE');
-- PASS:7071 If 1 row inserted?

   INSERT INTO TAB771
         VALUES(21,_ASCII_GRAPHIC'~!KOS{}',_ASCII_GRAPHIC'{ERROR}');
-- PASS:7071 If 1 row inserted?

   SELECT COUNT(*) FROM TAB771
           WHERE COLSTR1 = _ASCII_GRAPHIC '!$[\]^`{}~';
-- PASS:7071 If COUNT = 1?

   SELECT COLNUM1,COLSTR1,COLSTR2 FROM TAB771
         ORDER BY COLNUM1;
-- PASS:7071 If 3 row are selected in the following order?
--                 COLNUM1    COLSTR1       COLSTR2
--                 =======    =======       =======
-- PASS:7071 If    20         `$NIK         MAY BE  ? 
-- PASS:7071 If    21         ~!KOS{}       {ERROR} ?
-- PASS:7071 If    22         !$[\]^`{}~    OK      ?

   ROLLBACK WORK;

   DROP TABLE TAB771 CASCADE;
-- PASS:7071 If TABLE dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7071 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
