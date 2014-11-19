# CREATE DATABASE

To create new database:

```js
	alasql('CREATE DATABASE [My Database]');

	// or

	new mydb = new alasql.Database();

	// or

	new mydb = new alasql.Database('My Database');
```

You can find database:

```js
	var mydb = alasql.Database('My Database');

	// or

	var mydb = alasql.databases['My Database'];
```