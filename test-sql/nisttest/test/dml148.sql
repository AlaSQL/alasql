-- MODULE  DML148  

-- SQL Test Suite, V6.0, Interactive SQL, dml148.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION FLATER            

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment
   ROLLBACK WORK;

-- date_time print

-- TEST:0843 Ordering of column names in joins !

-- REFERENCE:  7.5 sr 6 f
-- NOTE:0843 ordering of column names in NATURAL JOIN

   SELECT * 
     FROM HU.WORKS NATURAL LEFT JOIN HU.PROJ
     ORDER BY EMPNUM DESC, PNUM;
-- PASS:0843 If 12 rows selected?
-- PASS:0843 If ordered row and column values for first two rows are: ?
-- PASS:0843    P2  E4  20  CALM  Code    30000  Vienna ?
-- PASS:0843    P4  E4  40  SDP   Design  20000  Deale  ?


-- NOTE:0843 ordering of column names in JOIN ... USING

   SELECT * 
    FROM HU.WORKS JOIN HU.PROJ USING (PNUM)
    ORDER BY EMPNUM DESC, PNUM;
-- PASS:0843 If 12 rows selected?
-- PASS:0843 If ordered row and column values for first two rows are: ?
-- PASS:0843    P2  E4  20  CALM  Code    30000  Vienna ?
-- PASS:0843    P4  E4  40  SDP   Design  20000  Deale  ?
-- NOTE:0843 Same answer as above


-- NOTE:0843 ordering of column names in NATURAL JOIN
-- REFERENCE:  7.5 sr 5

    SELECT * 
      FROM HU.WORKS RIGHT JOIN HU.PROJ
      ON HU.WORKS.PNUM = HU.PROJ.PNUM
      ORDER BY 1 DESC, 2;
-- PASS:0843 If 12 rows selected?
-- PASS:0843 If ordered row and column values for first two rows are: ?
-- PASS:0843    E4  P2  20  P2  CALM  Code    30000  Vienna ?
-- PASS:0843    E4  P4  40  P4  SDP   Design  20000  Deale  ?

   ROLLBACK WORK;

-- END TEST >>> 0843 <<< END TEST

-- *********************************************

-- TEST:0844 Outer join predicates !

   CREATE TABLE SEVEN_TYPES (
       T_INT     INTEGER,
       T_CHAR    CHAR(10),
       T_SMALL   SMALLINT,
       T_DECIMAL DECIMAL(10,2),
       T_REAL    REAL,
       T_FLOAT   FLOAT,
       T_DOUBLE  DOUBLE PRECISION);

   COMMIT WORK;

-- setup
   DELETE FROM SEVEN_TYPES;
   INSERT INTO SEVEN_TYPES VALUES (1, 'E1',-11,   2,  3,   4,   5);
   INSERT INTO SEVEN_TYPES VALUES (2, 'E2', -5,  13, 33,-444, -55);
   INSERT INTO SEVEN_TYPES VALUES (3, 'E6', -3,-222,333,  44, 555);
   INSERT INTO SEVEN_TYPES VALUES (12,'DUP', 0,   0, -1,   1,1E+1);
   INSERT INTO SEVEN_TYPES VALUES (12,'DUP', 0,   0, -1,   1,1E+1);

-- NOTE:0844 BETWEEN predicate
   SELECT EMPNAME, CITY, T_DECIMAL
     FROM HU.STAFF LEFT OUTER JOIN SEVEN_TYPES 
        ON -GRADE / 11 BETWEEN T_REAL AND T_DECIMAL
     ORDER BY EMPNAME;
-- PASS:0844 If 6 rows selected with ordered rows and column values ?
-- PASS:0844    Alice  Deale  NULL  ?
-- PASS:0844    Betty  Vienna    0  ?
-- PASS:0844    Betty  Vienna    0  ?
-- PASS:0844    Carmen Vienna NULL  ?
-- PASS:0844    Don    Deale  NULL  ?
-- PASS:0844    Ed     Akron  NULL  ?

-- NOTE:0844 comparable CHAR types
-- NOTE:0844 IN predicate, with literals and variable value
   SELECT T_INT, T_CHAR, EMPNAME, EMPNUM, GRADE 
     FROM SEVEN_TYPES RIGHT JOIN HU.STAFF
       ON GRADE IN (10, 11, 13) AND EMPNUM = T_CHAR
   ORDER BY EMPNAME, T_INT;
-- PASS:0844 If 5 rows selected with ordered rows and column values ?
-- PASS:0844    NULL NULL Alice  E1 12  ?
-- PASS:0844       2 E2   Betty  E2 10  ?
-- PASS:0844    NULL NULL Carmen E3 13  ?
-- PASS:0844    NULL NULL Don    E4 12  ?
-- PASS:0844    NULL NULL Ed     E5 13  ?

