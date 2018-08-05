if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 312 JSON traverse', function() {
	/*

### How to search deep nested JSON?

Source: [StackOverflow] (http://stackoverflow.com/questions/30091572/search-deep-nested-json)

<blockquote>
I am working on a solution where I need to search for an element in a deeply nested JSON by its id. I have been advised to use underscore.js which I am pretty new to.

After reading the documentation http://underscorejs.org/#find , I tried to implement the solution using find, filter and findWhere.

The issue I faced is that these functions check the top level of the JSON and not the nested properties thus returning undefined. I tried to use item.catalog && item.catalog.uid == 1; logic as suggested in a similar question Underscore.js - filtering in a nested Json but failed.

How can I find an item by value by searching the whole deeply nested JSON?

</blockquote>

var test = {
    "menuInputRequestId": 1,
    "catalog":[
      {
        "uid": 1,
        "name": "Pizza",
        "desc": "Italian cuisine",
        "products": [
          {
            "uid": 3,
            "name": "Devilled chicken",
            "desc": "chicken pizza",
          },
          // ...
        ]
      }
    ]
  };


*/

	it('1. How to search deep nested JSON?', function(done) {
		var data = {
			menuInputRequestId: 1,
			catalog: [
				{
					uid: 1,
					name: 'Pizza',
					desc: 'Italian cuisine',
					products: [
						{
							uid: 3,
							name: 'Devilled chicken',
							desc: 'chicken pizza',
							prices: [
								{
									uid: 7,
									name: 'regular',
									price: '$10',
								},
								{
									uid: 8,
									name: 'large',
									price: '$12',
								},
							],
						},
					],
				},
				{
					uid: 2,
					name: 'Pasta',
					desc: 'Italian cuisine pasta',
					products: [
						{
							uid: 4,
							name: 'Lasagne',
							desc: 'chicken lasage',
							prices: [
								{
									uid: 9,
									name: 'small',
									price: '$10',
								},
								{
									uid: 10,
									name: 'large',
									price: '$15',
								},
							],
						},
						{
							uid: 5,
							name: 'Pasta',
							desc: 'chicken pasta',
							prices: [
								{
									uid: 11,
									name: 'small',
									price: '$8',
								},
								{
									uid: 12,
									name: 'large',
									price: '$12',
								},
							],
						},
					],
				},
			],
		};

		var res = alasql('SEARCH / * WHERE(uid=1) name FROM ?', [data]);
		assert.deepEqual(res, ['Pizza']);
		done();
	});

	it('2. How do I traverse a complex JSON doc with javascript and extract named values', function(done) {
		/*
  Source: http://stackoverflow.com/questions/29966520/how-do-i-traverse-a-complex-json-doc-with-javascript-and-extract-named-values

  It has a specific problem to solve, extracting a named value from Json, 

I need some javascript to traverse reasonably complex json with nested objects and arrays, and extract values. Example json is

*/
		var data = {
			query: {
				filtered: {
					query: {
						match_all: {},
					},
					filter: {
						and: {
							filters: [
								{
									terms: {
										ACCOUNT_NUMBER: ['37846589', '37846540'],
									},
								},
							],
						},
					},
				},
			},
		};

		var res = alasql('SEARCH /+ACCOUNT_NUMBER/ FROM ?', [data]);
		assert.deepEqual(res, ['37846589', '37846540']);
		done();
	});

	it('3. Find all parents elements in a Json file', function(done) {
		/*
http://stackoverflow.com/questions/29937203/find-all-parents-elements-in-a-json-file-using-jquery/29937369#29937369

Find all parents elements in a Json file?

I'm currently working on a recursive menu which is built on top of jQuery which looks quite good already.

The structure of the JSon file containing the menu looks as the following:

[
   { 
       "Id": "menuOfficeWebControlsForWebApplication", 
       "Title": "Office Web Controls", 
       "Resource": "/Documentation/Data/index.html" },
   { 
       "Id": "menuGettingStarted", 
       "Title": "Getting Started", 
       "Resource": "/Documentation/Data/getting-started.html", 
       "Categories": [{ 
             "Id": "menuCompilingFromSource", 
             "Title": "Compiling From Source", 
             "Resource": "/Documentation/Data/Getting-Started/compiling-from-source.html" 
          },{ 
             "Id": "menuDownloadReleasePackage", 
             "Title": "Download Release Package", 
             "Resource": "/Documentation/Data/Getting-Started/downloading-release-package.html"
          },{ 
             "Id": "menuBuildingYourFirstApplication", 
             "Title": "Building your first application", 
             "Resource": "/Documentation/Data/Getting-Started/building-your-first-application.html" 
        }]
   }
]

Now, I want to retrieve all the elements which are at a higher level and all the items which are directly below that item.

*/

		var data = [
			{
				Id: 'menuOfficeWebControlsForWebApplication',
				Title: 'Office Web Controls',
				Resource: '/Documentation/Data/index.html',
			},
			{
				Id: 'menuGettingStarted',
				Title: 'Getting Started',
				Resource: '/Documentation/Data/getting-started.html',
				Categories: [
					{
						Id: 'menuCompilingFromSource',
						Title: 'Compiling From Source',
						Resource: '/Documentation/Data/Getting-Started/compiling-from-source.html',
					},
					{
						Id: 'menuDownloadReleasePackage',
						Title: 'Download Release Package',
						Resource:
							'/Documentation/Data/Getting-Started/downloading-release-package.html',
					},
					{
						Id: 'menuBuildingYourFirstApplication',
						Title: 'Building your first application',
						Resource:
							'/Documentation/Data/Getting-Started/building-your-first-application.html',
					},
				],
			},
		];

		// The answer
		var res = alasql('SEARCH /(Categories/)? WHERE(Id) FROM ?', [data]);

		// Fro test
		var res = alasql('SEARCH /(Categories/)? Id FROM ?', [data]);

		assert.deepEqual(res, [
			'menuOfficeWebControlsForWebApplication',
			'menuGettingStarted',
			'menuCompilingFromSource',
			'menuDownloadReleasePackage',
			'menuBuildingYourFirstApplication',
		]);
		done();
	});

	/*
recursive find and replace in multidimensional javascript object
http://stackoverflow.com/questions/29473526/recursive-find-and-replace-in-multidimensional-javascript-object

I need to find and replace values in my object when they match a regular expression (e.g. **myVar**); The object that I need to loop through is user defined and structure varies.

Here is an example object, shortened for simplicity.

var testObject = {
    name: "/pricing-setups/{folderId}", 
    method: "POST", 
    endpoint: "/pricing-setups/:folderId", 
    functionName: "create",
    Consumes: null,
    filename: "apicontracts/pricingsetups/PricingSetupServiceProxy.java",
    pathParam: [
        {$$hashKey: "06S",
          key: "folderId",
          value: "**myVar**"}
    ],
    queryParam: [],
    request_payload: "{'title':'EnterAname'}",
    returnList: []
}

This object is passed into a master function that builds a angularjs resource object using the passed in object.
*/

	it('4. Recursive find and replace in multidimensional javascript object', function(done) {
		var data = {
			name: '/pricing-setups/{folderId}',
			method: 'POST',
			endpoint: '/pricing-setups/:folderId',
			functionName: 'create',
			//    Consumes: null,
			filename: 'apicontracts/pricingsetups/PricingSetupServiceProxy.java',
			pathParam: [
				{
					$$hashKey: '06S',
					key: 'folderId',
					value: '**myVar**',
				},
			],
			queryParam: [],
			request_payload: "{'title':'EnterAname'}",
			returnList: [],
		};

		// Fro test
		// var res = alasql('SEARCH / * AS @obj KEYS() WHERE(@obj->(_) LIKE "%myVar%") FROM ?', [data]);
		// var res = alasql('SEARCH / * IF(WHERE(_ LIKE "%myVar%") \
		//   SET(val=val->replace("")) FROM ?', [data]);

		//    KEYS();

		// console.log(res);
		//   assert.deepEqual(res,[ 'menuOfficeWebControlsForWebApplication',
		// 'menuGettingStarted',
		// 'menuCompilingFromSource',
		// 'menuDownloadReleasePackage',
		// 'menuBuildingYourFirstApplication' ]);
		done();
	});

	it('5. Recursive find and replace in multidimensional javascript object', function(done) {
		/*

http://stackoverflow.com/questions/23024589/javascript-nested-object-to-multidimensional-array-recursive-function?rq=1


Javascript Nested object to multidimensional array recursive function

I am using this Lucene Query Parser to parse a string/query which produce this kind of data structure:

// Notice that the repetition of 'field3' is on purpose
Sample String: field1:val1 AND field2:val2 OR field3:val3 AND field3:val4
Result:
    { left: { field: "field1", term: "val1" },
      operator: "AND"
      right: {
          left: { field: "field2", term: "val2" },
          operator: "OR"
          right: { 
              left: {field: "field3", term: "val3" },
              operator: "AND",
              right: {
                   field: "field3",
                   term: "val4"
              }
          }
      }
I need to iterate on that object to obtain the following:

[ [{ field: "field1", term: "val1"},
   { field: "field2", term: "val2"}
  ],
  [{ field: "field3", term: "val3"},
   { field: "field3", term: "val4"}
  ]
]
If I try to explain this, the idea is to create an array 
of arrays where each child array are separated by "OR",
 while each objects inside the child arrays represents the 
 "AND" separated fields; Although I think the code above explains 
 it better than me
*/

		done();
	});
});
