-- MODULE DML070

-- SQL Test Suite, V6.0, Interactive SQL, dml070.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU 

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0409 Effective outer join -- with 2 cursors!

-- setup
     INSERT INTO STAFF
           VALUES('E6','Lendle',17,'Potomac');

     SELECT PNUM, WORKS.EMPNUM, EMPNAME, HOURS
           FROM WORKS, STAFF
           WHERE STAFF.EMPNUM = WORKS.EMPNUM
                ORDER BY 2;

-- PASS:0409 If twelve rows are selected with ROW #9 as follows?
-- PASS:0409 PNUM   WORKS.EMPNUM   EMPNAME    HOURS?
-- PASS:0409  P2         E3         Carmen     20?

     SELECT 'ZZ', EMPNUM, EMPNAME, -99
           FROM STAFF
           WHERE NOT EXISTS (SELECT * FROM WORKS
                WHERE WORKS.EMPNUM = STAFF.EMPNUM)
                ORDER BY EMPNUM;

-- PASS:0409 If 2 rows are selected in the following order?
-- PASS:0409 'ZZ'     STAFF.EMPNUM     EMPNAME     HOURS?
-- PASS:0409  ZZ          E5              Ed        -99?
-- PASS:0409  ZZ          E6            Lendle      -99?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0409 <<< END TEST
-- *****************************************************

-- TEST:0411 Effective set difference!

     SELECT W1.EMPNUM FROM WORKS W1
           WHERE W1.PNUM = 'P2'
                AND NOT EXISTS (SELECT * FROM WORKS W2
                WHERE W2.EMPNUM = W1.EMPNUM
                      AND W2.PNUM = 'P1')
                      ORDER BY 1 ASC;

-- PASS:0411 If 2 rows are selected?
-- PASS:0411 If FOR ROW #1, W1.EMPNUM = 'E3'?
-- PASS:0411 If FOR ROW #2, W1.EMPNUM = 'E4'?

-- END TEST >>> 0411 <<< END TEST
-- *************************************************************

-- TEST:0412 Effective set intersection!

     SELECT W1.EMPNUM FROM WORKS W1
           WHERE W1.PNUM = 'P2'
                AND EXISTS (SELECT * FROM WORKS W2
                WHERE W1.EMPNUM = W2.EMPNUM
                      AND W2.PNUM = 'P1')
                      ORDER BY EMPNUM ASC;

-- PASS:0412 If 2 rows are selected?
-- PASS:0412 If FOR ROW #1, W1.EMPNUM = 'E1'?
-- PASS:0412 If FOR ROW #2, W1.EMPNUM = 'E2'?

-- END TEST >>> 0412 <<< END TEST
-- *************************************************////END-OF-MODULE


