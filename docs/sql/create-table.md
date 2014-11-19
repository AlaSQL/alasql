# CREATE TABLE

To create new table:

```js
	alasql('CREATE DATABASE students (studentid int, studentname string)');
```

You can find list of current tables in alasql.tables property:
```js
	console.log(Object.keys(alasql.tables).sort().join(', '));
```
