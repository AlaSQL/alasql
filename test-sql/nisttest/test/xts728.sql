-- MODULE   XTS728

-- SQL Test Suite, V6.0, Interactive SQL, xts728.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7028 Flagging, Full SQL, <null predicate> with two-col row!

   DELETE FROM CTS1.TABLE728b;
-- PASS:7028 If DELETE completed successfully?

   INSERT INTO CTS1.TABLE728b
         SELECT * FROM CTS1.TABLE728a
         WHERE (C1,C2) IS NOT NULL;
-- PASS:7028 If INSERT completed successfully?

   SELECT COL_1,COL_2 
         FROM CTS1.TABLE728b
         WHERE COL_1 = 'NICKOS' AND COL_2 = 'GEORGE';
-- PASS:7028 If COL_1 = NICKOS  and COL_2 = GEORGE?

   SELECT COL_1,COL_2 
         FROM CTS1.TABLE728b
         WHERE COL_1 = 'HARRY' AND COL_2 = 'TANIA';
-- PASS:7028 If COL_1 = HARRY and COL_2 = TANIA?

   ROLLBACK WORK;

-- END TEST >>> 7028 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
