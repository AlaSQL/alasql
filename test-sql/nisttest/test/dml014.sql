-- MODULE DML014

-- SQL Test Suite, V6.0, Interactive SQL, dml014.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0045 BETWEEN predicate!
     SELECT PNUM
          FROM PROJ
          WHERE BUDGET BETWEEN 40000 AND 60000;
-- PASS:0045 If PNUM = 'P6'?
 
     SELECT PNUM
          FROM PROJ
          WHERE BUDGET >= 40000 AND BUDGET <= 60000;
-- PASS:0045 If PNUM = 'P6'?

-- END TEST >>> 0045 <<< END TEST
-- ***********************************************************

-- TEST:0046 NOT BETWEEN predicate   !
     SELECT CITY
          FROM STAFF
          WHERE GRADE NOT BETWEEN 12 AND 13;
-- PASS:0046 If CITY = 'Vienna'?

      SELECT CITY
           FROM STAFF
           WHERE NOT(GRADE BETWEEN 12 AND 13);
-- PASS:0046 If CITY = 'Vienna'?

-- END TEST >>> 0046 <<< END TEST
-- *************************************************************

-- TEST:0047 IN predicate!
     SELECT STAFF.EMPNAME
          FROM STAFF
          WHERE STAFF.EMPNUM IN
                  (SELECT WORKS.EMPNUM
                        FROM WORKS
                        WHERE WORKS.PNUM IN
                              (SELECT PROJ.PNUM
                                    FROM PROJ
                                    WHERE PROJ.CITY='Tampa'));
-- PASS:0047 If EMPNAME = 'Alice'?

     SELECT STAFF.EMPNAME
          FROM STAFF
          WHERE STAFF.EMPNUM = ANY
                 (SELECT WORKS.EMPNUM
                       FROM WORKS
                       WHERE WORKS.PNUM IN
                            (SELECT PROJ.PNUM
                                  FROM PROJ
                                  WHERE PROJ.CITY='Tampa'));
-- PASS:0047 If EMPNAME = 'Alice'?

-- END TEST >>> 0047 <<< END TEST
-- ***********************************************************

-- TEST:0048 NOT IN predicate!
     SELECT WORKS.HOURS
          FROM WORKS
          WHERE WORKS.PNUM NOT IN 
                  (SELECT PROJ.PNUM
                        FROM PROJ
                        WHERE PROJ.BUDGET BETWEEN 5000 AND 40000);
-- PASS:0048 If HOURS = 12?

     SELECT WORKS.HOURS
          FROM WORKS
          WHERE NOT (WORKS.PNUM IN 
                 (SELECT PROJ.PNUM
                       FROM PROJ
                       WHERE PROJ.BUDGET BETWEEN 5000 AND 40000));
-- PASS:0048 If HOURS = 12?

-- END TEST >>> 0048 <<< END TEST
-- ****************************************************************

-- TEST:0049 IN predicate value list!
     SELECT HOURS
          FROM WORKS
          WHERE PNUM NOT IN 
                 (SELECT PNUM
                       FROM WORKS
                       WHERE PNUM IN ('P1','P2','P4','P5','P6'));
-- PASS:0049 If HOURS = 80?

     SELECT HOURS
          FROM WORKS
          WHERE NOT (PNUM IN 
                 (SELECT PNUM
                       FROM WORKS
                       WHERE PNUM IN ('P1','P2','P4','P5','P6')));
-- PASS:0049 If HOURS = 80?

-- END TEST >>> 0049 <<< END TEST
-- **************************************************************

-- TEST:0050 LIKE predicate -- %!
     SELECT EMPNAME
          FROM STAFF
          WHERE EMPNAME LIKE 'Al%';
-- PASS:0050 If EMPNAME = 'Alice'?

-- END TEST >>> 0050 <<< END TEST
-- **************************************************************

-- TEST:0051 LIKE predicate -- underscore!
     SELECT CITY
          FROM STAFF
          WHERE EMPNAME LIKE 'B__t%';
