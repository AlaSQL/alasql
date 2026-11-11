if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2638 - INTO XLS and XLSXML escape special characters', function () {
	var data = [{'a<b': 'Tom & Jerry <x> "q" \'s\''}];

	it('A) INTO XLS escapes values, titles and the sheet name', function () {
		var res = alasql('SELECT * INTO XLS({headers:true, sheetid:"S&1"}) FROM ?', [data]);
		assert(res.indexOf('<x:Name>S&amp;1</x:Name>') > -1);
		assert(res.indexOf('>a&lt;b</th>') > -1);
		assert(res.indexOf('>Tom &amp; Jerry &lt;x&gt; &quot;q&quot; &apos;s&apos;</td>') > -1);
		assert(res.indexOf('<x>') === -1);
	});

	it('B) INTO XLSXML escapes values, titles and the sheet name', function () {
		var res = alasql.into.XLSXML({sheets: {'S&1': {headers: true}}}, undefined, [data], []);
		assert(res.indexOf('ss:Name="S&amp;1"') > -1);
		assert(res.indexOf('>a&lt;b</Data>') > -1);
		assert(res.indexOf('>Tom &amp; Jerry &lt;x&gt; &quot;q&quot; &apos;s&apos;</Data>') > -1);
		assert(res.indexOf('<x>') === -1);
	});
});
