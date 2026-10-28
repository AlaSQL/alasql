-- MODULE   XTS724

-- SQL Test Suite, V6.0, Interactive SQL, xts724.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS4              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7024 Access to COLUMN_DOMAIN_USAGE view!

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.COLUMN_DOMAIN_USAGE
         WHERE DOMAIN_SCHEMA = 'CTS4';
-- PASS:7024 If COUNT = 0?

   COMMIT WORK;

   CREATE DOMAIN TESTDOM AS NUMERIC(5)
         CONSTRAINT CONSD724 CHECK (VALUE > 500);
-- PASS:7024 If domain created successfully?

   COMMIT WORK;

   CREATE TABLE TAB724a 
        (COLNUM1 TESTDOM,
         COLNUM2 TESTDOM,
         COLNUM3 TESTDOM,
         COLNUM4 TESTDOM);
-- PASS:7024 If table created successfully?

   COMMIT WORK;

   SELECT DOMAIN_SCHEMA,COLUMN_NAME, TABLE_NAME
         FROM INFORMATION_SCHEMA.COLUMN_DOMAIN_USAGE
         WHERE DOMAIN_NAME = 'TESTDOM'
         ORDER BY COLUMN_NAME;
-- PASS:7024 If 4 rows are selected in following order?
--                 c1      c2        c3
--                 ==      ==        ==
-- PASS:7024 If   CTS4   COLNUM1   TAB724A?
-- PASS:7024 If   CTS4   COLNUM2   TAB724A?
-- PASS:7024 If   CTS4   COLNUM3   TAB724A?
-- PASS:7024 If   CTS4   COLNUM4   TAB724A?

   COMMIT WORK;

   DROP DOMAIN TESTDOM CASCADE;
-- PASS:7024 If domain dropped successfully?

   COMMIT WORK;

   DROP TABLE TAB724a CASCADE;
-- PASS:7024 If table dropped successfully?

   COMMIT WORK;

   SELECT COUNT(*) 
         FROM INFORMATION_SCHEMA.COLUMN_DOMAIN_USAGE
         WHERE DOMAIN_SCHEMA = 'CTS4';
-- PASS:7024 If COUNT = 0?

   ROLLBACK WORK;

-- END TEST >>> 7024 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