-- PASS:0051 If CITY = 'Vienna'?

-- END TEST >>> 0051 <<< END TEST
-- *************************************************************

-- TEST:0052 LIKE predicate -- ESCAPE character!

-- setup
     INSERT INTO STAFF
            VALUES('E36','Huyan',36,'Xi_an%');
-- PASS:0052 If 1 row is inserted?

     SELECT CITY
          FROM STAFF
          WHERE CITY LIKE 'XiS___S%%'
          ESCAPE 'S';
-- PASS:0052 If CITY = 'Xi_an%' ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0052 <<< END TEST
-- **************************************************************

-- TEST:0053 NOT LIKE predicate!

-- setup
     INSERT INTO STAFF
            VALUES('E36','Huyan',36,'Xi_an%');
-- PASS:0053 If 1 row is inserted?

     SELECT COUNT(*)
          FROM STAFF
          WHERE EMPNUM  NOT LIKE '_36';
-- PASS:0053 If count = 5?

     SELECT COUNT(*)
          FROM STAFF
          WHERE NOT(EMPNUM  LIKE '_36');
-- PASS:0053 If count = 5?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0053 <<< END TEST
-- ***************************************************************

-- TEST:0054 IS NULL predicate!

-- setup
     INSERT INTO STAFF
            VALUES('E36','Huyan',36,NULL);
-- PASS:0054 If 1 row is inserted?

     SELECT EMPNAME
          FROM STAFF
          WHERE CITY IS NULL;
-- PASS:0054 If EMPNAME = 'Huyan'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0054 <<< END TEST
-- ************************************************************

-- TEST:0055 NOT NULL predicate!

-- setup
     INSERT INTO STAFF
            VALUES('E36','Huyan',36,NULL);
-- PASS:0055 If 1 row is inserted?

     SELECT COUNT(*)
          FROM STAFF;
-- PASS:0055 If count = 6?

     SELECT COUNT(*)
          FROM STAFF
          WHERE CITY IS NOT NULL;
-- PASS:0055 If count = 5?

     SELECT COUNT(*)
          FROM STAFF
          WHERE NOT (CITY IS NULL);
-- PASS:0055 If count = 5?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0055 <<< END TEST
-- ***************************************************************

-- TEST:0056 NOT EXISTS predicate!
     SELECT STAFF.EMPNAME
          FROM STAFF
          WHERE NOT EXISTS
                 (SELECT *
                       FROM PROJ
                       WHERE NOT EXISTS
                             (SELECT *
                                   FROM WORKS
                                   WHERE STAFF.EMPNUM = WORKS.EMPNUM
                                   AND WORKS.PNUM=PROJ.PNUM));
-- PASS:0056 If EMPNAME = 'Alice'?

-- END TEST >>> 0056 <<< END TEST
-- ************************************************************

-- TEST:0057 ALL quantifier !
     SELECT CITY
          FROM PROJ
          WHERE BUDGET > ALL
                 (SELECT BUDGET
                       FROM PROJ
                       WHERE CITY='Vienna');
-- PASS:0057 If CITY = 'Deale'?

-- END TEST >>> 0057 <<< END TEST
-- **************************************************************

-- TEST:0058 SOME quantifier!
     SELECT EMPNAME
          FROM STAFF
          WHERE GRADE < SOME
                 (SELECT BUDGET/1000 - 39 
                       FROM PROJ
                       WHERE CITY='Deale');
-- PASS:0058 If EMPNAME = 'Betty'?

-- END TEST >>> 0058 <<< END TEST
-- *************************************************************

-- TEST:0059 ANY quantifier !
     SELECT EMPNAME
          FROM STAFF
          WHERE GRADE < ANY
                 (SELECT BUDGET/1000 - 39 
                       FROM PROJ
                       WHERE CITY = 'Deale');
-- PASS:0059 If EMPNAME = 'Betty'?

-- END TEST >>> 0059 <<< END TEST

-- *************************************************////END-OF-MODULE
