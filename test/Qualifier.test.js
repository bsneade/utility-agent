const { Qualifier, AllOrNothingQualifier, FixedQualifier, SumOfChildrenQualifier } = require('../Qualifier');

test('All Or Nothing Qualifier, Is above threshold', () => {
	//set up our mocks
	var action = jest.fn();

	var context = jest.fn();
	context.value = 1;

	var scorers = [ {}, {}, {} ];
	scorers[0].score = jest.fn(cntx => Promise.resolve(50)); 
	scorers[1].score = jest.fn(cntx => Promise.resolve(49)); 
	scorers[2].score = jest.fn(cntx => Promise.resolve(10)); 

	//create our instance to test
	var qualifier = new AllOrNothingQualifier(scorers, action, 100);

	//run our function under test
	qualifier.score(context)
	    .then(result => {
	    	expect(result).toBe(109);
	    });

	//assert our mocks
	expect(scorers[0].score).toBeCalled();
	expect(scorers[1].score).toBeCalled();
	expect(scorers[2].score).toBeCalled();
});

test('All Or Nothing Qualifier, Is below threshold', () => {
	//set up our mocks
	var action = jest.fn();

	var context = jest.fn();
	context.value = 1;

	var scorers = [ {}, {} ];
	scorers[0].score = jest.fn(cntx => Promise.resolve(50)); 
	scorers[1].score = jest.fn(cntx => Promise.resolve(49)); 

	//create our instance to test
	var qualifier = new AllOrNothingQualifier(scorers, action, 100);

	//run our function under test
	qualifier.score(context)
	    .then(result => {
	    	expect(result).toBe(0);
	    });

	//assert our mocks
	expect(scorers[0].score).toBeCalled();
	expect(scorers[1].score).toBeCalled();
});

test('Fixed Qualifier', () => {
	//set up our mocks
	var action = jest.fn();

	var context = jest.fn();
	context.value = 1;

	var scorers = [ ];

	//create our instance to test
	var qualifier = new FixedQualifier(scorers, action, 10);

	//run our function under test
	qualifier.score(context)
	    .then(result => {
	    	expect(result).toBe(10); //ignores the qualifiers
	    });
});

test('Sum Of Children Qualifier', () => {
	//set up our mocks
	var action = jest.fn();

	var context = jest.fn();
	context.value = 1;

	var scorers = [ {}, {}, {} ];
	scorers[0].score = jest.fn(cntx => Promise.resolve(50)); 
	scorers[1].score = jest.fn(cntx => Promise.resolve(49)); 
	scorers[2].score = jest.fn(cntx => Promise.resolve(10)); 

	//create our instance to test
	var qualifier = new SumOfChildrenQualifier(scorers, action, null);

	//run our function under test
	qualifier.score(context)
	    .then(result => {
	    	expect(result).toBe(109);
	    });

	//assert our mocks
	expect(scorers[0].score).toBeCalled();
	expect(scorers[1].score).toBeCalled();
	expect(scorers[2].score).toBeCalled();
});
