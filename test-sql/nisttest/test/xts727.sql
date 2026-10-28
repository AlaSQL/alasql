-- MODULE   XTS727

-- SQL Test Suite, V6.0, Interactive SQL, xts727.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7027 Flagging - Full SQL - <explicit table> in <qry expprssn>!

   INSERT INTO TEST6840C
         TABLE CL_STANDARD;
-- PASS:7027 If 5 rows inserted successfully?

   SELECT COUNT(*) FROM TEST6840C;
-- PASS:7027 If COUNT = 5?

   SELECT NUM_C1,CH_C1,NUM_C2,CH_C2
         FROM TEST6840C
         WHERE NUM_C1 = 1000;
-- PASS:7027 If 1000, NICKOS, 4000, ATHENS?

   SELECT NUM_C1,CH_C1,NUM_C2,CH_C2
         FROM TEST6840C
         WHERE NUM_C1 = 1001;
-- PASS:7027 If values = 1001, MARIA, 4001, RHODES?

   SELECT NUM_C1,CH_C1,NUM_C2,CH_C2
         FROM TEST6840C
         WHERE NUM_C1 = 1002;
-- PASS:7027 If values = 1002, MAKIS, 4002, HANIA?

   SELECT NUM_C1,CH_C1,NUM_C2,CH_C2
         FROM TEST6840C
         WHERE NUM_C1 = 1003;
-- PASS:7027 If values = 1003, GEORGE, 4003, ARTA?

   SELECT NUM_C1,CH_C1,NUM_C2,CH_C2
         FROM TEST6840C
         WHERE NUM_C1 = 1004;
-- PASS:7027 If values = 1004, MORRIS, 4004, PARGA?

   ROLLBACK WORK;

-- END TEST >>> 7027 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
