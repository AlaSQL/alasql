#Documentation


##API

* [alasql](alasql.md) - main Alasql object
* [alasql.Database](alasql/database.md) - database object
* [alasql.Transaction](alasql/transaction.md) - transaction object
* [alasql.Table](alasql/table.md) - table object
* [alasql.View](alasql/view.md) - view object
* [alasql.options](alasql/options.md) - options
* [alasql.utils](alasql/utils.md) - utility 

## SQL Statements

* [CREATE DATABASE](sql/create-database.md)
* [CREATE INDEX](sql/)
* [CREATE TABLE]()
* [CREATE TRIGGER]()
* [DELETE]()
* [DROP DATABASE](sql/drop-database.md)
* [DROP INDEX]()
* [DROP TABLE]()
* [DROP TRIGGER]()
* [INSERT]()
* [SELECT]()
* [UPDATE]()
* [USE DATABASE](sql/usedatabase.md)

* SQL-Functions
* User defined SQL functions
* [Aggregators](aggregators.md) 

## Classic SQL API
* exec(sql, params, callback, scope)
* parse(sql) - parse SQL statement to AST
* ast.prettify(sql)
* compile(sql)
* statement(params, callback)

## NonClassic JavaScript API

* reindex()

## "NoSQL" API
* insert(data)
* update(data)
* delete(data)
* select(data)

## OLAP API
* parse(mdx) - parse MDX statement to AST
* ast.prettify(mdx)
* compile(mdx)

