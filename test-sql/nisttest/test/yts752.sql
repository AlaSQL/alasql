-- MODULE  YTS752  

-- SQL Test Suite, V6.0, Interactive SQL, yts752.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print


-- TEST:7502 CREATE DOMAIN - SQL proc statement with default!

   CREATE DOMAIN sintdom AS SMALLINT
      CHECK (VALUE > 5)
      CHECK (VALUE < 24000);
-- PASS:7502 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE shorttab
      (keycol integer,
       domcol sintdom);
-- PASS:7502 If table created successfully?

   COMMIT WORK;

   INSERT INTO shorttab VALUES (1,6);
-- PASS:7502 If 1 row inserted successfully?

   INSERT INTO shorttab VALUES (2,3);
-- PASS:7502 If ERROR - integrity constraint violation?

   INSERT INTO shorttab VALUES (3, 123456789);
-- PASS:7502 If ERROR -integrity const. violation or   ?
-- PASS:7502           numeric value out of range      ?

   INSERT INTO shorttab VALUES (4,100);
-- PASS:7502 If 1 row inserted successfully?

   COMMIT WORK;

   SELECT COUNT(*) FROM shorttab;
-- PASS:7502 If COUNT = 2?

   SELECT domcol FROM shorttab
       WHERE keycol = 1;
-- PASS:7502 If domcol = 6?

   SELECT domcol FROM shorttab
       WHERE keycol = 4;
-- PASS:7502 If domcol = 100?

   ROLLBACK WORK;

   DROP TABLE shorttab CASCADE;
-- PASS:7502 If table dropped successfully?

   COMMIT WORK;

   DROP DOMAIN sintdom CASCADE;
-- PASS:7502 If domain dropped successfully?

   COMMIT WORK;

-- END TEST >>> 7502 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
