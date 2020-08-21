if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = 606;

describe('Test ' + test + ' - get autoval', function () {
	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) complex SEARCH query', function () {
		const data = {
			kind: 'PodList',
			apiVersion: 'v1',
			metadata: {
				selfLink: '/api/v1/pods',
			},
			items: [
				{
					metadata: {
						name: 'pod1',
						namespace: 'namespace1',
					},
					spec: {
						volumes: [
							{
								name: 'default-token',
								secret: {
									secretName: 'default-token',
								},
							},
						],
						nodeName: 'node-1',
					},
				},
				{
					metadata: {
						name: 'pod2',
						namespace: 'namespace2',
					},
					spec: {
						volumes: [
							{
								name: 'default-token',
								secret: {
									secretName: 'default-token',
								},
							},
						],
						nodeName: 'node-2',
					},
				},
				{
					metadata: {
						name: 'chosen-pod',
						namespace: 'namespace3',
					},
					spec: {
						volumes: [
							{
								name: 'pod-storage',
							},
							{
								name: 'test-data',
								secret: {
									secretName: 'test-secret',
								},
							},
						],
						nodeName: 'node-2',
					},
				},
			],
		};

		var res = alasql(
			'SEARCH items / AS @a     \
			spec volumes / WHERE(name="test-data") \
			RETURN(@a->metadata->name AS name,     \
	          @a->metadata->namespace AS namespace \
	        ) FROM ?',
			[data]
		);
		assert.deepEqual(res, [{name: 'chosen-pod', namespace: 'namespace3'}]);
	});
});
