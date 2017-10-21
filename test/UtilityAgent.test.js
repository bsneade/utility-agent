const UtilityAgent = require('../UtilityAgent');

test('Tick', () => {
    //set up our mocks
    var action = jest.fn();

    var qualifiers = [ {}, {} ];
	qualifiers[0].score = jest.fn(cntx => Promise.resolve(50));
	qualifiers[0].action = action;
	qualifiers[1].score = jest.fn(cntx => Promise.resolve(49));

	var selector = {};
	selector.select = jest.fn((context, qualifiers, defaultValue) => {
		return Promise.resolve(qualifiers[0]); //return the first qualifier
	});

	var context = jest.fn();
	context.value = 1;

    //create our agent to test
	utilityAgent = new UtilityAgent.UtilityAgent(selector, qualifiers);

	//invoke our method under test
	utilityAgent.tick(context, 50)
	   .then(result => { expect(result).toBe(action); });

    //assertions
    expect(selector.select).toBeCalledWith(context, qualifiers, 50);
});
