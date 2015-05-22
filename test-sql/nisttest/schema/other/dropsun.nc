-- ***************************************************************
-- ****** THIS FILE SHOULD BE RUN UNDER AUTHORIZATION ID SUN *****
-- ***************************************************************

-- This is a nonconforming text file of interactive SQL commands.

-- This command file may be used to drop all the tables
--   for the authorization id  SUN.
-- Some tables are referenced from other schemas.
-- These tables or these references must be dropped first.

        DROP VIEW DOLLARS_PER_POUND;
        DROP VIEW COST_PER_UNIT;
        DROP VIEW STAFF6_WITH_GRADES;
        DROP VIEW TESTREPORT;

        DROP TABLE BASE_TESTREPORT;
        DROP TABLE ECCO;
        DROP TABLE STAFF;
        DROP TABLE PROJ;
        DROP TABLE WORKS;
        DROP TABLE STAFF3;
        DROP TABLE PROJ3;
        DROP TABLE WORKS3;
        DROP TABLE STAFF4;
        DROP TABLE STAFF14;
        DROP TABLE STAFF5;
        DROP TABLE STAFF6;
        DROP TABLE STAFF7;
        DROP TABLE STAFF8;
        DROP TABLE STAFF9;
        DROP TABLE STAFF10;
        DROP TABLE STAFF11;
        DROP TABLE STAFF12;
        DROP TABLE STAFF13;
        DROP TABLE STAFF15;
        DROP TABLE STAFF16;
        DROP TABLE SIZ1_P;
        DROP TABLE SIZ1_F;
        DROP TABLE SIZ2_P;
        DROP TABLE SIZ2_F1;
        DROP TABLE SIZ2_F2;
        DROP TABLE SIZ2_F3;
        DROP TABLE SIZ2_F4;
        DROP TABLE SIZ2_F5;
        DROP TABLE SIZ2_F6;
        DROP TABLE SIZ2_F7;
        DROP TABLE SIZ2_F8;
        DROP TABLE SIZ2_F9;
        DROP TABLE SIZ2_F10;
        DROP TABLE SIZ3_P1;
        DROP TABLE SIZ3_P2;
        DROP TABLE SIZ3_P3;
        DROP TABLE SIZ3_P4;
        DROP TABLE SIZ3_P5;
        DROP TABLE SIZ3_P6;
        DROP TABLE SIZ3_P7;
        DROP TABLE SIZ3_P8;
        DROP TABLE SIZ3_P9;
        DROP TABLE SIZ3_P10;
        DROP TABLE SIZ3_F;
        DROP TABLE DEPT;
        DROP TABLE EMP;
        DROP TABLE EXPERIENCE;
        DROP TABLE STAFF_M;   -- referenced by PROJ_M below (next table)
        DROP TABLE PROJ_M;
        DROP TABLE STAFF_C;
        DROP TABLE STAFF_P;   -- referenced by two columns in SULLIVAN.WORKS_P 
                              -- referenced (illegally) by SCHANZLE.TAB5
        DROP TABLE PROJ_P;
        DROP TABLE MID1;
        DROP TABLE ACR_SCH_P; -- referenced by SCHANZLE.ACR_SCH_F
        DROP TABLE CHAR_DEFAULT;
        DROP TABLE EXACT_DEF;
        DROP TABLE APPROX_DEF;
        DROP TABLE SIZE_TAB;
        DROP TABLE COMMODITY; -- referenced by SCHANZLE.RASTER and REFRESH
        DROP TABLE CURRENCY_TABLE;
        DROP TABLE MEASURE_TABLE;
        DROP TABLE C_TRANSACTION;
        DROP TABLE T6;
        DROP TABLE T118;
        DROP TABLE T6118REF;

COMMIT WORK;
