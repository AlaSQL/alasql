# Test log

Date: May 20, 2015 15:45 version 0.1.7

AlaSQL is tested by two packages:

* SQLLOGICTEST - current level 62%
* NIST SQL TestSuite - current level 24% 

Most problems are in test parsers, rather than in AlaSQL.

### SQLLOGICTEST

This file contains a log of tests runned on the [SQLLOGICTEST](http://www.sqlite.org/sqllogictest/doc/trunk/about.wiki) package. For present moment we use only 29 of more than a hundred test files. Each test file was checked for the following criterias:

* Number of tests in the file
* Number of successfully parsed tests
* Number of tests with positive result checks
* Time spent

This table will be updated for each release of AlaSQL.

### TEST KPI - result for all test files without select4.test and select5.test in total 

* tests - 138365
* parsed ok - 135205 (98%)
* run ok - 86330 (62%) <----- this is the most important number in the test
* time - 452s

### KPI1 ([select1.test](test-sql/sqllogic/test/select1.test)) - queries

* tests - 1031
* parsed ok - 1031 (100%)
* run ok - 1031 (100%)
* time - 4.6s

### KPI2 ([select2.test](test-sql/sqllogic/test/select2.test)) - NULLs

* tests - 1031
* parsed ok - 1031 (100%)
* run ok - 970 (94%)
* time - 4.9s

### KPI3 ([select3.test](test-sql/sqllogic/test/select3.test)) - nested queries and exists

* tests - 3351
* parsed ok - 3351 (100%)
* run ok - 3069 (92%)
* time - 16.3s

### KPI4 - whole test ([select4.test](test-sql/sqllogic/test/select4.test)) - cross-joins

* Test failed (freezes at line 29187) - cross-join of 30 tables...

### KPI4A - first 25000 of 48300 lines ([select4.test](test-sql/sqllogic/test/select4.test)) - cross-joins

* tests - 1886
* parsed ok - 1886 (100%)
* run ok - 1073 (57%) - there is a problem with verifier program
* time - 17.8s

### KPI5 ([select5.test](test-sql/sqllogic/test/select5.test)) - cross-joins

* Test slowed (freezes at line 3388) - cross-joins of 7+ tables

### KPI5A - first 3200 lines 31949 ([select5.test](test-sql/sqllogic/test/select5.test)) - cross-joins with more than 7 tables - to be optimized

* tests - 756
* parsed ok - 756 (100%)
* run ok - 756 (100%)
* time - 132.5s



### Test by other files:

* evidence/in1.test - 216, 214, 94, 0.3
* evidence/in2.test - 45, 45, 31, 0.1 
* evidence/slt_lang_aggfunc.test - 80,68,44,0.1
* evidence/slt_lang_createtrigger.test - 26,5,5,0
* evidence/slt_lang_createview.test -  25, 24, 16, 0.05
* evidence/slt_lang_dropindex.test -  8, 8, 5, 0
* evidence/slt_lang_droptable.test - 12, 12, 9, 0
* evidence/slt_lang_droptrigger.test - 12, 6, 8, 0
* evidence/slt_lang_dropview.test - 13, 13, 11, 0
* evidence/slt_lang_reindex.test - 7, 5, 5, 0
* evidence/slt_lang_replace.test - 14, 10, 8, 0
* evidence/slt_lang_update.test - 27, 27, 18, 0
* index/between/1/slt_good_0.test - 10022, 10022, 6630, 93.0
* index/commute/10/slt_good_0.test -  10034, 10034, 3868, 22.9
* index/delete/1/slt_good_0.test - 10907, 10907, 7690, 15.0
* index/in/10/slt_good_0.test - 10035, 10035, 5185, 75.2
* index/orderby/10/slt_good_0.test - 10053, 10053, 2369, 24.2
* index/orderby_nosort/10/slt_good_0.test - 10053, 10053, 4146, 24.6
* index/random/10/slt_good_0.test -  12172, 12132, 9054, 16.7
* index/view/10/slt_good_1.test - 8200, 8200, 3868, 27.5
* random/aggregates/slt_good_0.test - 13922, 13221, 10861, 22.0
* random/expr/slt_good_0.test - 15426, 14198, 12390, 28.6
* random/groupby/slt_good_0.test -10559, 10221, 6100, 14.2
* random/select/slt_good_0.test - 11084, 10279, 8890, 12.4


