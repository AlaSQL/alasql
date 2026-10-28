-- MODULE CDR029  

-- SQL Test Suite, V6.0, Interactive SQL, cdr029.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION SCHANZLE

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0522 No implied natural join on FROM T1, T2!

-- setup
   DELETE FROM CPBASE;
   DELETE FROM CPREF;
   INSERT INTO CPBASE VALUES (0, 'Zero');
   INSERT INTO CPBASE VALUES (1, 'One');
   INSERT INTO CPREF VALUES (0, 'Zero 2');
   INSERT INTO CPREF VALUES (1, 'One 2');

   SELECT COUNT(*)
         FROM CPBASE, CPREF;
-- PASS:0522 If count = 4?

   SELECT KC, JUNK2
         FROM CPBASE, CPREF
         ORDER BY JUNK2, KC;
-- PASS:0522 If 4 rows selected?

-- restore
   ROLLBACK WORK;

-- END TEST >>> 0522 <<< END TEST
-- *********************************************

-- TEST:0537 Table check constraint: column vs. column!

-- setup
   DELETE FROM RET_CATALOG;
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 0, NULL, 100.00, NULL, 'D1', NULL);
   COMMIT WORK;

   SELECT COUNT(*)
         FROM RET_CATALOG;
-- PASS:0537 If count = 1?

-- restore
   DELETE FROM RET_CATALOG;
   COMMIT WORK;

-- setup
   INSERT INTO RET_CATALOG
         VALUES (0, 0, 80.00, 100.00, 20.00, 'D1', 'Jan 20 1993');     
   COMMIT WORK;
   INSERT INTO RET_CATALOG
         VALUES (0, 1, 80.00, 100.00, 20.00, NULL, 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG
         VALUES (0, 2, 80.00, 100.00, 20.00, 'D1', NULL);
   COMMIT WORK;
   INSERT INTO RET_CATALOG
         VALUES (0, 3, 80.00, 100.00, 20.00, NULL, NULL);
   COMMIT WORK;
   INSERT INTO RET_CATALOG
         VALUES (0, 4, 80.00, 100.00, 20.00, 'F1', 'Jan 20 1993');
   COMMIT WORK;

   SELECT COUNT(*)
         FROM RET_CATALOG;
-- PASS:0537 If count = 4?

   SELECT COUNT(*)
         FROM RET_CATALOG
         WHERE PRODUCT_ID = 0;
-- PASS:0537 If count = 0?

-- restore
   DELETE FROM RET_CATALOG;
   COMMIT WORK;

-- setup
   INSERT INTO RET_CATALOG 
         VALUES (0, 0, 80.00, 100.00, 20.00, 'F2', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG
         VALUES (0, 1, 80.00, 100.00, 20.00, NULL, 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 2, NULL, 100.00, NULL, 'F2', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG
         VALUES (0, 3, NULL, 100.00, NULL, NULL, 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 4, 10010.00, 10110.00, 100.00, 'F2', 'Jan 20 1993');
   COMMIT WORK;

   SELECT COUNT(*) 
         FROM RET_CATALOG;
-- PASS:0537 If count = 4?

   SELECT COUNT(*)
         FROM RET_CATALOG
         WHERE PRODUCT_ID = 0;
-- PASS:0537 If count = 0?

-- restore
   DELETE FROM RET_CATALOG;
   COMMIT WORK;

-- setup
   INSERT INTO RET_CATALOG 
         VALUES (0, 0, 100.01, 100.00, -0.01, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 1, 80.00, NULL, NULL, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 2, NULL, 100.00, NULL, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 3, NULL, NULL, NULL, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 4, 10010.00, 10110.00, 100.00, 'F3', 'Jan 20 1993');
   COMMIT WORK;

   SELECT COUNT(*)
         FROM RET_CATALOG;
-- PASS:0537 If count = 4?

   SELECT COUNT(*) 
         FROM RET_CATALOG
         WHERE PRODUCT_ID = 0;
-- PASS:0537 If count = 0?

-- restore
   DELETE FROM RET_CATALOG;
   COMMIT WORK;

-- setup
   INSERT INTO RET_CATALOG 
         VALUES (0, 0, 100.01, 100.00, 0.00, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 1, NULL, 100.00, 20.00, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 2, 80.00, NULL, 20.00, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 3, 80.00, 100.00, NULL, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 4, NULL, NULL, 20.00, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 5, 80.00, NULL, NULL, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 6, NULL, 100.00, NULL, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 7, NULL, NULL, NULL, 'F3', 'Jan 20 1993');
   COMMIT WORK;
   INSERT INTO RET_CATALOG 
         VALUES (0, 8, 80.00, 100.00, 20.00, 'F3', 'Jan 20 1993');
   COMMIT WORK;

   SELECT COUNT(*)
         FROM RET_CATALOG;
-- PASS:0537 If count = 8?

   SELECT COUNT(*)
         FROM RET_CATALOG
         WHERE PRODUCT_ID = 0;
-- PASS:0537 If count = 0?

-- restore
   DELETE FROM RET_CATALOG;
   COMMIT WORK;

-- END TEST >>> 0537 <<< END TEST
-- *********************************************

-- TEST:0538 With check option: column vs. column!

-- setup
   DELETE FROM RET_CATALOG;
   COMMIT WORK;

   INSERT INTO SALE_ITEMS
         VALUES (0, 0, NULL, 100.00, NULL, 'D1', NULL);
-- PASS:0538 If ERROR, check option violation, 0 rows inserted?
-- PASS:0538 OR SQLSTATE = 44000 OR SQLCODE < 0?

   SELECT COUNT(*)
         FROM RET_CATALOG;
-- PASS:0538 If count = 0?

   INSERT INTO SALE_ITEMS 
         VALUES (0, 0, 80.00, 100.00, 20.00, 'D1', NULL);
-- PASS:0538 If ERROR, check option violation, 0 rows inserted?
-- PASS:0538 OR SQLSTATE = 44000 OR SQLCODE < 0?

   SELECT COUNT(*)
         FROM RET_CATALOG;
-- PASS:0538 If count = 0?

   INSERT INTO SALE_ITEMS 
         VALUES (0, 0, 99.00, 100.00, 1.00, 'D1', NULL);
-- PASS:0538 If 1 row inserted?

   SELECT COUNT(*)
         FROM RET_CATALOG;
-- PASS:0538 If count = 1?

-- restore
   DELETE FROM RET_CATALOG;
   COMMIT WORK;

-- END TEST >>> 0538 <<< END TEST
-- *************************************************////END-OF-MODULE
