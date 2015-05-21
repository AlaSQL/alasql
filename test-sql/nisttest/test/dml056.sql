-- MODULE DML056

-- SQL Test Suite, V6.0, Interactive SQL, dml056.sql
-- 59-byte ID
-- TEd Version #

-- AUTHORIZATION HU

   SELECT USER FROM HU.ECCO;
-- RERUN if USER value does not match preceding AUTHORIZATION comment

-- date_time print

-- TEST:0246 FIPS sizing - 100 values in INSERT!
-- FIPS sizing TEST

     DELETE FROM T100;
-- Making sure the table is empty

-- setup
     INSERT INTO T100 
            VALUES('ZA','ZB','CA','ZC','ZD','AA','ZE','ZF','BA','ZG',
                   'YA','YB','CB','YC','YD','AB','YE','YF','BB','YG',
                   'XA','XB','CC','XC','XD','AC','XE','XF','BC','XG',
                   'UA','UB','CD','UC','UD','AD','UE','UF','BD','UG',
                   'VA','VB','CE','VC','VD','AE','VE','VF','BE','VG',
                   'WA','WB','CF','WC','WD','AF','WE','WF','BF','WG',
                   'LA','LB','CG','LC','LD','AG','LE','LF','BG','LG',
                   'MA','MB','CH','MC','MD','AH','ME','MF','BH','MG',
                   'NA','NB','CI','NC','ND','AI','NE','NF','BI','NG',
                   'OA','OB','CJ','OC','OD','AJ','OE','OF','BJ','OG');
-- PASS:0246 If 1 row is inserted?

     SELECT C6, C16, C26, C36, C46, C56, C66, C76, C86, C96, C100
          FROM T100
          WHERE C1 = 'ZA' AND C2 = 'ZB';
-- PASS:0246 If C6  = 'AA', C16 = 'AB', C26  = 'AC', C36 = 'AD' ?
-- PASS:0246 If C46 = 'AE', C56 = 'AF', C66  = 'AG', C76 = 'AH' ?
-- PASS:0246 If C86 = 'AI', C96 = 'AJ', C100 = 'OG' ?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0246 <<< END TEST

-- *********************************************************************

-- TEST:0247 FIPS sizing - 20 values in update SET clause!
-- FIPS sizing TEST

     DELETE FROM T100;
-- Making sure the table is empty

-- setup
     INSERT INTO T100 
            VALUES('ZA','ZB','CA','ZC','ZD','AA','ZE','ZF','BA','ZG',
                   'YA','YB','CB','YC','YD','AB','YE','YF','BB','YG',
                   'XA','XB','CC','XC','XD','AC','XE','XF','BC','XG',
                   'UA','UB','CD','UC','UD','AD','UE','UF','BD','UG',
                   'VA','VB','CE','VC','VD','AE','VE','VF','BE','VG',
                   'WA','WB','CF','WC','WD','AF','WE','WF','BF','WG',
                   'LA','LB','CG','LC','LD','AG','LE','LF','BG','LG',
                   'MA','MB','CH','MC','MD','AH','AE','AF','BH','BG',
                   'NA','NB','CI','NC','ND','AI','NE','NF','BI','NG',
                   'OA','OB','CJ','OC','OD','AJ','OE','OF','BJ','OG');
-- PASS:0247 If 1 row is inserted?

     UPDATE T100
          SET C5 = 'BA', C10 = 'ZP', C15 = 'BB', C20 = 'YP', C25 = 'BC',
             C30 = 'XP', C35 = 'BD', C40 = 'UP', C45 = 'BE', C50 = 'VP',
             C55 = 'BF', C60 = 'WP', C65 = 'BG', C70 = 'LP', C75 = 'BH',
            C80 = 'MP', C85 = 'BI', C90 = 'NP', C95 = 'BJ', C100 = 'OP';
-- PASS:0247 If 1 row is updated ?

     SELECT C5, C20, C35, C40, C55, C60, C75, C80, C90, C95, C100
          FROM T100
          WHERE C1 = 'ZA' AND C2 = 'ZB';
-- PASS:0247 If C5  = 'BA', C35  = 'BD', C55 = 'BF', C75 = 'BH' ?
-- PASS:0247 If C90 = 'NP', C100 = 'OP'?

-- restore
     ROLLBACK WORK;

-- END TEST >>> 0247 <<< END TEST
-- *************************************************////END-OF-MODULE
