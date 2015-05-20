-- MODULE   XTS733

-- SQL Test Suite, V6.0, Interactive SQL, xts733.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION CTS1              

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:7033 FULL OUTER JOIN <table ref> ON <search condition>!

   DELETE FROM TEST6840A;
-- PASS:7033 If delete completed successfully?

   DELETE FROM TEST6840B;
-- PASS:7033 If delete completed successfully?

   DELETE FROM TEST6840C;
-- PASS:7033 If delete completed successfully?

   INSERT INTO TEST6840A VALUES (1,'A');
-- PASS:7033 If 1 row inserted successfully?

   INSERT INTO TEST6840A VALUES (2,'B');
-- PASS:7033 If 1 row inserted successfully?

   INSERT INTO TEST6840B VALUES (2,'C');
-- PASS:7033 If 1 row inserted successfully?

   INSERT INTO TEST6840B VALUES (3,'A');
-- PASS:7033 If 1 row inserted successfully?

   SELECT * FROM TEST6840A FULL OUTER JOIN TEST6840B
         ON NUM_A = NUM_B ORDER BY NUM_A;
-- NOTE:  The sorting of NULfs above or below non-NULLs is 
--        implementation-defined!
-- PASS:7033 If 3 rows selected in one of the following orders?
--                 c1   c2   c3    c4           c1   c2   c3    c4
--                 ===  ===  ===   ===          ===  ===  ===   === 
-- PASS:7033 If    1    A   NULL  NULL?   or   NULL  NULL  3     A  ?
-- PASS:7033 If    2    B    2     C  ?   or    1     A   NULL  NULL?
-- PASS:7033 If   NULL NULL  3     A  ?   or    2     B    2     C  ?

   SELECT * FROM TEST6840A FULL JOIN TEST6840B
         ON CH_A = CH_B ORDER BY NUM_A;
-- PASS:7033 If 3 rows selected in one of the following orders?
--                 c1   c2    c3   c4          c1    c2    c3    c4
--                 ===  ===  ===  ===         ===   ===   ===   ===
-- PASS:7033 If    1    A    3     A  ?   or   NULL  NULL   2     C  ?
-- PASS:7033 If    2    B   NULL  NULL?   or    1     A     3     A  ?
-- PASS:7033 If   NULL NULL  2     C  ?   or    2     B    NULL  NULL?

   INSERT INTO TEST6840C
         TEST6840A FULL OUTER JOIN TEST6840B ON NUM_A = 2;
-- PASS:7033 If 3 rows inserted successfully?

   SELECT  COUNT(*) FROM TEST6840C;
-- PASS:7033 If COUNT = 3?

   SELECT  COUNT(*) FROM TEST6840C
         WHERE NUM_C1 = 1 AND CH_C1 = 'A' AND 
         NUM_C2 IS NULL AND CH_C2 IS NULL;
-- PASS:7033 If COUNT = 1?

   SELECT  COUNT(*) FROM TEST6840C
         WHERE NUM_C1 = 2 AND CH_C1 = 'B' AND 
         NUM_C2 = 2 AND CH_C2 = 'C';
-- PASS:7033 If COUNT = 1?

   SELECT  COUNT(*) FROM TEST6840C
         WHERE NUM_C1 = 2 AND CH_C1 = 'B' AND 
         NUM_C2 = 3  AND CH_C2 = 'A';
-- PASS:7033 If COUNT = 1?

   SELECT * FROM
   (TEST6840B FULL JOIN TEST6840A AS CN1 ON TEST6840B.CH_B = CN1.CH_A)
     FULL JOIN TEST6840A AS CN2 ON TEST6840B.NUM_B = CN2.NUM_A
       ORDER BY TEST6840B.NUM_B, CN1.NUM_A;
-- PASS:7033 If 4 rows selected in one of the following orders?
-- PASS:7033 If nulls last?
--                ====   ====   ====    ====  ====  ====                
-- PASS:7033 If     2      C     NULL   NULL   2     B  ?
-- PASS:7033 If     3      A      1      A    NULL  NULL?
-- PASS:7033 If    NULL   NULL    2      B    NULL  NULL?
-- PASS:7033 If    NULL   NULL   NULL   NULL   1     A  ?
--
-- PASS:7033 If nulls first?
--                ====    ====   ====   ====   ====    ====
-- PASS:7033 If   NULL    NULL   NULL   NULL    1       A  ?
-- PASS:7033 If   NULL    NULL    2      B     NULL    NULL?
-- PASS:7033 If    2       C     NULL   NULL    2       B  ?
-- PASS:7033 If    3       A      1      A     NULL    NULL?

   SELECT * FROM
         (TEST6840A AS CN3 FULL OUTER JOIN TEST6840A AS CN4
          ON CN3.NUM_A = CN4.NUM_A)
         FULL OUTER JOIN
         (TEST6840B AS CN5 FULL OUTER JOIN TEST6840B AS CN6 
          ON CN5.CH_B = CN6.CH_B)
         ON CN3.NUM_A = CN5.NUM_B
         ORDER BY CN3.NUM_A;
-- PASS:7033 If 3 rows selected in one of the following orders?

-- PASS:7033 If nulls last?
--              ====   ====   ====   ====   ====   ====   ====   ====
-- PASS:7033 If  1      A      1      A     NULL   NULL   NULL   NULL?
-- PASS:7033 If  2      B      2      B      2      C      2      C  ?
-- PASS:7033 If NULL   NULL   NULL   NULL    3      A      3      A  ?

-- PASS:7033 If nulls first?
--              ====   ====   ====   ====   ====   ====   ====   ====
-- PASS:7033 If NULL   NULL   NULL   NULL    3      A      3      A  ?
-- PASS:7033 If  1      A      1      A     NULL   NULL   NULL   NULL?
-- PASS:7033 If  2      B      2      B      2      C      2      C  ?

   ROLLBACK WORK;

-- END TEST >>> 7033 <<< END TEST
-- *********************************************
-- *************************************************////END-OF-MODULE
