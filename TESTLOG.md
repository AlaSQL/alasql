# Test log

Date: May 17, 2015 @ 17-40 version 0.1.6

This file contains a log of tests runned on the [SQLLOGICTEST](http://www.sqlite.org/sqllogictest/doc/trunk/about.wiki) package.

### KPI1 ([select1.test](test-sql/sqllogic/test/select1.test)) - queries

* tests - 1031
* parsed ok - 1031 (100%)
* run ok - 1031 (100%)
* time - 5.8s

### KPI2 ([select2.test](test-sql/sqllogic/test/select2.test)) - NULLs

* tests - 1031
* parsed ok - 1031 (100%)
* run ok - 257 (26%)
* time - 5.2s

### KPI3 ([select3.test](test-sql/sqllogic/test/select3.test)) - nested queries and exists

* tests - 3351
* parsed ok - 3351 (100%)
* run ok - 1043 (31%)
* time - 17.0s

### KPI4 ([select4.test](test-sql/sqllogic/test/select4.test)) - cross-joins

* Test failed (freezes at line 29187) - cross-join of 30 tables...
* Verifier should be rewritten

### KPI5 ([select5.test](test-sql/sqllogic/test/select5.test)) - cross-joins

* Test failed (freezes at line 3388) - cross-joins of 7 tables
* Verifier should be rewritten

### OTHER TESTS (tests, parsed, ok, time)

* evidence/in1.test - 216, 214, 94, 0.3
* evidence/in2.test - 45, 45, 31, 0.1 
* evidence/slt_lang_aggfunc.test - 80,68,38,0.1
* evidence/slt_lang_createtrigger.test - 26,5,5,0
* evidence/slt_lang_createview.test -  25, 24, 16, 0.05
* evidence/slt_lang_dropindex.test -  8, 8, 5, 0
* evidence/slt_lang_droptable.test - 12, 12, 9, 0
* evidence/slt_lang_droptrigger.test - 12, 6, 8, 0
* evidence/slt_lang_dropview.test - 13, 13, 11, 0
* evidence/slt_lang_reindex.test - 7, 5, 5, 0
* evidence/slt_lang_replace.test - 14, 10, 8, 0
* evidence/slt_lang_update.test - 27, 27, 18, 0
* index/between/1/slt_good_0.test - 10022, 10022, 6622, 73.7
* index/commute/10/slt_good_0.test -  10034, 10034, 3492, 22.9
* index/delete/1/slt_good_0.test - 10907, 10907, 7690, 15.0
* index/in/10/slt_good_0.test - 10035, 10035, 4799, 75.2
* index/orderby/10/slt_good_0.test - 10053, 10053, 2539, 24.2
* index/orderby_nosort/10/slt_good_0.test - 10053, 10053, 3375, 24.6
* index/random/10/slt_good_0.test -  12172, 12132, 9105, 16.7
* index/view/10/slt_good_1.test - 8200, 8200, 2760, 12.4
* random/aggregates/slt_good_0.test - 13922, 13221, 6875, 18.7
* random/expr/slt_good_0.test - 15426, 14198, 10372, 24.0
* random/groupby/slt_good_0.test -10559, 10221, 4790, 14.2
* random/select/slt_good_0.test - 11084, 10279, 2012, 12.4


