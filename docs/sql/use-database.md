# USE-DATABASE

Set current database:

```js
	alasql.use('test01');

	// or

	alasql('USE test01');    

	// or

	alasql('USE DATABASE test01');    
```

You can check current database name in alasql.useid property:

```js
    console.log('Current database:', alasql.useid);
```
