if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #502
*/

var data = [
	{
		id: 1255,
		title: 'The Brain and Nervous System (LS1.D)',
		description:
			'By the time you finish this playlist, you should be able to: 1. Describe how the nervous system is organized and how it works 2. Describe the role of the nervous sytem, and explain how our different senses work to send information to your brain',
		keyTerms:
			'You should also be able to define the following words: stimulus, response, neuron, sensory neuron, motor neuron, nerve impulse, dendrite, axon, nerve, central nervous system, peripheral nervous system, brain, spinal cord, cerebrum, cerebellum, brain stem, retina, cochlea',
		visible: true,
		introduction: {
			id: 5336,
			title: 'Introductory Materials',
			resources: [
				{
					id: 23022,
					title: 'Vocabulary - Brain and Nervous System',
					description: '',
					purpose: '',
					category: 'Website',
					position: 1,
					contentItem: {
						id: 1650,
						url: 'http://quizlet.com/45497180/flashcards',
						itemType: 'Website',
						embedUrl: null,
					},
				},
				{
					id: 23023,
					title: 'The Brain and Nervous System Study Guide',
					description:
						'Fill out this study guide while studying! It will help you prepare for the assessment!',
					purpose: '',
					category: 'Website',
					position: 2,
					contentItem: {
						id: 12581,
						url:
							'https://docs.google.com/a/summitps.org/document/d/1TjF1MY3cyGNKT4s46uk1iz5NvjrY59eNPH8YKYYTC_E/edit',
						itemType: 'Website',
						embedUrl: null,
					},
				},
			],
		},
		objectives: [
			{
				id: 10732,
				title: '1. Describe how the nervous system is organized',
				caContribution: 5,
				position: 1,
				resources: [
					{
						id: 23024,
						title: 'Reading - How the Nervous System Works',
						description: '',
						purpose: '',
						category: 'Document',
						position: 1,
						contentItem: {
							id: 1651,
							url: null,
							itemType: 'Document',
							embedUrl:
								'https://view-api.box.com/1/sessions/493fca96d46a4559813c3118ebeef8b6/view?theme=light',
							s3Url:
								'/files/content_items/relateds/000/001/651/original/53d1ddd8f07787731aa7d84f-how_20nervous_20system_20works_001.pdf?1424368501',
						},
					},
				],
			},
			{
				id: 10734,
				title:
					'2. Describe the role of the nervous sytem, and explain how our different senses work to send information to your brain',
				caContribution: 5,
				position: 2,
				resources: [
					{
						id: 23039,
						title: 'Study Jams - The Senses',
						description:
							'This series of videos explains the different senses: sight, hearing, taste, touch, and smell',
						purpose: '',
						category: 'Website',
						position: 1,
						contentItem: {
							id: 1666,
							url: 'http://studyjams.scholastic.com/studyjams/jams/science/human-body/touching.htm',
							itemType: 'Website',
							embedUrl: null,
						},
					},
					{
						id: 23040,
						title: "Nervous System: I'm Sensing Something",
						description:
							'Format: Article Content: How does the nervous system work and interact with other systems',
						purpose: '',
						category: 'Website',
						position: 1,
						contentItem: {
							id: 12582,
							url: 'http://www.biology4kids.com/files/systems_nervous.html',
							itemType: 'Website',
							embedUrl: null,
						},
					},
				],
			},
		],
	},
	{
		id: 1256,
		title: 'The Brain and Nervous System (LS1.D)',
		description:
			'By the time you finish this playlist, you should be able to: 1. Describe how the nervous system is organized and how it works 2. Describe the role of the nervous sytem, and explain how our different senses work to send information to your brain',
		keyTerms:
			'You should also be able to define the following words: stimulus, response, neuron, sensory neuron, motor neuron, nerve impulse, dendrite, axon, nerve, central nervous system, peripheral nervous system, brain, spinal cord, cerebrum, cerebellum, brain stem, retina, cochlea',
		visible: true,
		introduction: {
			id: 5336,
			title: 'Introductory Materials',
			resources: [
				{
					id: 23022,
					title: 'Vocabulary - Brain and Nervous System',
					description: '',
					purpose: '',
					category: 'Website',
					position: 1,
					contentItem: {
						id: 1650,
						url: 'http://quizlet.com/45497180/flashcards',
						itemType: 'Website',
						embedUrl: null,
					},
				},
				{
					id: 23023,
					title: 'The Brain and Nervous System Study Guide',
					description:
						'Fill out this study guide while studying! It will help you prepare for the assessment!',
					purpose: '',
					category: 'Website',
					position: 2,
					contentItem: {
						id: 12581,
						url:
							'https://docs.google.com/a/summitps.org/document/d/1TjF1MY3cyGNKT4s46uk1iz5NvjrY59eNPH8YKYYTC_E/edit',
						itemType: 'Website',
						embedUrl: null,
					},
				},
			],
		},
		objectives: [
			{
				id: 10732,
				title: '1. Describe how the nervous system is organized',
				caContribution: 5,
				position: 1,
				resources: [
					{
						id: 23024,
						title: 'Reading - How the Nervous System Works',
						description: '',
						purpose: '',
						category: 'Document',
						position: 1,
						contentItem: {
							id: 1651,
							url: null,
							itemType: 'Document',
							embedUrl:
								'https://view-api.box.com/1/sessions/493fca96d46a4559813c3118ebeef8b6/view?theme=light',
							s3Url:
								'/files/content_items/relateds/000/001/651/original/53d1ddd8f07787731aa7d84f-how_20nervous_20system_20works_001.pdf?1424368501',
						},
					},
				],
			},
			{
				id: 10734,
				title:
					'2. Describe the role of the nervous sytem, and explain how our different senses work to send information to your brain',
				caContribution: 5,
				position: 2,
				resources: [
					{
						id: 23039,
						title: 'Study Jams - The Senses',
						description:
							'This series of videos explains the different senses: sight, hearing, taste, touch, and smell',
						purpose: '',
						category: 'Website',
						position: 1,
						contentItem: {
							id: 1666,
							url: 'http://studyjams.scholastic.com/studyjams/jams/science/human-body/touching.htm',
							itemType: 'Website',
							embedUrl: null,
						},
					},
					{
						id: 23040,
						title: "Nervous System: I'm Sensing Something",
						description:
							'Format: Article Content: How does the nervous system work and interact with other systems',
						purpose: '',
						category: 'Website',
						position: 1,
						contentItem: {
							id: 12582,
							url: 'http://www.biology4kids.com/files/systems_nervous.html',
							itemType: 'Website',
							embedUrl: null,
						},
					},
				],
			},
		],
	},
];

describe('Test 411 Export to Excel', function () {
	it('2. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test411;USE test411');
		done();
	});

	it('2. ANALYZE object', function (done) {
		var res = alasql(
			'SEARCH / AS @a \
        UNION ALL( \
          introduction AS @b \
          resources / AS @c \
          RETURN(@a->id AS id, @a->title AS title, @a->description AS description, \
            @a->keyTerms AS keyTerms, @a->visible AS visible, \
            @b->id as [introduction.id], @b->title as [introduction.title], \
            @c->id AS [introduction.resources.id], \
            @c->contentItem->id AS [introduction.resources.contentItem.id] \
          ) \
        , \
          objectives AS @b \
          resources / AS @c \
          RETURN(@a->id AS id, @a->title AS title, @a->description AS description, \
            @a->keyTerms AS keyTerms, @a->visible AS visible, \
            @b->id as [introduction.id], @b->title as [introduction.title], \
            @c->id AS [introduction.resources.id], \
            @c->contentItem->id AS [introduction.resources.contentItem.id] \
          ) \
        ) INTO XLSX("' +
				__dirname +
				'/restest411.xlsx",{headers:true})\
        FROM ?',
			[data]
		);
		//console.log(res);
		assert(res == 1);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test411');
		done();
	});
});
