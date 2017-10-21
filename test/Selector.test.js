const { Selector, HighestScoringSelector, FirstScoringSelector } = require('../Selector');

var hsSelector = new HighestScoringSelector();

test('HighestScoringSelector select', () => {
	//set up our mocks
	var context = jest.fn();
	context.value = 1;

	var qualifiers = [ {}, {} ];
	qualifiers[0].score = jest.fn(cntx => Promise.resolve(50));
	qualifiers[1].score = jest.fn(cntx => Promise.resolve(49));

	//invoke the method under test
	hsSelector.select(context, qualifiers, null)
		.then(score => { expect(score).toBe(qualifiers[0]); });

	//assert our mocks
	expect(qualifiers[0].score).toBeCalled();
	expect(qualifiers[1].score).toBeCalled();
});

var fsSelector = new FirstScoringSelector();

test('FirstScoringSelector select', () => {
	//set up our mocks
	var context = jest.fn();
	context.value = 1;

	var qualifiers = [ {}, {}, {} ];
	qualifiers[0].score = jest.fn(cntx => Promise.resolve(50)); //test the threshold case
	qualifiers[1].score = jest.fn(cntx => Promise.resolve(55)); //should be returned
	qualifiers[2].score = jest.fn(cntx => Promise.resolve(51)); //test that we didn't keep processing along

	//invoke the method under test
	hsSelector.select(context, qualifiers, 50) //should be higher than 50
		.then(score => { expect(score).toBe(qualifiers[1]); }); //the first one to hit the threshold

	//assert our mocks
	expect(qualifiers[0].score).toBeCalled();
	expect(qualifiers[1].score).toBeCalled();
	expect(qualifiers[2].score).toBeCalled();
});