-- NOTE:0844 subquery with outer reference and correlation names

   SELECT XX.PNUM, BUDGET, HOURS, EMPNUM
     FROM HU.PROJ XX LEFT JOIN HU.WORKS YY
       ON  XX.PNUM = YY.PNUM AND
       HOURS * BUDGET / 160000 > (SELECT GRADE FROM HU.STAFF
          WHERE YY.EMPNUM = HU.STAFF.EMPNUM)
     ORDER BY PNUM;
-- PASS:0844 If 6 rows selected with ordered rows and column values ?
-- PASS:0844    P1 10000 NULL NULL ?
-- PASS:0844    P2 30000   80 E2   ?
-- PASS:0844    P3 30000   80 E1   ?
-- PASS:0844    P4 20000 NULL NULL ?
-- PASS:0844    P5 10000 NULL NULL ?
-- PASS:0844    P6 50000 NULL NULL ?

   SELECT HU.STAFF.CITY,EMPNAME,PNAME,BUDGET
     FROM HU.STAFF LEFT JOIN HU.PROJ
       ON HU.STAFF.CITY = HU.PROJ.CITY
      AND HU.STAFF.CITY <> 'Vienna'
      AND EMPNAME <> 'Don'
     WHERE BUDGET > 15000 OR BUDGET IS NULL
   ORDER BY HU.STAFF.CITY, EMPNAME, BUDGET;
-- PASS:0844 If 6 rows selected with ordered rows and column values ?
-- PASS:0844    Akron   Ed     NULL NULL   ?
-- PASS:0844    Deale   Alice  SDP  20000  ?
-- PASS:0844    Deale   Alice  PAYR 50000  ?
-- PASS:0844    Deale   Don    NULL NULL   ?
-- PASS:0844    Vienna  Betty  NULL NULL   ?
-- PASS:0844    Vienna  Carmen NULL NULL   ?

-- NOTE:0844 difference between WHERE and ON
   SELECT HU.STAFF.CITY,EMPNAME,PNAME,BUDGET
     FROM HU.STAFF LEFT JOIN HU.PROJ
       ON HU.STAFF.CITY = HU.PROJ.CITY
      AND HU.STAFF.CITY <> 'Vienna'
     WHERE (BUDGET > 15000 OR BUDGET IS NULL)
      AND EMPNAME <> 'Don'
   ORDER BY HU.STAFF.CITY, EMPNAME, BUDGET;
-- PASS:0844 If 5 rows selected with ordered rows and column values ?
-- PASS:0844    Akron   Ed     NULL NULL   ?
-- PASS:0844    Deale   Alice  SDP  20000  ?
-- PASS:0844    Deale   Alice  PAYR 50000  ?
-- PASS:0844    Vienna  Betty  NULL NULL   ?
-- PASS:0844    Vienna  Carmen NULL NULL   ?

-- NOTE:0844 correlation name with self-JOIN
   SELECT XX.T_INT, YY.T_INT
     FROM SEVEN_TYPES XX RIGHT OUTER JOIN SEVEN_TYPES YY
       ON XX.T_INT = YY.T_INT +1
   ORDER BY YY.T_INT;
-- PASS:0844 If 5 rows selected with ordered rows and column values ?
-- PASS:0844    2      1  ?
-- PASS:0844    3      2  ?
-- PASS:0844    NULL   3  ?
-- PASS:0844    NULL  12  ?
-- PASS:0844    NULL  12  ?

-- NOTE:0844 nested booleans
-- NOTE:0844 data types are merely comparable
   SELECT GRADE, T_FLOAT, T_DOUBLE
     FROM HU.STAFF LEFT JOIN SEVEN_TYPES T7
       ON GRADE * -40 > T7.T_FLOAT
       OR (T_DOUBLE -542.5 < GRADE AND T_DOUBLE -541.5 > GRADE)
   ORDER BY GRADE;
-- PASS:0844 If 5 rows selected with ordered rows and column values ?
-- PASS:0844    10 -444 (approximately)  -55 (approximately) ?
-- PASS:0844    12 NULL                 NULL                 ?
-- PASS:0844    12 NULL                 NULL                 ?
-- PASS:0844    13   44 (approximately)  555 (approximately) ?
-- PASS:0844    13   44 (approximately)  555 (approximately) ?

ROLLBACK WORK;

DROP TABLE SEVEN_TYPES CASCADE;

COMMIT WORK;

-- END TEST >>> 0844 <<< END TEST

-- *************************************************////END-OF-MODULE
