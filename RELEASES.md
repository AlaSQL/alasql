# Releases Plan

## Target
The target for AlaSQLdevelopment is a small compact library with size less than 200kb with support of:
a) significant subset of SQL-92 to use the same SQL code on the client and server
b) complex queries on the JavaScript arrays (including search and JSON traversing) 
c) support some simple ETL operations (import-export from CSV and XLS formats)   
d) database backend support (IndexedDB in the first)

Plus some other features, like graphs and others in plug-ins.

## Alasql Development Prioritites
1. Bugs, Speed, Memory Leaks, Better Code, JsDoc, Errors handling, Library Size, Compatibility (Browsers, Mobiles, SQLs)
2. Documentation, alasql.org website, Social Media, Alasql promotion, Article, Coockbook, Tutorial
3. IF problem, UNION bug, merge algorithms, utilities, Prettify, Console, Alacon
4. Transactions
5. PIVOT, UNPIVOT, GROUP BY TOTAL, DETAIL, GROUP BY HIERARCHY
6. WebSQL and pass-thru databases, better support of with IndexedDB and NeDB, WebWorkers
7. SYNC, optimiztic blocking
8. Linq, NoSQL, and MongoDB functions
9. Streams, cursors,while, Console

## Next Releases:

### May 2015 (AlaSQL 0.2)
Now (May 2015) is the point, where I am decided to stop a little bit with development of new features, and do the homework with these priorities:
a) documentation
b) resolving bugs
c) document and refactoring code

The target of this phase is to pass SQLLOGIC test. Current 300 unit tests are not enough for such big project.

### June-July 2015 (AlaSQL 0.3)
There are some features in the short list for the June-July 2015:
e) extend transactions support
f) add simple triggers or INSERT OR REPLACE operator
g) improve database backend functionality (IndexedDB, localStorage, fileStorage) - especially for mobile applications (Cordova, Meteor).

### August 2015 (AlaSQL 0.4)
h) split alasql.js into core and additional modules to reduce the size of the library
i) add OrientDB support to search over graphs
j) work with memory leaks

### September 2015: (AlaSQL 0.5)
k) improve parser to reduce its size, make it faster (especally for INSERT operator), split grammar files by modules


