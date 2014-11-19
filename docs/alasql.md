#alasql Objact

To execute sql statement on default database:
```
    var res = alasql(sql, params, callback);
```

To create new database without name (with new name):

```
    var db = new alasql.Database();
```

To create new database with name:

```
    var db = new alasql.Database(databaseid);
    // or
    alasql('CREATE DATABASE mydb');
```
Set default database: (be sure, that db is in the list of databases (alasql.databases))

```
    alasql.use('mydb');
    // or
    alasql('USE mydb');
```

To reach all databases use alasql.databases:
```
    alasql.databases.forEach(function(db{
        console.log(db.databaseid);
    });
```

To reach all tables in default database:
```
    var tables = alasql.tables;
```

To change alasql [options](options.md):
```
    alasql.options.ixoptimization = false;
```
User defined functions:
```
    alasql.fn.SUM10 = functon (x) {return x*10+x; }
```
Parse SQL to AST (Abstract Syntax Tree)
```
    var ast = alasql.parse(sql);
```
Compile (prepare stament):
```
    var statement = alasql.compile(sql);
    var statement = alasql.prepare(sql);
```

Execute compiled statement:
```
    var res = statement(params, callback, scope);
```

Query functions:
```
    var res = alasql.exec(sql, params, callback);
    var res = alasql.executeSQL(sql, params, callback);
    var res = alasql.query(sql, params, callback);
    var res = alasql.queryValue(sql, params, callback);
    var res = alasql.querySingle(sql, params, callback);
    var res = alasql.queryArray(sql, params, callback);
    var res = alasql.queryArrayOfArrays(sql, params, callback);
```

Async (promised) execution:
```
    alasql.aexec(sql, params).then(function(data){ console.log(data); });
```
Alasql Console functions (for browser only):
```
alasql.con.open();
alasql.con.log(data,...); // Output data to console
alasql.con.close();
alasql.con.test(name, times, function);
alasql.con.exec();
```

