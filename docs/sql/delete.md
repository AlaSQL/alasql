# DELETE

To delete all records from table:
```js
	alasql('DELETE FROM [Table A]');
```

To delete only selected records from table:
```js
	var numberOfDeletedLines = alasql('DELETE FROM [Table A] WHERE field1 > 10');
```

